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
          {
            code: 'export default () => [5, 31, 7]["0"];',
            map: '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"eASmC,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC"}',
          },
        ),
      ),
      5,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "kcu3tgkaz8ne:11:32",
          { params: [] },
          {
            code: 'export default () => "abc"["0"];',
            map: '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"eAUmC,MAAA,KAAK,CAAC,GAAG,CAAC"}',
          },
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
          {
            code: "export default () => ({ x: 1 })[0];",
            map: '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"eAYmC,MAAA,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC"}',
          },
        ),
      ),
      undefined,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "kcu3tgkaz8ne:14:32",
          { params: [] },
          {
            code: "export default () => 7[0];",
            map: '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"eAamC,MAAC,CAAyB,CAAC,CAAC,CAAC"}',
          },
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
        {
          code: "export default () => [5, 31, 7][9];",
          map: '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"eAmBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC"}',
        },
      ),
      cs.create(
        "kcu3tgkaz8ne:21:6",
        { params: [] },
        {
          code: "export default () => [5, 31, 7][1.5];",
          map: '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"eAoBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC"}',
        },
      ),
      cs.create(
        "kcu3tgkaz8ne:22:6",
        { params: [] },
        {
          code: "export default () => [5, 31, 7][-1];",
          map: '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"eAqBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC"}',
        },
      ),
      cs.create(
        "kcu3tgkaz8ne:23:6",
        { params: [] },
        {
          code: 'export default () => ({ x: 1 })["y"];',
          map: '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"eAsBS,MAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAA+B,CAAC,GAAG,CAAC"}',
        },
      ),
      cs.create(
        "kcu3tgkaz8ne:24:6",
        { params: [] },
        {
          code: 'export default () => "abc"[9];',
          map: '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["indexing.test.tsx"],"names":[],"mappings":"eAuBS,MAAA,KAAK,CAAC,CAAC,CAAC"}',
        },
      ),
    ];
    for (const value of reads) {
      assert.equal(await evaluate(value), undefined);
    }
  });
});
