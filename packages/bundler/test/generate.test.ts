import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport } from "@backtickjs/core";
import { bundler, type Plugin } from "../dist/index.js";

// A plugin adding `text` to the end of the module, as a framework's compile
// step adds statements after the value (Solid's `delegateEvents`). Its map
// maps nothing; maps through a real plugin are `tests/`'s to check.
const appending =
  (text: string): Plugin =>
  (code) => ({
    code: `${code}\n${text}`,
    map: JSON.stringify({ version: 3, sources: [], names: [], mappings: "" }),
  });

test("the output is a module whose default export is the value", async () => {
  const bundle = await bundler.build({ input: 42, external: [] });
  assert.equal(bundle.generate({ format: "es" }).code, "export default (42);");
});

test("a plugin's statements follow the value", async () => {
  const bundle = await bundler.build({
    input: 1,
    external: [],
    plugins: [appending("globalThis.appended = true;")],
  });
  assert.equal(
    bundle.generate({ format: "es" }).code,
    ["export default (1);", "globalThis.appended = true;"].join("\n"),
  );
});

test("a plugin is given the code and the bundle's id", async () => {
  const seen: string[] = [];
  await bundler.build({
    input: 1,
    external: [],
    plugins: [
      (code, id) => {
        seen.push(code, id);
        return { code, map: JSON.stringify({ version: 3, sources: [], names: [], mappings: "" }) };
      },
    ],
  });
  assert.deepEqual(seen, ["export default (1);", "bundle.jsx"]);
});

test("a script's import from a module the client doesn't provide is refused", async () => {
  const Portal = createImport({ name: "Portal", from: "solid-js/web" });
  await assert.rejects(
    () => bundler.build({ input: Portal, external: ["solid-js"] }),
    /Can't import `Portal` from "solid-js\/web": the client provides "solid-js"\./,
  );
});
