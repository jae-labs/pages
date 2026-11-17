import { capturePostHog, isConsentAccepted } from './analytics';

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
  loadCalendly: () => void;
  calendlyWindow: CalendlyWindowLike;
}

const CALENDLY_REGISTERED_FLAG = '__calendlyRegistered';

const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_STYLES = 'https://assets.calendly.com/assets/external/widget.css';
const WIDGET_LOAD_TIMEOUT_MS = 5_000;

const getDefaultCalendlyWindow = () => window as CalendlyWindowLike;

const isCalendlyLinkLike = (value: unknown): value is CalendlyLinkLike => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<CalendlyLinkLike>;
  return 'dataset' in candidate && typeof candidate.addEventListener === 'function';
};

export const loadCalendly = (
  doc: Pick<CalendlyDocumentLike, 'createElement' | 'querySelector' | 'head'> = document,
  calendlyWindow: CalendlyWindowLike = getDefaultCalendlyWindow(),
) => {
  if (calendlyWindow.Calendly?.initPopupWidget || doc.querySelector(`script[src="${WIDGET_SCRIPT}"]`)) return;

  if (!doc.querySelector(`link[href="${WIDGET_STYLES}"]`)) {
    const link = doc.createElement('link');
    link.rel = 'stylesheet';
    link.href = WIDGET_STYLES;
    doc.head.appendChild(link);
  }

  const script = doc.createElement('script');
  script.src = WIDGET_SCRIPT;
  script.async = true;
  const timeout = setTimeout(() => script.remove(), WIDGET_LOAD_TIMEOUT_MS);
  script.onerror = () => {
    clearTimeout(timeout);
    script.remove();
  };
  script.onload = () => {
    clearTimeout(timeout);
    if (!calendlyWindow.Calendly?.initPopupWidget) script.remove();
  };
  doc.head.appendChild(script);
};

const createDefaultCalendlyRuntime = (): CalendlyRuntime => ({
  capture: (event, properties) => {
    capturePostHog(event, properties);
  },
  isConsentAccepted: () => isConsentAccepted(),
  loadCalendly: () => loadCalendly(),
  calendlyWindow: getDefaultCalendlyWindow(),
});

export const bindCalendlyButtons = (
  doc: Pick<CalendlyDocumentLike, 'querySelectorAll'>,
  runtime: CalendlyRuntime = createDefaultCalendlyRuntime(),
) => {
  doc.querySelectorAll('[data-calendly-url]').forEach((link) => {
    if (!isCalendlyLinkLike(link) || link.dataset.bound === 'true') return;

    link.addEventListener('click', (event) => {
      const url = link.dataset.calendlyUrl;
      if (!url) return;

      if (runtime.isConsentAccepted()) {
        try {
          runtime.capture('calendly_booking_clicked', { url });
        } catch {
          // Ignore analytics capture failures silently
        }
      }

      if (typeof MouseEvent !== 'undefined' && event instanceof MouseEvent && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;

      const widget = runtime.calendlyWindow.Calendly;
      if (!widget?.initPopupWidget) return;
      try {
        widget.initPopupWidget({ url });
        event.preventDefault();
      } catch {
        // Let the anchor navigate if opening the widget fails.
      }
    });

    link.addEventListener('mouseenter', runtime.loadCalendly, { once: true });
    link.addEventListener('focus', runtime.loadCalendly, { once: true });

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
