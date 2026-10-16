// `node --watch --import ./scripts/reload-expo.mjs server/index.tsx`: once your
// server listens, after each restart `--watch` makes, the apps Expo serves
// reload, as pressing `r` in Expo's terminal does: a `reload` on its message
// socket, which it accepts from this computer. Nothing happens without Expo
// running. Node only: Bun doesn't report a server listening.
import { tracingChannel } from "node:diagnostics_channel";

// Where Expo's dev server answers: React Native's variable for its port.
const metro = `ws://127.0.0.1:${process.env.RCT_METRO_PORT ?? 8081}/message`;

tracingChannel("net.server.listen").subscribe({
  start() {},
  end() {},
  asyncStart() {},
  asyncEnd() {
    const socket = new WebSocket(metro);
    socket.onopen = () => {
      socket.send(JSON.stringify({ version: 2, method: "reload" }));
      socket.close();
    };
    // Expo isn't running: there's no app to reload.
    socket.onerror = () => {};
  },
  error() {},
});
