import * as client from "@backtickjs.com/client/bundle";
import * as compiler from "@backtickjs.com/compiler/bundle";
import * as sandbox from "@backtickjs.com/sandbox/bundle";
import { Home } from "./pages/Home.js";
import { bundler } from "@backtickjs/bundler";
import { embed } from "@backtickjs/html-embed";

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

const template = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="content-security-policy" content="default-src 'self'">
    <meta name="color-scheme" content="light dark">
    <script 
      defer
      src="${clientUrl}"
      data-compiler="${compilerUrl}"
      data-sandbox="${sandboxUrl}">
    </script>
  </head>
  <body></body>
</html>`;

export const routes: Readonly<Record<string, () => Promise<string>>> = {
  "/": async () => {
    const bundle = await bundler.run(<Home />);
    return embed(template, "body", bundle);
  },

  [clientUrl]: async () => client.source,

  [compilerUrl]: async () => compiler.source,

  [sandboxUrl]: async () => sandboxDocument,

  "/CNAME": async () => "backtickjs.com\n",

  "/.nojekyll": async () => "",
};
