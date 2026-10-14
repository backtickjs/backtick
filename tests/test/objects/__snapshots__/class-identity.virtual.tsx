import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";

const Point = cs.lift((() => class __cs_Point {
  constructor(readonly x: number) {}
})());

const makeClass = () => cs.lift((() => class __cs_Made {})());

// A class is one class for the bundle, as a module-level class is.
describe("a class script", () => {
  it("is the same class at every read", async () => {
    assert.equal(await evaluate(cs.lift((() => (cs.splice((Point))) === (cs.splice((Point))))())), true);
  });

  it("is one class per script, not per code", async () => {
    assert.equal(await evaluate(cs.lift((() => (cs.splice(makeClass())) === (cs.splice(makeClass())))())), false);
  });

  it("is made at each run where it captures", async () => {
    const same = await evaluate(cs.lift((() => {
      const __cs_make = (__cs_label: string) =>
        (cs.splice(cs.lift((() => class __cs_Labelled {
          name = __cs_label;
        })())));
      const __cs_A = __cs_make("a");
      return [__cs_A === __cs_make("b"), new __cs_A().name];
    })()));
    assert.deepEqual(same, [false, "a"]);
  });
});
