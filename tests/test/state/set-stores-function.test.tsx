import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { drawn } from "./dom.ts";

// `set` stores what it is given. A function is a value like any other, so it
// is kept, not called with the previous value.
async function Greeting() {
  return cs`{
    const greet = $state<(name: string) => string>((name) => "hi " + name);
    return (
      <span onclick={() => greet.set((name) => "bye " + name)}>
        {greet.get()("ada")}
      </span>
    );
  }`;
}

it("`set` stores a function without calling it", async () => {
  const text = await drawn(<Greeting />);
  assert.equal(text.textContent, "hi ada");
  await userEvent.click(text);
  assert.equal(text.textContent, "bye ada");
});

it("Greeting", async (t) => {
  await snapshotCase(t, "Greeting", <Greeting />);
});
