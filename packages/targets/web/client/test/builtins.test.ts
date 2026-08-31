import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { schema } from "@backtickjs/web-schema/schema";
import { builtins } from "../src/builtins.ts";

// What this client answers with, against what this target's schema says a
// script may reach. A name declared and not implemented, or implemented and not
// declared, fails here rather than at the first bundle that reaches it.
//
// The language's own names are not checked here: `js-interpreter` answers for
// those and its own suite holds it to them. What is this target's is this
// target's to answer.

describe("what this target adds", () => {
  it("answers for every name its schema declares", () => {
    const held = builtins as unknown as Record<string, unknown>;
    for (const name of Object.keys(schema.builtins)) {
      assert.ok(name in held, `\`${name}\` is declared and not answered`);
    }
  });

  it("declares every name it answers for", () => {
    for (const name of Object.keys(builtins)) {
      assert.ok(
        name in schema.builtins,
        `\`${name}\` is answered and not declared`,
      );
    }
  });

  // One name, and everything else read off it — the way the DOM keeps them,
  // and the way a frame's `contentWindow` hands over the same interface.
  it("hands over what the name stands for", () => {
    const held = builtins as unknown as { window: Record<string, unknown> };
    for (const name of [
      "addEventListener",
      "removeEventListener",
      "postMessage",
    ]) {
      assert.equal(typeof held.window[name], "function", name);
    }
    const clock = held.window["performance"] as { now: () => number };
    assert.equal(typeof clock.now(), "number");
    const said = held.window["console"] as Record<string, unknown>;
    for (const name of ["log", "warn", "error"]) {
      assert.equal(typeof said[name], "function", `console.${name}`);
    }
  });
});
