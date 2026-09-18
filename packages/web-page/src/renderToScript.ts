import { bundler } from "@backtickjs/bundler";
import type { BacktickElement } from "@backtickjs/core";

/**
 * Runs `element` and returns its bundle as the `<script>` the client draws.
 * Every `<` escaped, so a string holding `</script>` can't end the element.
 */
export async function renderToScript(element: BacktickElement): Promise<string> {
  const bundle = await bundler.run(element);
  const json = JSON.stringify(bundle).replaceAll("<", "\\u003c");
  return `<script type="application/json" data-backtick>${json}</script>`;
}
