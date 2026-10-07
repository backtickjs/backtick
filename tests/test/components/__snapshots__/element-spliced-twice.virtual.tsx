import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { render } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";

// One element, held in a variable and drawn in two places. As React renders
// an element each place it stands, its component runs once per place, and
// each place draws what its own run returned.
let runs = 0;

async function Stamp() {
  runs = runs + 1;
  return cs.lift((() => <b>{(cs.splice((runs)))}</b>)());
}

const stamp = <Stamp />;
const twice = cs.lift((() => (
  <p>
    {(cs.splice((stamp)))}
    {(cs.splice((stamp)))}
  </p>
))());

it("an element drawn twice runs its component twice", async () => {
  runs = 0;
  const { container } = render(await evaluate(() => twice));
  assert.equal(runs, 2);
  assert.equal(container.textContent, "12");
});
