import { createHandler } from "@backtickjs/web-sdk/server";
import { browserAssets, readAssets } from "@backtickjs/web-sdk/server/node";
import { About, Counter, Home } from "./screens.js";

// The same routes as `node-minimal`, served the way Bun serves: a `Request` in
// and a `Response` out, which is what `createHandler` already is. Node needs
// `serve` from the SDK to translate for `node:http`; here there is nothing to
// translate, and that is the whole difference between the two.
const started = new Date();
const html = "/index.html";

const routes = [
  {
    path: "/",
    html,
    render: () => [{ target: "#root", component: <Home /> }],
  },
  {
    path: "/counter",
    html,
    render: () => [{ target: "#root", component: <Counter /> }],
  },
  {
    path: "/about",
    html,
    render: () => [{ target: "#root", component: <About started={started} /> }],
  },
];

// The other thing `serve` does for Node is assemble this: the client under its
// own prefix, and the app's own directory — its page — under `/`.
const assets = browserAssets();
const options = {
  read: readAssets({
    ...assets,
    modules: {
      ...assets.modules,
      "/": new URL("../public", import.meta.url).pathname,
    },
  }),
};

const server = Bun.serve({
  port: Number(process.env.PORT ?? 5174),
  fetch: createHandler(routes, options),
});

console.log(`Preview on ${server.url}`);
