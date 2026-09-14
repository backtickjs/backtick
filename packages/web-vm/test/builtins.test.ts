import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { schema } from "@backtickjs/web-client/schema";
import { compileBuiltin } from "../dist/compileBuiltin.js";
import type { HostWindow } from "../dist/interpreter/ClientOptions.js";
import type { Instance } from "../dist/interpreter/Instance.js";

// What this client answers with, against what the web's schema says a script
// may reach: the language's names and the window. A name declared and not
// answered fails here rather than at the first bundle that reaches it; one
// answered and not declared does not build.

// Node's own globals are enough for a window: what is exercised below is that
// a name is answered, not what a browser does with it.
const instance = {
  window: globalThis as unknown as HostWindow,
} as Instance;

describe("what the web answers for", () => {
  it("answers for every name its schema declares", () => {
    for (const name of Object.keys(schema.builtins)) {
      assert.notEqual(
        compileBuiltin(instance, name),
        undefined,
        `\`${name}\` is declared and not answered`,
      );
    }
  });

  // One name, and everything else read off it — the way the DOM keeps them,
  // and the way a frame's `contentWindow` hands over the same interface.
  it("hands over what the window stands for", () => {
    const window = compileBuiltin(instance, "window") as unknown as Record<
      string,
      unknown
    >;
    for (const name of [
      "addEventListener",
      "removeEventListener",
      "postMessage",
      "setTimeout",
      "clearTimeout",
      "setInterval",
      "clearInterval",
    ]) {
      assert.equal(typeof window[name], "function", name);
    }
    const clock = window["performance"] as { now: () => number };
    assert.equal(typeof clock.now(), "number");
    const said = window["console"] as Record<string, unknown>;
    for (const name of ["log", "warn", "error"]) {
      assert.equal(typeof said[name], "function", `console.${name}`);
    }
  });

  it("reads through to the host's window, and hands over nothing else", () => {
    const window = compileBuiltin(instance, "window") as unknown as Record<
      string,
      unknown
    >;
    assert.equal(window["document"], undefined);
    assert.equal(window["fetch"], undefined);
  });
});
