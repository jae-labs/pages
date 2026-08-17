import { describe, expect, test, vi } from 'vitest';

import { registerCookieBanner, initCookieBanner } from './cookie-consent';

class FakeClassList {
  tokens = new Set<string>(['hidden']);

  add(...tokens: string[]) {
    tokens.forEach((token) => this.tokens.add(token));
  }

  remove(...tokens: string[]) {
    tokens.forEach((token) => this.tokens.delete(token));
  }

  has(token: string) {
    return this.tokens.has(token);
  }
}

class FakeElement extends EventTarget {
  dataset: Record<string, string> = {};
  classList = new FakeClassList();
}

class FakeStorage {
  private values = new Map<string, string>();

  constructor(entries: Record<string, string> = {}) {
    Object.entries(entries).forEach(([key, value]) => this.values.set(key, value));
  }

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

class FakeDocument extends EventTarget {
  readyState: DocumentReadyState = 'complete';
  banner = new FakeElement();
  accept = new FakeElement();
  decline = new FakeElement();

  getElementById(id: string) {
    if (id === 'cookie-banner') return this.banner;
    if (id === 'cookie-accept') return this.accept;
    if (id === 'cookie-decline') return this.decline;
    return null;
  }
}

describe('cookie consent client module', () => {
  test('shows the banner until consent is accepted or rejected', () => {
    const doc = new FakeDocument();
    const storage = new FakeStorage();
    const acceptConsent = vi.fn();

    initCookieBanner(doc, storage as never, acceptConsent);
    expect(doc.banner.classList.has('hidden')).toBe(false);

    doc.accept.dispatchEvent(new Event('click'));
    expect(storage.getItem('cookie-consent')).toBe('accepted');
    expect(acceptConsent).toHaveBeenCalledTimes(1);
    expect(doc.banner.classList.has('hidden')).toBe(true);

    const rejectedDoc = new FakeDocument();
    const rejectedStorage = new FakeStorage();
    initCookieBanner(rejectedDoc, rejectedStorage as never, acceptConsent);
    rejectedDoc.decline.dispatchEvent(new Event('click'));
    expect(rejectedStorage.getItem('cookie-consent')).toBe('rejected');
    expect(acceptConsent).toHaveBeenCalledTimes(1);
    expect(rejectedDoc.banner.classList.has('hidden')).toBe(true);
  });

  test('hydrates immediately for accepted consent and hides for rejected consent', () => {
    const acceptConsent = vi.fn();

    const acceptedDoc = new FakeDocument();
    acceptedDoc.banner.classList.remove('hidden');
    initCookieBanner(acceptedDoc, new FakeStorage({ 'cookie-consent': 'accepted' }) as never, acceptConsent);
    expect(acceptConsent).toHaveBeenCalledTimes(1);
    expect(acceptedDoc.banner.classList.has('hidden')).toBe(true);

    const rejectedDoc = new FakeDocument();
    rejectedDoc.banner.classList.remove('hidden');
    initCookieBanner(rejectedDoc, new FakeStorage({ 'cookie-consent': 'rejected' }) as never, acceptConsent);
    expect(acceptConsent).toHaveBeenCalledTimes(1);
    expect(rejectedDoc.banner.classList.has('hidden')).toBe(true);
  });

  test('registers once across DOM ready and astro page loads', () => {
    const doc = new FakeDocument();
    doc.readyState = 'loading';
    const storage = new FakeStorage();
    const acceptConsent = vi.fn();

    registerCookieBanner(doc, storage as never, acceptConsent);
    registerCookieBanner(doc, storage as never, acceptConsent);

    expect(doc.accept.dataset.bound).toBeUndefined();
    doc.dispatchEvent(new Event('DOMContentLoaded'));
    expect(doc.accept.dataset.bound).toBe('true');

    const nextBanner = new FakeElement();
    const nextAccept = new FakeElement();
    const nextDecline = new FakeElement();
    doc.banner = nextBanner;
    doc.accept = nextAccept;
    doc.decline = nextDecline;

    doc.dispatchEvent(new Event('astro:page-load'));
    expect(doc.accept.dataset.bound).toBe('true');
    expect(doc.decline.dataset.bound).toBe('true');
  });
});
