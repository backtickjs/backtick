import * as client from "@backtickjs.com/client/bundle";
import * as compiler from "@backtickjs.com/compiler/bundle";
import { Home } from "./pages/Home.js";
import { bundler } from "@backtickjs/core";
import { insert } from "@backtickjs/web-sdk";

const clientUrl = `/client-${client.sha256.slice(0, 16)}.js`;

const compilerUrl = `/compiler-${compiler.sha256.slice(0, 16)}.js`;

const template = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="content-security-policy" content="default-src 'self'">
    <meta name="color-scheme" content="light dark">
    <script defer src="${clientUrl}" data-compiler="${compilerUrl}"></script>
  </head>
  <body></body>
</html>`;

export const routes: Readonly<Record<string, () => Promise<string>>> = {
  "/": async () => {
    const bundle = await bundler.run(<Home />);
    return insert(template, "body", bundle);
  },

  [clientUrl]: async () => client.source,

  [compilerUrl]: async () => compiler.source,

  "/CNAME": async () => "backtickjs.com\n",

  "/.nojekyll": async () => "",
};
