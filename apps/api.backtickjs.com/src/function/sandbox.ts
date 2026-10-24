// The function's side: each call writes the app's file into the owner's
// sandbox and asks its server. The first call creates the sandbox from the
// base snapshot and starts the server; each call keeps it another `warm`.
import { createHash, randomUUID } from "node:crypto";
import { Sandbox } from "@vercel/sandbox";
import type { Compiled } from "../../sandbox/src/compile.ts";
import type { Answer } from "../../sandbox/src/screen.ts";
import type { Typechecked } from "../../sandbox/src/typecheck.ts";

// Where `scripts/snapshot.ts` installs the sandbox package (sandbox/).
const app = "/vercel/backtickjs.app";
const warm = 10 * 60 * 1000;
const appTsconfig = `{ "extends": "../../tsconfig.app.json" }`;

// The snapshot the function's sandboxes start from.
export function snapshotId(): string {
  const id = process.env.SNAPSHOT_ID;
  if (id === undefined) {
    throw new Error("Set SNAPSHOT_ID to the id scripts/snapshot.ts printed.");
  }
  return id;
}

export async function typecheckInSandbox(
  user: string,
  source: string,
  snapshotId: string,
): Promise<Typechecked> {
  return postMessageToSandbox<Typechecked>(
    user,
    source,
    snapshotId,
    "typecheck",
    {},
  );
}

// The app's release, compiled, with the versions of the server packages it
// imports, or the errors that keep it from being one.
export async function compileInSandbox(
  user: string,
  source: string,
  snapshotId: string,
): Promise<Compiled> {
  return postMessageToSandbox<Compiled>(
    user,
    source,
    snapshotId,
    "compile",
    {},
  );
}

// The app's answer at `path` for the phone's modules, as its Hono server
// gives it.
export async function screenInSandbox(
  user: string,
  source: string,
  path: string,
  modules: string,
  snapshotId: string,
): Promise<Answer> {
  return postMessageToSandbox<Answer>(user, source, snapshotId, "screen", {
    path,
    modules,
  });
}

// The owner's sandbox started, so the next open doesn't wait for it: the
// phone's home asks for this as it lists the apps.
export async function warmSandbox(
  user: string,
  snapshotId: string,
): Promise<void> {
  await keepWarm(await sandboxOf(user, snapshotId));
}

// One per user and snapshot: after a new snapshot, a user's sandbox from the
// old one is never reused, and times out unasked. Hashed, to keep the name
// short.
export function sandboxName(user: string, snapshotId: string): string {
  return `build-${createHash("sha256").update(`${user}:${snapshotId}`).digest("hex").slice(0, 24)}`;
}

async function sandboxOf(user: string, snapshotId: string): Promise<Sandbox> {
  return Sandbox.getOrCreate({
    name: sandboxName(user, snapshotId),
    source: { type: "snapshot", snapshotId },
    // Nothing in it outlives the server's cache.
    persistent: false,
    resources: { vcpus: 1 },
    timeout: warm,
    networkPolicy: "deny-all",
    onCreate: start,
  });
}

async function postMessageToSandbox<T>(
  user: string,
  source: string,
  snapshotId: string,
  path: string,
  body: object,
): Promise<T> {
  const sandbox = await sandboxOf(user, snapshotId);
  // Written with its folder: `writeFiles` makes the folders it needs. The
  // compiler takes its JSX settings from the nearest tsconfig.json.
  const folder = `${app}/.builds/${randomUUID()}`;
  const file = `${folder}/App.tsx`;
  await sandbox.writeFiles([
    { path: file, content: Buffer.from(source) },
    { path: `${folder}/tsconfig.json`, content: Buffer.from(appTsconfig) },
  ]);
  const request = JSON.stringify({ file, ...body });
  // A server that died is started again, once.
  let answer = await curl(sandbox, path, request);
  if (answer === undefined) {
    await start(sandbox);
    answer = await curl(sandbox, path, request);
  }
  if (answer === undefined) {
    throw new Error("The sandbox's server didn't answer.");
  }
  await keepWarm(sandbox);
  return JSON.parse(answer) as T;
}

// Vercel extends by a second at least; a minute keeps the calls few.
async function keepWarm(sandbox: Sandbox): Promise<void> {
  const left = (sandbox.expiresAt?.getTime() ?? 0) - Date.now();
  if (warm - left >= 60 * 1000) {
    await sandbox.extendTimeout(warm - left);
  }
}

async function start(sandbox: Sandbox): Promise<void> {
  await sandbox.runCommand({
    cmd: "node",
    args: ["--import", "@backtickjs/node-plugin", "src/serve.ts"],
    cwd: app,
    detached: true,
  });
  for (let attempt = 0; attempt < 50; attempt++) {
    const ready = await sandbox.runCommand("curl", [
      "-sf",
      "http://127.0.0.1:3000/ready",
    ]);
    if (ready.exitCode === 0) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error("The sandbox's server didn't start.");
}

// The server's answer, or nothing if it didn't answer.
async function curl(
  sandbox: Sandbox,
  path: string,
  body: string,
): Promise<string | undefined> {
  const answer = await sandbox.runCommand("curl", [
    "-sf",
    "-X",
    "POST",
    "-H",
    "content-type: application/json",
    "--data",
    body,
    `http://127.0.0.1:3000/${path}`,
  ]);
  return answer.exitCode === 0 ? await answer.stdout() : undefined;
}
