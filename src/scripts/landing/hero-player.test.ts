import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test, vi } from 'vitest';

import { bindHeroCtaTracking, bindHeroPlayer, bindHeroVideoTrigger, registerHeroPlayer } from './hero-player';

const heroPlayerModule = readFileSync(
  resolve(process.cwd(), 'src', 'scripts', 'landing', 'hero-player.ts'),
  'utf8',
);

class FakeElement extends EventTarget {
  dataset: Record<string, string> = {};
  hidden = false;
  private attributes = new Map<string, string>();

  setAttribute(name: string, value: string) {
    this.attributes.set(name, value);
  }

  removeAttribute(name: string) {
    this.attributes.delete(name);
  }

  getAttribute(name: string) {
    return this.attributes.get(name);
  }
}

class FakeDocument extends EventTarget {
  readyState: DocumentReadyState = 'complete';
  private ctas: FakeElement[] = [];
  private player: FakeElement | null = null;
  private trigger: FakeElement | null = null;

  setCtas(ctas: FakeElement[]) {
    this.ctas = ctas;
  }

  setPlayer(player: FakeElement | null) {
    this.player = player;
  }

  setTrigger(trigger: FakeElement | null) {
    this.trigger = trigger;
  }

  querySelectorAll(selector: string) {
    return selector === '[data-hero-cta]' ? this.ctas : [];
  }

  getElementById(id: string) {
    if (id === 'hero-video') return this.player;
    if (id === 'hero-video-trigger') return this.trigger;
    return null;
  }
}

const createRuntime = (overrides: Partial<Parameters<typeof bindHeroPlayer>[1]> = {}) => ({
  capture: vi.fn(),
  hlsConfig: { maxBufferLength: 10 },
  hlsLibrary: 'local-hls.js',
  isConsentAccepted: () => true,
  loadPlayer: vi.fn().mockResolvedValue(undefined),
  whenPlayerDefined: vi.fn().mockResolvedValue(undefined),
  ...overrides,
});

describe('hero player client module', () => {
  test('lazy-loads Vidstack UI elements needed by the default controls', () => {
    expect(heroPlayerModule).toContain("import('vidstack/player/ui')");
  });

  test('tracks hero CTA clicks only after consent and binds each CTA once', () => {
    const acceptedCta = new FakeElement();
    acceptedCta.dataset.heroCta = 'get_started';

    const rejectedCta = new FakeElement();
    rejectedCta.dataset.heroCta = 'features';

    const capture = vi.fn();
    const acceptedRuntime = createRuntime({
      capture,
      isConsentAccepted: () => true,
    });
    const rejectedRuntime = createRuntime({
      capture,
      isConsentAccepted: () => false,
    });

    bindHeroCtaTracking(
      {
        querySelectorAll: () => [acceptedCta],
      },
      acceptedRuntime,
    );
    bindHeroCtaTracking(
      {
        querySelectorAll: () => [rejectedCta],
      },
      rejectedRuntime,
    );
    bindHeroCtaTracking(
      {
        querySelectorAll: () => [acceptedCta],
      },
      acceptedRuntime,
    );

    acceptedCta.dispatchEvent(new Event('click'));
    rejectedCta.dispatchEvent(new Event('click'));

    expect(acceptedCta.dataset.bound).toBe('true');
    expect(rejectedCta.dataset.bound).toBe('true');
    expect(capture).toHaveBeenCalledTimes(1);
    expect(capture).toHaveBeenCalledWith('hero_cta_clicked', { cta: 'get_started' });
  });

  test('wires the hero player to local hls.js and tracks the first play only', () => {
    const player = new FakeElement();
    const capture = vi.fn();
    const hlsConfig = { maxBufferLength: 10 };

    bindHeroPlayer(player, createRuntime({
      capture,
      hlsConfig,
      hlsLibrary: 'local-hls.js',
      isConsentAccepted: () => true,
    }));
    bindHeroPlayer(player, createRuntime({
      capture,
      isConsentAccepted: () => true,
    }));

    const provider = { type: 'hls' as const, library: undefined, config: { backBufferLength: 4 } };
    player.dispatchEvent(new CustomEvent('provider-change', { detail: provider }));
    player.dispatchEvent(new Event('play'));
    player.dispatchEvent(new Event('play'));

    expect(player.dataset.bound).toBe('true');
    expect(provider.library).toBe('local-hls.js');
    expect(provider.config).toEqual({ backBufferLength: 4, maxBufferLength: 10 });
    expect(capture).toHaveBeenCalledTimes(1);
    expect(capture).toHaveBeenCalledWith('hero_video_played');
  });

  test('loads the lazy player and hides the poster trigger on play', async () => {
    const trigger = new FakeElement();
    const player = new FakeElement() as FakeElement & {
      play: () => Promise<void>;
      startLoading: (trigger?: Event) => void;
    };
    const loadPlayer = vi.fn().mockResolvedValue(undefined);
    const whenPlayerDefined = vi.fn().mockResolvedValue(undefined);
    player.startLoading = vi.fn();
    player.play = vi.fn(async () => {
      player.dispatchEvent(new Event('play'));
    });

    bindHeroVideoTrigger(trigger, player, createRuntime({ loadPlayer, whenPlayerDefined }));
    bindHeroVideoTrigger(trigger, player, createRuntime({ loadPlayer, whenPlayerDefined }));

    trigger.dispatchEvent(new Event('pointerenter'));
    const click = new Event('click');
    trigger.dispatchEvent(click);
    await Promise.resolve();
    await Promise.resolve();

    expect(player.startLoading).toHaveBeenCalledTimes(1);
    expect(player.play).not.toHaveBeenCalled();
    player.dispatchEvent(new Event('can-play'));

    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

    expect(trigger.dataset.bound).toBe('true');
    expect(loadPlayer).toHaveBeenCalledTimes(1);
    expect(whenPlayerDefined).not.toHaveBeenCalled();
    expect(player.play).toHaveBeenCalledWith(click);
    expect(trigger.hidden).toBe(true);
    expect(trigger.getAttribute('aria-busy')).toBeUndefined();
  });

  test('initializes on first load and again on astro page transitions', () => {
    const firstCta = new FakeElement();
    firstCta.dataset.heroCta = 'get_started';
    const firstPlayer = new FakeElement();
    const firstTrigger = new FakeElement();

    const secondCta = new FakeElement();
    secondCta.dataset.heroCta = 'features';
    const secondPlayer = new FakeElement();
    const secondTrigger = new FakeElement();

    const doc = new FakeDocument();
    doc.readyState = 'loading';
    doc.setCtas([firstCta]);
    doc.setPlayer(firstPlayer);
    doc.setTrigger(firstTrigger);

    const capture = vi.fn();
    const runtime = createRuntime({
      capture,
      isConsentAccepted: () => true,
    });

    registerHeroPlayer(doc, runtime);
    expect(firstCta.dataset.bound).toBeUndefined();
    expect(firstPlayer.dataset.bound).toBeUndefined();
    expect(firstTrigger.dataset.bound).toBeUndefined();

    doc.dispatchEvent(new Event('DOMContentLoaded'));
    expect(firstCta.dataset.bound).toBe('true');
    expect(firstPlayer.dataset.bound).toBe('true');
    expect(firstTrigger.dataset.bound).toBe('true');

    doc.setCtas([secondCta]);
    doc.setPlayer(secondPlayer);
    doc.setTrigger(secondTrigger);
    doc.dispatchEvent(new Event('astro:page-load'));

    expect(secondCta.dataset.bound).toBe('true');
    expect(secondPlayer.dataset.bound).toBe('true');
    expect(secondTrigger.dataset.bound).toBe('true');
  });
});
