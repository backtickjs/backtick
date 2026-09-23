import { bundler, printBundle } from "@backtickjs/bundler";
import type { BacktickElement } from "@backtickjs/core";

/**
 * Runs `element` and returns its bundle as a `<script>`, followed by the client
 * that draws it.
 *
 * The script queues the bundle, with the globals it reads and the script
 * itself to say where it stands, on `self.__backtick`. The expression is behind
 * a function, so nothing in it runs until the client has put those globals in
 * place and drains the queue.
 */
export async function renderToString(
  element: BacktickElement,
  clientUrl: string,
): Promise<string> {
  const { code, globals } = printBundle(await bundler.run(element));
  const names = JSON.stringify(globals).replaceAll("<", "\\u003c");
  const script = `(self.__backtick ??= []).push([document.currentScript, ${names}, () => ${code}]);`;
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
