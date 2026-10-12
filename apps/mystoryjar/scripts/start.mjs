// Starts the Firebase emulators, with the seed's account and stories, then
// your Backtick server, then Expo, all in this terminal: Expo keeps its keys
// and QR code, and the server restarts whenever a file under `server/`
// changes. Development never reaches the real Firebase project. Arguments are
// Expo's, as `npm run ios` passes `--ios`.
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { networkInterfaces } from "node:os";
import { setTimeout as sleep } from "node:timers/promises";

// The runtime is the one package.json has a Backtick loader for: Bun's, or
// else Node's.
const { dependencies } = JSON.parse(readFileSync("package.json", "utf8"));
const [runtime, ...loader] =
  "@backtickjs/bun-plugin" in dependencies
    ? ["bun", "--preload", "@backtickjs/bun-plugin"]
    : ["node", "--enable-source-maps", "--import", "@backtickjs/node-plugin"];

// `bunx` where Bun runs this script, as it does where Node isn't installed.
const npx = process.versions.bun ? "bunx" : "npx";

// Where the server and the seed find the emulators, as Firebase's SDKs read
// it. The Firestore emulator runs on Java.
const env = {
  ...process.env,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  FIRESTORE_EMULATOR_HOST: "127.0.0.1:8080",
  FIREBASE_AUTH_EMULATOR_HOST: "127.0.0.1:9099",
  FIREBASE_STORAGE_EMULATOR_HOST: "127.0.0.1:9199",
};
const emulators = spawn(
  npx,
  [
    "firebase-tools",
    "emulators:start",
    "--project",
    "demo-mystoryjar",
    "--only",
    "auth,firestore,storage",
  ],
  {
    stdio: ["ignore", "pipe", "inherit"],
    shell: process.platform === "win32",
  },
);
// What they say, kept quiet unless they stop: Firestore's needs Java.
let said = "";
emulators.stdout.on("data", (chunk) => (said += chunk));
emulators.on("exit", (code) => {
  if (code) {
    console.error(`${said}\nThe Firebase emulators stopped.`);
    process.exit(code);
  }
});
// Up once each emulator answers.
const answers = (host) =>
  fetch(`http://${host}/`)
    .then(() => true)
    .catch(() => false);
const hosts = [
  env.FIRESTORE_EMULATOR_HOST,
  env.FIREBASE_AUTH_EMULATOR_HOST,
  env.FIREBASE_STORAGE_EMULATOR_HOST,
];
while (!(await Promise.all(hosts.map(answers))).every(Boolean)) {
  await sleep(500);
}
await new Promise((resolve) =>
  spawn(runtime, [...loader, "server/dev/seed.ts"], {
    stdio: "inherit",
    env,
  }).on("exit", resolve),
);
console.log("Firebase emulators on http://localhost:4000");

const server = spawn(runtime, ["--watch", ...loader, "server/index.tsx"], {
  stdio: "inherit",
  env,
});
const expo = spawn(npx, ["expo", "start", ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

expo.on("exit", (code) => {
  server.kill();
  emulators.kill();
  process.exit(code ?? 0);
});

// Expo shows how to open the app, its QR code, only in an interactive
// terminal. Run elsewhere, as an agent runs it, this prints the address once
// Metro is up.
if (!process.stdout.isTTY) {
  const args = process.argv.slice(2);
  const flag = args.findIndex((arg) => arg === "--port" || arg === "-p");
  const port = flag === -1 ? 8081 : Number(args[flag + 1]);
  const address = Object.values(networkInterfaces())
    .flat()
    .find(
      (network) => network?.family === "IPv4" && !network.internal,
    )?.address;
  while (address !== undefined && expo.exitCode === null) {
    const status = await fetch(`http://localhost:${port}/status`)
      .then((response) => response.text())
      .catch(() => "");
    if (status === "packager-status:running") {
      console.log(`\nOpen exp://${address}:${port} in Expo Go.\n`);
      break;
    }
    await sleep(500);
  }
}
