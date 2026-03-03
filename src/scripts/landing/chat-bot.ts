import posthog from 'posthog-js';

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface TurnstileOptions {
  sitekey: string;
  theme?: 'light' | 'dark' | 'auto';
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
  'timeout-callback'?: () => void;
}

interface TurnstileLike {
  render: (container: Element, options: TurnstileOptions) => string;
  reset: (widgetId: string | null) => void;
  getResponse: (widgetId: string | null) => string;
}

interface ChatStorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

interface ChatClassListLike {
  add: (...tokens: string[]) => void;
  remove: (...tokens: string[]) => void;
  toggle: (token: string, force?: boolean) => boolean | void;
  contains: (token: string) => boolean;
}

interface ChatElementBase extends EventTarget {
  dataset: Record<string, string | undefined>;
  classList: ChatClassListLike;
}

interface ChatButtonLike extends ChatElementBase {
  disabled: boolean;
  setAttribute: (name: string, value: string) => void;
  querySelector: (selector: string) => { classList: Pick<ChatClassListLike, 'add' | 'remove' | 'toggle'> } | null;
}

interface ChatFormLike extends EventTarget {
  requestSubmit: () => void;
  addEventListener: EventTarget['addEventListener'];
}

interface ChatInputLike extends ChatElementBase {
  value: string;
  maxLength: number;
  disabled: boolean;
  placeholder: string;
  focus: () => void;
  selectionStart: number | null;
  selectionEnd: number | null;
  setSelectionRange: (start: number, end: number) => void;
}

interface ChatCreatedElementLike {
  className: string;
  textContent: string | null;
  innerHTML: string;
  isConnected: boolean;
  remove: () => void;
  appendChild: (child: ChatCreatedElementLike) => void;
}

interface ChatLogLike extends ChatElementBase {
  innerHTML: string;
  appendChild: (child: ChatCreatedElementLike) => void;
  querySelector: (selector: string) => { remove: () => void } | null;
  scrollTop: number;
  scrollHeight: number;
}

interface ChatCountLike extends EventTarget {
  textContent: string | null;
}

interface ChatBodyLike {
  classList: Pick<ChatClassListLike, 'toggle' | 'remove'>;
}

interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onerror: ((event: any) => void) | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onresult: ((event: any) => void) | null;
}

interface SpeechRecognitionConstructorLike {
  new(): SpeechRecognitionLike;
}

type ChatVisibilityState = 'visible' | 'hidden' | 'prerender';

export interface ChatDocumentLike {
  readyState: DocumentReadyState;
  addEventListener: Document['addEventListener'];
  getElementById: (id: string) => unknown;
  createElement: (tagName: string) => ChatCreatedElementLike;
  body: ChatBodyLike;
  visibilityState?: ChatVisibilityState;
}

export interface ChatBotRuntime {
  capture: (event: string, properties?: Record<string, unknown>) => void;
  isConsentAccepted: () => boolean;
  storage: ChatStorageLike;
  getTurnstile: () => TurnstileLike | undefined;
  turnstileSiteKey: string;
  fetch: typeof globalThis.fetch;
  getInnerWidth: () => number;
  randomUUID: () => string;
  getSpeechRecognition: () => SpeechRecognitionConstructorLike | undefined;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CHAT_BOT_REGISTERED_FLAG = '__chatBotRegistered';
const COOLDOWN_KEY = 'chat_cooldown_until';

// ─── Pure utilities ───────────────────────────────────────────────────────────

export const formatCooldown = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
};

export const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const parseMarkdown = (markdown: string): string => {
  let html = escapeHtml(markdown);

  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-white/10 px-1 py-0.5 rounded text-xs font-mono text-neon-cyan">$1</code>',
  );
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em class="italic">$1</em>');
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:underline hover:text-neon-cyan/80 transition duration-300">$1</a>',
  );

  const lines = html.split('\n');
  let inList = false;
  const processedLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const listMatch = trimmed.match(/^[-*•]\s+(.*)$/);

    if (listMatch) {
      if (!inList) {
        inList = true;
        processedLines.push('<ul class="list-disc pl-5 my-1.5 space-y-1">');
      }
      processedLines.push(`<li>${listMatch[1]}</li>`);
    } else {
      if (inList) {
        inList = false;
        processedLines.push('</ul>');
      }
      if (trimmed === '') {
        processedLines.push('<div class="h-2"></div>');
      } else {
        processedLines.push(`<p>${trimmed}</p>`);
      }
    }
  }

  if (inList) processedLines.push('</ul>');

  return processedLines.join('\n');
};

// ─── Type guards ──────────────────────────────────────────────────────────────

const hasChatBase = (v: unknown): v is ChatElementBase =>
  !!v &&
  typeof v === 'object' &&
  'dataset' in v &&
  typeof (v as Record<string, unknown>).addEventListener === 'function';

const isChatButton = (v: unknown): v is ChatButtonLike =>
  hasChatBase(v) &&
  'disabled' in v &&
  typeof (v as Record<string, unknown>).setAttribute === 'function';

const isChatForm = (v: unknown): v is ChatFormLike =>
  !!v &&
  typeof v === 'object' &&
  typeof (v as Record<string, unknown>).addEventListener === 'function' &&
  typeof (v as Record<string, unknown>).requestSubmit === 'function';

const isChatInput = (v: unknown): v is ChatInputLike =>
  hasChatBase(v) && 'value' in v && 'maxLength' in v && typeof (v as Record<string, unknown>).focus === 'function';

const isChatLog = (v: unknown): v is ChatLogLike =>
  hasChatBase(v) && 'innerHTML' in v && typeof (v as Record<string, unknown>).appendChild === 'function';

const isChatCount = (v: unknown): v is ChatCountLike =>
  !!v && typeof v === 'object' && 'textContent' in v;

// ─── Default runtime ──────────────────────────────────────────────────────────

const defaultChatBotRuntime: ChatBotRuntime = {
  capture: (event, properties) => {
    posthog.capture(event, properties);
  },
  isConsentAccepted: () => typeof localStorage !== 'undefined' && localStorage.getItem('cookie-consent') === 'accepted',
  storage: typeof localStorage !== 'undefined' ? localStorage : {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  },
  getTurnstile: () => (window as Window & { turnstile?: TurnstileLike }).turnstile,
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
  fetch: (...args: Parameters<typeof globalThis.fetch>) => globalThis.fetch(...args),
  getInnerWidth: () => window.innerWidth,
  randomUUID: () => crypto.randomUUID(),
  getSpeechRecognition: (): SpeechRecognitionConstructorLike | undefined => {
    // @ts-expect-error - webkitSpeechRecognition is the legacy webkit prefix
    return (window.SpeechRecognition || window.webkitSpeechRecognition) as
      | SpeechRecognitionConstructorLike
      | undefined;
  },
};

// ─── Consent-gated capture helper ────────────────────────────────────────────

const captureIfConsented = (
  runtime: ChatBotRuntime,
  event: string,
  properties?: Record<string, unknown>,
) => {
  if (!runtime.isConsentAccepted()) return;
  try {
    runtime.capture(event, properties);
  } catch {
    // Ignore analytics capture failures silently
  }
};

// ─── Main init ────────────────────────────────────────────────────────────────

export const initChatBot = (
  doc: ChatDocumentLike = document,
  runtime: ChatBotRuntime = defaultChatBotRuntime,
): void => {
  const toggle = doc.getElementById('chat-toggle');
  const close = doc.getElementById('chat-close');
  const clear = doc.getElementById('chat-clear');
  const panel = doc.getElementById('chat-panel');
  const form = doc.getElementById('chat-form');
  const input = doc.getElementById('chat-message');
  const log = doc.getElementById('chat-log');
  const submit = doc.getElementById('chat-submit');
  const characterCount = doc.getElementById('chat-character-count');

  if (
    !isChatButton(toggle) ||
    !isChatButton(close) ||
    !isChatButton(clear) ||
    !hasChatBase(panel) ||
    !isChatForm(form) ||
    !isChatInput(input) ||
    !isChatLog(log) ||
    !isChatButton(submit) ||
    !isChatCount(characterCount)
  )
    return;

  if (toggle.dataset.bound === 'true') return;

  const maxLength = Number(input.maxLength);

  const updateCharacterCount = () => {
    characterCount.textContent = `${input.value.length} / ${maxLength}`;
  };

  let turnstileWidgetId: string | null = null;
  let isTurnstileVerified = false;
  let clientSessionId: string | null = null;
  let clientSessionSignature: string | null = null;
  let rateLimitUntil = 0;
  let rateLimitTimer: ReturnType<typeof setInterval> | null = null;
  let cooldownEl: (ChatCreatedElementLike & { isConnected: boolean }) | null = null;
  let isCheckingRateLimit = false;

  const setLoading = (loading: boolean) => {
    submit.dataset.loading = loading ? 'true' : '';
    const isBlocked = rateLimitUntil > Date.now() || isCheckingRateLimit;
    submit.disabled = loading || isBlocked || !isTurnstileVerified;
    input.disabled = loading || isBlocked;
    submit.querySelector('.chat-send-icon')?.classList.toggle('hidden', loading);
    submit.querySelector('.chat-loading-icon')?.classList.toggle('hidden', !loading);
  };

  const startCooldown = (seconds: number) => {
    rateLimitUntil = Date.now() + seconds * 1_000;
    try {
      runtime.storage.setItem(COOLDOWN_KEY, String(rateLimitUntil));
    } catch {
      // Ignore storage errors gracefully
    }
    if (rateLimitTimer) clearInterval(rateLimitTimer);

    if (!cooldownEl || !cooldownEl.isConnected) {
      cooldownEl = doc.createElement('p') as ChatCreatedElementLike & { isConnected: boolean };
      cooldownEl.className =
        'max-w-[85%] rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm leading-relaxed text-[#ff6666]';
      log.appendChild(cooldownEl);
    }
    log.scrollTop = log.scrollHeight;
    setLoading(false);

    const tick = () => {
      const left = Math.max(0, Math.round((rateLimitUntil - Date.now()) / 1_000));
      if (left <= 0) {
        if (rateLimitTimer) clearInterval(rateLimitTimer);
        rateLimitTimer = null;
        rateLimitUntil = 0;
        try {
          runtime.storage.removeItem(COOLDOWN_KEY);
        } catch {
          // Ignore storage errors gracefully
        }
        if (cooldownEl && cooldownEl.isConnected) {
          cooldownEl.textContent = 'Cooldown complete. The clone is ready for more questions.';
        }
        setLoading(false);
        return;
      }
      if (cooldownEl && cooldownEl.isConnected) {
        cooldownEl.textContent = `Neural cooldown in progress. Resume in ${formatCooldown(left)}.`;
      }
    };

    tick();
    rateLimitTimer = setInterval(tick, 1_000);
  };

  const restoreCooldown = () => {
    try {
      const cached = runtime.storage.getItem(COOLDOWN_KEY);
      if (cached) {
        const expiration = Number(cached);
        if (!isNaN(expiration) && expiration > Date.now()) {
          const secondsLeft = Math.round((expiration - Date.now()) / 1000);
          if (secondsLeft > 0) startCooldown(secondsLeft);
        } else {
          runtime.storage.removeItem(COOLDOWN_KEY);
        }
      }
    } catch {
      // Ignore storage errors gracefully
    }
  };

  const probeRateLimit = async () => {
    if (rateLimitUntil > Date.now()) return;

    isCheckingRateLimit = true;
    setLoading(false);

    try {
      const res = await runtime.fetch('/api/chat');
      if (!res.ok) return;
      const { allowed, retryAfter } = (await res.json()) as {
        allowed: boolean;
        retryAfter: number;
      };
      if (!allowed && retryAfter > 0) {
        startCooldown(retryAfter);
      } else {
        try {
          runtime.storage.removeItem(COOLDOWN_KEY);
        } catch {
          // Ignore storage errors gracefully
        }
        rateLimitUntil = 0;
        if (rateLimitTimer) {
          clearInterval(rateLimitTimer);
          rateLimitTimer = null;
        }
        if (cooldownEl && cooldownEl.isConnected) cooldownEl.remove();
        cooldownEl = null;
      }
    } catch {
      // Silently ignore probe failures
    } finally {
      isCheckingRateLimit = false;
      setLoading(false);
    }
  };

  const getContainerWithClassList = (id: string) => {
    const el = doc.getElementById(id);
    if (el && typeof (el as Record<string, unknown>).classList === 'object') {
      return el as { classList: ChatClassListLike };
    }
    return null;
  };

  const renderTurnstile = () => {
    const container = getContainerWithClassList('chat-turnstile');

    if (clientSessionSignature !== null) {
      isTurnstileVerified = true;
      container?.classList.add('hidden');
      if (!submit.dataset.loading) submit.disabled = false;
      return;
    }

    container?.classList.remove('hidden');

    const turnstile = runtime.getTurnstile();
    if (!turnstile) {
      isTurnstileVerified = true;
      submit.disabled = false;
      return;
    }

    if (container && turnstileWidgetId === null) {
      try {
        submit.disabled = true;
        isTurnstileVerified = false;
        turnstileWidgetId = turnstile.render(container as unknown as Element, {
          sitekey: runtime.turnstileSiteKey,
          theme: 'dark',
          callback: () => {
            isTurnstileVerified = true;
            if (!submit.dataset.loading) submit.disabled = false;
          },
          'expired-callback': () => {
            isTurnstileVerified = false;
            submit.disabled = true;
          },
          'error-callback': () => {
            isTurnstileVerified = false;
            submit.disabled = true;
          },
          'timeout-callback': () => {
            isTurnstileVerified = false;
            submit.disabled = true;
          },
        });
      } catch {
        isTurnstileVerified = true;
        submit.disabled = false;
      }
    }
  };

  const appendMessage = (text: string, speaker: 'user' | 'clone') => {
    const message = doc.createElement('div');
    message.className =
      speaker === 'user'
        ? 'ml-auto max-w-[85%] rounded-lg border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-2 text-sm leading-relaxed text-white'
        : 'max-w-[85%] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm leading-relaxed text-[#e0e0e0]';
    if (speaker === 'user') {
      message.textContent = text;
    } else {
      message.innerHTML = parseMarkdown(text);
    }
    log.appendChild(message);
    log.scrollTop = log.scrollHeight;
  };

  const resetGreeting = () => {
    log.innerHTML = `
      <div class="flex-1 min-h-0" id="chat-spacer"></div>
      <div class="flex flex-col gap-2 chat-greeting-group">
        <p class="max-w-[85%] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm leading-relaxed text-[#e0e0e0]">
          How can I help you today?
        </p>
        <div class="flex flex-col gap-2 items-start pl-2 mt-1">
          <span class="text-[10px] uppercase tracking-[0.16em] text-[#777] font-semibold">Try asking:</span>
          <button type="button" class="chat-suggest-btn text-xs px-3 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan transition duration-300 hover:bg-neon-cyan hover:text-black active:scale-95 text-left">What is lui.z?</button>
          <button type="button" class="chat-suggest-btn text-xs px-3 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan transition duration-300 hover:bg-neon-cyan hover:text-black active:scale-95 text-left">Any session or usage limits?</button>
          <button type="button" class="chat-suggest-btn text-xs px-3 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan transition duration-300 hover:bg-neon-cyan hover:text-black active:scale-95 text-left">Does lui.z make mistakes?</button>
        </div>
      </div>
    `;
  };

  const resetTurnstile = () => {
    const turnstile = runtime.getTurnstile();
    if (turnstile && turnstileWidgetId !== null) {
      try {
        isTurnstileVerified = false;
        turnstile.reset(turnstileWidgetId);
      } catch {
        isTurnstileVerified = true;
      }
    }
  };

  const submitMessage = async (messageText: string) => {
    if (!isTurnstileVerified || submit.disabled) return;

    const suggestionContainer = log.querySelector('.chat-greeting-group div');
    if (suggestionContainer) suggestionContainer.remove();

    let turnstileToken: string | undefined;
    const turnstile = runtime.getTurnstile();
    if (clientSessionSignature === null && turnstile && turnstileWidgetId !== null) {
      turnstileToken = turnstile.getResponse(turnstileWidgetId);
    }

    captureIfConsented(runtime, 'chatbot_message_sent', { message_length: messageText.length });

    appendMessage(messageText, 'user');
    input.value = '';
    updateCharacterCount();
    setLoading(true);

    try {
      const response = await runtime.fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          'cf-turnstile-response': turnstileToken,
          clientSessionId,
          clientSessionSignature,
        }),
      });

      const body = (await response.json()) as {
        reply?: string;
        error?: string;
        clientSessionSignature?: string;
      };

      if (response.ok && body.reply) {
        if (body.clientSessionSignature) {
          clientSessionSignature = body.clientSessionSignature;
          getContainerWithClassList('chat-turnstile')?.classList.add('hidden');
        }
        captureIfConsented(runtime, 'chatbot_response_received', {
          reply_length: body.reply.length,
        });
        appendMessage(body.reply, 'clone');
      } else {
        captureIfConsented(runtime, 'chatbot_error_encountered', {
          error: body.error ?? 'Response not ok',
        });

        if (response.status === 429) {
          const retryAfter = response.headers.get('retry-after');
          const seconds = retryAfter ? parseInt(retryAfter, 10) : 600;
          startCooldown(seconds);
        } else {
          appendMessage(body.error ?? 'The clone is temporarily unavailable.', 'clone');
        }

        if (
          response.status === 400 &&
          (body.error?.includes('verification') || body.error?.includes('Security'))
        ) {
          clientSessionId = null;
          clientSessionSignature = null;
          resetTurnstile();
          renderTurnstile();
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network exception';
      captureIfConsented(runtime, 'chatbot_error_encountered', { error: errorMessage });
      appendMessage('The clone is temporarily unavailable.', 'clone');
    } finally {
      if (clientSessionSignature === null) resetTurnstile();
      setLoading(false);
      input.focus();
    }
  };

  const adjustChatPanelForVisualViewport = () => {
    if (typeof window === 'undefined') return;
    const panelEl = panel as unknown as HTMLElement;
    if (!panelEl || panelEl.classList.contains('hidden')) return;

    if (window.innerWidth < 640 && window.visualViewport) {
      const vv = window.visualViewport;
      if (panelEl.style) {
        panelEl.style.height = `${vv.height}px`;
        panelEl.style.top = `${vv.offsetTop}px`;
      }
      
      const logEl = log as unknown as HTMLElement;
      if (logEl) {
        logEl.scrollTop = logEl.scrollHeight;
      }
    } else {
      if (panelEl.style) {
        panelEl.style.height = '';
        panelEl.style.top = '';
      }
    }
  };

  const setOpen = (open: boolean) => {
    const panelEl = panel as unknown as HTMLElement;
    panelEl.classList.toggle('hidden', !open);

    if (runtime.getInnerWidth() < 640) {
      doc.body.classList.toggle('overflow-hidden', open);
    } else {
      doc.body.classList.remove('overflow-hidden');
    }

    toggle.setAttribute('aria-expanded', String(open));

    if (open) {
      input.focus();
      captureIfConsented(runtime, 'chatbot_opened');
      if (clientSessionId === null) {
        clientSessionId = `${Date.now()}:${runtime.randomUUID()}`;
      }
      renderTurnstile();
      adjustChatPanelForVisualViewport();
    } else {
      captureIfConsented(runtime, 'chatbot_closed');
      if (panelEl.style) {
        panelEl.style.height = '';
        panelEl.style.top = '';
      }
    }
  };

  // ── Event binding ─────────────────────────────────────────────────────────

  toggle.addEventListener('click', () => setOpen(panel.classList.contains('hidden')));
  close.addEventListener('click', () => setOpen(false));

  clear.addEventListener('click', () => {
    resetGreeting();
    const wasRateLimited = rateLimitUntil > Date.now();
    const secondsLeft = wasRateLimited ? Math.round((rateLimitUntil - Date.now()) / 1000) : 0;

    if (wasRateLimited && secondsLeft > 0) {
      cooldownEl = null;
      startCooldown(secondsLeft);
    } else {
      cooldownEl = null;
      if (rateLimitTimer) {
        clearInterval(rateLimitTimer);
        rateLimitTimer = null;
      }
      rateLimitUntil = 0;
      try {
        runtime.storage.removeItem(COOLDOWN_KEY);
      } catch {
        // Ignore storage errors gracefully
      }
    }
    input.value = '';
    updateCharacterCount();
    captureIfConsented(runtime, 'chatbot_history_cleared');
    clientSessionId = null;
    clientSessionSignature = null;
    resetTurnstile();
    renderTurnstile();
  });

  input.addEventListener('input', updateCharacterCount);

  input.addEventListener('keydown', (event: Event) => {
    const ke = event as KeyboardEvent;
    if (ke.key !== 'Enter' || ke.shiftKey) return;
    ke.preventDefault();
    if (isTurnstileVerified) form.requestSubmit();
  });

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const message = input.value.trim();
    if (message) submitMessage(message);
  });

  log.addEventListener('click', (event: Event) => {
    const target = event.target;
    if (target && typeof target === 'object' && 'classList' in target) {
      const el = target as {
        classList: { contains: (c: string) => boolean };
        textContent?: string | null;
      };
      if (el.classList.contains('chat-suggest-btn')) {
        const questionText = el.textContent?.trim();
        if (questionText) submitMessage(questionText);
      }
    }
  });

  // ── Speech recognition ───────────────────────────────────────────────────

  const SpeechRecognition = runtime.getSpeechRecognition();
  const micBtnRaw = doc.getElementById('chat-mic');
  const micBtn = hasChatBase(micBtnRaw)
    ? (micBtnRaw as ChatElementBase & {
        querySelector: (s: string) => { classList: ChatClassListLike } | null;
      })
    : null;

  if (SpeechRecognition && micBtn) {
    micBtn.classList.remove('hidden');

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    let isListening = false;
    const micOnIcon = micBtn.querySelector('.chat-mic-on-icon');
    const micOffIcon = micBtn.querySelector('.chat-mic-off-icon');

    const stopListening = () => {
      isListening = false;
      try {
        recognition.stop();
      } catch {
        // Ignore already-stopped errors
      }
      micBtn.classList.remove(
        'animate-pulse',
        'border-[#12eaff]',
        'bg-[#12eaff]/10',
        'text-[#12eaff]',
        'shadow-[0_0_15px_rgba(18,234,255,0.4)]',
      );
      micOnIcon?.classList.remove('hidden');
      micOffIcon?.classList.add('hidden');
      input.placeholder = 'Ask a question about lui.z';
    };

    recognition.onstart = () => {
      isListening = true;
      micBtn.classList.add(
        'animate-pulse',
        'border-[#12eaff]',
        'bg-[#12eaff]/10',
        'text-[#12eaff]',
        'shadow-[0_0_15px_rgba(18,234,255,0.4)]',
      );
      micOnIcon?.classList.add('hidden');
      micOffIcon?.classList.remove('hidden');
      input.placeholder = 'Listening... Speak now';
      captureIfConsented(runtime, 'chatbot_mic_started');
    };

    recognition.onend = () => {
      stopListening();
    };

    recognition.onerror = (event: { error: string }) => {
      stopListening();
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        // Non-trivial speech recognition errors are ignored silently
      }
    };

    recognition.onresult = (event: {
      results: ArrayLike<ArrayLike<{ transcript: string }>>;
    }) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? input.value.length;
        const text = input.value;
        const before = text.substring(0, start);
        const after = text.substring(end);
        const spacing = before.endsWith(' ') || before === '' ? '' : ' ';
        input.value = before + spacing + transcript + after;
        const newCursorPos = start + spacing.length + transcript.length;
        input.setSelectionRange(newCursorPos, newCursorPos);
        input.focus();
        updateCharacterCount();
      }
    };

    micBtn.addEventListener('click', () => {
      if (isListening) {
        stopListening();
      } else {
        try {
          recognition.start();
        } catch {
          // Ignore duplicate start requests
        }
      }
    });
  }

  // ── Initial setup ─────────────────────────────────────────────────────────

  toggle.dataset.bound = 'true';
  updateCharacterCount();
  restoreCooldown();
  probeRateLimit();

  doc.addEventListener('visibilitychange', () => {
    if (doc.visibilityState === 'visible') probeRateLimit();
  });

  // ── Visual Viewport event listeners and cleanup ───────────────────────────
  if (typeof window !== 'undefined') {
    type ChatbotWindow = Window & typeof globalThis & {
      __cleanupChatbotVisualViewport?: () => void;
    };
    const cbWindow = window as ChatbotWindow;

    if (typeof cbWindow.__cleanupChatbotVisualViewport === 'function') {
      cbWindow.__cleanupChatbotVisualViewport();
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', adjustChatPanelForVisualViewport);
      window.visualViewport.addEventListener('scroll', adjustChatPanelForVisualViewport);

      cbWindow.__cleanupChatbotVisualViewport = () => {
        window.visualViewport?.removeEventListener('resize', adjustChatPanelForVisualViewport);
        window.visualViewport?.removeEventListener('scroll', adjustChatPanelForVisualViewport);
      };
    }
  }
};

// ─── Registration ─────────────────────────────────────────────────────────────

export const registerChatBot = (
  doc: ChatDocumentLike & { [CHAT_BOT_REGISTERED_FLAG]?: boolean } = document,
  runtime: ChatBotRuntime = defaultChatBotRuntime,
): void => {
  if (doc[CHAT_BOT_REGISTERED_FLAG]) return;
  doc[CHAT_BOT_REGISTERED_FLAG] = true;

  if (doc.readyState !== 'loading') {
    initChatBot(doc, runtime);
  } else {
    doc.addEventListener('DOMContentLoaded', () => initChatBot(doc, runtime), { once: true });
  }

  doc.addEventListener('astro:page-load', () => initChatBot(doc, runtime));
};

if (typeof document !== 'undefined') {
  registerChatBot();
}
