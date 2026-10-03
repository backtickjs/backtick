import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";

// JSX a script writes as Solid code: attributes spread onto an element, and a
// tag naming a component its own object holds.
describe("JSX in a script", () => {
  it("spreads attributes onto an element", async () => {
    render(
      await evaluate(
        () => cs`{
          const rest = { title: "spread", "data-kind": "span" };
          return <span {...rest}>styled</span>;
        }`,
      ),
    );
    const span = screen.getByText("styled");
    assert.equal(span.getAttribute("title"), "spread");
    assert.equal(span.getAttribute("data-kind"), "span");
  });

  it("draws a component a member tag names", async () => {
    render(
      await evaluate(
        () => cs`{
          const Text = {
            Small: (props: { children: string }) => (
              <small>{props.children}</small>
            ),
          };
          return <Text.Small>fine print</Text.Small>;
        }`,
      ),
    );
    assert.equal(screen.getByText("fine print").tagName, "SMALL");
  });
});
