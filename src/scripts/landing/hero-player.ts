import { capturePostHog, isConsentAccepted } from '../layout/analytics';

type HlsConstructor = typeof import('hls.js').default;
type HlsLibrary = HlsConstructor | (() => Promise<{ default: HlsConstructor } | undefined>) | string | undefined;
type HlsConfig = Partial<import('hls.js').HlsConfig>;

interface HlsProviderLike {
  type: 'hls';
  library: HlsLibrary;
  config: HlsConfig;
}

interface HeroTrackableElement extends EventTarget {
  dataset: DOMStringMap;
  addEventListener: EventTarget['addEventListener'];
}

interface HeroVideoTriggerElement extends HeroTrackableElement {
  hidden: boolean;
  setAttribute: Element['setAttribute'];
  removeAttribute: Element['removeAttribute'];
}

interface HeroMediaPlayerElement extends HeroTrackableElement {
  play?: (trigger?: Event) => Promise<void>;
  startLoading?: (trigger?: Event) => void;
  hasAttribute?: Element['hasAttribute'];
}

interface HeroNodeListLike {
  forEach: (callback: (value: unknown) => void) => void;
}

interface HeroDocumentLike {
  readyState: DocumentReadyState;
  addEventListener: Document['addEventListener'];
  getElementById: (id: string) => unknown;
  querySelectorAll: (selector: string) => HeroNodeListLike;
}

interface HeroRuntime {
  capture: (event: string, properties?: Record<string, string>) => void;
  hlsConfig: HlsConfig;
  hlsLibrary: HlsLibrary;
  isConsentAccepted: () => boolean;
  loadPlayer: () => Promise<void>;
  whenPlayerDefined: () => Promise<void>;
}

const HERO_PLAYER_REGISTERED_FLAG = '__heroPlayerRegistered';
const HERO_PLAYER_WARMUP_DELAY_MS = 1200;

let playerLoadPromise: Promise<void> | undefined;

const appendStylesheet = (href: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"][rel="stylesheet"]`)) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Unable to load stylesheet: ${href}`));
    document.head.appendChild(link);
  });

const loadVidstackStyles = async () => {
  const [theme, video] = await Promise.all([
    import('vidstack/player/styles/default/theme.css?url'),
    import('vidstack/player/styles/default/layouts/video.css?url'),
  ]);

  await Promise.all([
    appendStylesheet(theme.default),
    appendStylesheet(video.default),
  ]);
};

const loadVidstackPlayer = () => {
  playerLoadPromise ??= Promise.all([
    loadVidstackStyles(),
    import('vidstack/player'),
    import('vidstack/player/layouts/default'),
    import('vidstack/player/ui'),
  ]).then(() => undefined);

  return playerLoadPromise;
};

const defaultHeroRuntime: HeroRuntime = {
  capture: (event, properties) => {
    capturePostHog(event, properties);
  },
  hlsConfig: {
    backBufferLength: 8,
    maxBufferLength: 10,
    maxBufferSize: 12_000_000,
    maxMaxBufferLength: 16,
    startFragPrefetch: false,
  },
  hlsLibrary: () => import('hls.js'),
  isConsentAccepted: () => isConsentAccepted(),
  loadPlayer: loadVidstackPlayer,
  whenPlayerDefined: () => customElements.whenDefined('media-player').then(() => undefined),
};

const isTrackableElement = (value: unknown): value is HeroTrackableElement => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<HeroTrackableElement>;
  return 'dataset' in candidate && typeof candidate.addEventListener === 'function';
};

const isHeroVideoTriggerElement = (value: unknown): value is HeroVideoTriggerElement => {
  if (!isTrackableElement(value)) return false;

  const candidate = value as Partial<HeroVideoTriggerElement>;
  return (
    typeof candidate.setAttribute === 'function'
    && typeof candidate.removeAttribute === 'function'
    && 'hidden' in candidate
  );
};

const isHeroMediaPlayerElement = (value: unknown): value is HeroMediaPlayerElement =>
  isTrackableElement(value);

const isHlsProviderLike = (provider: unknown): provider is HlsProviderLike => {
  if (!provider || typeof provider !== 'object') return false;

  const candidate = provider as Partial<HlsProviderLike>;
  return candidate.type === 'hls' && 'library' in candidate && 'config' in candidate;
};

const captureIfConsented = (
  runtime: HeroRuntime,
  event: Parameters<HeroRuntime['capture']>[0],
  properties?: Parameters<HeroRuntime['capture']>[1],
) => {
  if (!runtime.isConsentAccepted()) return;

  try {
    if (properties) {
      runtime.capture(event, properties);
    } else {
      runtime.capture(event);
    }
  } catch {
    // Ignore analytics capture failures silently
  }
};

const setTriggerLoading = (trigger: HeroVideoTriggerElement, loading: boolean) => {
  if (loading) {
    trigger.dataset.loading = 'true';
    trigger.setAttribute('aria-busy', 'true');
    return;
  }

  delete trigger.dataset.loading;
  trigger.removeAttribute('aria-busy');
};

const schedulePlayerWarmup = (
  trigger: HeroVideoTriggerElement,
  warmPlayer: () => void,
) => {
  if (typeof window === 'undefined' || typeof Element === 'undefined' || !(trigger instanceof Element)) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;

      observer.disconnect();
      warmPlayer();
    }, { rootMargin: '300px 0px' });

    observer.observe(trigger);
    return;
  }

  globalThis.setTimeout(warmPlayer, HERO_PLAYER_WARMUP_DELAY_MS);
};

const waitForCanPlay = (player: HeroMediaPlayerElement) =>
  new Promise<void>((resolve) => {
    if (player.hasAttribute?.('data-can-play')) {
      resolve();
      return;
    }

    player.addEventListener('can-play', () => resolve(), { once: true });
  });

export const bindHeroCtaTracking = (
  doc: Pick<HeroDocumentLike, 'querySelectorAll'>,
  runtime: HeroRuntime = defaultHeroRuntime,
) => {
  doc.querySelectorAll('[data-hero-cta]').forEach((element) => {
    if (!isTrackableElement(element) || element.dataset.bound === 'true') return;

    element.addEventListener('click', () => {
      captureIfConsented(runtime, 'hero_cta_clicked', { cta: element.dataset.heroCta ?? '' });
    });

    element.dataset.bound = 'true';
  });
};

export const bindHeroPlayer = (
  player: unknown,
  runtime: HeroRuntime = defaultHeroRuntime,
) => {
  if (!isTrackableElement(player) || player.dataset.bound === 'true') return;

  player.addEventListener('provider-change', (event) => {
    const provider = (event as CustomEvent<unknown>).detail;
    if (isHlsProviderLike(provider)) {
      provider.config = { ...provider.config, ...runtime.hlsConfig };
      provider.library = runtime.hlsLibrary;
    }
  });

  player.addEventListener(
    'play',
    () => {
      captureIfConsented(runtime, 'hero_video_played');
    },
    { once: true },
  );

  player.dataset.bound = 'true';
};

export const bindHeroVideoTrigger = (
  trigger: unknown,
  player: unknown,
  runtime: HeroRuntime = defaultHeroRuntime,
) => {
  if (
    !isHeroVideoTriggerElement(trigger)
    || !isHeroMediaPlayerElement(player)
    || trigger.dataset.bound === 'true'
  ) return;

  let warmPlayerPromise: Promise<void> | undefined;

  const warmPlayer = () => {
    warmPlayerPromise ??= runtime.loadPlayer().catch(() => {
      setTriggerLoading(trigger, false);
      warmPlayerPromise = undefined;
    });

    return warmPlayerPromise;
  };

  const startPlayback = async (event: Event) => {
    player.startLoading?.(event);
    setTriggerLoading(trigger, false);
    trigger.hidden = true;
    await waitForCanPlay(player);
    await player.play?.(event);
  };

  trigger.addEventListener('pointerenter', warmPlayer, { once: true });
  trigger.addEventListener('focus', warmPlayer, { once: true });
  trigger.addEventListener('touchstart', warmPlayer, { once: true, passive: true });
  schedulePlayerWarmup(trigger, warmPlayer);

  trigger.addEventListener('click', async (event) => {
    if (trigger.dataset.loading === 'true') return;

    event.preventDefault();
    setTriggerLoading(trigger, true);

    try {
      if (typeof player.play === 'function' || typeof player.startLoading === 'function') {
        await startPlayback(event);
        return;
      }

      await warmPlayer();
      await runtime.whenPlayerDefined();
      await startPlayback(event);
    } catch {
      setTriggerLoading(trigger, false);
    }
  });

  player.addEventListener('play', () => {
    trigger.hidden = true;
  });

  trigger.dataset.bound = 'true';
};

export const initHeroPlayer = (
  doc: HeroDocumentLike = document,
  runtime: HeroRuntime = defaultHeroRuntime,
) => {
  bindHeroCtaTracking(doc, runtime);
  const player = doc.getElementById('hero-video');
  bindHeroPlayer(player, runtime);
  bindHeroVideoTrigger(doc.getElementById('hero-video-trigger'), player, runtime);
};

export const registerHeroPlayer = (
  doc: HeroDocumentLike & { [HERO_PLAYER_REGISTERED_FLAG]?: boolean } = document,
  runtime: HeroRuntime = defaultHeroRuntime,
) => {
  if (doc[HERO_PLAYER_REGISTERED_FLAG]) return;
  doc[HERO_PLAYER_REGISTERED_FLAG] = true;

  if (doc.readyState !== 'loading') {
    initHeroPlayer(doc, runtime);
  } else {
    doc.addEventListener('DOMContentLoaded', () => initHeroPlayer(doc, runtime), { once: true });
  }

  doc.addEventListener('astro:page-load', () => initHeroPlayer(doc, runtime));
};

if (typeof document !== 'undefined') {
  registerHeroPlayer();
}
