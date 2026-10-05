import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// A host tag is a splice: its script is evaluated where the tag stands, each
// time it is reached, as a value splice is.
const Boom = cs.lift((() => {
  throw new cs.globalThis.Error("boom");
  return (__cs_props: {}) => <b>never</b>;
})());

const Counted = cs.lift((() => {
  const __cs_counter = cs.globalThis.globalThis as unknown as { evaluations?: number };
  __cs_counter.evaluations = (__cs_counter.evaluations ?? 0) + 1;
  return (__cs_props: {}) => <b>counted</b>;
})());

const unreached = cs.lift((() => <p>{false ? (($Boom) => <$Boom />)(cs.splice((Boom))) : "ok"}</p>)());
const twice = cs.lift((() => (
  <p>
    {(($Counted) => <$Counted />)(cs.splice((Counted)))}
    {(($Counted) => <$Counted />)(cs.splice((Counted)))}
  </p>
))());

it("hostTagEvaluation", async (t) => {
  await snapshotCase(t, "hostTagEvaluation", { unreached, twice });
});

describe("a host tag", () => {
  it("is not evaluated where it isn't reached", async () => {
    const { container } = render(await evaluate(() => unreached));
    assert.equal(container.textContent, "ok");
  });

  it("is evaluated each time it is reached", async () => {
    const counter = globalThis as unknown as { evaluations?: number };
    counter.evaluations = 0;
    const { container } = render(await evaluate(() => twice));
    assert.equal(container.textContent?.replace(/\s/g, ""), "countedcounted");
    assert.equal(counter.evaluations, 2);
  });
});
