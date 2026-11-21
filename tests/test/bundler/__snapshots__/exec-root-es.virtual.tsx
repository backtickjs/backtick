import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/es";
declare const { createSignal }: import("@backtickjs/core").ClientModule<typeof import("solid-js")>;

describe("execRoot, from @backtickjs/core/es", () => {
  it("runs an ES module, the page's import map answering it", async () => {
    const built = await bundler.build({
      input: cs.lift((() => {
        const [__cs_count, __cs_setCount] = (cs.splice((createSignal)))(1);
        __cs_setCount(__cs_count() + 1);
        return __cs_count();
      })()),
      modules: { "solid-js": "1.9.14" },
    });
    const { code } = built.generate({ format: "es" });
    assert.equal(await execRoot(code), 2);
  });
});
