// The app's root layout, its `/_layout` route, which the runtime is sent
// around: what the route renders, asked of the app in-process, rather than
// its bundle.
import type { Context, Hono } from "hono";

// The requests backtick() makes in-process, and what each route rendered.
const captures = new WeakMap<Request, { input?: unknown }>();

/**
 * For a request backtick() makes in-process: keeps what the route renders,
 * rather than bundling it.
 */
export function capture(
  context: Context,
  input: unknown,
): Response | undefined {
  const sink = captures.get(context.req.raw);
  if (sink === undefined) {
    return undefined;
  }
  sink.input = input;
  return context.body(null);
}

/**
 * A nested route's input, or undefined without one. Any answer but a 404 or
 * a 200 is an error.
 */
export async function nested(
  app: Hono<any, any, any>,
  context: Context,
  path: string,
): Promise<unknown> {
  const request = new Request(new URL(path, context.req.url), {
    headers: context.req.raw.headers,
  });
  const sink: { input?: unknown } = {};
  captures.set(request, sink);
  const response = await app.request(request, undefined, context.env);
  if (response.status !== 200 && response.status !== 404) {
    throw new Error(`The app's ${path} answered ${response.status}.`);
  }
  return response.status === 404 ? undefined : sink.input;
}
