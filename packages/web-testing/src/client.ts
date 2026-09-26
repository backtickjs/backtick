import type { Bundle, ClientUnknown } from "@backtickjs/core";

/**
 * A bundle's default export: what draws its root. The bundle is imported as a
 * `data:` URL, so its own imports (`solid-js/web`) are the test environment's
 * to resolve, as a page's import map resolves them.
 */
export async function importBundle<T extends ClientUnknown>(
  code: Bundle<T>,
): Promise<() => T> {
  const url = `data:text/javascript,${encodeURIComponent(code)}`;
  return ((await import(url)) as { default: () => T }).default;
}
