import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";

const Point = cs`class Point {
  constructor(readonly x: number) {}
}`;

const makeClass = () => cs`class Made {}`;

// A class is one class for the bundle, as a module-level class is.
describe("a class script", () => {
  it("is the same class at every read", async () => {
    assert.equal(await evaluate(cs`$Point === $Point`), true);
  });

  it("is one class per script, not per code", async () => {
    assert.equal(await evaluate(cs`${makeClass()} === ${makeClass()}`), false);
  });

  it("is made at each run where it captures", async () => {
    const same = await evaluate(cs`{
      const make = (label: string) =>
        ${cs`class Labelled {
          name = label;
        }`};
      const A = make("a");
      return [A === make("b"), new A().name];
    }`);
    assert.deepEqual(same, [false, "a"]);
  });
});
