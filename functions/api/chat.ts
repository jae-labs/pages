import { createChatHandler, type ChatEnv } from '../../src/server/chat/chat';

interface PagesFunctionContext {
  request: Request;
  env: ChatEnv;
}

const handler = createChatHandler();

export const onRequest = ({ request, env }: PagesFunctionContext) => handler(request, env);
