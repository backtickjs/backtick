import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/es";
import { createSignal } from "@backtickjs/solid-js";
import { bundle } from "../evaluate.ts";

describe("execRoot, from @backtickjs/core/es", () => {
  it("runs an ES module, the page's import map answering it", async () => {
    const { code } = await bundle(cs`{
      const [count, setCount] = $createSignal(1);
      setCount(count() + 1);
      return count();
    }`);
    assert.equal(await execRoot(code), 2);
  });
});
