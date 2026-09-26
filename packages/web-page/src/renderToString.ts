import { bundler, type BundleOptions } from "@backtickjs/bundler";
import type { BacktickElement } from "@backtickjs/core";

/**
 * Runs `element` and returns its bundle, compiled with the adapter's
 * `transform`, as a `<script>`, followed by the client that draws it.
 *
 * The script queues the bundle, with the script itself to say where it
 * stands, on `self.__backtick`. The bundle is behind a function, so nothing in
 * it runs until the client has defined its globals and drains the queue.
 */
export async function renderToString(
  element: BacktickElement,
  clientUrl: string,
  options: BundleOptions,
): Promise<string> {
  const code = await bundler.run(element, options);
  const script = `(self.__backtick ??= []).push([document.currentScript, () => ${code}]);`;
  // The printer escapes every `<` a string holds; this is what would end the
  // element early if it ever did not.
  if (/<\/script|<!--/i.test(script)) {
    throw new Error("a printed bundle would end its `<script>` early");
  }
  // A module, so the client runs after parsing, and once however many bundles
  // the page carries.
  return (
    `<script>${script}</script>` +
    `<script type="module" src="${clientUrl}"></script>`
  );
}
