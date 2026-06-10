import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const chatBotComponent = readFileSync(
  resolve(process.cwd(), 'src', 'components', 'landing', 'ChatBot.astro'),
  'utf8',
);

describe('ChatBot component contract', () => {
  test('loads the focused chat-bot client module through a dedicated bootstrap script', () => {
    expect(chatBotComponent).toContain(`<script>
  import '../../scripts/landing/chat-bot';
</script>`);
  });

  test('preserves the Cloudflare Turnstile script loader', () => {
    expect(chatBotComponent).toContain(
      'src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"',
    );
    expect(chatBotComponent).toContain('is:inline');
  });

  test('preserves required element ids for the client module', () => {
    expect(chatBotComponent).toContain('id="chat-toggle"');
    expect(chatBotComponent).toContain('id="chat-close"');
    expect(chatBotComponent).toContain('id="chat-clear"');
    expect(chatBotComponent).toContain('id="chat-panel"');
    expect(chatBotComponent).toContain('id="chat-form"');
    expect(chatBotComponent).toContain('id="chat-message"');
    expect(chatBotComponent).toContain('id="chat-log"');
    expect(chatBotComponent).toContain('id="chat-submit"');
    expect(chatBotComponent).toContain('id="chat-character-count"');
    expect(chatBotComponent).toContain('id="chat-turnstile"');
    expect(chatBotComponent).toContain('id="chat-mic"');
  });

  test('preserves the disclaimer copy', () => {
    expect(chatBotComponent).toContain('I am not the biological lui.z');
    expect(chatBotComponent).toContain('limited artificial clone');
    expect(chatBotComponent).toContain('Do not share secrets');
  });

  test('preserves the greeting and suggested prompts', () => {
    expect(chatBotComponent).toContain('How can I help you today?');
    expect(chatBotComponent).toContain('chat-suggest-btn');
    expect(chatBotComponent).toContain('What is lui.z?');
    expect(chatBotComponent).toContain('Any session or usage limits?');
    expect(chatBotComponent).toContain('Does lui.z make mistakes?');
  });

  test('preserves accessibility attributes', () => {
    expect(chatBotComponent).toContain('aria-expanded="false"');
    expect(chatBotComponent).toContain('aria-controls="chat-panel"');
    expect(chatBotComponent).toContain('aria-live="polite"');
    expect(chatBotComponent).toContain('aria-label="Open lui.z clone chat"');
    expect(chatBotComponent).toContain('aria-label="Close lui.z clone chat"');
    expect(chatBotComponent).toContain('aria-label="Send message"');
  });

  test('preserves voice input icon class markers', () => {
    expect(chatBotComponent).toContain('class="chat-mic-on-icon"');
    expect(chatBotComponent).toContain('class="chat-mic-off-icon hidden"');
  });
});
