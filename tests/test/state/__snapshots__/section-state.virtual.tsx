import assert from "node:assert/strict";
import { it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";

// A server component handed its parent's state, drawing a client component
// with state of its own: the title follows the parent, and the child keeps
// its count. `react-native-client/section-state.test.ts` is the same in
// React.
const CounterButton = cs.lift((() => () => {
  const [__cs_count, __cs_setCount] = (cs.splice((createSignal)))(0);
  return (
    <button onclick={() => __cs_setCount(__cs_count() + 1)}>{"child " + __cs_count()}</button>
  );
})());

async function Section({ title }: { title: Client<string> }) {
  return cs.lift((() => (
    <section>
      <h2>{(cs.splice((title)))}</h2>
      {(($CounterButton) => <$CounterButton />)(cs.splice((CounterButton)))}
    </section>
  ))());
}

const parent = cs.lift((() => {
  const [__cs_count, __cs_setCount] = (cs.splice((createSignal)))(0);
  return (
    <div>
      <button onclick={() => __cs_setCount(__cs_count() + 1)}>
        {"parent " + __cs_count()}
      </button>
      {(cs.splice((<Section title={cs.lift((() => "Section " + __cs_count())())} />)))}
    </div>
  );
})());

it("a server component's client child keeps its state", async () => {
  render(await evaluate(() => parent));
  await userEvent.click(screen.getByText("child 0"));
  await userEvent.click(screen.getByText("parent 0"));
  assert.ok(screen.getByText("parent 1"));
  assert.ok(screen.getByText("Section 1"));
  assert.ok(screen.getByText("child 1"));
});
