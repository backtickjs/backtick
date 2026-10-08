import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
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

// As an agent or a CI script runs it: input from a pipe that stays open, and
// no flags. It can't answer questions, so it gets the defaults and finishes.
// Stopped if it doesn't, which once kept it waiting for an answer forever.
test("creates the default project when its input isn't a terminal", async () => {
  const child = spawn(process.execPath, [cli, "piped-app", "--no-install"], {
    cwd: work,
    stdio: ["pipe", "ignore", "ignore"],
  });
  const stop = setTimeout(() => child.kill(), 10_000);
  const code = await new Promise((exited) => child.on("exit", exited));
  clearTimeout(stop);
  child.stdin.destroy();

  assert.equal(code, 0);
  const manifest = JSON.parse(
    readFileSync(path.join(work, "piped-app", "package.json"), "utf8"),
  ) as { dependencies: Record<string, string> };
  assert.ok("@backtickjs/react-native" in manifest.dependencies);
  assert.ok("@backtickjs/node-plugin" in manifest.dependencies);
});

// A name is the whole happy path, as create-expo-app's is: React Native, on
// Node, with nothing asked.
test("a name alone creates a React Native project on Node", () => {
  execFileSync(process.execPath, [cli, "named-app", "--no-install"], {
    cwd: work,
    stdio: "pipe",
  });
  const manifest = JSON.parse(
    readFileSync(path.join(work, "named-app", "package.json"), "utf8"),
  ) as { dependencies: Record<string, string> };
  assert.ok("@backtickjs/react-native" in manifest.dependencies);
  assert.ok("@backtickjs/node-plugin" in manifest.dependencies);
  assert.ok(!("@backtickjs/bun-plugin" in manifest.dependencies));
});

test("--help lists the options, and an unknown one shows them too", () => {
  const help = execFileSync(process.execPath, [cli, "--help"], {
    encoding: "utf8",
  });
  assert.match(
    help,
    /--template <name>  The framework: react-native, react, solid-js/,
  );
  assert.match(help, /--runtime <name>   The server's runtime: node, bun/);
  assert.match(help, /Creates a React Native app with a Backtick server/);

  assert.throws(
    () =>
      execFileSync(process.execPath, [cli, "--framework", "react"], {
        stdio: "pipe",
      }),
    (error: { status: number; stderr: Buffer }) =>
      error.status === 1 &&
      error.stderr
        .toString()
        .startsWith("Unknown option '--framework'.\n\nUsage:"),
  );
});

test("created where it's run, it doesn't say to cd anywhere", () => {
  const here = path.join(work, "here-app");
  mkdirSync(here);
  const said = execFileSync(
    process.execPath,
    [
      cli,
      ".",
      "--template",
      "react-native",
      "--runtime",
      "node",
      "--no-install",
    ],
    { cwd: here, encoding: "utf8" },
  );
  assert.ok(existsSync(path.join(here, "package.json")));
  assert.doesNotMatch(said, /cd /);
  assert.match(said, /\n\n {3}\w+ run start\n\n/);
});

test("created elsewhere, it says to cd there first", () => {
  const said = execFileSync(
    process.execPath,
    [
      cli,
      "there-app",
      "--template",
      "react",
      "--runtime",
      "node",
      "--no-install",
    ],
    { cwd: work, encoding: "utf8" },
  );
  assert.match(said, /\n\n {3}cd there-app\n {3}\w+ run start\n\n/);
});

test("a React Native project is opened on a phone, with Expo Go", () => {
  const said = execFileSync(
    process.execPath,
    [
      cli,
      "phone-app",
      "--template",
      "react-native",
      "--runtime",
      "node",
      "--no-install",
    ],
    { cwd: work, encoding: "utf8" },
  );
  assert.match(said, /To open it on your phone:/);
  assert.match(
    said,
    /Install Expo Go on your phone, from the App Store or Google Play/,
  );
  assert.match(said, /same Wi-Fi network as this computer/);
  assert.match(said, /Scan the QR code it shows/);
  assert.match(
    said,
    /No phone at hand\? \w+ run ios, \w+ run android or \w+ run web/,
  );
});
