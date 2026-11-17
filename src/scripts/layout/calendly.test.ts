import { describe, expect, test, vi } from 'vitest';

import { bindCalendlyButtons, loadCalendly, registerCalendlyButtons } from './calendly';

class FakeElement extends EventTarget {
  dataset: Record<string, string> = {};
  src = '';
  href = '';
  rel = '';
  async = false;
  onload?: () => void;
  onerror?: () => void;
  remove = vi.fn();
}

class FakeHead {
  appendedNodes: FakeElement[] = [];

  appendChild(node: FakeElement) {
    this.appendedNodes.push(node);
    return node;
  }
}

class FakeDocument extends EventTarget {
  readyState: DocumentReadyState = 'complete';
  head = new FakeHead();
  private links: FakeElement[] = [];
  private script: FakeElement | null = null;
  private buttons: FakeElement[] = [];

  setButtons(buttons: FakeElement[]) {
    this.buttons = buttons;
  }

  createElement() {
    return new FakeElement();
  }

  querySelector(selector: string) {
    if (selector.startsWith('link[href=')) return this.links[0] ?? null;
    if (selector.startsWith('script[src=')) return this.script;
    return null;
  }

  querySelectorAll(selector: string) {
    return selector === '[data-calendly-url]' ? this.buttons : [];
  }

  appendCalendlyLink(link: FakeElement) {
    this.links = [link];
  }

  appendCalendlyScript(script: FakeElement) {
    this.script = script;
  }
}

describe('calendly client module', () => {
  test('loads Calendly assets once and removes the script on error', () => {
    const doc = new FakeDocument();
    const calendlyWindow: {
      Calendly?: {
        initPopupWidget: (options: { url: string }) => void;
      };
    } = {};

    const originalAppendChild = doc.head.appendChild.bind(doc.head);
    doc.head.appendChild = (node: FakeElement) => {
      originalAppendChild(node);
      if (node.rel === 'stylesheet') {
        doc.appendCalendlyLink(node);
      }
      if (node.src.includes('widget.js')) {
        doc.appendCalendlyScript(node);
      }
      return node;
    };

    loadCalendly(doc as never, calendlyWindow as never);
    loadCalendly(doc as never, calendlyWindow as never);
    expect(doc.head.appendedNodes).toHaveLength(2);

    const script = doc.head.appendedNodes[1];
    script?.onerror?.();
    expect(script?.remove).toHaveBeenCalledOnce();
  });

  test('tracks consented clicks and preloads on hover', () => {
    const button = new FakeElement();
    button.dataset.calendlyUrl = 'https://calendly.com/justanother-engineer/demo';

    const capture = vi.fn();
    const loadCalendlyMock = vi.fn();
    const initPopupWidget = vi.fn();

    bindCalendlyButtons(
      {
        querySelectorAll: () => [button],
      },
      {
        capture,
        isConsentAccepted: () => true,
        loadCalendly: loadCalendlyMock,
        calendlyWindow: {
          Calendly: {
            initPopupWidget,
          },
        } as never,
      },
    );

    button.dispatchEvent(
      new Event('mouseenter'),
    );
    button.dispatchEvent(
      new Event('click', {
        cancelable: true,
      }),
    );

    expect(button.dataset.bound).toBe('true');
    expect(loadCalendlyMock).toHaveBeenCalledOnce();
    expect(capture).toHaveBeenCalledWith('calendly_booking_clicked', {
      url: 'https://calendly.com/justanother-engineer/demo',
    });
    expect(initPopupWidget).toHaveBeenCalledWith({
      url: 'https://calendly.com/justanother-engineer/demo',
    });
  });

  test('lets the booking anchor navigate when the widget is unavailable', () => {
    const link = new FakeElement();
    link.dataset.calendlyUrl = 'https://calendly.com/justanother-engineer/demo';
    bindCalendlyButtons({ querySelectorAll: () => [link] }, {
      capture: vi.fn(),
      isConsentAccepted: () => false,
      loadCalendly: vi.fn(),
      calendlyWindow: {} as never,
    });

    const click = new Event('click', { cancelable: true });
    link.dispatchEvent(click);
    expect(click.defaultPrevented).toBe(false);
  });

  test('rebinds new calendly links on astro page transitions', () => {
    const firstButton = new FakeElement();
    firstButton.dataset.calendlyUrl = 'https://calendly.com/one';
    const secondButton = new FakeElement();
    secondButton.dataset.calendlyUrl = 'https://calendly.com/two';

    const doc = new FakeDocument();
    doc.readyState = 'loading';
    doc.setButtons([firstButton]);

    const runtime = {
      capture: vi.fn(),
      isConsentAccepted: () => false,
      loadCalendly: vi.fn(),
      calendlyWindow: {} as never,
    };

    registerCalendlyButtons(doc as never, runtime);
    registerCalendlyButtons(doc as never, runtime);

    expect(firstButton.dataset.bound).toBeUndefined();
    doc.dispatchEvent(new Event('DOMContentLoaded'));
    expect(firstButton.dataset.bound).toBe('true');

    doc.setButtons([secondButton]);
    doc.dispatchEvent(new Event('astro:page-load'));
    expect(secondButton.dataset.bound).toBe('true');
  });
});
