import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { bundle } from "../evaluate.ts";
import type { Prop } from "@backtickjs/solid-js/jsx-runtime";

// A bundle is a function of what was spliced alone: bundling it again, or after
// other bundles, writes the same code. Scripts are where most of the bundler's
// bookkeeping is — their numbers, the names captures print under, the thunks a
// hole feeds — so this is the bundler's own repeatability test with them in.

const doubled = (n: Client<number>) => cs.lift((() => cs.splice((n)) * 2)());
const pair = (n: Client<number>) => (m: Client<number>) => cs.lift((() => cs.splice((n)) + cs.splice((m)))());

function Card(props: { readonly title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

const shared = cs.lift((() => "shared")());

const page = () => cs.lift(((__cs_For = cs.splice(For)) => {
    const __cs_count = cs.splice((createSignal))(1);
    const __cs_Heading = cs.splice((Card));
    const __cs_rows = [1, 2, 3];
    const __cs_total = __cs_count[0]() + cs.splice(cs.lift((() => __cs_rows.length)()));
    return <section>{<__cs_Heading title={"spliced"}/>}{cs.splice((<Card title="element" />))}{cs.splice((<Card title={shared} />))}{<p>{cs.splice((doubled))(__cs_count[0]())}</p>}{<p>{cs.splice((pair))(1)(2)}</p>}{<p>{cs.splice((shared))}</p>}{<p>{__cs_total}</p>}{<ul>{<__cs_For each={__cs_rows}>{(__cs_row: number) => <li>{__cs_row + __cs_count[0]()}</li>}</__cs_For>}</ul>}</section>;
})());

const code = async (value: Client<unknown>) => (await bundle(value)).code;

it("bundles the same every time, with scripts in it", async () => {
  const first = await code(page());
  assert.equal(await code(page()), first);
  // Other bundles in between, sharing its host functions and scripts.
  await code(cs.lift((() => cs.splice((doubled))(1))()));
  await code(cs.lift((() => cs.splice((pair))(1)(2) + cs.splice((shared)).length)()));
  await code(cs.lift((() => cs.splice((<Card title="other" />)))()));
  assert.equal(await code(page()), first);
});
