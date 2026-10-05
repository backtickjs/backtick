// Starts your Backtick server, then Expo, both in this terminal: Expo keeps
// its keys and QR code, and the server restarts whenever a file under
// `server/` changes. Arguments are Expo's, as `npm run ios` passes `--ios`.
import { spawn } from "node:child_process";

const server = spawn(
  process.execPath,
  [
    "--watch",
    "--enable-source-maps",
    "--import",
    "@backtickjs/node-plugin",
    "server/index.tsx",
  ],
  { stdio: "inherit" },
);

const expo = spawn("npx", ["expo", "start", ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

expo.on("exit", (code) => {
  server.kill();
  process.exit(code ?? 0);
});
