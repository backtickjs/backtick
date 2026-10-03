import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import type { Button as LibraryButton } from "acme-ui";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// A third-party Solid library's whole Backtick binding: one `createImport` per
// component, typed with the library's own declaration.
const Button = createImport<typeof LibraryButton>({
  name: "Button",
  from: "acme-ui",
  version: "^1.0.0",
});

// In a script, the library's component as the library types it: a handler, a
// slot taking script JSX, and children.
const counter = cs.lift((() => {
  const __cs_count = cs.splice((createSignal))(0);
  return (
    (void Button, cs.splice(Button)({ variant: "primary", icon: <b>+</b>, onClick: () => __cs_count[1](__cs_count[0]() + 1), children: <span>{"Pressed " + __cs_count[0]() + " times"}</span> }))
  );
})());

// A prop the library doesn't take a value for, caught as Solid would.
// @ts-expect-error: Type '"large"' is not assignable to type '"primary" | "ghost"'.
export const wrongVariant = cs.lift((() => (void Button, cs.splice(Button)({ variant: "large", onClick: () => {}, children: "Save" })))());

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
