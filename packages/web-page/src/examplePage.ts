import type { BacktickElement } from "@backtickjs/core";
import { renderToScript } from "./renderToScript.js";

/**
 * A whole page drawing `element`, loading the client from `clientUrl`.
 * Outgrown it? Paste this body into your server and change what you need.
 */
export async function examplePage(
  element: BacktickElement,
  clientUrl: string,
): Promise<string> {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    ${await renderToScript(element, clientUrl)}
  </body>
</html>`;
}
