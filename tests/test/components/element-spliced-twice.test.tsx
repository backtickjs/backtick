import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { render } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";

// One element, held in a variable and drawn in two places. As React's server
// renderer does, its component runs once: one object, rendered once, and its
// result referenced in each place. Two elements, <Stamp /> written twice, run
// twice. Drawn by Solid, that result is one node, which moves when it's placed
// again, so it shows once.
let runs = 0;

async function Stamp() {
  runs = runs + 1;
  return cs`<b>{$runs}</b>`;
}

const stamp = <Stamp />;
const twice = cs`(
  <p>
    {$stamp}
    {$stamp}
  </p>
)`;

it("an element drawn twice runs its component once", async () => {
  runs = 0;
  const { container } = render(await evaluate(() => twice));
  assert.equal(runs, 1);
  assert.equal(container.textContent, "1");
});
