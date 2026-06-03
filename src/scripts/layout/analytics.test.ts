import { describe, expect, test, vi } from 'vitest';

import { ACCEPTED, COOKIE_CONSENT_KEY, loadAnalytics, loadPostHog, isConsentAccepted } from './analytics';

vi.mock('posthog-js', () => ({
  default: {
    init: vi.fn(),
  },
}));

class FakeHead {
  appendedNodes: Array<{ src?: string; rel?: string; href?: string }> = [];

  appendChild(node: { src?: string; rel?: string; href?: string }) {
    this.appendedNodes.push(node);
  }
}

class FakeDocument {
  head = new FakeHead();

  createElement() {
    return {
      async: false,
      src: '',
      rel: '',
      href: '',
    };
  }
}

describe('layout analytics module', () => {
  test('loads Google Analytics once and seeds gtag config', () => {
    const doc = new FakeDocument();
    const analyticsWindow: {
      __gaInitialized?: boolean;
      dataLayer?: unknown[][];
      gtag?: (...args: unknown[]) => void;
    } = {};

    loadAnalytics(doc as unknown as Document, analyticsWindow as never, 'G-TEST123');
    loadAnalytics(doc as unknown as Document, analyticsWindow as never, 'G-TEST123');

    expect(doc.head.appendedNodes).toHaveLength(1);
    expect(doc.head.appendedNodes[0]?.src).toBe('https://www.googletagmanager.com/gtag/js?id=G-TEST123');
    expect(analyticsWindow.__gaInitialized).toBe(true);
    expect(analyticsWindow.dataLayer).toHaveLength(2);
    expect(analyticsWindow.dataLayer?.[1]).toEqual(['config', 'G-TEST123', { anonymize_ip: true }]);
  });

  test('loads PostHog once only when a key is available', async () => {
    const analyticsWindow: {
      __posthog_initialized?: boolean;
    } = {};
    const client = {
      init: vi.fn(),
    };

    loadPostHog(analyticsWindow as never, 'ph_test_key', 'https://eu.i.posthog.com', client);
    loadPostHog(analyticsWindow as never, 'ph_test_key', 'https://eu.i.posthog.com', client);
    loadPostHog({} as never, '', 'https://eu.i.posthog.com', client);

    expect(client.init).toHaveBeenCalledTimes(1);
    expect(client.init).toHaveBeenCalledWith('ph_test_key', {
      api_host: 'https://eu.i.posthog.com',
      capture_pageview: 'history_change',
      persistence: 'localStorage',
      autocapture: true,
      session_recording: {
        maskAllInputs: true,
      },
    });
  });

  test('recognizes accepted consent from storage', () => {
    expect(
      isConsentAccepted({
        getItem: (key: string) => (key === COOKIE_CONSENT_KEY ? ACCEPTED : null),
      }),
    ).toBe(true);
  });
});
