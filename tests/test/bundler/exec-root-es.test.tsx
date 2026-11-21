import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/es";
import { createSignal } from "solid-js" with { backtick: "client" };

describe("execRoot, from @backtickjs/core/es", () => {
  it("runs an ES module, the page's import map answering it", async () => {
    const built = await bundler.build({
      input: cs`{
        const [count, setCount] = $createSignal(1);
        setCount(count() + 1);
        return count();
      }`,
      modules: { "solid-js": "1.9.14" },
    });
    const { code } = built.generate({ format: "es" });
    assert.equal(await execRoot(code), 2);
  });
});
