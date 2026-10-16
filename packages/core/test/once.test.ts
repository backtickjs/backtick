import assert from "node:assert/strict";
import { test } from "node:test";
import { type ScriptModule, create, once } from "../dist/index.js";

const module = (params: ScriptModule["params"]): ScriptModule => ({
  id: "test:1:0",
  code: "",
  map: "",
  dependencies: [],
  params,
  kind: "expression",
});

test("once marks a script, one value per call", () => {
  const script = create(module([]), []);
  const a = once(script as never) as unknown as { once: boolean };
  const b = once(script as never);
  assert.equal(script.once, undefined);
  assert.equal(a.once, true);
  assert.notEqual(a, b);
});

test("once refuses a script that reads a variable of the script around it", () => {
  const script = create(module([{ kind: "capture", key: "x$abc$0" }]), []);
  assert.throws(
    () => once(script as never),
    /Can't make this script `once`: it reads `x` from the script around it/,
  );
});

test("once takes a script", () => {
  assert.throws(() => once("text" as never), /`once` takes a script/);
});
