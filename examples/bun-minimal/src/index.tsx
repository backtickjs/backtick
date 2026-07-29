import { createHandler } from "@backtickjs/web-sdk/server";
import { browserAssets, readAssets } from "@backtickjs/web-sdk/server/node";
import { About, Counter, Home } from "./screens.js";

// The same route table as `node-minimal`, served the way Bun serves: a
// `Request` in and a `Response` out, which is what `createHandler` already is.
// Node needs `serve` from the SDK to translate for `node:http`; here there is
// nothing to translate, and that is the whole difference between the two.
const started = new Date();
const assets = browserAssets();

const server = Bun.serve({
  port: Number(process.env.PORT ?? 5174),
  fetch: createHandler(
    {
      "/": () => <Home />,
      "/counter": () => <Counter />,
      "/about": () => <About started={started} />,
    },
    { ...assets, read: readAssets(assets), title: "Backtick — bun-minimal" },
  ),
});

console.log(`Preview on ${server.url}`);
