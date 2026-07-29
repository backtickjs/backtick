import { createHandler } from "@backtickjs/web-sdk/server";
import { browserAssets, readAssets } from "@backtickjs/web-sdk/server/node";
import App from "./app.js";

// Bun serves the handler as it is: a `Request` in, a `Response` out, which is
// what `createHandler` already is. Node needs `serve` from the same SDK to
// translate for `node:http`; here there is nothing to translate.
const assets = browserAssets();

const server = Bun.serve({
  port: Number(process.env.PORT ?? 5174),
  fetch: createHandler(<App />, {
    ...assets,
    read: readAssets(assets),
    title: "Backtick — bun-minimal",
  }),
});

console.log(`Preview on ${server.url}`);
