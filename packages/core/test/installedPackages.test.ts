import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { it } from "node:test";
import { fileURLToPath } from "node:url";

const bin = fileURLToPath(
  new URL("../bin/backtick-installed-packages.js", import.meta.url),
);

// An app with React installed.
function app(): string {
  const root = mkdtempSync(join(tmpdir(), "installed-packages-"));
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ dependencies: { react: "^19.0.0" } }),
  );
  mkdirSync(join(root, "node_modules", "react"), { recursive: true });
  writeFileSync(
    join(root, "node_modules", "react", "package.json"),
    JSON.stringify({ name: "react", version: "19.2.3" }),
  );
  return root;
}

it("prints each dependency's installed version, as JSON", () => {
  const printed = execFileSync(process.execPath, [bin], {
    cwd: app(),
    encoding: "utf8",
  });
  assert.deepEqual(JSON.parse(printed), { react: "19.2.3" });
});

it("finds a package above the app, as a workspace hoists it", () => {
  const root = join(app(), "apps", "app");
  mkdirSync(root, { recursive: true });
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ dependencies: { react: "*" } }),
  );
  const printed = execFileSync(process.execPath, [bin], {
    cwd: root,
    encoding: "utf8",
  });
  assert.deepEqual(JSON.parse(printed), { react: "19.2.3" });
});
