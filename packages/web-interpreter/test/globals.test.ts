import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defineGlobals } from "../dist/globals.js";

// No bundle is drawn here, so what the renderer is never matters.
const renderer = {} as Parameters<typeof defineGlobals>[0];

describe("the web client's globals", () => {
  it("defines an app's own beside them", () => {
    const global: { [name: string]: unknown } = {};
    const greet = () => "hello";
    defineGlobals(renderer, global, { greet });
    assert.equal(global["greet"], greet);
  });
});
