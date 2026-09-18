import { bundler } from "@backtickjs/bundler";
import type { BacktickElement } from "@backtickjs/core";

/**
 * A whole page drawing `element`, loading the client from `clientUrl`.
 * Outgrown it? Paste this body into your server and change what you need.
 */
export async function examplePage(
  element: BacktickElement,
  clientUrl: string,
): Promise<string> {
  const json = bundler.stringify(await bundler.run(element));
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script defer src="${clientUrl}"></script>
  </head>
  <body>
    <script type="application/json" data-backtick>${json}</script>
  </body>
</html>`;
}
