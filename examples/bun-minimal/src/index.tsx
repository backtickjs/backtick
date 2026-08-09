import { createHandler, page } from "@backtickjs/web-sdk/server";
import { readAssets } from "@backtickjs/web-sdk/server/node";
import { About, Counter, Home } from "./screens.js";

// The same routes as `node-minimal`, served the way Bun serves: a `Request` in
// and a `Response` out, which is what `createHandler` already is. Node needs
// `serve` from the SDK to translate for `node:http`; here there is nothing to
// translate, and that is the whole difference between the two.
const started = new Date();

const routes = [
  { path: "/", respond: () => page(<Home />) },
  { path: "/counter", respond: () => page(<Counter />) },
  { path: "/about", respond: () => page(<About started={started} />) },
];

const server = Bun.serve({
  port: Number(process.env.PORT ?? 5174),
  // The one thing left to serve is the client, which is what this reads by
  // default — the app itself has no files.
  fetch: createHandler(routes, { read: readAssets() }),
});

console.log(`Preview on ${server.url}`);
