import {
  createRuntime,
  isBundleFetchError,
  type ModuleMap,
  type Runtime,
  type RuntimeOptions,
} from "@backtickjs/core";
import { queryOptions } from "@tanstack/react-query";

/** How a `BacktickClient` reaches the server and what it tells it. */
export interface BacktickClientOptions extends RuntimeOptions {
  // what hrefs resolve against, as "https://api.example.com"
  readonly origin: string;
  // what an answer may require, as the app imports it: this package among
  // them, so a script in an answer reaches the client with
  // `useBacktickClient()`
  readonly moduleMap: ModuleMap & {
    readonly "@backtickjs/react-query": typeof import("./index.js");
  };
}

/** The client an app makes once, and hands to `<BacktickProvider>`. */
export class BacktickClient {
  readonly #origin: string;
  // what fetches and runs every answer, with the app's modules and one cache
  readonly #runtime: Runtime;

  constructor(options: BacktickClientOptions) {
    this.#origin = options.origin;
    this.#runtime = createRuntime(options);
  }

  /** What the server renders at `href`, fetched and run. */
  fetch(href: string, init?: RequestInit): Promise<unknown> {
    return this.#runtime.fetch(new URL(href, this.#origin), init);
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
        isBundleFetchError(error) &&
        (error.response === undefined || error.response.status >= 500),
    });
  }
}
