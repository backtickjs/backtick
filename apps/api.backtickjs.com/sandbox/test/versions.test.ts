import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "node:test";
import { modules } from "../../../shell/client/modules.ts";

// npm in the snapshot ignores pnpm's lockfile and takes the newest version a
// range allows, so a range here drifts from what phones carry, and a screen
// typed against the newer one is a 426 on every phone.
it("names each of the phone's packages at the shell's exact version", () => {
  const root = join(import.meta.dirname, "../../..");
  const { dependencies } = JSON.parse(
    readFileSync(join(import.meta.dirname, "../package.json"), "utf8"),
  );
  const packages = new Set(
    modules.map((specifier) =>
      specifier
        .split("/")
        .slice(0, specifier.startsWith("@") ? 2 : 1)
        .join("/"),
    ),
  );
  for (const name of packages) {
    const installed = JSON.parse(
      readFileSync(
        join(root, "shell/node_modules", name, "package.json"),
        "utf8",
      ),
    ).version;
    assert.equal(dependencies[name], installed, name);
  }
});
