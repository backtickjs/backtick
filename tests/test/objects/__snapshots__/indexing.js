import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "@backtickjs/solid-js/testing";
// What `a[k]` does with a key of another type: what JavaScript does.
describe("a read by key", () => {
  it("reads a key of another type as JavaScript does", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          "kcu3tgkaz8ne:10:32",
          { params: [] },
          '() => [5, 31, 7]["0"]',
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AASmC,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC"}',
        ),
      ),
      5,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "kcu3tgkaz8ne:11:32",
          { params: [] },
          '() => "abc"["0"]',
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAUmC,MAAA,KAAK,CAAC,GAAG,CAAC"}',
        ),
      ),
      "a",
    );
    // @ts-expect-error: an object's type names its keys
    assert.equal(
      await evaluate(
        cs.create(
          "kcu3tgkaz8ne:13:32",
          { params: [] },
          "() => ({ x: 1 })[0]",
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAYmC,MAAA,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC"}',
        ),
      ),
      undefined,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "kcu3tgkaz8ne:14:32",
          { params: [] },
          "() => 7[0]",
          '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAamC,MAAC,CAAyB,CAAC,CAAC,CAAC"}',
        ),
      ),
      undefined,
    );
  });
  // A well-typed key that finds nothing is absent, not an error.
  it("answers `undefined` for a well-typed key that finds nothing", async () => {
    const reads = [
      cs.create(
        "kcu3tgkaz8ne:20:6",
        { params: [] },
        "() => [5, 31, 7][9]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAmBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC"}',
      ),
      cs.create(
        "kcu3tgkaz8ne:21:6",
        { params: [] },
        "() => [5, 31, 7][1.5]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAoBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC"}',
      ),
      cs.create(
        "kcu3tgkaz8ne:22:6",
        { params: [] },
        "() => [5, 31, 7][-1]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAqBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC"}',
      ),
      cs.create(
        "kcu3tgkaz8ne:23:6",
        { params: [] },
        '() => ({ x: 1 })["y"]',
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAsBS,MAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAA+B,CAAC,GAAG,CAAC"}',
      ),
      cs.create(
        "kcu3tgkaz8ne:24:6",
        { params: [] },
        '() => "abc"[9]',
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAuBS,MAAA,KAAK,CAAC,CAAC,CAAC"}',
      ),
    ];
    for (const value of reads) {
      assert.equal(await evaluate(value), undefined);
    }
  });
});
