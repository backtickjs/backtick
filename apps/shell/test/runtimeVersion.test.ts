// A build takes the updates of its runtime version only, so a change to the
// native side needs a new one: an update for a binary without a module
// would offer it to apps, which would crash using it. `native.json` is the
// native side as `runtimeVersion` was set; `UPDATE=1 pnpm test` rewrites it.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";

const root = join(import.meta.dirname, "..");
const recordedFile = join(root, "native.json");

type Native = {
  // Each dependency with native code, at its installed version.
  packages: Record<string, string>;
  // The shell's own modules (modules/), by a hash of their native code.
  modules: Record<string, string>;
  // The config plugins and their options, which write the native project.
  plugins: string;
};

function readJson(file: string) {
  return JSON.parse(readFileSync(file, "utf8"));
}

function hasNativeCode(dir: string): boolean {
  return (
    ["expo-module.config.json", "ios", "android"].some((name) =>
      existsSync(join(dir, name)),
    ) || readdirSync(dir).some((name) => name.endsWith(".podspec"))
  );
}

function hashOf(dir: string): string {
  const hash = createHash("sha256");
  const visit = (path: string) => {
    for (const name of readdirSync(path).sort()) {
      if (name === "build" || name === ".gradle" || name === "node_modules") {
        continue;
      }
      const child = join(path, name);
      if (statSync(child).isDirectory()) {
        visit(child);
      } else {
        hash.update(relative(dir, child)).update(readFileSync(child));
      }
    }
  };
  for (const name of [
    "ios",
    "android",
    "expo-module.config.json",
    "app.plugin.js",
  ]) {
    const path = join(dir, name);
    if (!existsSync(path)) {
      continue;
    }
    if (statSync(path).isDirectory()) {
      visit(path);
    } else {
      hash.update(name).update(readFileSync(path));
    }
  }
  return hash.digest("hex");
}

function native(): Native {
  const packages: Record<string, string> = {};
  for (const name of Object.keys(
    readJson(join(root, "package.json")).dependencies,
  ).sort()) {
    const dir = realpathSync(join(root, "node_modules", name));
    if (hasNativeCode(dir)) {
      packages[name] = readJson(join(dir, "package.json")).version;
    }
  }
  const modules: Record<string, string> = {};
  for (const name of readdirSync(join(root, "modules")).sort()) {
    modules[name] = hashOf(join(root, "modules", name));
  }
  const plugins = createHash("sha256")
    .update(JSON.stringify(readJson(join(root, "app.json")).expo.plugins))
    .digest("hex");
  return { packages, modules, plugins };
}

test("a change to the native side comes with a new runtimeVersion", () => {
  const runtimeVersion: string = readJson(join(root, "app.json")).expo
    .runtimeVersion;
  assert.equal(
    typeof runtimeVersion,
    "string",
    "app.json's runtimeVersion is set by hand",
  );
  const { runtimeVersion: recordedVersion, ...recorded } =
    readJson(recordedFile);
  const current = native();
  const changed = JSON.stringify(current) !== JSON.stringify(recorded);
  if (changed && runtimeVersion === recordedVersion) {
    assert.deepEqual(
      current,
      recorded,
      `The native side changed, and runtimeVersion is still "${runtimeVersion}". ` +
        "Give it a new one in app.json (builds on the old one stop getting " +
        "updates until they're rebuilt), then run `UPDATE=1 pnpm test`.",
    );
  }
  if (process.env.UPDATE) {
    writeFileSync(
      recordedFile,
      JSON.stringify({ runtimeVersion, ...current }, null, 2) + "\n",
    );
    return;
  }
  assert.equal(
    runtimeVersion,
    recordedVersion,
    "runtimeVersion changed: run `UPDATE=1 pnpm test` to record the native side for it.",
  );
});
