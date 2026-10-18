/**
 * Reloads the apps Expo serves, as pressing `r` in its terminal does: a
 * `reload` on its message socket, which it accepts from this computer. Call
 * it once the server listens, so a restart after a save shows its screens.
 * Without Expo running, it does nothing.
 *
 *     serve({ fetch: app.fetch, port: 3000 }, () => reloadExpo());
 */
export function reloadExpo(
  port = Number(process.env.RCT_METRO_PORT ?? 8081),
): void {
  const socket = new WebSocket(`ws://127.0.0.1:${port}/message`);
  socket.onopen = () => {
    socket.send(JSON.stringify({ version: 2, method: "reload" }));
    socket.close();
  };
  // Expo isn't running: there's no app to reload.
  socket.onerror = () => {};
}
