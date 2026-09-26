/**
 * Testing Library for Backtick on the web: `render` draws a value into the
 * global document, and every query Testing Library offers reads it —
 * `screen.getByRole`, `within(container)`.
 *
 * A thin layer, as `@testing-library/dom` is: the document comes from the
 * test environment (jsdom through `global-jsdom`, Jest's or Vitest's `jsdom`
 * environment, or a browser), and what runs a bundle is an adapter's client.
 * An adapter binds `render` and `evaluate` to its client with `createTesting`
 * and re-exports the rest — `@backtickjs/solid-js/testing` — so what a test
 * exercises is what a page runs. The `render` and `evaluate` exported here
 * run on `@backtickjs/web-interpreter`, for the tests not yet on an adapter,
 * and go with it.
 *
 * `cleanup` runs after each test where the runner provides a global
 * `afterEach` or `teardown`. Import `@backtickjs/web-testing/pure`, or set
 * `BACKTICK_SKIP_AUTO_CLEANUP`, to register it yourself.
 */
import { cleanup } from "./cleanup.js";

export * from "./pure.js";

const scope = globalThis as {
  afterEach?: (hook: () => void) => void;
  teardown?: (hook: () => void) => void;
  process?: { env?: Record<string, string | undefined> };
};
if (!scope.process?.env?.["BACKTICK_SKIP_AUTO_CLEANUP"]) {
  if (typeof scope.afterEach === "function") {
    scope.afterEach(cleanup);
  } else if (typeof scope.teardown === "function") {
    scope.teardown(cleanup);
  }
}
