import type { Bundle } from "./Bundle.js";
import { execRoot } from "./cjs.js";
import { type ModuleMap, modulesOf } from "./modulesOf.js";

export interface RuntimeOptions {
  // the modules a bundle may require
  readonly moduleMap: ModuleMap;
  // each package's installed version
  readonly installedPackages: Readonly<Record<string, string>>;
  // sends requests; the global `fetch` by default. Swap it to add auth
  // headers, or to call a server's `app.fetch` directly.
  readonly fetch?: (request: Request) => Response | Promise<Response>;
}

/**
 * Runs an app's bundles. Made by `createRuntime`; it may gain members, and
 * its methods don't use `this`.
 */
export interface Runtime {
  /** Runs `bundle` and returns its value. */
  exec<T>(bundle: Bundle<T>): Promise<Awaited<T>>;
  /**
   * Fetches the bundle at `url` and runs it. `init` is fetch's. The runtime
   * sets `x-backtick-modules` itself.
   */
  fetch(url: string | URL, init?: RequestInit): Promise<unknown>;
}

/**
 * A fetch that got no bundle. `code` is the server's error name (as
 * `ClientVersionMismatch`) or `NotABundle`. `response` is missing when the
 * server couldn't be reached, and is never read.
 */
export class BundleFetchError extends Error {
  override readonly name = "BundleFetchError";
  readonly response: Response | undefined;
  readonly code: string | undefined;

  constructor(
    message: string,
    options?: ErrorOptions & { response?: Response; code?: string },
  ) {
    super(message, options);
    this.response = options?.response;
    this.code = options?.code;
  }
}

/** `instanceof BundleFetchError`, but across copies of this package. */
export function isBundleFetchError(error: unknown): error is BundleFetchError {
  return error instanceof Error && error.name === "BundleFetchError";
}

/**
 * A runtime for an app's bundles. Its bundles share one cache, so a value a
 * script makes once is made once per runtime. Throws if a module's package
 * has no version.
 *
 *     const runtime = createRuntime({ moduleMap, installedPackages });
 *     const screen = await runtime.fetch(`${server}/`);
 */
export function createRuntime(options: RuntimeOptions): Runtime {
  const { moduleMap } = options;
  const cache = new Map<string, unknown>();
  const modules = modulesOf(moduleMap, options.installedPackages);
  const transport = options.fetch ?? ((request) => globalThis.fetch(request));
  const exec = <T>(bundle: Bundle<T>) => execRoot(bundle, moduleMap, cache);

  return {
    exec,
    async fetch(url, init) {
      const request = new Request(url, init);
      request.headers.set("x-backtick-modules", JSON.stringify(modules));
      const response = await send(request, transport);

      // A bundle runs whatever its status, e.g. a 404 page.
      const type = response.headers.get("content-type")?.toLowerCase() ?? "";
      if (type.startsWith("text/javascript")) {
        const bundle = await readText(request, response);
        throwIfAborted(request.signal);
        return exec(bundle as Bundle<unknown>);
      }
      if (!response.ok) {
        throw await refusal(request, response);
      }
      throw notABundle(request, response, type);
    },
  };
}

async function send(
  request: Request,
  transport: NonNullable<RuntimeOptions["fetch"]>,
): Promise<Response> {
  try {
    return await transport(request);
  } catch (cause) {
    throw failedOnTheWay(request, cause);
  }
}

// A body that fails mid-download is a server failure too.
async function readText(request: Request, response: Response): Promise<string> {
  try {
    return await response.text();
  } catch (cause) {
    throw failedOnTheWay(request, cause);
  }
}

// Refusals are JSON { name, message }; anything else is the message as is.
// Read from a clone so `response` stays unread.
async function refusal(
  request: Request,
  response: Response,
): Promise<BundleFetchError> {
  const body = await readText(request, response.clone());
  const { name, message } = parseJSON(body);
  return new BundleFetchError(
    `${request.url} answered ${response.status}: ${typeof message === "string" ? message : body}`,
    { response, code: typeof name === "string" ? name : undefined },
  );
}

function notABundle(
  request: Request,
  response: Response,
  type: string,
): BundleFetchError {
  return new BundleFetchError(
    `${request.url} answered ${type || "no content type"}, not a bundle: is it a Backtick route?`,
    { response, code: "NotABundle" },
  );
}

// A failed send or read is a server failure, unless the caller aborted.
function failedOnTheWay(request: Request, cause: unknown): unknown {
  if (request.signal.aborted) {
    return cause;
  }
  const message = cause instanceof Error ? cause.message : String(cause);
  return new BundleFetchError(
    `${request.url} couldn't be reached: ${message}`,
    { cause },
  );
}

function parseJSON(text: string): { name?: unknown; message?: unknown } {
  try {
    // `null` parses too
    return (JSON.parse(text) ?? {}) as { name?: unknown; message?: unknown };
  } catch {
    return {};
  }
}

// Some React Native polyfills lack `signal.throwIfAborted` and `reason`.
function throwIfAborted(signal: AbortSignal): void {
  if (signal.aborted) {
    throw (
      signal.reason ??
      Object.assign(new Error("The request was aborted."), {
        name: "AbortError",
      })
    );
  }
}
