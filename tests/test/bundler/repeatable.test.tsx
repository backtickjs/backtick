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

const doubled = (n: Client<number>) => cs`$n * 2`;
const pair = (n: Client<number>) => (m: Client<number>) => cs`$n + $m`;

function Card(props: { readonly title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

const shared = cs`"shared"`;

const page = () => cs`{
  const count = $createSignal(1);
  const Heading = $Card;
  const rows = [1, 2, 3];
  const total = count[0]() + ${cs`rows.length`};
  return (
    <section>
      <Heading title="spliced" />
      {${(<Card title="element" />)}}
      {${(<Card title={shared} />)}}
      <p>{$doubled(count[0]())}</p>
      <p>{$pair(1)(2)}</p>
      <p>{$shared}</p>
      <p>{total}</p>
      <ul>
        <For each={rows}>{(row: number) => <li>{row + count[0]()}</li>}</For>
      </ul>
    </section>
  );
}`;

const code = async (value: Client<unknown>) => (await bundle(value)).code;

it("bundles the same every time, with scripts in it", async () => {
  const first = await code(page());
  assert.equal(await code(page()), first);
  // Other bundles in between, sharing its host functions and scripts.
  await code(cs`$doubled(1)`);
  await code(cs`$pair(1)(2) + $shared.length`);
  await code(cs`${(<Card title="other" />)}`);
  assert.equal(await code(page()), first);
});
