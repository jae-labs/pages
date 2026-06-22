import { describe, expect, test, vi } from 'vitest';

import { bindCalendlyButtons, loadCalendly, registerCalendlyButtons } from './calendly';

class FakeElement extends EventTarget {
  dataset: Record<string, string> = {};
  src = '';
  href = '';
  rel = '';
  async = false;
  onload?: () => void;
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
    if (selector === 'link[href*="calendly.com"]') return this.links[0] ?? null;
    if (selector === 'script[src*="calendly.com"]') return this.script;
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
  test('loads Calendly assets once and flushes queued callbacks when the script loads', () => {
    const doc = new FakeDocument();
    const calendlyWindow: {
      Calendly?: {
        initPopupWidget: (options: { url: string }) => void;
      };
    } = {};
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

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

    loadCalendly(doc as never, calendlyWindow as never, firstCallback);
    loadCalendly(doc as never, calendlyWindow as never, secondCallback);

    expect(doc.head.appendedNodes).toHaveLength(2);

    calendlyWindow.Calendly = {
      initPopupWidget: vi.fn(),
    };
    doc.head.appendedNodes[1]?.onload?.();

    expect(firstCallback).toHaveBeenCalledTimes(1);
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  test('tracks consented clicks and preloads on hover', () => {
    const button = new FakeElement();
    button.dataset.calendlyUrl = 'https://calendly.com/justanother-engineer/demo';

    const capture = vi.fn();
    const loadCalendlyMock = vi.fn((callback: () => void) => callback());
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
    expect(loadCalendlyMock).toHaveBeenCalledTimes(2);
    expect(capture).toHaveBeenCalledWith('calendly_booking_clicked', {
      url: 'https://calendly.com/justanother-engineer/demo',
    });
    expect(initPopupWidget).toHaveBeenCalledWith({
      url: 'https://calendly.com/justanother-engineer/demo',
    });
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
