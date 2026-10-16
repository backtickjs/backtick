// Run by nodemon each time it starts your server: once the server listens,
// the apps Expo serves reload, as pressing `r` in Expo's terminal does: a
// `reload` on its message socket, which it accepts from this computer.
// Nothing happens without Expo running.
import { connect } from "node:net";
import { setTimeout as sleep } from "node:timers/promises";

// Your server's port, and Expo's: React Native's variable for it.
const port = 3000;
const metro = `ws://127.0.0.1:${process.env.RCT_METRO_PORT ?? 8081}/message`;

// A connection, not a request, so the server has nothing to answer or log.
const listening = () =>
  new Promise((resolve) => {
    const socket = connect(port, "localhost");
    socket.on("connect", () => {
      socket.end();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
  });

// Waited for, so the app doesn't fetch from a server still starting; given up
// on when it crashed instead.
for (let tries = 0; tries < 120; tries++) {
  if (await listening()) {
    const socket = new WebSocket(metro);
    socket.onopen = () => {
      socket.send(JSON.stringify({ version: 2, method: "reload" }));
      socket.close();
    };
    // Expo isn't running: there's no app to reload.
    socket.onerror = () => {};
    break;
  }
  await sleep(250);
}
