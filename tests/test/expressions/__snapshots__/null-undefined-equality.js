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
          "() => null === null",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAQmC,MAAA,IAAI,KAAK,IAAI"}',
        ),
      ),
      true,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "169oizi6ociha:10:32",
          { params: [] },
          "() => undefined === undefined",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AASmC,MAAA,SAAS,KAAK,SAAS"}',
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
          "() => null !== undefined",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAamC,MAAA,IAAI,KAAK,SAAS"}',
        ),
      ),
      true,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "169oizi6ociha:15:32",
          { params: [] },
          "() => null === undefined",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAcmC,MAAA,IAAI,KAAK,SAAS"}',
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
          '($0, $1) => {\n    const names = ["a"];\n    return [\n        $0() === undefined,\n        $0() !== null,\n        $1() === null,\n        $1() !== undefined,\n        names[1] === undefined,\n        names[1] !== null,\n    ];\n}',
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAuBwB;IAChB,MAAM,KAAK,GAAG,CAAC,GAAG,CAAC,CAAC;IACpB,OAAO;QACL,IAAQ,KAAK,SAAS;QACtB,IAAQ,KAAK,IAAI;QACjB,IAAM,KAAK,IAAI;QACf,IAAM,KAAK,SAAS;QACpB,KAAK,CAAC,CAAC,CAAC,KAAK,SAAS;QACtB,KAAK,CAAC,CAAC,CAAC,KAAK,IAAI;KAClB,CAAC;AACJ,CAAC"}',
        ),
      ),
      [true, true, true, true, true, true],
    );
  });
});
