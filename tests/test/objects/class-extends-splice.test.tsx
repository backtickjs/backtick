import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";

// A class, for scripts to extend.
const Base = cs`class Base<T = string> {
  constructor(readonly value: T) {}
  greet() {
    return "hi " + String(this.value);
  }
}`;

describe("a class extending a spliced class", () => {
  it("extends it", async () => {
    const greeting = await evaluate(cs`{
      class Loud extends $Base {
        greet() {
          return super.greet() + "!";
        }
      }
      return new Loud("Ada").greet();
    }`);
    assert.equal(greeting, "hi Ada!");
  });

  it("extends it with type arguments", async () => {
    const greeting = await evaluate(cs`{
      class Counted extends $Base<number> {
        greet() {
          return super.greet() + " times";
        }
      }
      return new Counted(3).greet();
    }`);
    assert.equal(greeting, "hi 3 times");
  });
});
