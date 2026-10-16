import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "solid-js" with { backtick: "client" };
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { Button } from "acme-ui" with { backtick: "client" };
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// In a script, the library's component as the library types it: a handler, a
// slot taking script JSX, and children.
const counter = cs`{
  const [count, setCount] = $createSignal(0);
  return (
    <$Button
      variant="primary"
      icon={<b>+</b>}
      onClick={() => setCount(count() + 1)}
    >
      <span>{"Pressed " + count() + " times"}</span>
    </$Button>
  );
}`;

// A prop the library doesn't take a value for, caught as Solid would.
export const wrongVariant = cs`(
  // @ts-expect-error: Type '"large"' is not assignable to type '"primary" | "ghost"'.
  <$Button variant="large" onClick={() => {}}>
    Save
  </$Button>
)`;

it("libraryComponent", async (t) => {
  await snapshotCase(t, "libraryComponent", counter);
});

describe("a library component in a script", () => {
  it("draws its slot and children, and calls the handler", async () => {
    render(await evaluate(() => counter));
    const button = screen.getByRole("button");
    assert.equal(button.className, "primary");
    assert.equal(button.querySelector("b")?.textContent, "+");
    assert.ok(screen.getByText("Pressed 0 times"));
    await userEvent.click(button);
    assert.ok(screen.getByText("Pressed 1 times"));
  });
});
