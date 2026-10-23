// The function's side: each call writes the app's file into the owner's
// sandbox and asks its server. The first call creates the sandbox from the
// base snapshot and starts the server; each call keeps it another `warm`.
import { createHash, randomUUID } from "node:crypto";
import { Sandbox } from "@vercel/sandbox";
import type { Typechecked } from "../sandbox/typecheck.ts";

// Where `scripts/snapshot.ts` installs this package.
const app = "/vercel/backtickjs.app";
const warm = 10 * 60 * 1000;

// The snapshot the function's sandboxes start from.
export function snapshotId(): string {
  const id = process.env.SNAPSHOT_ID;
  if (id === undefined) {
    throw new Error("Set SNAPSHOT_ID to the id scripts/snapshot.ts printed.");
  }
  return id;
}

export type Bundled =
  | { ok: true; code: string; map: string }
  | { ok: false; name: string; message: string };

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

export async function bundleInSandbox(
  user: string,
  source: string,
  modules: Record<string, string>,
  snapshotId: string,
): Promise<Bundled> {
  return postMessageToSandbox<Bundled>(user, source, snapshotId, "bundle", {
    modules,
  });
}

async function postMessageToSandbox<T>(
  user: string,
  source: string,
  snapshotId: string,
  path: string,
  body: object,
): Promise<T> {
  const sandbox = await Sandbox.getOrCreate({
    // One per user and snapshot: after a new snapshot, a user's sandbox from
    // the old one is never reused, and times out unasked. Hashed, to keep the
    // name short.
    name: `build-${createHash("sha256").update(`${user}:${snapshotId}`).digest("hex").slice(0, 24)}`,
    source: { type: "snapshot", snapshotId },
    // Nothing in it outlives the server's cache.
    persistent: false,
    resources: { vcpus: 1 },
    timeout: warm,
    networkPolicy: "deny-all",
    onCreate: start,
  });
  // Written with its folder: `writeFiles` makes the folders it needs.
  const file = `${app}/.builds/${randomUUID()}/App.tsx`;
  await sandbox.writeFiles([{ path: file, content: Buffer.from(source) }]);
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
  // Vercel extends by a second at least; a minute keeps the calls few.
  const left = (sandbox.expiresAt?.getTime() ?? 0) - Date.now();
  if (warm - left >= 60 * 1000) {
    await sandbox.extendTimeout(warm - left);
  }
  return JSON.parse(answer) as T;
}

async function start(sandbox: Sandbox): Promise<void> {
  await sandbox.runCommand({
    cmd: "node",
    args: ["--import", "@backtickjs/node-plugin", "src/sandbox/serve.ts"],
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
