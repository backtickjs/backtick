// The function's side: each call writes the app's file into the owner's
// sandbox and asks its server. The first call creates the sandbox from the
// base snapshot and starts the server; each call keeps it another `warm`.
import { createHash, randomUUID } from "node:crypto";
import { Sandbox } from "@vercel/sandbox";
import type { Typechecked } from "../../sandbox/src/typecheck.ts";

// Where `scripts/snapshot.ts` installs the sandbox package (sandbox/).
const app = "/vercel/backtickjs.app";
const warm = 10 * 60 * 1000;
// A check takes 1–11 s, a new sandbox about 7 s more: past this, the sandbox
// is taken as stuck.
const patience = 30 * 1000;
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

type Checked = Typechecked & {
  compiled?: string;
  packages?: Record<string, string>;
};

// What a save checks, in the owner's sandbox: the typecheck's errors and
// warnings, and, if there are no errors, the app's release and the packages,
// at their versions, it was built with.
export async function checkInSandbox(
  user: string,
  source: string,
  snapshotId: string,
): Promise<Checked> {
  return postMessageToSandbox<Checked>(user, source, snapshotId, "check", {});
}

// One per user and snapshot: after a new snapshot, a user's sandbox from the
// old one is never reused, and times out unasked. Hashed, to keep the name
// short.
export function sandboxName(user: string, snapshotId: string): string {
  return `build-${createHash("sha256").update(`${user}:${snapshotId}`).digest("hex").slice(0, 24)}`;
}

async function sandboxOf(
  user: string,
  snapshotId: string,
  signal: AbortSignal,
): Promise<Sandbox> {
  return Sandbox.getOrCreate({
    name: sandboxName(user, snapshotId),
    source: { type: "snapshot", snapshotId },
    // Nothing in it outlives the server's cache.
    persistent: false,
    resources: { vcpus: 1 },
    timeout: warm,
    networkPolicy: "deny-all",
    onCreate: (sandbox) => start(sandbox, signal),
    signal,
  });
}

// A sandbox stuck past `patience` is stopped and asked once more: the next
// use resumes it in a new session. One slow call, not a failed one.
async function postMessageToSandbox<T>(
  user: string,
  source: string,
  snapshotId: string,
  path: string,
  body: object,
): Promise<T> {
  try {
    return await ask<T>(user, source, snapshotId, path, body);
  } catch (error) {
    if (!(error instanceof Stuck)) {
      throw error;
    }
    console.error(`${error.message} Stopping it and asking again.`);
    await Sandbox.get({ name: sandboxName(user, snapshotId) })
      .then((stuck) => stuck.stop())
      .catch(() => {});
    return await ask<T>(user, source, snapshotId, path, body);
  }
}

class Stuck extends Error {}

async function ask<T>(
  user: string,
  source: string,
  snapshotId: string,
  path: string,
  body: object,
): Promise<T> {
  const signal = AbortSignal.timeout(patience);
  try {
    return await askWithin<T>(user, source, snapshotId, path, body, signal);
  } catch (error) {
    throw signal.aborted
      ? new Stuck(`The sandbox didn't answer within ${patience / 1000} s.`)
      : error;
  }
}

async function askWithin<T>(
  user: string,
  source: string,
  snapshotId: string,
  path: string,
  body: object,
  signal: AbortSignal,
): Promise<T> {
  const sandbox = await sandboxOf(user, snapshotId, signal);
  // Written with its folder: `writeFiles` makes the folders it needs. The
  // compiler takes its JSX settings from the nearest tsconfig.json.
  const folder = `${app}/.builds/${randomUUID()}`;
  const file = `${folder}/App.tsx`;
  await sandbox.writeFiles(
    [
      { path: file, content: Buffer.from(source) },
      { path: `${folder}/tsconfig.json`, content: Buffer.from(appTsconfig) },
    ],
    { signal },
  );
  const request = JSON.stringify({ file, ...body });
  // A server that died is started again, once.
  let answer = await curl(sandbox, path, request, signal);
  if (answer === undefined) {
    await start(sandbox, signal);
    answer = await curl(sandbox, path, request, signal);
  }
  if (answer === undefined) {
    throw new Error("The sandbox's server didn't answer.");
  }
  await keepWarm(sandbox);
  return JSON.parse(answer) as T;
}

// Vercel extends by a second at least; a minute keeps the calls few. Only
// for the next call's speed, so it never fails this one: a sandbox at Vercel's
// longest lifetime can't be extended, and stops; the next call gets a new one.
async function keepWarm(sandbox: Sandbox): Promise<void> {
  const left = (sandbox.expiresAt?.getTime() ?? 0) - Date.now();
  if (warm - left >= 60 * 1000) {
    await sandbox
      .extendTimeout(warm - left)
      .catch((error) =>
        console.error("Keeping the sandbox warm failed:", error),
      );
  }
}

async function start(sandbox: Sandbox, signal: AbortSignal): Promise<void> {
  await sandbox.runCommand({
    cmd: "node",
    args: ["--import", "@backtickjs/node-plugin", "src/serve.ts"],
    cwd: app,
    detached: true,
    signal,
  });
  for (let attempt = 0; attempt < 50; attempt++) {
    const ready = await sandbox.runCommand({
      cmd: "curl",
      args: ["-sf", "http://127.0.0.1:3000/ready"],
      signal,
    });
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
  signal: AbortSignal,
): Promise<string | undefined> {
  const answer = await sandbox.runCommand({
    cmd: "curl",
    args: [
      "-sf",
      "-X",
      "POST",
      "-H",
      "content-type: application/json",
      "--data",
      body,
      `http://127.0.0.1:3000/${path}`,
    ],
    signal,
  });
  return answer.exitCode === 0 ? await answer.stdout() : undefined;
}
