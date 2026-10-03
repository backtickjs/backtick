import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
import { onMount } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";

// A component forwarding an optional prop it wasn't given: `undefined` reaches
// the script, where the element takes it as JSX and TypeScript read an absent
// prop.
async function Pill({
  label,
  ref,
}: {
  label: string;
  ref?: Client<(element: HTMLButtonElement) => void>;
}) {
  return cs.lift((() => <button ref={cs.splice((ref))}>{cs.splice((label))}</button>)());
}

describe("an undefined prop", () => {
  it("lets a component forward an optional prop it wasn't given", async () => {
    render(await evaluate(() => <Pill label="plain" />));
    assert.ok(screen.getByRole("button", { name: "plain" }));
  });

  it("still reaches the element when it is given", async () => {
    render(
      await evaluate(() => (
        <Pill label="focused" ref={cs.lift((() => (__cs_el) => cs.splice((onMount))(() => __cs_el.focus()))())} />
      )),
    );
    assert.equal(document.activeElement, screen.getByRole("button"));
  });
});
