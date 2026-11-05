// Writes sandbox/package-lock.json, which the snapshot installs exactly
// (`npm ci`). Resolved in an empty folder from sandbox/package.json alone, as
// the snapshot sees it: inside the repo, npm would take the root's
// `workspaces` for the project.
// `node scripts/lock.ts`, after a change to sandbox/package.json.
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sandboxRoot } from "./sandboxFiles.ts";

const dir = mkdtempSync(join(tmpdir(), "sandbox-lock-"));
try {
  copyFileSync(join(sandboxRoot, "package.json"), join(dir, "package.json"));
  execFileSync(
    "npm",
    [
      "install",
      "--package-lock-only",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
    ],
    { cwd: dir, stdio: "inherit" },
  );
  copyFileSync(
    join(dir, "package-lock.json"),
    join(sandboxRoot, "package-lock.json"),
  );
} finally {
  rmSync(dir, { recursive: true, force: true });
}
