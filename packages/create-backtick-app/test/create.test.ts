import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";

// The CLI as `npx` runs it: packed as it's published, then unpacked inside a
// `node_modules`, which once made it copy nothing.

const root = path.join(import.meta.dirname, "..");
const require = createRequire(import.meta.url);
let work: string;
let cli: string;
let packed: string[];

before(() => {
  work = mkdtempSync(path.join(tmpdir(), "create-backtick-app-"));
  const tarball = execFileSync(
    "pnpm",
    ["pack", "--pack-destination", work, "--json"],
    { cwd: root, encoding: "utf8" },
  );
  const { filename } = JSON.parse(tarball) as { filename: string };
  packed = execFileSync("tar", ["-tzf", filename], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean);

  const installed = path.join(work, "node_modules", "create-backtick-app");
  mkdirSync(installed, { recursive: true });
  execFileSync("tar", [
    "-xzf",
    filename,
    "-C",
    installed,
    "--strip-components=1",
  ]);
  // Its one dependency, from this repository's install.
  symlinkSync(
    path.dirname(require.resolve("prompts/package.json")),
    path.join(work, "node_modules", "prompts"),
  );
  cli = path.join(installed, "dist", "index.js");
});

after(() => rmSync(work, { recursive: true, force: true }));

test("the package ships no leftovers from running its templates here", () => {
  for (const leftover of ["node_modules", ".expo", ".turbo"]) {
    assert.deepEqual(
      packed.filter((file) => file.split("/").includes(leftover)),
      [],
    );
  }
});

for (const template of ["react-native", "react", "solid-js"]) {
  test(`creates a ${template} project from inside a node_modules`, () => {
    const name = `my-${template}-app`;
    execFileSync(
      process.execPath,
      [cli, name, "--template", template, "--runtime", "node", "--no-install"],
      { cwd: work, stdio: "pipe" },
    );
    const project = path.join(work, name);
    const files = readdirSync(project);

    // The template, whole, with its `gitignore` restored to `.gitignore`.
    assert.ok(files.includes(".gitignore"), files.join(", "));
    assert.ok(!files.includes("gitignore"));
    assert.ok(existsSync(path.join(project, "server", "Home.tsx")));
    for (const leftover of ["node_modules", ".expo", ".turbo"]) {
      assert.ok(!files.includes(leftover), `${leftover} was copied`);
    }

    const manifest = JSON.parse(
      readFileSync(path.join(project, "package.json"), "utf8"),
    ) as { name: string };
    assert.equal(manifest.name, name);
  });
}
