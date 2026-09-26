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
            map: '{"version":3,"mappings":"eASmC,OAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC","names":[],"ignoreList":[],"sources":["indexing.test.tsx"]}',
            imports: [],
            exportAt: 0,
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
            map: '{"version":3,"mappings":"eAUmC,WAAK,CAAC,GAAG,CAAC","names":[],"ignoreList":[],"sources":["indexing.test.tsx"]}',
            imports: [],
            exportAt: 0,
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
            code: "export default () => ({\n  x: 1\n})[0];",
            map: '{"version":3,"mappings":"eAYmC,OAAC;EAAEA,CAAC,EAAE;AAAC,CAAE,EAAE,CAAC,CAAC","names":["x"],"ignoreList":[],"sources":["indexing.test.tsx"]}',
            imports: [],
            exportAt: 0,
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
            map: '{"version":3,"mappings":"eAamC,MAAC,CAAyB,CAAC,CAAC,CAAC","names":[],"ignoreList":[],"sources":["indexing.test.tsx"]}',
            imports: [],
            exportAt: 0,
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
          map: '{"version":3,"mappings":"eAmBS,OAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC","names":[],"ignoreList":[],"sources":["indexing.test.tsx"]}',
          imports: [],
          exportAt: 0,
        },
      ),
      cs.create(
        "kcu3tgkaz8ne:21:6",
        { params: [] },
        {
          code: "export default () => [5, 31, 7][1.5];",
          map: '{"version":3,"mappings":"eAoBS,OAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC","names":[],"ignoreList":[],"sources":["indexing.test.tsx"]}',
          imports: [],
          exportAt: 0,
        },
      ),
      cs.create(
        "kcu3tgkaz8ne:22:6",
        { params: [] },
        {
          code: "export default () => [5, 31, 7][-1];",
          map: '{"version":3,"mappings":"eAqBS,OAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC","names":[],"ignoreList":[],"sources":["indexing.test.tsx"]}',
          imports: [],
          exportAt: 0,
        },
      ),
      cs.create(
        "kcu3tgkaz8ne:23:6",
        { params: [] },
        {
          code: 'export default () => ({\n  x: 1\n})["y"];',
          map: '{"version":3,"mappings":"eAsBS,MAAC,CAAC;EAAEA,CAAC,EAAE;AAAC,CAAE,EAAgC,GAAG,CAAC","names":["x"],"ignoreList":[],"sources":["indexing.test.tsx"]}',
          imports: [],
          exportAt: 0,
        },
      ),
      cs.create(
        "kcu3tgkaz8ne:24:6",
        { params: [] },
        {
          code: 'export default () => "abc"[9];',
          map: '{"version":3,"mappings":"eAuBS,WAAK,CAAC,CAAC,CAAC","names":[],"ignoreList":[],"sources":["indexing.test.tsx"]}',
          imports: [],
          exportAt: 0,
        },
      ),
    ];
    for (const value of reads) {
      assert.equal(await evaluate(value), undefined);
    }
  });
});
