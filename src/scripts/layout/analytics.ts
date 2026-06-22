export const COOKIE_CONSENT_KEY = 'cookie-consent';
export const ACCEPTED = 'accepted';
export const REJECTED = 'rejected';

const GA_TRACKING_ID = import.meta.env.PUBLIC_GA_TRACKING_ID || 'G-N556PF9XWK';
const PH_KEY = import.meta.env.PUBLIC_POSTHOG_KEY;
const PH_HOST = import.meta.env.PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

interface PostHogClient {
  init: (key: string, options: {
    api_host: string;
    capture_pageview: 'history_change';
    persistence: 'localStorage';
    autocapture: boolean;
    session_recording: {
      maskAllInputs: boolean;
    };
  }) => void;
  capture: (event: string, properties?: Record<string, unknown>) => void;
}

export type AnalyticsWindowLike = Window &
  typeof globalThis & {
    __gaInitialized?: boolean;
    __posthog_initialized?: boolean;
    dataLayer?: Array<IArguments | unknown[]>;
    gtag?: (...args: unknown[]) => void;
  };

let posthogClientPromise: Promise<PostHogClient> | undefined;

const loadPostHogClient = () => {
  posthogClientPromise ??= import('posthog-js').then(({ default: client }) => client as PostHogClient);
  return posthogClientPromise;
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
  client?: Pick<PostHogClient, 'init'>,
) => {
  if (!posthogKey || analyticsWindow.__posthog_initialized) return;

  analyticsWindow.__posthog_initialized = true;
  const initClient = (activeClient: Pick<PostHogClient, 'init'>) => activeClient.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: 'history_change',
    persistence: 'localStorage',
    autocapture: true,
    session_recording: {
      maskAllInputs: true,
    },
  });

  if (client) {
    initClient(client);
    return;
  }

  void loadPostHogClient().then(initClient).catch(() => {
    analyticsWindow.__posthog_initialized = false;
  });
};

export const capturePostHog = (
  event: string,
  properties?: Record<string, unknown>,
  getClient: () => Promise<Pick<PostHogClient, 'capture'>> = loadPostHogClient,
) => {
  void getClient().then((client) => {
    if (properties) {
      client.capture(event, properties);
      return;
    }

    client.capture(event);
  }).catch(() => {
    // Ignore analytics capture failures silently.
  });
};

export const capturePostHogIfConsented = (
  event: string,
  properties?: Record<string, unknown>,
  storage: Pick<Storage, 'getItem'> = localStorage,
) => {
  if (!isConsentAccepted(storage)) return;

  capturePostHog(event, properties);
};
