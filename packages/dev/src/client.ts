// The dev channel, which the app starts in development. Nothing of Node, or
// of any platform, so any bundler can take it.
import type { Message } from "./supervisor.js";

/**
 * Calls `reload` whenever `backtick-dev`, at `server`, restarts your server,
 * and logs why your server failed, if it does: `console.error`, which React
 * Native's LogBox shows. For development only:
 *
 *     // React Native
 *     if (__DEV__) startDevChannel(server, () => DevSettings.reload());
 *     // a web page
 *     startDevChannel(location.origin, () => location.reload());
 */
export function startDevChannel(server: string, reload: () => void): void {
  // Once connected, connecting again means `backtick-dev` itself restarted,
  // with server code that may have changed: the app reloads.
  let connected = false;
  let delay = 500;
  const connect = () => {
    const socket = new WebSocket(`${server.replace(/^http/, "ws")}/__backtick`);
    socket.onopen = () => {
      delay = 500;
      if (connected) {
        reload();
      }
      connected = true;
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(String(event.data)) as Message;
      if (message.type === "reload") {
        reload();
      } else if (message.type === "server-error") {
        console.error(`Your Backtick server failed:\n\n${message.message}`);
      }
    };
    socket.onclose = () => {
      setTimeout(connect, delay);
      delay = Math.min(delay * 2, 5000);
    };
  };
  connect();
}
