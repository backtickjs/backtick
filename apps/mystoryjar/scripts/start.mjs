// Starts the Firebase emulators, with the seed's account and stories, then
// your Backtick server, then Expo, all in this terminal: Expo keeps its keys
// and QR code, and nodemon restarts the server whenever a file under
// `server/` changes. Development never reaches the real Firebase project.
// Arguments are Expo's, as `npm run ios` passes `--ios`.
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

// Node 24 or later: Node 23's module hooks, which the Backtick loader uses,
// break packages such as firebase-admin's auth and pdfkit.
if (!process.versions.bun && Number(process.versions.node.split(".")[0]) < 24) {
  console.error(
    `MyStoryJar needs Node 24 or later, and this is Node ${process.versions.node}: nvm install 24`,
  );
  process.exit(1);
}

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
// What this run starts, stopped together however it ends, so a failed or
// interrupted start leaves nothing behind holding a port.
const started = [];
const stop = (code) => {
  for (const child of started) child.kill();
  process.exit(code);
};
process.on("SIGINT", () => stop(130));
process.on("SIGTERM", () => stop(143));
const start = (...args) => {
  const child = spawn(...args);
  started.push(child);
  return child;
};

// Each port free first: another run's emulators answering here would be
// mistaken for this run's.
const answers = (host) =>
  fetch(`http://${host}/`)
    .then(() => true)
    .catch(() => false);
const hosts = [
  env.FIRESTORE_EMULATOR_HOST,
  env.FIREBASE_AUTH_EMULATOR_HOST,
  env.FIREBASE_STORAGE_EMULATOR_HOST,
];
for (const host of [...hosts, "127.0.0.1:3000"]) {
  if (await answers(host)) {
    console.error(
      `Something already answers at ${host}: is another \`npm start\` running?`,
    );
    process.exit(1);
  }
}

const emulators = start(
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
    stop(code);
  }
});
// Up once each emulator answers.
while (!(await Promise.all(hosts.map(answers))).every(Boolean)) {
  await sleep(500);
}
const seeded = await new Promise((resolve) =>
  start(runtime, [...loader, "server/dev/seed.ts"], {
    stdio: "inherit",
    env,
  }).on("exit", resolve),
);
if (seeded !== 0) {
  stop(1);
}
console.log("Firebase emulators on http://localhost:4000");

// Restarted by nodemon, which also reloads the app once it's back: see
// `nodemonConfig` in package.json.
start(
  npx,
  ["nodemon", "--exec", [runtime, ...loader, "server/index.tsx"].join(" ")],
  {
    stdio: "inherit",
    env,
    shell: process.platform === "win32",
  },
);
const expo = start(npx, ["expo", "start", ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

expo.on("exit", (code) => stop(code ?? 0));
