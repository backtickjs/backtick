import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
declare const Button: import("@backtickjs/core").Client<(typeof import("acme-ui"))["Button"]>;
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// In a script, the library's component as the library types it: a handler, a
// slot taking script JSX, and children.
const counter = cs.lift((() => {
  const [__cs_count, __cs_setCount] = (cs.splice((createSignal)))(0);
  return (
    (void (Button), (($Button) => <$Button
      variant="primary"
      icon={<b>+</b>}
      onClick={() => __cs_setCount(__cs_count() + 1)}
    >
      <span>{"Pressed " + __cs_count() + " times"}</span>
    </$Button>)(cs.splice((Button))))
  );
})());

// A prop the library doesn't take a value for, caught as Solid would.
export const wrongVariant = cs.lift((() => (
  // @ts-expect-error: Type '"large"' is not assignable to type '"primary" | "ghost"'.
  (void (Button), (($Button) => <$Button variant="large" onClick={() => {}}>
    Save
  </$Button>)(cs.splice((Button))))
))());

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
