import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createImport } from "@backtickjs/platform-sdk";
import { createClient } from "@backtickjs/solid-js/client";
import { createTesting } from "@backtickjs/solid-js/testing";

// What a client provides beside Solid: a module an app adds, and the names it
// exports, imported the way Solid's own are.
const greet = createImport<() => string>({ name: "greet", from: "app" });
const storage = createImport<{ get: (key: string) => string | null }>({
  name: "storage",
  from: "app",
});

const held: Record<string, string> = { greeting: "hei" };
const withApp = createTesting(
  createClient({
    app: {
      greet: () => "hello",
      storage: { get: (key: string) => held[key] ?? null },
    },
  }),
);
const withoutApp = createTesting(createClient());

describe("a module an app provides", () => {
  // Reached by splicing the value `createImport` made, which a bundle reads
  // from the module the client registered under that specifier.
  it("is what the client registered under that specifier", async () => {
    assert.equal(await withApp.evaluate(cs.lift(cs.splice((greet) satisfies typeof cs.Spliceable)())), "hello");
  });

  it("is not there on a client that did not register it", async () => {
    await assert.rejects(withoutApp.evaluate(cs.lift(cs.splice((greet) satisfies typeof cs.Spliceable)())), /greet/);
  });

  it("holds what the module exports, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object.
    assert.equal(await withApp.evaluate(cs.lift(cs.splice((storage) satisfies typeof cs.Spliceable).get("greeting"))), "hei");
  });
});
