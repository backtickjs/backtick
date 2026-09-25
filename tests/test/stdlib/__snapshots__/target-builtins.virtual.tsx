import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import type { ClientValue } from "@backtickjs/core";
import { createBuiltin } from "@backtickjs/platform-sdk";
import { evaluate } from "@backtickjs/web-testing";

// What a client defines beside the web's globals: a name an app adds.

// Names an SDK or an app adds, as its generated code declares them.
const greet = createBuiltin<() => string>("greet");
const storage = createBuiltin<{ get: (key: string) => string | null }>(
  "storage",
);

describe("a global an app defines", () => {
  // What an SDK or an app adds: a name, reached by splicing the value
  // `createBuiltin` made, which a bundle reads as the global of that name.
  it("is what the client defined under that name", async () => {
    assert.equal(
      await evaluate(cs.lift(cs.splice((greet) satisfies typeof cs.Spliceable)()), { globals: { greet: () => "hello" } }),
      "hello",
    );
  });

  it("is not defined by a client that did not define it", async () => {
    // A bundle built against one client says so on another rather than
    // reading as absent, as a name nothing defined does in JavaScript.
    await assert.rejects(evaluate(cs.lift(cs.splice((greet) satisfies typeof cs.Spliceable)())), /greet is not defined/);
  });

  it("holds what the client defined, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object.
    const held = { greeting: "hei" } as Record<string, string>;
    assert.equal(
      await evaluate(cs.lift(cs.splice((storage) satisfies typeof cs.Spliceable).get("greeting")), {
        globals: {
          storage: { get: (key: ClientValue) => held[key as string] ?? null },
        },
      }),
      "hei",
    );
  });
});
