import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { schema as platform } from "@backtickjs/platform-sdk/schema";
import { schema as web } from "@backtickjs/web-sdk/schema";
import { defineGlobals, globalOf } from "../dist/globals.js";
import type { Instance } from "../dist/Instance.js";

// What the web client defines, against what the schemas say a script may
// reach. A name declared and not defined fails here rather than at the first
// bundle that reaches it.

// No bundle is drawn here, so what the renderer is never matters.
function instanceOn(global: object): Instance {
  return { global } as unknown as Instance;
}

describe("the web client's globals", () => {
  it("defines every builtin the schemas declare but the realm's own", () => {
    const global = {};
    defineGlobals(instanceOn(global));
    const declared = [
      ...Object.keys(platform.builtins),
      ...Object.keys(web.builtins),
    ].filter((name) => name !== "window");
    for (const name of declared) {
      assert.ok(name in global, `\`${name}\` is declared and not defined`);
    }
  });

  it("defines an app's own beside them", () => {
    const global: { [name: string]: unknown } = {};
    const greet = () => "hello";
    defineGlobals(instanceOn(global), { greet });
    assert.equal(global["greet"], greet);
  });

  it("answers a name nothing defined as JavaScript does", () => {
    assert.throws(
      () => globalOf(instanceOn({}), "greet"),
      (error: unknown) =>
        error instanceof ReferenceError &&
        error.message === "greet is not defined",
    );
  });
});
