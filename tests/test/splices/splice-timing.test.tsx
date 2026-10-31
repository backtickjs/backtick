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
    const label = cs`() => $theme`;
    theme = "dark";
    const read = await evaluate(label);
    assert.equal(read(), "light");
  });

  it("in a function inside a block, a let assigned after", async () => {
    let x = "a";
    const read = cs`{
      const get = () => $x;
      return get;
    }`;
    x = "b";
    const get = await evaluate(read);
    assert.equal(get(), "a");
  });

  it("in an expression, a let assigned after", async () => {
    let n = 1;
    const tenfold = cs`$n * 10`;
    n = 2;
    assert.equal(await evaluate(tenfold), 10);
  });

  it("in and out of a function, the same value", async () => {
    let size = 1;
    const pair = cs`{
      const now = $size;
      const later = () => $size;
      return [now, later()];
    }`;
    size = 2;
    assert.deepEqual(await evaluate(pair), [1, 1]);
  });

  it("in a function called at once, a let assigned after", async () => {
    let factor = 1;
    const items = [1, 2];
    const scaled = cs`$items.map((item: number) => item * $factor)`;
    factor = 10;
    assert.deepEqual(await evaluate(scaled), [1, 2]);
  });

  it("in a loop, each turn's value, even of a var", async () => {
    const reads = [];
    for (var i = 0; i < 3; i++) {
      reads.push(cs`() => $i`);
    }
    const [a, b, c] = await Promise.all(reads.map(evaluate));
    assert.deepEqual([a!(), b!(), c!()], [0, 1, 2]);
  });

  it("once, however many bundles read it", async () => {
    let made = 0;
    const id = cs`${++made}`;
    await bundle(id);
    await bundle(id);
    assert.equal(made, 1);
  });
});
