import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "@backtickjs/solid-js";
// `null` and `undefined` are two values, each equal only to itself.
describe("null and undefined", () => {
  it("are each equal to themselves", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          "dggvpbrq8knn:10:32",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          "($splice0) => $splice0()(() => null === null)",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AASmC,cAAA,UAAW,CAAC,GAAG,EAAE,CAAC,IAAI,KAAK,IAAI,CAAC"}',
        ),
      ),
      true,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "dggvpbrq8knn:12:21",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          "($splice0) => $splice0()(() => undefined === undefined)",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAWwB,cAAA,UAAW,CAAC,GAAG,EAAE,CAAC,SAAS,KAAK,SAAS,CAAC"}',
        ),
      ),
      true,
    );
  });
  it("are not equal to each other", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          "dggvpbrq8knn:19:21",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          "($splice0) => $splice0()(() => null !== undefined)",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAkBwB,cAAA,UAAW,CAAC,GAAG,EAAE,CAAC,IAAI,KAAK,SAAS,CAAC"}',
        ),
      ),
      true,
    );
    assert.equal(
      await evaluate(
        cs.create(
          "dggvpbrq8knn:23:21",
          { params: [{ kind: "splice", value: createRoot, bindings: [] }] },
          "($splice0) => $splice0()(() => null === undefined)",
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAsBwB,cAAA,UAAW,CAAC,GAAG,EAAE,CAAC,IAAI,KAAK,SAAS,CAAC"}',
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
          "dggvpbrq8knn:34:21",
          {
            params: [
              { kind: "splice", value: createRoot, bindings: [] },
              { kind: "splice", value: nothing, bindings: [] },
              { kind: "splice", value: empty, bindings: [] },
            ],
          },
          '($splice0, $splice1, $splice2) => $splice0()(() => {\n    const names = ["a"];\n    return [\n        $splice1() === undefined,\n        $splice1() !== null,\n        $splice2() === null,\n        $splice2() !== undefined,\n        names[1] === undefined,\n        names[1] !== null,\n    ];\n})',
          '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAiCwB,kCAAA,UAAW,CAAC,GAAG,EAAE;IACjC,MAAM,KAAK,GAAG,CAAC,GAAG,CAAC,CAAC;IACpB,OAAO;QACL,UAAQ,KAAK,SAAS;QACtB,UAAQ,KAAK,IAAI;QACjB,UAAM,KAAK,IAAI;QACf,UAAM,KAAK,SAAS;QACpB,KAAK,CAAC,CAAC,CAAC,KAAK,SAAS;QACtB,KAAK,CAAC,CAAC,CAAC,KAAK,IAAI;KAClB,CAAC;AACJ,CAAC,CAAC"}',
        ),
      ),
      [true, true, true, true, true, true],
    );
  });
});
