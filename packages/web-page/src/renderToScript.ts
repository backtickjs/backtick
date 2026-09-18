import { bundler } from "@backtickjs/bundler";
import type { BacktickElement } from "@backtickjs/core";

/**
 * Runs `element` and returns its bundle as a `<script>`, followed by the client
 * that draws it.
 */
export async function renderToScript(
  element: BacktickElement,
  clientUrl: string,
): Promise<string> {
  const bundle = await bundler.run(element);
  // Every `<` escaped, so a string holding `</script>` can't end the element.
  const json = JSON.stringify(bundle).replaceAll("<", "\\u003c");
  // A module, so the client runs after parsing, and once however many bundles
  // the page carries.
  return (
    `<script type="application/json" data-backtick>${json}</script>` +
    `<script type="module" src="${clientUrl}"></script>`
  );
}
