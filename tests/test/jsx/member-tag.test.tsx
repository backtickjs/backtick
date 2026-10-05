import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// A member of a host value as a tag: the value handed over whole, and the tag
// read off it on the client.
const ui = {
  Badge: cs`(props: { n: number }) => <b>{"badge " + props.n}</b>`,
};

const page = cs`(
  <p>
    <$ui.Badge n={1} />
    <$ui.Badge n={2}></$ui.Badge>
  </p>
)`;

it("memberTag", async (t) => {
  await snapshotCase(t, "memberTag", page);
});

describe("a member of a host value as a tag", () => {
  it("draws the component it names", async () => {
    render(await evaluate(() => page));
    assert.ok(screen.getByText("badge 1"));
    assert.ok(screen.getByText("badge 2"));
  });
});
