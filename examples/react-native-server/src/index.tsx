import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

// What the app was built with, and so what a bundle may require: the
// versions in `examples/react-native-app/package.json`.
const external = { react: "19.2.3", "react-native": "0.86.3" };

// This run of the server. The watcher starts a new one for every change, so
// an app that sees a new one has a screen to reload.
const run = crypto.randomUUID();

const server = Bun.serve({
  // On every interface, so a phone on the same network can reach it.
  hostname: "0.0.0.0",
  port: 5179,
  routes: {
    "/home": async () => {
      const bundle = await bundler.build({ input: <Home />, external });
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
