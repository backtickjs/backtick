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
const CounterButton = cs`() => {
  const [count, setCount] = $createSignal(0);
  return (
    <button onclick={() => setCount(count() + 1)}>{"child " + count()}</button>
  );
}`;

async function Section({ title }: { title: Client<string> }) {
  return cs`(
    <section>
      <h2>{$title}</h2>
      <$CounterButton />
    </section>
  )`;
}

const parent = cs`{
  const [count, setCount] = $createSignal(0);
  return (
    <div>
      <button onclick={() => setCount(count() + 1)}>
        {"parent " + count()}
      </button>
      {${(<Section title={cs`"Section " + count()`} />)}}
    </div>
  );
}`;

it("a server component's client child keeps its state", async () => {
  render(await evaluate(() => parent));
  await userEvent.click(screen.getByText("child 0"));
  await userEvent.click(screen.getByText("parent 0"));
  assert.ok(screen.getByText("parent 1"));
  assert.ok(screen.getByText("Section 1"));
  assert.ok(screen.getByText("child 1"));
});
