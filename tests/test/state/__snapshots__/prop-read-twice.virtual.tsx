import assert from "node:assert/strict";
import { it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";

// A prop built from the parent's signal, read twice by the server component
// it's handed to. In Solid, a prop is a getter, so each read runs its
// expression again and builds a new object.
// `react-native-client/prop-read-twice.test.ts` is the same in React, where a
// prop is a value.
async function Compare({ value }: { value: Client<{ count: number }> }) {
  return cs.lift((() => <p>{(cs.splice((value))) === (cs.splice((value))) ? "same" : "different"}</p>)());
}

const parent = cs.lift((() => {
  const [__cs_count] = (cs.splice((createSignal)))(0);
  return <div>{(cs.splice((<Compare value={cs.lift((() => ({ count: __cs_count() }))())} />)))}</div>;
})());

it("a prop read twice is evaluated twice", async () => {
  render(await evaluate(() => parent));
  assert.ok(screen.getByText("different"));
});
