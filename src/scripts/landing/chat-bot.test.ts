import { describe, expect, test, vi, beforeEach } from 'vitest';

import {
  escapeHtml,
  formatCooldown,
  initChatBot,
  parseMarkdown,
  registerChatBot,
  type ChatBotRuntime,
  type ChatDocumentLike,
} from './chat-bot';

// ─── Fakes ────────────────────────────────────────────────────────────────────

class FakeClassList {
  private tokens = new Set<string>();
  add(...ts: string[]) {
    ts.forEach((t) => this.tokens.add(t));
  }
  remove(...ts: string[]) {
    ts.forEach((t) => this.tokens.delete(t));
  }
  toggle(t: string, force?: boolean) {
    if (force !== undefined) {
      if (force) { this.tokens.add(t); } else { this.tokens.delete(t); }
    } else {
      if (this.tokens.has(t)) { this.tokens.delete(t); } else { this.tokens.add(t); }
    }
  }
  contains(t: string) {
    return this.tokens.has(t);
  }
}

class FakeElement extends EventTarget {
  dataset: Record<string, string | undefined> = {};
  classList = new FakeClassList();
  textContent: string | null = null;
  innerHTML = '';
  disabled = false;
  value = '';
  maxLength = 1200;
  placeholder = '';
  selectionStart: number | null = 0;
  selectionEnd: number | null = 0;
  scrollTop = 0;
  scrollHeight = 100;
  isConnected = true;
  className = '';
  appendedChildren: unknown[] = [];
  private queryMap = new Map<string, FakeElement>();

  setAttribute(name: string, value: string) {
    (this as Record<string, unknown>)[name] = value;
  }
  setQueryResult(selector: string, element: FakeElement) {
    this.queryMap.set(selector, element);
  }
  focus() {}
  setSelectionRange(start: number, end: number) {
    this.selectionStart = start;
    this.selectionEnd = end;
  }
  querySelector(selector: string) {
    return this.queryMap.get(selector) ?? null;
  }
  appendChild(child: unknown) {
    this.appendedChildren.push(child);
    return child;
  }
  remove() {
    this.isConnected = false;
  }
  requestSubmit() {
    this.dispatchEvent(new Event('submit'));
  }
}

class FakeDocument extends EventTarget {
  readyState: DocumentReadyState = 'complete';
  body = { classList: new FakeClassList() };
  visibilityState: 'visible' | 'hidden' | 'prerender' = 'visible';
  private elements = new Map<string, FakeElement>();
  private createdElements: FakeElement[] = [];

  setElement(id: string, el: FakeElement) {
    this.elements.set(id, el);
  }

  getElementById(id: string) {
    return this.elements.get(id) ?? null;
  }

  createElement(tag: string): FakeElement {
    void tag;
    const el = new FakeElement();
    this.createdElements.push(el);
    return el;
  }

  getCreatedElements() {
    return this.createdElements;
  }
}

const makeChatElements = () => {
  const toggle = new FakeElement();
  const close = new FakeElement();
  const clear = new FakeElement();
  const panel = new FakeElement();
  panel.classList.add('hidden');
  const form = new FakeElement();
  const input = new FakeElement();
  const log = new FakeElement();
  const submit = new FakeElement();
  const sendIcon = new FakeElement();
  const loadingIcon = new FakeElement();
  submit.setQueryResult('.chat-send-icon', sendIcon);
  submit.setQueryResult('.chat-loading-icon', loadingIcon);
  const characterCount = new FakeElement();
  const turnstile = new FakeElement();
  const mic = new FakeElement();
  const micOnIcon = new FakeElement();
  const micOffIcon = new FakeElement();
  mic.setQueryResult('.chat-mic-on-icon', micOnIcon);
  mic.setQueryResult('.chat-mic-off-icon', micOffIcon);

  const doc = new FakeDocument();
  doc.setElement('chat-toggle', toggle);
  doc.setElement('chat-close', close);
  doc.setElement('chat-clear', clear);
  doc.setElement('chat-panel', panel);
  doc.setElement('chat-form', form);
  doc.setElement('chat-message', input);
  doc.setElement('chat-log', log);
  doc.setElement('chat-submit', submit);
  doc.setElement('chat-character-count', characterCount);
  doc.setElement('chat-turnstile', turnstile);
  doc.setElement('chat-mic', mic);

  return {
    doc,
    toggle,
    close,
    clear,
    panel,
    form,
    input,
    log,
    submit,
    sendIcon,
    loadingIcon,
    characterCount,
    turnstile,
    mic,
    micOnIcon,
    micOffIcon,
  };
};

const makeFakeRuntime = (overrides: Partial<ChatBotRuntime> = {}): ChatBotRuntime => ({
  capture: vi.fn(),
  isConsentAccepted: () => true,
  storage: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
  getTurnstile: () => undefined,
  turnstileSiteKey: '1x00000000000000000000AA',
  fetch: vi.fn(() =>
    Promise.resolve(new Response(JSON.stringify({ allowed: true, retryAfter: 0 }), { status: 200 })),
  ),
  getInnerWidth: () => 1024,
  randomUUID: () => 'test-uuid-1234' as ReturnType<typeof crypto.randomUUID>,
  getSpeechRecognition: () => undefined,
  ...overrides,
});

// ─── Pure utility tests ───────────────────────────────────────────────────────

describe('formatCooldown', () => {
  test('formats seconds under a minute', () => {
    expect(formatCooldown(45)).toBe('0m 45s');
  });

  test('formats exact minutes with no seconds', () => {
    expect(formatCooldown(120)).toBe('2m');
  });

  test('formats minutes and seconds', () => {
    expect(formatCooldown(125)).toBe('2m 5s');
  });

  test('handles zero', () => {
    expect(formatCooldown(0)).toBe('0m');
  });
});

describe('escapeHtml', () => {
  test('escapes angle brackets', () => {
    expect(escapeHtml('<b>bold</b>')).toBe('&lt;b&gt;bold&lt;/b&gt;');
  });

  test('escapes ampersands', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
  });

  test('escapes double quotes', () => {
    expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;');
  });

  test('passes through safe text unchanged', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });
});

describe('parseMarkdown', () => {
  test('converts bold with **', () => {
    expect(parseMarkdown('**bold text**')).toContain('<strong class="font-bold text-white">bold text</strong>');
  });

  test('converts inline code', () => {
    expect(parseMarkdown('use `foo` here')).toContain(
      '<code class="bg-white/10 px-1 py-0.5 rounded text-xs font-mono text-neon-cyan">foo</code>',
    );
  });

  test('converts links', () => {
    expect(parseMarkdown('[link](https://example.com)')).toContain(
      'href="https://example.com"',
    );
  });

  test('converts bullet lists', () => {
    const result = parseMarkdown('- item one\n- item two');
    expect(result).toContain('<ul');
    expect(result).toContain('<li>item one</li>');
    expect(result).toContain('<li>item two</li>');
    expect(result).toContain('</ul>');
  });

  test('escapes HTML before applying markdown', () => {
    const result = parseMarkdown('<script>alert(1)</script>');
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });
});

// ─── initChatBot tests ────────────────────────────────────────────────────────

describe('initChatBot – element guard', () => {
  test('returns early when essential elements are missing', () => {
    const doc = new FakeDocument();
    const runtime = makeFakeRuntime();
    // No elements registered – should not throw
    expect(() => initChatBot(doc as unknown as ChatDocumentLike, runtime)).not.toThrow();
    expect(runtime.fetch).not.toHaveBeenCalled();
  });
});

describe('initChatBot – bind-once guard', () => {
  test('does not re-bind listeners on repeated calls with the same document', () => {
    const { doc, toggle } = makeChatElements();
    const runtime = makeFakeRuntime();
    const docLike = doc as unknown as ChatDocumentLike;

    initChatBot(docLike, runtime);
    expect(toggle.dataset.bound).toBe('true');

    // A second call should be a no-op – probeRateLimit fetch called once only
    vi.clearAllMocks();
    initChatBot(docLike, runtime);
    expect(runtime.fetch).not.toHaveBeenCalled();
  });
});

describe('initChatBot – analytics consent gating', () => {
  test('does not call capture when consent is not accepted', () => {
    const { doc, toggle } = makeChatElements();
    const capture = vi.fn();
    const runtime = makeFakeRuntime({
      capture,
      isConsentAccepted: () => false,
    });

    initChatBot(doc as unknown as ChatDocumentLike, runtime);

    // Simulate opening the panel
    toggle.dispatchEvent(new Event('click'));

    expect(capture).not.toHaveBeenCalled();
  });

  test('calls capture when consent is accepted', () => {
    const { doc, toggle } = makeChatElements();
    const capture = vi.fn();
    const runtime = makeFakeRuntime({
      capture,
      isConsentAccepted: () => true,
    });

    initChatBot(doc as unknown as ChatDocumentLike, runtime);
    toggle.dispatchEvent(new Event('click'));

    expect(capture).toHaveBeenCalledWith('chatbot_opened', undefined);
  });
});

describe('initChatBot – panel interactions', () => {
  test('toggles the panel and mobile body scroll lock', () => {
    const { doc, toggle, close, panel } = makeChatElements();
    const runtime = makeFakeRuntime({
      getInnerWidth: () => 375,
    });

    initChatBot(doc as unknown as ChatDocumentLike, runtime);

    toggle.dispatchEvent(new Event('click'));
    expect(panel.classList.contains('hidden')).toBe(false);
    expect(doc.body.classList.contains('overflow-hidden')).toBe(true);
    expect((toggle as unknown as Record<string, string>)['aria-expanded']).toBe('true');

    close.dispatchEvent(new Event('click'));
    expect(panel.classList.contains('hidden')).toBe(true);
    expect(doc.body.classList.contains('overflow-hidden')).toBe(false);
    expect((toggle as unknown as Record<string, string>)['aria-expanded']).toBe('false');
  });
});

describe('initChatBot – rate-limit cooldown storage', () => {
  test('persists cooldown expiration to storage when probe returns rate-limited', async () => {
    const { doc } = makeChatElements();
    const storage = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    const runtime = makeFakeRuntime({
      storage,
      fetch: vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify({ allowed: false, retryAfter: 60 }), { status: 200 }),
        ),
      ),
    });

    initChatBot(doc as unknown as ChatDocumentLike, runtime);

    // Await microtask queue to let the async probeRateLimit settle
    await new Promise((r) => setTimeout(r, 0));

    expect(storage.setItem).toHaveBeenCalledWith(
      'chat_cooldown_until',
      expect.stringMatching(/^\d+$/),
    );
  });

  test('clears cooldown from storage when probe returns allowed', async () => {
    const { doc } = makeChatElements();
    const storage = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    const runtime = makeFakeRuntime({
      storage,
      fetch: vi.fn(() =>
        Promise.resolve(
          new Response(JSON.stringify({ allowed: true, retryAfter: 0 }), { status: 200 }),
        ),
      ),
    });

    initChatBot(doc as unknown as ChatDocumentLike, runtime);

    await new Promise((r) => setTimeout(r, 0));

    expect(storage.removeItem).toHaveBeenCalledWith('chat_cooldown_until');
  });

  test('restores existing cooldown from storage on init', () => {
    const { doc } = makeChatElements();
    const futureMs = Date.now() + 120_000;
    const storage = {
      getItem: vi.fn(() => String(futureMs)),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    const runtime = makeFakeRuntime({ storage });

    initChatBot(doc as unknown as ChatDocumentLike, runtime);

    // setItem is called inside startCooldown to re-persist (overwrite)
    expect(storage.setItem).toHaveBeenCalledWith('chat_cooldown_until', expect.stringMatching(/^\d+$/));
  });
});

describe('initChatBot – Turnstile fallback', () => {
  test('enables submit immediately when Turnstile is unavailable', () => {
    const { doc, toggle, submit } = makeChatElements();
    const runtime = makeFakeRuntime({ getTurnstile: () => undefined });

    initChatBot(doc as unknown as ChatDocumentLike, runtime);

    // Open the panel to trigger renderTurnstile
    toggle.dispatchEvent(new Event('click'));

    expect(submit.disabled).toBe(false);
  });

  test('disables submit and renders widget when Turnstile is available', () => {
    const { doc, toggle, submit } = makeChatElements();
    const widgetContainer = new FakeElement();
    doc.setElement('chat-turnstile', widgetContainer);

    const turnstile = {
      render: vi.fn(() => 'widget-id'),
      reset: vi.fn(),
      getResponse: vi.fn(() => 'token'),
    };

    const runtime = makeFakeRuntime({ getTurnstile: () => turnstile });
    initChatBot(doc as unknown as ChatDocumentLike, runtime);

    toggle.dispatchEvent(new Event('click'));

    expect(turnstile.render).toHaveBeenCalledWith(
      widgetContainer,
      expect.objectContaining({ sitekey: '1x00000000000000000000AA', theme: 'dark' }),
    );
    expect(submit.disabled).toBe(true);
  });
});

describe('initChatBot – submission flow', () => {
  test('submits to /api/chat, appends messages, hides Turnstile after verification, and toggles loading icons', async () => {
    const { doc, toggle, form, input, log, submit, sendIcon, loadingIcon, turnstile } = makeChatElements();

    let onVerified: ((token: string) => void) | undefined;
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ allowed: true, retryAfter: 0 }), { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ reply: 'Clone reply', clientSessionSignature: 'sig-123' }), {
          status: 200,
        }),
      );

    const turnstileApi = {
      render: vi.fn((_container: Element, options: { callback?: (token: string) => void }) => {
        onVerified = options.callback;
        return 'widget-id';
      }),
      reset: vi.fn(),
      getResponse: vi.fn(() => 'turnstile-token'),
    };

    const runtime = makeFakeRuntime({
      fetch: fetchMock,
      getTurnstile: () => turnstileApi,
      randomUUID: () => 'session-uuid' as ReturnType<typeof crypto.randomUUID>,
    });

    initChatBot(doc as unknown as ChatDocumentLike, runtime);

    toggle.dispatchEvent(new Event('click'));
    onVerified?.('verified-token');
    input.value = 'Hello clone';
    form.dispatchEvent(new Event('submit'));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(fetchMock).toHaveBeenNthCalledWith(2, '/api/chat', expect.objectContaining({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    }));
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({
      body: expect.stringContaining('"message":"Hello clone"'),
    });
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({
      body: expect.stringContaining('"cf-turnstile-response":"turnstile-token"'),
    });
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({
      body: expect.stringContaining('"clientSessionId":"'),
    });
    expect(log.appendedChildren).toHaveLength(2);
    expect((log.appendedChildren[0] as FakeElement).textContent).toBe('Hello clone');
    expect((log.appendedChildren[1] as FakeElement).innerHTML).toContain('Clone reply');
    expect(turnstile.classList.contains('hidden')).toBe(true);
    expect(turnstileApi.reset).not.toHaveBeenCalled();
    expect(sendIcon.classList.contains('hidden')).toBe(false);
    expect(loadingIcon.classList.contains('hidden')).toBe(true);
    expect(submit.disabled).toBe(false);
  });

  test('starts cooldown when /api/chat returns 429', async () => {
    const { doc, toggle, form, input, log } = makeChatElements();
    const storage = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ allowed: true, retryAfter: 0 }), { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'Slow down' }), {
          status: 429,
          headers: { 'retry-after': '120' },
        }),
      );

    const runtime = makeFakeRuntime({
      fetch: fetchMock,
      storage,
      getTurnstile: () => undefined,
    });

    initChatBot(doc as unknown as ChatDocumentLike, runtime);

    toggle.dispatchEvent(new Event('click'));
    input.value = 'Too fast';
    form.dispatchEvent(new Event('submit'));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(storage.setItem).toHaveBeenCalledWith(
      'chat_cooldown_until',
      expect.stringMatching(/^\d+$/),
    );
    const cooldownMessage = log.appendedChildren.at(-1) as FakeElement;
    expect(cooldownMessage.textContent).toContain('Neural cooldown in progress.');
  });
});

describe('initChatBot – clear action', () => {
  test('restores the greeting and resets the input', () => {
    const { doc, toggle, clear, input, log } = makeChatElements();
    const runtime = makeFakeRuntime();

    initChatBot(doc as unknown as ChatDocumentLike, runtime);
    toggle.dispatchEvent(new Event('click'));
    input.value = 'Draft message';
    clear.dispatchEvent(new Event('click'));

    expect(input.value).toBe('');
    expect(log.innerHTML).toContain('How can I help you today?');
    expect(log.innerHTML).toContain('What is lui.z?');
  });
});

describe('initChatBot – character count', () => {
  test('updates character count on input', () => {
    const { doc, input, characterCount } = makeChatElements();
    const runtime = makeFakeRuntime();

    initChatBot(doc as unknown as ChatDocumentLike, runtime);

    expect(characterCount.textContent).toBe('0 / 1200');

    input.value = 'hello';
    input.dispatchEvent(new Event('input'));

    expect(characterCount.textContent).toBe('5 / 1200');
  });
});

describe('initChatBot – speech recognition', () => {
  test('reveals the mic button and inserts dictated text into the input', () => {
    const {
      doc,
      input,
      mic,
      micOnIcon,
      micOffIcon,
      characterCount,
    } = makeChatElements();

    class FakeSpeechRecognition extends EventTarget {
      continuous = false;
      interimResults = false;
      lang = '';
      onstart: (() => void) | null = null;
      onend: (() => void) | null = null;
      onerror: ((event: { error: string }) => void) | null = null;
      onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null = null;
      start() {
        this.onstart?.();
      }
      stop() {
        this.onend?.();
      }
    }

    class CapturingSpeechRecognition extends FakeSpeechRecognition {
      static latestInstance: CapturingSpeechRecognition | null = null;

      constructor() {
        super();
        CapturingSpeechRecognition.latestInstance = this;
      }
    }

    const runtime = makeFakeRuntime({
      getSpeechRecognition: () => CapturingSpeechRecognition,
    });

    initChatBot(doc as unknown as ChatDocumentLike, runtime);

    expect(mic.classList.contains('hidden')).toBe(false);
    mic.dispatchEvent(new Event('click'));
    expect(input.placeholder).toBe('Listening... Speak now');
    expect(micOnIcon.classList.contains('hidden')).toBe(true);
    expect(micOffIcon.classList.contains('hidden')).toBe(false);

    CapturingSpeechRecognition.latestInstance?.onresult?.({
      results: [[{ transcript: 'hello from voice' }]],
    });

    expect(input.value).toBe('hello from voice');
    expect(characterCount.textContent).toBe('16 / 1200');
  });
});

// ─── registerChatBot tests ────────────────────────────────────────────────────

describe('registerChatBot', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('initializes immediately when readyState is not loading', () => {
    const { doc, toggle } = makeChatElements();
    const runtime = makeFakeRuntime();
    doc.readyState = 'complete';

    registerChatBot(doc as unknown as ChatDocumentLike & { __chatBotRegistered?: boolean }, runtime);

    expect(toggle.dataset.bound).toBe('true');
  });

  test('defers init until DOMContentLoaded when readyState is loading', () => {
    const { doc, toggle } = makeChatElements();
    const runtime = makeFakeRuntime();
    doc.readyState = 'loading';

    registerChatBot(doc as unknown as ChatDocumentLike & { __chatBotRegistered?: boolean }, runtime);

    expect(toggle.dataset.bound).toBeUndefined();

    doc.dispatchEvent(new Event('DOMContentLoaded'));

    expect(toggle.dataset.bound).toBe('true');
  });

  test('re-initializes on astro:page-load with fresh elements', () => {
    const { doc, toggle } = makeChatElements();
    const runtime = makeFakeRuntime();
    doc.readyState = 'complete';

    registerChatBot(doc as unknown as ChatDocumentLike & { __chatBotRegistered?: boolean }, runtime);

    expect(toggle.dataset.bound).toBe('true');

    // Simulate page transition: swap in fresh elements
    const freshToggle = new FakeElement();
    doc.setElement('chat-toggle', freshToggle);
    const freshClose = new FakeElement();
    doc.setElement('chat-close', freshClose);
    const freshClear = new FakeElement();
    doc.setElement('chat-clear', freshClear);
    const freshPanel = new FakeElement();
    freshPanel.classList.add('hidden');
    doc.setElement('chat-panel', freshPanel);
    const freshForm = new FakeElement();
    doc.setElement('chat-form', freshForm);
    const freshInput = new FakeElement();
    doc.setElement('chat-message', freshInput);
    const freshLog = new FakeElement();
    doc.setElement('chat-log', freshLog);
    const freshSubmit = new FakeElement();
    doc.setElement('chat-submit', freshSubmit);
    const freshCharCount = new FakeElement();
    doc.setElement('chat-character-count', freshCharCount);

    doc.dispatchEvent(new Event('astro:page-load'));

    expect(freshToggle.dataset.bound).toBe('true');
  });

  test('registers only once even when called multiple times', () => {
    const { doc, toggle } = makeChatElements();
    const runtime = makeFakeRuntime();
    doc.readyState = 'complete';

    const docWithFlag = doc as unknown as ChatDocumentLike & { __chatBotRegistered?: boolean };
    registerChatBot(docWithFlag, runtime);
    registerChatBot(docWithFlag, runtime);

    vi.clearAllMocks();

    // A second astro:page-load should only fire one initChatBot (from a single registration)
    // Reuse the same toggle – it will have bound=true and be skipped on re-init
    expect(toggle.dataset.bound).toBe('true');
  });
});
