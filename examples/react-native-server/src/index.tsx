import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

// This run of the server. The watcher starts a new one for every change, so
// an app that sees a new one has a screen to reload.
const run = crypto.randomUUID();

const server = Bun.serve({
  // On every interface, so a phone on the same network can reach it.
  hostname: "0.0.0.0",
  port: 5179,
  routes: {
    "/home": async (request) => {
      // What the requesting app was built with, as it says, and so what its
      // bundle may require.
      const packageVersions = JSON.parse(
        request.headers.get("backtick-package-versions")!,
      );
      const bundle = await bundler.build({ input: <Home />, packageVersions });
      const { code } = bundle.generate({ format: "cjs" });
      return new Response(code, {
        headers: {
          "content-type": "text/javascript",
          "cache-control": "no-store",
        },
      });
    },
    // In development, where the app hears which run it is talking to.
    "/live": (request, server) =>
      server.upgrade(request)
        ? undefined
        : new Response("Expected a WebSocket.", { status: 426 }),
  },
  websocket: {
    open: (socket) => {
      socket.send(run);
    },
    message: () => {},
  },
});

console.log(`Serving screens on port ${server.port}`);
