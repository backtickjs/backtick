import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, type Client, type Spliceable } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";

// An app's bundles share the values of its module-level scripts, as an app's
// chunks share its modules: two routes that splice one module-level store get
// one store, as the runtime runs them, with one registry. A bundle run alone
// has its own.
async function run(input: Spliceable, values?: Map<string, unknown>) {
  const bundle = await bundler.build({ input, modules: {} });
  const { code } = bundle.generate({ format: "cjs" });
  return execRoot(code as never, {}, values);
}

const store = cs`({ count: 0 })`;
const home = cs`$store`;
const details = cs`$store`;

it("two bundles of an app share a value", async () => {
  const values = new Map<string, unknown>();
  const homeStore = await run(home, values);
  const detailsStore = await run(details, values);
  assert.equal(homeStore, detailsStore);
});

it("a bundle run alone has its own", async () => {
  assert.notEqual(await run(home), await run(details));
});

// A `cs` written in a function runs each call: its values are each bundle's
// own, as a function's locals are each call's.
function box(): Client<{ label: string }> {
  return cs`({ label: "box" })`;
}
const a = box();
const b = box();

it("a value made in a function is each bundle's own", async () => {
  const values = new Map<string, unknown>();
  const [first, second] = (await run(cs`[$a, $b]`, values)) as unknown[];
  assert.notEqual(first, second);
  const [again] = (await run(cs`[$a]`, values)) as unknown[];
  assert.notEqual(again, first);
});
