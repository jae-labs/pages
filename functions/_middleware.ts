import * as Sentry from "@sentry/cloudflare";

interface Env {
  PUBLIC_SENTRY_DSN?: string;
  SENTRY_DSN?: string;
  CLOUDFLARE_PAGES_ENV?: string;
}

export const onRequest = Sentry.sentryPagesPlugin<Env>((context) => {
  const dsn = context.env.PUBLIC_SENTRY_DSN || context.env.SENTRY_DSN;
  const isProd = context.env.CLOUDFLARE_PAGES_ENV === 'production';
  return {
    dsn,
    tracesSampleRate: isProd ? 0.1 : 1.0,
  };
});
