/**
 * Testing Library for Backtick on the web: `render` draws a value into the
 * global document, and every query Testing Library offers reads it —
 * `screen.getByRole`, `within(container)`.
 *
 * A thin layer, as `@testing-library/react` is: the document comes from the
 * test environment (jsdom through `global-jsdom`, Jest's or Vitest's `jsdom`
 * environment, or a browser), and the interpreter is
 * `@backtickjs/web-interpreter`'s own, so what a test exercises is what a page
 * runs.
 *
 * `cleanup` runs after each test where the runner provides a global
 * `afterEach` or `teardown`. Import `@backtickjs/web-testing/pure`, or set
 * `BACKTICK_SKIP_AUTO_CLEANUP`, to register it yourself.
 *
 * Reactive only where Solid resolves to its browser build, which is what
 * `--conditions=browser` asks Node for.
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
