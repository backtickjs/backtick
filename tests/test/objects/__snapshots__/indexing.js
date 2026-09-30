import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { draw } from "@backtickjs/solid-js/testing";
import { createRoot } from "solid-js";
// What `a[k]` does with a key of another type: what JavaScript does.
describe("a read by key", () => {
  it("reads a key of another type as JavaScript does", async () => {
    assert.equal(
      createRoot(
        await draw(
          cs.create(
            "v6sr364epe7e:11:39",
            { params: [] },
            '() => () => [5, 31, 7]["0"]',
            '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAU0C,MAAA,GAAG,EAAE,CAAC,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC"}',
          ),
        ),
      ),
      5,
    );
    assert.equal(
      createRoot(
        await draw(
          cs.create(
            "v6sr364epe7e:12:39",
            { params: [] },
            '() => () => "abc"["0"]',
            '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAW0C,MAAA,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC"}',
          ),
        ),
      ),
      "a",
    );
    // @ts-expect-error: an object's type names its keys
    assert.equal(
      createRoot(
        await draw(
          cs.create(
            "v6sr364epe7e:14:39",
            { params: [] },
            "() => () => ({ x: 1 })[0]",
            '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAa0C,MAAA,GAAG,EAAE,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC"}',
          ),
        ),
      ),
      undefined,
    );
    assert.equal(
      createRoot(
        await draw(
          cs.create(
            "v6sr364epe7e:16:28",
            { params: [] },
            "() => () => 7[0]",
            '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAe+B,MAAA,GAAG,EAAE,CAAE,CAAyB,CAAC,CAAC,CAAC"}',
          ),
        ),
      ),
      undefined,
    );
  });
  // A well-typed key that finds nothing is absent, not an error.
  it("answers `undefined` for a well-typed key that finds nothing", async () => {
    const reads = [
      cs.create(
        "v6sr364epe7e:24:6",
        { params: [] },
        "() => [5, 31, 7][9]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAuBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC"}',
      ),
      cs.create(
        "v6sr364epe7e:25:6",
        { params: [] },
        "() => [5, 31, 7][1.5]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAwBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC"}',
      ),
      cs.create(
        "v6sr364epe7e:26:6",
        { params: [] },
        "() => [5, 31, 7][-1]",
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AAyBS,MAAA,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC"}',
      ),
      cs.create(
        "v6sr364epe7e:27:6",
        { params: [] },
        '() => ({ x: 1 })["y"]',
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AA0BS,MAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAA+B,CAAC,GAAG,CAAC"}',
      ),
      cs.create(
        "v6sr364epe7e:28:6",
        { params: [] },
        '() => "abc"[9]',
        '{"version":3,"file":"indexing.test.jsx","sourceRoot":"","sources":["objects/indexing.test.tsx"],"names":[],"mappings":"AA2BS,MAAA,KAAK,CAAC,CAAC,CAAC"}',
      ),
    ];
    for (const value of reads) {
      assert.equal(createRoot(await draw(() => value)), undefined);
    }
  });
});
