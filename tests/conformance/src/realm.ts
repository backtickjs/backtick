import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";
import { TEST262, type Test } from "./tests.ts";

const harness = new Map<string, vm.Script>();

// A harness file, as test262's runners evaluate it: in the test's realm,
// before the test, as plain JavaScript.
function harnessScript(name: string): vm.Script {
  let script = harness.get(name);
  if (script === undefined) {
    script = new vm.Script(
      readFileSync(join(TEST262, "harness", name), "utf8"),
      { filename: `harness/${name}` },
    );
    harness.set(name, script);
  }
  return script;
}

// A fresh realm for one test: its own globals, `print` reporting to `out`,
// `$262` as `INTERPRETING.md` describes it, and the harness the test names.
export function realm(test: Test | null, out: (line: string) => void) {
  const context = vm.createContext({ print: out });
  vm.runInContext(
    `var $262 = {
      global: globalThis,
      gc: undefined,
      detachArrayBuffer(buffer) { buffer.transfer(); },
    };`,
    context,
  );
  const $262 = context.$262 as Record<string, unknown>;
  $262.evalScript = (code: string) => vm.runInContext(code, context);
  $262.createRealm = () => realm(null, out).$262;
  if (test !== null && !test.flags.includes("raw")) {
    for (const name of [
      "assert.js",
      "sta.js",
      ...(test.flags.includes("async") ? ["doneprintHandle.js"] : []),
      ...test.includes,
    ]) {
      harnessScript(name).runInContext(context);
    }
  }
  return context;
}

// The module a bundle's client imports resolve to: the realm's globals by
// those names.
export function test262Module(
  context: vm.Context,
  names: string[],
): vm.SyntheticModule {
  return new vm.SyntheticModule(
    names,
    function () {
      for (const name of names) {
        this.setExport(name, context[name]);
      }
    },
    { context },
  );
}
