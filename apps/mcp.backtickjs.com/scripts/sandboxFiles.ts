// What a snapshot installs from the sandbox package (sandbox/), and a hash of
// them: `snapshot.json` records the hash its snapshot was made from, and a
// test fails when they differ, so a change to the sandbox can't ship without
// its snapshot.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const sandboxRoot = join(import.meta.dirname, "../sandbox");

export const sandboxFiles = [
  "package.json",
  "package-lock.json",
  "tsconfig.app.json",
  "src/compile.ts",
  "src/serve.ts",
  "src/typecheck.ts",
];

export function sandboxHash(): string {
  const hash = createHash("sha256");
  for (const file of sandboxFiles) {
    hash.update(file).update(readFileSync(join(sandboxRoot, file)));
  }
  return hash.digest("hex");
}
