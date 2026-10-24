// Makes the base snapshot the sandboxes start from: the sandbox package
// (sandbox/), installed with its dependencies at /vercel/backtickjs.app, `curl` to reach its
// server, and nothing running. Prints the snapshot id, for the function's environment.
// `node --env-file=.env.local scripts/snapshot.ts`, after `vercel env pull`.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Sandbox } from "@vercel/sandbox";

const root = join(import.meta.dirname, "../sandbox");
const app = "/vercel/backtickjs.app";
const files = [
  "package.json",
  "tsconfig.app.json",
  "src/compile.ts",
  "src/serve.ts",
  "src/typecheck.ts",
];

const sandbox = await Sandbox.create({
  image: "vercel/sandbox/node:24",
  resources: { vcpus: 2 },
  timeout: 10 * 60 * 1000,
  // npm's registry, for the install; the sandboxes made from it deny all.
  networkPolicy: "allow-all",
});
try {
  await run(sandbox, {
    cmd: "mkdir",
    args: ["-p", `${app}/src`, `${app}/.builds`],
  });
  await sandbox.writeFiles(
    files.map((file) => ({
      path: `${app}/${file}`,
      content: readFileSync(join(root, file)),
    })),
  );
  await run(sandbox, {
    cmd: "sh",
    args: ["-c", "apt-get update -q && apt-get install -yq curl"],
    sudo: true,
  });
  await run(sandbox, {
    cmd: "npm",
    args: ["install", "--no-audit", "--no-fund"],
    cwd: app,
  });
} catch (error) {
  await sandbox.stop();
  throw error;
}
const snapshot = await sandbox.snapshot({ expiration: 0 });
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
