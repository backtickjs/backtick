import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createImport } from "@backtickjs/platform-sdk";
import { createClient } from "@backtickjs/solid-js/client";
import { createTesting } from "@backtickjs/solid-js/testing";
import { transform } from "@backtickjs/solid-js/transform";
// What a client provides beside Solid: a module an app adds, and the names it
// exports, imported the way Solid's own are.
const greet = createImport({ name: "greet", from: "app" });
const storage = createImport({
  name: "storage",
  from: "app",
});
const held = { greeting: "hei" };
const withApp = createTesting(
  createClient({
    app: {
      greet: () => "hello",
      storage: { get: (key) => held[key] ?? null },
    },
  }),
  transform,
);
const withoutApp = createTesting(createClient(), transform);
describe("a module an app provides", () => {
  // Reached by splicing the value `createImport` made, which a bundle reads
  // from the module the client registered under that specifier.
  it("is what the client registered under that specifier", async () => {
    assert.equal(
      await withApp.evaluate(
        cs.create(
          "1chgux0r8qw0m:33:40",
          { params: [{ kind: "splice", value: greet, bindings: [] }] },
          {
            code: "export default ($0) => $0()();",
            map: '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["target-builtins.test.tsx"],"names":[],"mappings":"eAgC2C,QAAA,IAAM,EAAE"}',
            imports: [],
            exportAt: 0,
          },
        ),
      ),
      "hello",
    );
  });
  it("is not there on a client that did not register it", async () => {
    await assert.rejects(
      withoutApp.evaluate(
        cs.create(
          "1chgux0r8qw0m:37:45",
          { params: [{ kind: "splice", value: greet, bindings: [] }] },
          {
            code: "export default ($0) => $0()();",
            map: '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["target-builtins.test.tsx"],"names":[],"mappings":"eAoCgD,QAAA,IAAM,EAAE"}',
            imports: [],
            exportAt: 0,
          },
        ),
      ),
      /greet/,
    );
  });
  it("holds what the module exports, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object.
    assert.equal(
      await withApp.evaluate(
        cs.create(
          "1chgux0r8qw0m:43:40",
          { params: [{ kind: "splice", value: storage, bindings: [] }] },
          {
            code: 'export default ($0) => $0().get("greeting");',
            map: '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["target-builtins.test.tsx"],"names":[],"mappings":"eA0C2C,QAAA,IAAQ,CAAC,GAAG,CAAC,UAAU,CAAC"}',
            imports: [],
            exportAt: 0,
          },
        ),
      ),
      "hei",
    );
  });
});
