// Every container `render` drew into, and what takes its drawing down.
export const mounted = new Map<Element, () => void>();

// The app globals a test defined, which the next test must not find.
export const defined = new Set<string>();

/**
 * Takes down everything `render` drew, and removes each container that sits
 * directly in the body, as Testing Library's `cleanup` does, and the globals
 * a test passed. Call it after
 * each test; `@backtickjs/web-testing` registers it already where the runner
 * provides a global `afterEach` or `teardown`.
 */
export function cleanup(): void {
  for (const [container, unmount] of mounted) {
    unmount();
    if (container.parentNode === document.body) {
      container.remove();
    }
  }
  mounted.clear();
  for (const name of defined) {
    delete (globalThis as { [name: string]: unknown })[name];
  }
  defined.clear();
}
