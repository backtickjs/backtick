import {
  type Bundle,
  createRuntime,
  type ModuleMap,
  modulesOf,
  type Runtime,
} from "@backtickjs/core";
import { queryOptions } from "@tanstack/react-query";

/** How a `BacktickClient` reaches the server and what it tells it. */
export interface BacktickClientOptions {
  // what hrefs resolve against, as "https://api.example.com"
  origin: string;
  // what an answer may require, as the app imports it: this package among
  // them, so a script in an answer reaches the client with
  // `useBacktickClient()`
  moduleMap: ModuleMap & {
    readonly "@backtickjs/react-query": typeof import("./index.js");
  };
  // the version of each package the app is built with, by name
  installedPackages: Readonly<Record<string, string>>;
  // how a request is sent: `fetch` by default; any transport that answers a
  // `Request` with a `Response` can stand in
  fetch?: (request: Request) => Promise<Response>;
}

/**
 * A request that brought back no answer: the server couldn't be reached (no
 * `response`), refused (its `name` is the server's, as
 * `ClientVersionMismatch`), or sent something other than a bundle
 * (`NotABundle`).
 */
export class BacktickError extends Error {
  constructor(
    message: string,
    readonly response?: Response,
    options?: ErrorOptions & { name?: string },
  ) {
    super(message, options);
    this.name = options?.name ?? "BacktickError";
  }
}

/** The client an app makes once, and hands to `<BacktickProvider>`. */
export class BacktickClient {
  readonly #origin: string;
  // what runs every answer, with the app's modules and one cache
  readonly #runtime: Runtime;
  // the modules the app offers, at their versions, as the server reads them
  readonly #modules: string;
  readonly #fetch: (request: Request) => Promise<Response>;

  constructor(options: BacktickClientOptions) {
    this.#origin = options.origin;
    this.#runtime = createRuntime(options.moduleMap);
    this.#fetch = options.fetch ?? ((request) => fetch(request));
    this.#modules = JSON.stringify(
      modulesOf(options.moduleMap, options.installedPackages),
    );
  }

  /** What the server renders at `href`, fetched and run. */
  async fetch(href: string, init?: RequestInit): Promise<unknown> {
    const request = new Request(new URL(href, this.#origin), init);
    request.headers.set("x-backtick-modules", this.#modules);
    let response: Response;
    try {
      response = await this.#fetch(request);
    } catch (cause) {
      if (request.signal.aborted) {
        throw cause;
      }
      throw new BacktickError(`${request.url} couldn't be reached`, undefined, {
        cause,
      });
    }
    if (!response.ok) {
      const body = await response.text();
      let refusal: { name?: string; message?: string } = {};
      try {
        refusal = JSON.parse(body) as typeof refusal;
      } catch {
        // not JSON: the body is the message
      }
      throw new BacktickError(
        `${request.url} answered ${response.status}: ${refusal.message ?? body}`,
        response,
        { name: refusal.name },
      );
    }
    const type = response.headers.get("content-type") ?? "";
    if (!type.startsWith("text/javascript")) {
      throw new BacktickError(
        `${request.url} answered ${type || "no content type"}, not a bundle: is it a Backtick route?`,
        response,
        { name: "NotABundle" },
      );
    }
    const bundle = (await response.text()) as Bundle<unknown>;
    return this.#runtime.exec(bundle);
  }

  /**
   * The query for `href`'s answer, as `<Backtick>` runs it: for
   * `useQuery`, `prefetchQuery`, `invalidateQueries` and the like.
   */
  queryOptions(href: string) {
    const url = new URL(href, this.#origin).href;
    return queryOptions({
      queryKey: ["backtick", url] as const,
      queryFn: ({ signal }) => this.fetch(url, { signal }),
      // Always the latest copy, whatever the app's defaults; suspending
      // keeps an answer at least 1 s.
      staleTime: 0,
      gcTime: 0,
      // Coming back to the app doesn't swap the screen under the user.
      refetchOnWindowFocus: false,
      // Only the network and the server's own failures can pass: a refusal,
      // or an answer that throws, fails the same way every time.
      retry: (failures, error) =>
        failures < 3 &&
        error instanceof BacktickError &&
        (error.response === undefined || error.response.status >= 500),
    });
  }
}
