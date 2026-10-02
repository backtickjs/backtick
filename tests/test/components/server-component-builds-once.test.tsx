import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";

// A server component's script, run where its splice stands, as Solid runs a
// component: untracked. It reads a signal of its own while it sets up, which a
// timer it starts then writes: read where the splice stands, the write would
// build it again, with a signal never written and a timer never fired.
async function Held({ again }: { again: Client<() => boolean> }) {
  return cs`{
    const shown = $createSignal(false);

    const started = window.setTimeout(() => {
      if ($again()) {
        shown[1](true);
      }
    }, 0);

    const read = shown[0]();
    return <em>{"read " + read}</em>;
  }`;
}

const held = cs`{
  const builds = $createSignal(0);
  return (
    <div>
      <span>{"builds " + builds[0]()}</span>
      <section>{
        ${(
          <Held
            again={cs`() => {
              builds[1](builds[0]() + 1);
              return builds[0]() < 5;
            }`}
          />
        )}
      }</section>
    </div>
  );
}`;

describe("a server component that reads a signal as it sets up", () => {
  it("is built once", async () => {
    render(await evaluate(() => held));
    await new Promise((settle) => setTimeout(settle, 100));
    assert.ok(screen.getByText("builds 1"));
  });
});
