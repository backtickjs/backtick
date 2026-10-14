import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";

// A class, for scripts to extend.
const Base = cs.lift((() => class __cs_Base<T = string> {
  constructor(readonly value: T) {}
  greet() {
    return "hi " + String(this.value);
  }
})());

describe("a class extending a spliced class", () => {
  it("extends it", async () => {
    const greeting = await evaluate(cs.lift((() => {
      class __cs_Loud extends (cs.splice((Base))) {
        greet() {
          return super.greet() + "!";
        }
      }
      return new __cs_Loud("Ada").greet();
    })()));
    assert.equal(greeting, "hi Ada!");
  });

  it("extends it with type arguments", async () => {
    const greeting = await evaluate(cs.lift((() => {
      class __cs_Counted extends (cs.splice((Base)))<number> {
        greet() {
          return super.greet() + " times";
        }
      }
      return new __cs_Counted(3).greet();
    })()));
    assert.equal(greeting, "hi 3 times");
  });
});
