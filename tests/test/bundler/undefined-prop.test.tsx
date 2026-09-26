import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, type Prop } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { onMount } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";

// An element's prop that is `undefined` is left out, as an optional prop reads
// in JSX and TypeScript. That is what lets a component forward an optional
// prop it wasn't given.
async function Pill({
  label,
  ref,
}: {
  label: string;
  ref?: Prop<(element: HTMLButtonElement) => void>;
}) {
  return <button ref={ref}>{label}</button>;
}

describe("an undefined prop", () => {
  it("is left out of the element", async () => {
    const code = await bundler.run(<div class={undefined} id="kept" />, {
      transform,
    });
    assert.match(code, /_\$template\(`<div id=kept>`\)/);
  });

  it("lets a component forward an optional prop it wasn't given", async () => {
    await render(<Pill label="plain" />);
    assert.ok(screen.getByRole("button", { name: "plain" }));
  });

  it("still reaches the element when it is given", async () => {
    await render(
      <Pill label="focused" ref={cs`(el) => $onMount(() => el.focus())`} />,
    );
    assert.equal(document.activeElement, screen.getByRole("button"));
  });
});
