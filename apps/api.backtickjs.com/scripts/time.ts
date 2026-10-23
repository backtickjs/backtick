// Times a sandbox from the snapshot as `save_app` and a phone use it: the
// first typecheck creates it, then a warm typecheck, then two bundles.
// `node --env-file=.env.local scripts/time.ts <snapshot id>`
import { randomUUID } from "node:crypto";
import { join } from "node:path";
import { installedPackages } from "@backtickjs/core/node";
import { Sandbox } from "@vercel/sandbox";
import {
  bundleInSandbox,
  typecheckInSandbox,
} from "../src/function/sandbox.ts";
import { starter } from "../src/function/starter.ts";

const root = join(import.meta.dirname, "..");
const snapshotId = process.argv[2]!;
const user = `time-${randomUUID().slice(0, 8)}`;
const installed = installedPackages(root);
const phone = {
  react: installed.react!,
  "react/jsx-runtime": installed.react!,
  "react-native": installed["react-native"]!,
};

async function time<T>(label: string, run: () => Promise<T>): Promise<T> {
  const start = performance.now();
  const result = await run();
  console.log(`${label}: ${Math.round(performance.now() - start)} ms`);
  return result;
}

try {
  console.log(
    await time("typecheck, creating the sandbox", () =>
      typecheckInSandbox(user, starter, snapshotId),
    ),
  );
  await time("typecheck, warm", () =>
    typecheckInSandbox(user, starter, snapshotId),
  );
  const bundled = await time("bundle, first", () =>
    bundleInSandbox(user, starter, phone, snapshotId),
  );
  console.log(bundled.ok ? `${bundled.code.length} bytes` : bundled);
  await time("bundle, warm", () =>
    bundleInSandbox(user, starter, phone, snapshotId),
  );
} finally {
  await (await Sandbox.get({ name: `build-${user}-${snapshotId}` })).stop();
}
