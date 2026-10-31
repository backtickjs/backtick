import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { bundle, evaluate } from "../evaluate.ts";

// A splice is read when the `cs` line runs, as a `${}` is in a template
// literal: the script gets the value of that moment, wherever in the script
// it's written, a function included. Reading one before its declaration is
// refused by the typechecker (see `typecheck-errors/splice-before-declaration`).
describe("a splice is read when the `cs` line runs", () => {
  it("in a function, a let assigned after", async () => {
    let theme = "light";
    const label = cs.lift((() => () => (cs.splice((theme))))());
    theme = "dark";
    const read = await evaluate(label);
    assert.equal(read(), "light");
  });

  it("in a function inside a block, a let assigned after", async () => {
    let x = "a";
    const read = cs.lift((() => {
      const __cs_get = () => (cs.splice((x)));
      return __cs_get;
    })());
    x = "b";
    const get = await evaluate(read);
    assert.equal(get(), "a");
  });

  it("in an expression, a let assigned after", async () => {
    let n = 1;
    const tenfold = cs.lift((() => (cs.splice((n))) * 10)());
    n = 2;
    assert.equal(await evaluate(tenfold), 10);
  });

  it("in and out of a function, the same value", async () => {
    let size = 1;
    const pair = cs.lift((() => {
      const __cs_now = (cs.splice((size)));
      const __cs_later = () => (cs.splice((size)));
      return [__cs_now, __cs_later()];
    })());
    size = 2;
    assert.deepEqual(await evaluate(pair), [1, 1]);
  });

  it("in a function called at once, a let assigned after", async () => {
    let factor = 1;
    const items = [1, 2];
    const scaled = cs.lift((() => (cs.splice((items))).map((__cs_item: number) => __cs_item * (cs.splice((factor)))))());
    factor = 10;
    assert.deepEqual(await evaluate(scaled), [1, 2]);
  });

  it("in a loop, each turn's value, even of a var", async () => {
    const reads = [];
    for (var i = 0; i < 3; i++) {
      reads.push(cs.lift((() => () => (cs.splice((i))))()));
    }
    const [a, b, c] = await Promise.all(reads.map(evaluate));
    assert.deepEqual([a!(), b!(), c!()], [0, 1, 2]);
  });

  it("once, however many bundles read it", async () => {
    let made = 0;
    const id = cs.lift((() => (cs.splice(++made)))());
    await bundle(id);
    await bundle(id);
    assert.equal(made, 1);
  });
});
