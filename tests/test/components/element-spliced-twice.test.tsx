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
  return cs`<b>{$runs}</b>`;
}

const stamp = <Stamp />;
const twice = cs`(
  <p>
    {$stamp}
    {$stamp}
  </p>
)`;

// A known bug: the bundler caches each element's expansion, so the component
// runs once and both places draw its one result. A todo until it's fixed,
// when the runner reports it passing.
it(
  "an element drawn twice runs its component twice",
  { todo: "runs once, both places drawing its result" },
  async () => {
    runs = 0;
    const { container } = render(await evaluate(() => twice));
    assert.equal(runs, 2);
    assert.equal(container.textContent, "12");
  },
);
