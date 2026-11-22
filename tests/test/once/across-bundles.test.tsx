import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, type Client, createRuntime, type Runtime } from "@backtickjs/core";

// An app's bundles share what its module-level scripts make, as an app's
// chunks share its modules: two routes that splice one module-level store get
// one store, as one runtime runs them, with one cache. A bundle run by a
// runtime of its own has its own.
async function run<T>(
  input: Client<T>,
  runtime: Runtime = createRuntime({ moduleMap: {}, installedPackages: {} }),
): Promise<T> {
  const bundle = await bundler.build({ input, modules: {} });
  const { code } = bundle.generate({ format: "cjs" });
  return runtime.exec(code) as Promise<T>;
}

const store = cs`({ count: 0 })`;
const home = cs`$store`;
const details = cs`$store`;

it("two bundles of an app share a value", async () => {
  const runtime = createRuntime({ moduleMap: {}, installedPackages: {} });
  const homeStore = await run(home, runtime);
  const detailsStore = await run(details, runtime);
  assert.equal(homeStore, detailsStore);
});

it("a bundle run alone has its own", async () => {
  assert.notEqual(await run(home), await run(details));
});

// A `cs` written in a function runs each call: what it makes is each bundle's
// own, as a function's locals are each call's.
function box(): Client<{ label: string }> {
  return cs`({ label: "box" })`;
}
const a = box();
const b = box();

it("a value made in a function is each bundle's own", async () => {
  const runtime = createRuntime({ moduleMap: {}, installedPackages: {} });
  const [first, second] = await run(cs`[$a, $b]`, runtime);
  assert.notEqual(first, second);
  const [again] = await run(cs`[$a]`, runtime);
  assert.notEqual(again, first);
});
