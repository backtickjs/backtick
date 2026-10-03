import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";

// A client component the host holds, written as a tag in a script, given its
// props in every form JSX writes them: spread, valueless, dashed, an element.
const Badge = cs.lift((() => (__cs_props: {
  label: string;
  disabled?: boolean;
  "data-id"?: string;
  icon?: unknown;
}) => (
  <span data-id={__cs_props["data-id"]} title={__cs_props.disabled ? "off" : "on"}>
    {__cs_props.icon as any}
    {__cs_props.label}
  </span>
))());

describe("a host tag's props", () => {
  it("arrive spread, valueless, dashed and as an element", async () => {
    render(
      await evaluate(
        () => cs.lift((() => {
          const __cs_rest = { label: "spread" };
          return cs.splice(Badge)({ ...__cs_rest, disabled: true, "data-id": "seven", icon: <b>!</b>, });
        })()),
      ),
    );
    const badge = screen.getByText("spread");
    assert.equal(badge.getAttribute("data-id"), "seven");
    assert.equal(badge.getAttribute("title"), "off");
    assert.equal(badge.querySelector("b")?.textContent, "!");
  });
});
