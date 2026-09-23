import * as client from "@backtickjs.com/client/bundle";
import * as compiler from "@backtickjs.com/compiler/bundle";
import * as sandbox from "@backtickjs.com/sandbox/bundle";
import { Home } from "./pages/Home.js";
import type { BacktickElement } from "@backtickjs/core";
import { renderToString } from "@backtickjs/web-page/server";

const clientUrl = `/client-${client.sha256.slice(0, 16)}.js`;
const compilerUrl = `/compiler-${compiler.sha256.slice(0, 16)}.js`;
const sandboxUrl = `/sandbox-${sandbox.sha256.slice(0, 16)}.html`;

const sandboxDocument = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="content-security-policy" content="default-src 'none'; script-src 'sha256-${Buffer.from(sandbox.sha256, "hex").toString("base64")}' 'unsafe-eval'">
    <script>${sandbox.source}</script>
  </head>
  <body></body>
</html>`;

// Runs an element here on the server. What comes back is a bundle: data, not
// HTML, which the client draws in front of the script that carries it.
async function toHtml(element: BacktickElement): Promise<string> {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <meta name="compiler" content="${compilerUrl}">
    <meta name="sandbox" content="${sandboxUrl}">
  </head>
  <body>
    ${await renderToString(element, clientUrl)}
  </body>
</html>`;
}

export const routes: Readonly<Record<string, () => Promise<string>>> = {
  "/": () => toHtml(<Home />),

  [clientUrl]: async () => client.source,

  [compilerUrl]: async () => compiler.source,

  [sandboxUrl]: async () => sandboxDocument,

  "/CNAME": async () => "backtickjs.com\n",

  "/.nojekyll": async () => "",
};
