import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { type Client, cs, once } from "@backtickjs/core";
declare const createSignal: import("@backtickjs/core").Client<(typeof import("solid-js"))["createSignal"]>;
import { bundle } from "../evaluate.ts";

// A `once` value is made at the top of the bundle, outside every script, so
// nothing of a script around it can reach it: neither a variable it reads nor
// one a fragment it splices reads.
describe("once is refused", () => {
  it("for a script that reads a variable of the script around it", () => {
    assert.throws(
      () => cs.lift((() => {
        const __cs_x = 1;
        return (cs.splice(once(cs.lift((() => __cs_x + 1)()))));
      })()),
      /Can't make this script `once`: it reads `x` from the script around it/,
    );
  });

  it("for a fragment of the script around it, spliced in", async () => {
    async function Boxed({ label }: { label: Client<string> }) {
      const box = once(cs.lift((() => ({ label: (cs.splice((label))) }))()));
      return cs.lift((() => (cs.splice((box))).label)());
    }
    const outer = cs.lift((() => () => {
      const __cs_name = "n";
      return (cs.splice((<Boxed label={cs.lift((() => __cs_name)())} />)));
    })());
    await assert.rejects(
      () => bundle(outer),
      /Can't thread the capture `name`: .* A `once` script is made at the top of the bundle/,
    );
  });

  it("for what isn't a script", () => {
    assert.throws(() => once(createSignal), /`once` takes a script/);
    assert.throws(
      () => once("text" as unknown as Client<string>),
      /`once` takes a script/,
    );
  });
});
