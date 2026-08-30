import { sha256, source } from "@backtickjs.com/client/bundle";
import { Home } from "./pages/Home.js";
import { bundler } from "@backtickjs/core";
import { insert } from "@backtickjs/web-sdk";

export const client = `client-${sha256.slice(0, 16)}.js`;

const template = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="content-security-policy" content="default-src 'self'">
    <meta name="color-scheme" content="light dark">
    <script defer src="/${client}"></script>
  </head>
  <body></body>
</html>`;

export const routes: Readonly<Record<string, () => Promise<string>>> = {
  "/": async () => {
    const bundle = await bundler.run(<Home />);
    return insert(template, "body", bundle);
  },

  [`/${client}`]: async () => source,

  "/CNAME": async () => "backtickjs.com\n",

  "/.nojekyll": async () => "",
};
