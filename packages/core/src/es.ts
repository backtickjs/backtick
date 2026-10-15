import type { Bundle } from "./Bundle.js";

/**
 * Executes an ES bundle a web page starts from, the one nothing else runs, to
 * its value: imported from a `data:` URL, the page's import map answering its
 * imports, and those of the bundles it runs in turn with `exec`. Apart from
 * `@backtickjs/core/cjs`, so a React Native app never reads its `import()`:
 * Metro rejects one of anything but a string literal, and Hermes has none.
 *
 *     const screen = await execRoot(bundle);
 */
export async function execRoot<T>(bundle: Bundle<T>): Promise<Awaited<T>> {
  const module = (await import(
    "data:text/javascript," + encodeURIComponent(bundle)
  )) as { default: Awaited<T> };
  return module.default;
}
