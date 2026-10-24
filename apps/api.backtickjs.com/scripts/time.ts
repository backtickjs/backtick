// Times a sandbox from the snapshot as `save_app` uses it: the
// first typecheck creates it, then a warm typecheck, then two saves' checks
// (typecheck and compile).
// `node --env-file=.env.local scripts/time.ts <snapshot id>`
import { randomUUID } from "node:crypto";
import { Sandbox } from "@vercel/sandbox";
import {
  checkInSandbox,
  sandboxName,
  typecheckInSandbox,
} from "../src/function/sandbox.ts";
import { starter } from "../src/function/starter.ts";

const snapshotId = process.argv[2]!;
const user = `time-${randomUUID().slice(0, 8)}`;

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
  const checked = await time("check, first", () =>
    checkInSandbox(user, starter, snapshotId),
  );
  console.log(checked.errors, `${checked.compiled?.length ?? 0} bytes`);
  await time("check, warm", () => checkInSandbox(user, starter, snapshotId));
} finally {
  await (await Sandbox.get({ name: sandboxName(user, snapshotId) })).stop();
}
