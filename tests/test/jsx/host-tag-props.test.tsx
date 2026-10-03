import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";

// A client component the host holds, written as a tag in a script, given its
// props in every form JSX writes them: spread, valueless, dashed, an element.
const Badge = cs`(props: {
  label: string;
  disabled?: boolean;
  "data-id"?: string;
  icon?: unknown;
}) => (
  <span data-id={props["data-id"]} title={props.disabled ? "off" : "on"}>
    {props.icon as any}
    {props.label}
  </span>
)`;

describe("a host tag's props", () => {
  it("arrive spread, valueless, dashed and as an element", async () => {
    render(
      await evaluate(
        () => cs`{
          const rest = { label: "spread" };
          return <Badge {...rest} disabled data-id="seven" icon=<b>!</b> />;
        }`,
      ),
    );
    const badge = screen.getByText("spread");
    assert.equal(badge.getAttribute("data-id"), "seven");
    assert.equal(badge.getAttribute("title"), "off");
    assert.equal(badge.querySelector("b")?.textContent, "!");
  });
});
