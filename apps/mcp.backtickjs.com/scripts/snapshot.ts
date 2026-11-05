// Makes the base snapshot the sandboxes start from: the sandbox package
// (sandbox/), installed with its dependencies at /vercel/backtickjs.app,
// `curl` to reach its server, and nothing running. Records its id in
// snapshot.json, with the hash of the files it was made from, for the
// function to read.
// `node --env-file=.env.local scripts/snapshot.ts`, after `vercel env pull`.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Sandbox } from "@vercel/sandbox";
import { sandboxFiles, sandboxHash, sandboxRoot } from "./sandboxFiles.ts";

const app = "/vercel/backtickjs.app";
// Taken before the files are read, so a file changed meanwhile fails the test.
const hash = sandboxHash();

const sandbox = await Sandbox.create({
  image: "vercel/sandbox/node:24",
  resources: { vcpus: 2 },
  timeout: 10 * 60 * 1000,
  // npm's registry, for the install; the sandboxes made from it deny all.
  networkPolicy: "allow-all",
  // Only the snapshot is kept: a persistent sandbox's storage counts against
  // the plan's limit after it stops.
  persistent: false,
});
try {
  await run(sandbox, {
    cmd: "mkdir",
    args: ["-p", `${app}/src`, `${app}/.builds`],
  });
  await sandbox.writeFiles(
    sandboxFiles.map((file) => ({
      path: `${app}/${file}`,
      content: readFileSync(join(sandboxRoot, file)),
    })),
  );
  await run(sandbox, {
    cmd: "sh",
    args: ["-c", "apt-get update -q && apt-get install -yq curl"],
    sudo: true,
  });
  // Exactly the lockfile's packages (scripts/lock.ts writes it).
  await run(sandbox, {
    cmd: "npm",
    args: ["ci", "--no-audit", "--no-fund"],
    cwd: app,
  });
} catch (error) {
  await sandbox.stop();
  throw error;
}
const snapshot = await sandbox.snapshot({ expiration: 0 });
writeFileSync(
  join(import.meta.dirname, "../snapshot.json"),
  JSON.stringify({ snapshotId: snapshot.snapshotId, sandbox: hash }, null, 2) +
    "\n",
);
console.log(snapshot.snapshotId);

async function run(
  sandbox: Sandbox,
  command: Parameters<Sandbox["runCommand"]>[0] & object,
): Promise<void> {
  const finished = await sandbox.runCommand(command);
  if (finished.exitCode !== 0) {
    throw new Error(`${command.cmd} failed:\n${await finished.stderr()}`);
  }
}
