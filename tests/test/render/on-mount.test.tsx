import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, onMount } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";

// What the page held each time a script logged, read through the console
// `onMount` reaches from a script.
async function logged(draw: () => Promise<unknown>): Promise<string[]> {
  const seen: string[] = [];
  const log = globalThis.window.console.log;
  globalThis.window.console.log = () => {
    seen.push(document.body.textContent ?? "");
  };
  try {
    await draw();
  } finally {
    globalThis.window.console.log = log;
  }
  return seen;
}

describe("onMount", () => {
  it("runs once, after the drawing is in the page", async () => {
    const drawing = await evaluate(
      cs`() => {
        const count = $createSignal(0);
        $onMount(() => {
          window.console.log();
          count[1](count[0]() + 1);
        });
        return <p>{"mounted " + count[0]()}</p>;
      }`,
    );
    const seen = await logged(async () => render(drawing));
    assert.deepEqual(seen, ["mounted 0"]);
    assert.equal(screen.getByText(/mounted/).textContent, "mounted 1");
  });

  it("runs at once when called from a handler", async () => {
    render(
      await evaluate(
        cs`() => {
          const said = $createSignal("not yet");
          return (
            <button onclick={() => $onMount(() => said[1]("ran"))}>
              {said[0]()}
            </button>
          );
        }`,
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(screen.getByRole("button").textContent, "ran");
  });
});
