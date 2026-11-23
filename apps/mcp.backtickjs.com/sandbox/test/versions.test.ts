import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "node:test";

// npm in the snapshot ignores pnpm's lockfile and takes the newest version a
// range allows, so a range here drifts from what phones carry, and a screen
// typed against the newer one is a 406 on every phone.
it("names each of the phone's packages at the shell's exact version", () => {
  // The shell's module map, each module at its package's installed version,
  // as its build writes it.
  const modules: Record<string, string> = JSON.parse(
    readFileSync(
      join(import.meta.dirname, "../../../shell/build/modules.json"),
      "utf8",
    ),
  );
  const { dependencies } = JSON.parse(
    readFileSync(join(import.meta.dirname, "../package.json"), "utf8"),
  );
  for (const [specifier, version] of Object.entries(modules)) {
    const name = specifier
      .split("/")
      .slice(0, specifier.startsWith("@") ? 2 : 1)
      .join("/");
    assert.equal(dependencies[name], version, name);
  }
});
