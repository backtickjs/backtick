import assert from "node:assert/strict";
import { it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";

// A server component drawing what it's handed.
async function Label({ text }: { text: Client<string> }) {
  return cs.lift((() => <span>{(cs.splice((text)))}</span>)());
}

// A prop derived from a signal, handed to a server component drawn in the
// script that holds the signal. As in Solid, `"Count: " + count()` is read
// again each time the label is drawn, so it follows the count.
const counter = cs.lift((() => {
  const [__cs_count, __cs_setCount] = (cs.splice((createSignal)))(0);
  return (
    <div>
      <button onclick={() => __cs_setCount(__cs_count() + 1)}>add</button>
      {(cs.splice((<Label text={cs.lift((() => "Count: " + __cs_count())())} />)))}
    </div>
  );
})());

// `react-native-client/derived-prop.test.ts` is the same in React.
it("a prop derived from a signal follows it", async () => {
  render(await evaluate(() => counter));
  assert.ok(screen.getByText("Count: 0"));
  await userEvent.click(screen.getByText("add"));
  assert.ok(screen.getByText("Count: 1"));
});
