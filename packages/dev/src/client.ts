// The dev channel, which the app starts in development. Nothing of Node, or
// of any platform, so any bundler can take it.
import type { AppMessage, Level, SupervisorMessage } from "./supervisor.js";

const levels: readonly Level[] = ["debug", "log", "info", "warn", "error"];

// As many entries as wait for the socket to open: the oldest go first.
const waiting = 1000;

export interface DevChannelOptions {
  // How the app reloads: `DevSettings.reload()` in React Native,
  // `location.reload()` on a web page.
  readonly reload: () => void;
  // What the screen shows, as a PNG, base64: `react-native-view-shot`'s
  // `captureScreen({ format: "png", result: "base64" })` in React Native.
  // Without it, `/__backtick/screenshot` answers that the app takes none.
  readonly screenshot?: () => Promise<string>;
}

export interface DevChannel {
  // Sends an uncaught error to `backtick-dev`, from where the platform
  // reports them: React Native's `ErrorUtils`, a page's `error` event.
  report(error: unknown): void;
  stop(): void;
}

/**
 * Reloads the app whenever `backtick-dev`, at `server`, restarts your
 * server, and logs why your server failed, if it does: `console.error`, which
 * React Native's LogBox shows. The app's console is sent to `backtick-dev`,
 * for `/__backtick/logs`, and so is what `report` is handed. For development
 * only:
 *
 *     const channel = startDevChannel(server, {
 *       reload: () => DevSettings.reload(),
 *       screenshot: () => captureScreen({ format: "png", result: "base64" }),
 *     });
 *     const handler = ErrorUtils.getGlobalHandler();
 *     ErrorUtils.setGlobalHandler((error, fatal) => {
 *       channel.report(error);
 *       handler(error, fatal);
 *     });
 */
export function startDevChannel(
  server: string,
  { reload, screenshot }: DevChannelOptions,
): DevChannel {
  let socket: WebSocket | undefined;
  // What was logged before the socket opened, sent once it does.
  const unsent: AppMessage[] = [];
  const send = (message: AppMessage) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      unsent.push(message);
      unsent.splice(0, unsent.length - waiting);
    }
  };
  const log = (level: Level, args: unknown[]) =>
    send({ type: "log", level, message: args.map(format).join(" ") });

  // The console, as it was, and also sent.
  const original = new Map(levels.map((level) => [level, console[level]]));
  for (const level of levels) {
    console[level] = (...args: unknown[]) => {
      original.get(level)!.apply(console, args);
      log(level, args);
    };
  }
  // Once connected, connecting again means `backtick-dev` itself restarted,
  // with server code that may have changed: the app reloads.
  let connected = false;
  let delay = 500;
  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const connect = () => {
    socket = new WebSocket(`${server.replace(/^http/, "ws")}/__backtick`);
    socket.onopen = () => {
      delay = 500;
      for (const message of unsent.splice(0)) {
        socket!.send(JSON.stringify(message));
      }
      if (connected) {
        reload();
      }
      connected = true;
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(String(event.data)) as SupervisorMessage;
      if (message.type === "reload") {
        reload();
      } else if (message.type === "server-error") {
        console.error(`Your Backtick server failed:\n\n${message.message}`);
      } else if (message.type === "screenshot") {
        const { id } = message;
        if (screenshot === undefined) {
          send({
            type: "screenshot",
            id,
            error:
              "This app takes no screenshots: pass `screenshot` to startDevChannel.",
          });
        } else {
          screenshot().then(
            (png) => send({ type: "screenshot", id, png }),
            (error: unknown) =>
              send({ type: "screenshot", id, error: format(error) }),
          );
        }
      }
    };
    socket.onclose = () => {
      if (!stopped) {
        timer = setTimeout(connect, delay);
        delay = Math.min(delay * 2, 5000);
      }
    };
  };
  connect();

  return {
    report: (error) => log("error", ["Uncaught:", error]),
    stop() {
      stopped = true;
      clearTimeout(timer);
      socket?.close();
      for (const level of levels) {
        console[level] = original.get(level)!;
      }
    },
  };
}

// A console argument as text: an error with its stack, the rest as JSON
// where it can be.
function format(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  if (value instanceof Error) {
    return value.stack ?? `${value.name}: ${value.message}`;
  }
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}
