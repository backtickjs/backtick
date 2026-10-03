import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { bundle } from "../evaluate.ts";

// A bundle is a function of what was spliced alone: bundling it again, or after
// other bundles, writes the same code. Scripts are where most of the bundler's
// bookkeeping is — their numbers, the names captures print under, the thunks a
// hole feeds — so this is the bundler's own repeatability test with them in.

const doubled = cs.lift((() => (__cs_n: number) => __cs_n * 2)());
const pair = cs.lift((() => (__cs_n: number) => (__cs_m: number) => __cs_n + __cs_m)());

function Card(props: { readonly title: string | Client<string> }) {
  return cs.lift((() => <h2>{cs.splice((props)).title}</h2>)());
}

const shared = cs.lift((() => "shared")());

const page = () => cs.lift((() => {
  const [__cs_count, __cs_setCount] = cs.splice((createSignal))(1);
  const __cs_rows = [1, 2, 3];
  const __cs_total = __cs_count() + cs.splice(cs.lift((() => __cs_rows.length)()));
  return (
    <section>
      {cs.splice((<Card title="element" />))}
      {cs.splice((<Card title={shared} />))}
      <p>{cs.splice((doubled))(__cs_count())}</p>
      <p>{cs.splice((pair))(1)(2)}</p>
      <p>{cs.splice((shared))}</p>
      <p>{__cs_total}</p>
      <ul>
        {(void For, cs.splice(For)({ each: __cs_rows, children: (__cs_row: number) => <li>{__cs_row + __cs_count()}</li> }))}
      </ul>
    </section>
  );
})());

const code = async (value: Client<unknown>) => (await bundle(value)).code;

it("bundles the same every time, with scripts in it", async () => {
  const first = await code(page());
  assert.equal(await code(page()), first);
  // Other bundles in between, sharing its scripts and components.
  await code(cs.lift((() => cs.splice((doubled))(1))()));
  await code(cs.lift((() => cs.splice((pair))(1)(2) + cs.splice((shared)).length)()));
  await code(cs.lift((() => cs.splice((<Card title="other" />)))()));
  assert.equal(await code(page()), first);
});
