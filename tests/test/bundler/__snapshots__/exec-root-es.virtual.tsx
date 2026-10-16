import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/es";
declare const createSignal: import("@backtickjs/core").Client<(typeof import("solid-js"))["createSignal"]>;
import { bundle } from "../evaluate.ts";

describe("execRoot, from @backtickjs/core/es", () => {
  it("runs an ES module, the page's import map answering it", async () => {
    const { code } = await bundle(cs.lift((() => {
      const [__cs_count, __cs_setCount] = (cs.splice((createSignal)))(1);
      __cs_setCount(__cs_count() + 1);
      return __cs_count();
    })()));
    assert.equal(await execRoot(code), 2);
  });
});
