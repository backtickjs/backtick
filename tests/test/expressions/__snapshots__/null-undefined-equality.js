import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "@backtickjs/solid-js/testing";
// `null` and `undefined` are two values, each equal only to itself.
describe("null and undefined", () => {
  it("are each equal to themselves", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          "169oizi6ociha:9:32",
          { params: [] },
          {
            code: "export default () => null === null;",
            map: '{"version":3,"mappings":"eAQmC,UAAI,KAAK,IAAI","names":[],"ignoreList":[],"sources":["null-undefined-equality.test.tsx"]}',
            imports: [],
            exportAt: 0,
          },
        ),
      ),
      true,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "169oizi6ociha:10:32",
          { params: [] },
          {
            code: "export default () => undefined === undefined;",
            map: '{"version":3,"mappings":"eASmC,MAAAA,SAAS,KAAKA,SAAS","names":["undefined"],"ignoreList":[],"sources":["null-undefined-equality.test.tsx"]}',
            imports: [],
            exportAt: 0,
          },
        ),
      ),
      true,
    );
  });
  it("are not equal to each other", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          "169oizi6ociha:14:32",
          { params: [] },
          {
            code: "export default () => null !== undefined;",
            map: '{"version":3,"mappings":"eAamC,UAAI,KAAKA,SAAS","names":["undefined"],"ignoreList":[],"sources":["null-undefined-equality.test.tsx"]}',
            imports: [],
            exportAt: 0,
          },
        ),
      ),
      true,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "169oizi6ociha:15:32",
          { params: [] },
          {
            code: "export default () => null === undefined;",
            map: '{"version":3,"mappings":"eAcmC,UAAI,KAAKA,SAAS","names":["undefined"],"ignoreList":[],"sources":["null-undefined-equality.test.tsx"]}',
            imports: [],
            exportAt: 0,
          },
        ),
      ),
      false,
    );
  });
  // The same holds wherever the value came from: a splice, or a read past
  // the end of an array.
  it("compare the same when they arrive another way", async () => {
    const nothing = undefined;
    const empty = null;
    assert.deepEqual(
      await evaluate(
        cs.create(
          "169oizi6ociha:24:21",
          {
            params: [
              { kind: "splice", value: nothing, bindings: [] },
              { kind: "splice", value: empty, bindings: [] },
            ],
          },
          {
            code: 'export default ($0, $1) => {\n  const names = ["a"];\n  return [$0() === undefined, $0() !== null, $1() === null, $1() !== undefined, names[1] === undefined, names[1] !== null];\n};',
            map: '{"version":3,"mappings":"eAuBwB,CAAAA,EAAA,EAAAC,EAAA;EAChB,MAAMC,KAAK,GAAG,CAAC,GAAG,CAAC;EACnB,OAAO,CACLF,EAAA,EAAQ,KAAKG,SAAS,EACtBH,EAAA,EAAQ,KAAK,IAAI,EACjBC,EAAA,EAAM,KAAK,IAAI,EACfA,EAAA,EAAM,KAAKE,SAAS,EACpBD,KAAK,CAAC,CAAC,CAAC,KAAKC,SAAS,EACtBD,KAAK,CAAC,CAAC,CAAC,KAAK,IAAI,CAClB;AACH,CAAC","names":["$0","$1","names","undefined"],"ignoreList":[],"sources":["null-undefined-equality.test.tsx"]}',
            imports: [],
            exportAt: 0,
          },
        ),
      ),
      [true, true, true, true, true, true],
    );
  });
});
