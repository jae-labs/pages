import posthog from 'posthog-js';

export const COOKIE_CONSENT_KEY = 'cookie-consent';
export const ACCEPTED = 'accepted';
export const REJECTED = 'rejected';

const GA_TRACKING_ID = import.meta.env.PUBLIC_GA_TRACKING_ID || 'G-N556PF9XWK';
const PH_KEY = import.meta.env.PUBLIC_POSTHOG_KEY;
const PH_HOST = import.meta.env.PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

export type AnalyticsWindowLike = Window &
  typeof globalThis & {
    __gaInitialized?: boolean;
    __posthog_initialized?: boolean;
    dataLayer?: Array<IArguments | unknown[]>;
    gtag?: (...args: unknown[]) => void;
  };

export const isConsentAccepted = (storage: Pick<Storage, 'getItem'> = localStorage) =>
  storage.getItem(COOKIE_CONSENT_KEY) === ACCEPTED;

export const loadAnalytics = (
  doc: Pick<Document, 'createElement' | 'head' | 'title'> = document,
  analyticsWindow: AnalyticsWindowLike = window as AnalyticsWindowLike,
  trackingId = GA_TRACKING_ID,
) => {
  if (analyticsWindow.__gaInitialized) return;

  analyticsWindow.__gaInitialized = true;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = function (...args: unknown[]) {
    void args;
    // eslint-disable-next-line prefer-rest-params -- gtag's canonical queue shape is the arguments object
    analyticsWindow.dataLayer?.push(arguments);
  };

  const script = doc.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  doc.head.appendChild(script);

  analyticsWindow.gtag('js', new Date());
  analyticsWindow.gtag('config', trackingId, {
    anonymize_ip: true,
    send_page_view: false,
  });
  analyticsWindow.gtag('event', 'page_view', {
    page_location: analyticsWindow.location?.href,
    page_path: analyticsWindow.location?.pathname,
    page_title: doc.title,
  });
};

export const loadPostHog = (
  analyticsWindow: AnalyticsWindowLike = window as AnalyticsWindowLike,
  posthogKey = PH_KEY,
  posthogHost = PH_HOST,
  client: Pick<typeof posthog, 'init'> = posthog,
) => {
  if (!posthogKey || analyticsWindow.__posthog_initialized) return;

  analyticsWindow.__posthog_initialized = true;
  client.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: 'history_change',
    persistence: 'localStorage',
    autocapture: true,
    session_recording: {
      maskAllInputs: true,
    },
  });
};
