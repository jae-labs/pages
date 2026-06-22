import { ACCEPTED, COOKIE_CONSENT_KEY, REJECTED, loadAnalytics, loadPostHog } from './analytics';

interface CookieBannerClassListLike {
  add: (...tokens: string[]) => void;
  remove: (...tokens: string[]) => void;
}

interface CookieBannerElement extends EventTarget {
  classList: CookieBannerClassListLike;
}

interface CookieButtonElement extends EventTarget {
  dataset: DOMStringMap;
  addEventListener: EventTarget['addEventListener'];
}

interface CookieBannerDocumentLike extends EventTarget {
  readyState: DocumentReadyState;
  addEventListener: Document['addEventListener'];
  getElementById: (id: string) => unknown;
}

const COOKIE_BANNER_REGISTERED_FLAG = '__cookieBannerRegistered';

const defaultAcceptConsent = () => {
  loadAnalytics();
  loadPostHog();
};

const isCookieBannerElement = (value: unknown): value is CookieBannerElement => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<CookieBannerElement>;
  return !!candidate.classList && typeof candidate.classList.add === 'function' && typeof candidate.classList.remove === 'function';
};

const isCookieButtonElement = (value: unknown): value is CookieButtonElement => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<CookieButtonElement>;
  return 'dataset' in candidate && typeof candidate.addEventListener === 'function';
};

export const initCookieBanner = (
  doc: Pick<CookieBannerDocumentLike, 'getElementById'>,
  storage: Pick<Storage, 'getItem' | 'setItem'> = localStorage,
  acceptConsent: () => void = defaultAcceptConsent,
) => {
  const banner = doc.getElementById('cookie-banner');
  const acceptBtn = doc.getElementById('cookie-accept');
  const declineBtn = doc.getElementById('cookie-decline');

  if (!isCookieBannerElement(banner) || !isCookieButtonElement(acceptBtn) || !isCookieButtonElement(declineBtn)) return;

  const consent = storage.getItem(COOKIE_CONSENT_KEY);
  if (consent === ACCEPTED) {
    acceptConsent();
    banner.classList.add('hidden');
    return;
  }

  if (consent === REJECTED) {
    banner.classList.add('hidden');
    return;
  }

  banner.classList.remove('hidden');

  if (acceptBtn.dataset.bound !== 'true') {
    acceptBtn.addEventListener('click', () => {
      storage.setItem(COOKIE_CONSENT_KEY, ACCEPTED);
      acceptConsent();
      banner.classList.add('hidden');
    });
    acceptBtn.dataset.bound = 'true';
  }

  if (declineBtn.dataset.bound !== 'true') {
    declineBtn.addEventListener('click', () => {
      storage.setItem(COOKIE_CONSENT_KEY, REJECTED);
      banner.classList.add('hidden');
    });
    declineBtn.dataset.bound = 'true';
  }
};

export const registerCookieBanner = (
  doc: CookieBannerDocumentLike & { [COOKIE_BANNER_REGISTERED_FLAG]?: boolean } = document,
  storage: Pick<Storage, 'getItem' | 'setItem'> = localStorage,
  acceptConsent: () => void = defaultAcceptConsent,
) => {
  if (doc[COOKIE_BANNER_REGISTERED_FLAG]) return;
  doc[COOKIE_BANNER_REGISTERED_FLAG] = true;

  if (doc.readyState !== 'loading') {
    initCookieBanner(doc, storage, acceptConsent);
  } else {
    doc.addEventListener('DOMContentLoaded', () => initCookieBanner(doc, storage, acceptConsent), { once: true });
  }

  doc.addEventListener('astro:page-load', () => initCookieBanner(doc, storage, acceptConsent));
};

if (typeof document !== 'undefined') {
  registerCookieBanner();
}
