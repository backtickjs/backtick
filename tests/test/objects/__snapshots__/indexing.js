import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "@backtickjs/solid-js";
// What `a[k]` does with a key of another type: what JavaScript does.
describe("a read by key", () => {
  it("reads a key of another type as JavaScript does", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          "mwyhvf4weui7:11:32",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          '($splice0) => $splice0()(() => [5, 31, 7]["0"])',
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAUmC,cAAA,UAAW,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC"}',
        ),
      ),
      5,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "mwyhvf4weui7:12:32",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          '($splice0) => $splice0()(() => "abc"["0"])',
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAWmC,cAAA,UAAW,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,CAAC"}',
        ),
      ),
      "a",
    );
    assert.equal(
      // @ts-expect-error: an object's type names its keys
      await evaluate(
        cs.create(
          "mwyhvf4weui7:15:21",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          "($splice0) => $splice0()(() => ({ x: 1 })[0])",
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAcwB,cAAA,UAAW,CAAC,GAAG,EAAE,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC"}',
        ),
      ),
      undefined,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "mwyhvf4weui7:19:21",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          "($splice0) => $splice0()(() => 7[0])",
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAkBwB,cAAA,UAAW,CAAC,GAAG,EAAE,CAAE,CAAyB,CAAC,CAAC,CAAC,CAAC"}',
        ),
      ),
      undefined,
    );
  });
  // A well-typed key that finds nothing is absent, not an error.
  it("answers `undefined` for a well-typed key that finds nothing", async () => {
    const reads = [
      cs.create(
        "mwyhvf4weui7:27:6",
        { params: [] },
        "() => [5, 31, 7][9]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AA0BS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC"}',
      ),
      cs.create(
        "mwyhvf4weui7:28:6",
        { params: [] },
        "() => [5, 31, 7][1.5]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AA2BS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC"}',
      ),
      cs.create(
        "mwyhvf4weui7:29:6",
        { params: [] },
        "() => [5, 31, 7][-1]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AA4BS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC"}',
      ),
      cs.create(
        "mwyhvf4weui7:30:6",
        { params: [] },
        '() => ({ x: 1 })["y"]',
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AA6BS,MAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAA+B,CAAC,GAAG,CAAC"}',
      ),
      cs.create(
        "mwyhvf4weui7:31:6",
        { params: [] },
        '() => "abc"[9]',
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AA8BS,MAAA,KAAK,CAAC,CAAC,CAAC"}',
      ),
    ];
    for (const value of reads) {
      assert.equal(
        await evaluate(
          cs.create(
            "mwyhvf4weui7:34:34",
            {
              params: [
                { kind: "splice", value: createRoot, bindings: [] },
                { kind: "splice", value: value, bindings: [] },
              ],
            },
            "($splice0, $splice1) => $splice0()(() => $splice1())",
            '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAiCqC,wBAAA,UAAW,CAAC,GAAG,EAAE,CAAC,UAAM,CAAC"}',
          ),
        ),
        undefined,
      );
    }
  });
});
