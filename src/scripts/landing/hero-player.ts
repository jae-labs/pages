import Hls from 'hls.js';
import posthog from 'posthog-js';

interface HlsProviderLike {
  type: 'hls';
  library: typeof Hls | string | undefined;
}

interface HeroTrackableElement extends EventTarget {
  dataset: DOMStringMap;
  addEventListener: EventTarget['addEventListener'];
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
  isConsentAccepted: () => boolean;
  hlsLibrary: typeof Hls;
}

const HERO_PLAYER_REGISTERED_FLAG = '__heroPlayerRegistered';

const defaultHeroRuntime: HeroRuntime = {
  capture: (event, properties) => {
    if (properties) {
      posthog.capture(event, properties);
    } else {
      posthog.capture(event);
    }
  },
  isConsentAccepted: () => localStorage.getItem('cookie-consent') === 'accepted',
  hlsLibrary: Hls,
};

const isTrackableElement = (value: unknown): value is HeroTrackableElement => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<HeroTrackableElement>;
  return 'dataset' in candidate && typeof candidate.addEventListener === 'function';
};

const isHlsProviderLike = (provider: unknown): provider is HlsProviderLike => {
  if (!provider || typeof provider !== 'object') return false;

  const candidate = provider as Partial<HlsProviderLike>;
  return candidate.type === 'hls' && 'library' in candidate;
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

export const initHeroPlayer = (
  doc: HeroDocumentLike = document,
  runtime: HeroRuntime = defaultHeroRuntime,
) => {
  bindHeroCtaTracking(doc, runtime);
  bindHeroPlayer(doc.getElementById('hero-video'), runtime);
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
