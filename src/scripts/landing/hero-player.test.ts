import Hls from 'hls.js';
import { describe, expect, test, vi } from 'vitest';

import { bindHeroCtaTracking, bindHeroPlayer, registerHeroPlayer } from './hero-player';

class FakeElement extends EventTarget {
  dataset: Record<string, string> = {};
}

class FakeDocument extends EventTarget {
  readyState: DocumentReadyState = 'complete';
  private ctas: FakeElement[] = [];
  private player: FakeElement | null = null;

  setCtas(ctas: FakeElement[]) {
    this.ctas = ctas;
  }

  setPlayer(player: FakeElement | null) {
    this.player = player;
  }

  querySelectorAll(selector: string) {
    return selector === '[data-hero-cta]' ? this.ctas : [];
  }

  getElementById(id: string) {
    return id === 'hero-video' ? this.player : null;
  }
}

describe('hero player client module', () => {
  test('tracks hero CTA clicks only after consent and binds each CTA once', () => {
    const acceptedCta = new FakeElement();
    acceptedCta.dataset.heroCta = 'get_started';

    const rejectedCta = new FakeElement();
    rejectedCta.dataset.heroCta = 'features';

    const capture = vi.fn();
    const acceptedRuntime = {
      capture,
      hlsLibrary: Hls,
      isConsentAccepted: () => true,
    };
    const rejectedRuntime = {
      capture,
      hlsLibrary: Hls,
      isConsentAccepted: () => false,
    };

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

    bindHeroPlayer(player, {
      capture,
      hlsLibrary: Hls,
      isConsentAccepted: () => true,
    });
    bindHeroPlayer(player, {
      capture,
      hlsLibrary: Hls,
      isConsentAccepted: () => true,
    });

    const provider = { type: 'hls' as const, library: undefined };
    player.dispatchEvent(new CustomEvent('provider-change', { detail: provider }));
    player.dispatchEvent(new Event('play'));
    player.dispatchEvent(new Event('play'));

    expect(player.dataset.bound).toBe('true');
    expect(provider.library).toBe(Hls);
    expect(capture).toHaveBeenCalledTimes(1);
    expect(capture).toHaveBeenCalledWith('hero_video_played');
  });

  test('initializes on first load and again on astro page transitions', () => {
    const firstCta = new FakeElement();
    firstCta.dataset.heroCta = 'get_started';
    const firstPlayer = new FakeElement();

    const secondCta = new FakeElement();
    secondCta.dataset.heroCta = 'features';
    const secondPlayer = new FakeElement();

    const doc = new FakeDocument();
    doc.readyState = 'loading';
    doc.setCtas([firstCta]);
    doc.setPlayer(firstPlayer);

    const capture = vi.fn();
    const runtime = {
      capture,
      hlsLibrary: Hls,
      isConsentAccepted: () => true,
    };

    registerHeroPlayer(doc, runtime);
    expect(firstCta.dataset.bound).toBeUndefined();
    expect(firstPlayer.dataset.bound).toBeUndefined();

    doc.dispatchEvent(new Event('DOMContentLoaded'));
    expect(firstCta.dataset.bound).toBe('true');
    expect(firstPlayer.dataset.bound).toBe('true');

    doc.setCtas([secondCta]);
    doc.setPlayer(secondPlayer);
    doc.dispatchEvent(new Event('astro:page-load'));

    expect(secondCta.dataset.bound).toBe('true');
    expect(secondPlayer.dataset.bound).toBe('true');
  });
});
