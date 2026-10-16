// `node --watch --import @backtickjs/dev/reload server/index.tsx`: once your
// server listens, after each restart `--watch` makes, the apps Expo serves
// reload, as pressing `r` in Expo's terminal does. Nothing to change in your
// server, and nothing happens without Expo running.
import { tracingChannel } from "node:diagnostics_channel";

// Where Expo's dev server answers: React Native's variable for its port.
const metro = `ws://127.0.0.1:${process.env.RCT_METRO_PORT ?? 8081}/message`;

tracingChannel("net.server.listen").subscribe({
  start() {},
  end() {},
  asyncStart() {},
  asyncEnd: reloadApps,
  error() {},
});

// Asks Expo to reload the apps it serves: a broadcast on its message socket,
// which it accepts from this computer.
function reloadApps(): void {
  const socket = new WebSocket(metro);
  socket.onopen = () => {
    socket.send(JSON.stringify({ version: 2, method: "reload" }));
    socket.close();
  };
  // Expo isn't running: there's no app to reload.
  socket.onerror = () => {};
}
