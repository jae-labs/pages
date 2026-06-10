import posthog from 'posthog-js';

import { isConsentAccepted } from './analytics';

interface CalendlyLike {
  initPopupWidget: (options: { url: string }) => void;
}

interface CalendlyWindowLike extends Window {
  Calendly?: CalendlyLike;
}

interface CalendlyLinkLike extends EventTarget {
  dataset: DOMStringMap;
  addEventListener: EventTarget['addEventListener'];
}

interface CalendlyNodeListLike {
  forEach: (callback: (value: unknown) => void) => void;
}

interface CalendlyDocumentLike extends EventTarget {
  readyState: DocumentReadyState;
  addEventListener: Document['addEventListener'];
  createElement: Document['createElement'];
  querySelector: Document['querySelector'];
  querySelectorAll: (selector: string) => CalendlyNodeListLike;
  head: Document['head'];
}

interface CalendlyRuntime {
  capture: (event: string, properties?: Record<string, string>) => void;
  isConsentAccepted: () => boolean;
  loadCalendly: (callback: () => void) => void;
  calendlyWindow: CalendlyWindowLike;
}

const CALENDLY_REGISTERED_FLAG = '__calendlyRegistered';

let calendlyLoading = false;
let calendlyPolling: ReturnType<typeof setInterval> | undefined;
let pendingCallbacks: Array<() => void> = [];

const getDefaultCalendlyWindow = () => window as CalendlyWindowLike;

const flushCalendlyCallbacks = () => {
  const callbacks = pendingCallbacks;
  pendingCallbacks = [];
  callbacks.forEach((callback) => {
    callback();
  });
};

const startCalendlyPolling = (calendlyWindow: CalendlyWindowLike) => {
  if (calendlyPolling) return;

  calendlyPolling = setInterval(() => {
    if (!calendlyWindow.Calendly?.initPopupWidget) return;

    const activePolling = calendlyPolling;
    if (activePolling) {
      clearInterval(activePolling);
    }
    calendlyPolling = undefined;
    flushCalendlyCallbacks();
  }, 100);
};

const isCalendlyLinkLike = (value: unknown): value is CalendlyLinkLike => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<CalendlyLinkLike>;
  return 'dataset' in candidate && typeof candidate.addEventListener === 'function';
};

export const loadCalendly = (
  doc: Pick<CalendlyDocumentLike, 'createElement' | 'querySelector' | 'head'> = document,
  calendlyWindow: CalendlyWindowLike = getDefaultCalendlyWindow(),
  callback: () => void,
) => {
  if (calendlyWindow.Calendly?.initPopupWidget) {
    callback();
    return;
  }

  pendingCallbacks.push(callback);

  if (!doc.querySelector('link[href*="calendly.com"]')) {
    const link = doc.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    doc.head.appendChild(link);
  }

  if (!doc.querySelector('script[src*="calendly.com"]') && !calendlyLoading) {
    calendlyLoading = true;
    const script = doc.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      calendlyLoading = false;
      const activePolling = calendlyPolling;
      if (activePolling) {
        clearInterval(activePolling);
        calendlyPolling = undefined;
      }
      flushCalendlyCallbacks();
    };
    doc.head.appendChild(script);
    return;
  }

  startCalendlyPolling(calendlyWindow);
};

const createDefaultCalendlyRuntime = (): CalendlyRuntime => ({
  capture: (event, properties) => {
    if (properties) {
      posthog.capture(event, properties);
    } else {
      posthog.capture(event);
    }
  },
  isConsentAccepted: () => isConsentAccepted(),
  loadCalendly: (callback) => loadCalendly(document, getDefaultCalendlyWindow(), callback),
  calendlyWindow: getDefaultCalendlyWindow(),
});

export const bindCalendlyButtons = (
  doc: Pick<CalendlyDocumentLike, 'querySelectorAll'>,
  runtime: CalendlyRuntime = createDefaultCalendlyRuntime(),
) => {
  doc.querySelectorAll('[data-calendly-url]').forEach((link) => {
    if (!isCalendlyLinkLike(link) || link.dataset.bound === 'true') return;

    link.addEventListener('click', (event) => {
      event.preventDefault();

      const url = link.dataset.calendlyUrl;
      if (!url) return;

      if (runtime.isConsentAccepted()) {
        try {
          runtime.capture('calendly_booking_clicked', { url });
        } catch {
          // Ignore analytics capture failures silently
        }
      }

      runtime.loadCalendly(() => {
        runtime.calendlyWindow.Calendly?.initPopupWidget({ url });
      });
    });

    link.addEventListener(
      'mouseenter',
      () => {
        runtime.loadCalendly(() => {});
      },
      { once: true },
    );

    link.dataset.bound = 'true';
  });
};

export const registerCalendlyButtons = (
  doc: CalendlyDocumentLike & { [CALENDLY_REGISTERED_FLAG]?: boolean } = document,
  runtime: CalendlyRuntime = createDefaultCalendlyRuntime(),
) => {
  if (doc[CALENDLY_REGISTERED_FLAG]) return;
  doc[CALENDLY_REGISTERED_FLAG] = true;

  if (doc.readyState !== 'loading') {
    bindCalendlyButtons(doc, runtime);
  } else {
    doc.addEventListener('DOMContentLoaded', () => bindCalendlyButtons(doc, runtime), { once: true });
  }

  doc.addEventListener('astro:page-load', () => bindCalendlyButtons(doc, runtime));
};

if (typeof document !== 'undefined') {
  registerCalendlyButtons();
}
