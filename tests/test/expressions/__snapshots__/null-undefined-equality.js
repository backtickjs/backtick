import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "solid-js";
// `null` and `undefined` are two values, each equal only to itself.
describe("null and undefined", () => {
  it("are each equal to themselves", async () => {
    assert.equal(
      createRoot(
        await evaluate(
          cs.create(
            "2ta5py37tqm4x:10:43",
            { params: [] },
            "() => () => null === null",
            '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAS8C,MAAA,GAAG,EAAE,CAAC,IAAI,KAAK,IAAI"}',
          ),
        ),
      ),
      true,
    );
    assert.equal(
      createRoot(
        await evaluate(
          cs.create(
            "2ta5py37tqm4x:11:43",
            { params: [] },
            "() => () => undefined === undefined",
            '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAU8C,MAAA,GAAG,EAAE,CAAC,SAAS,KAAK,SAAS"}',
          ),
        ),
      ),
      true,
    );
  });
  it("are not equal to each other", async () => {
    assert.equal(
      createRoot(
        await evaluate(
          cs.create(
            "2ta5py37tqm4x:15:43",
            { params: [] },
            "() => () => null !== undefined",
            '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAc8C,MAAA,GAAG,EAAE,CAAC,IAAI,KAAK,SAAS"}',
          ),
        ),
      ),
      true,
    );
    assert.equal(
      createRoot(
        await evaluate(
          cs.create(
            "2ta5py37tqm4x:16:43",
            { params: [] },
            "() => () => null === undefined",
            '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAe8C,MAAA,GAAG,EAAE,CAAC,IAAI,KAAK,SAAS"}',
          ),
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
      createRoot(
        await evaluate(
          cs.create(
            "2ta5py37tqm4x:26:23",
            {
              params: [
                { kind: "splice", value: nothing, bindings: [] },
                { kind: "splice", value: empty, bindings: [] },
              ],
            },
            '($splice0, $splice1) => () => {\n    const names = ["a"];\n    return [\n        $splice0() === undefined,\n        $splice0() !== null,\n        $splice1() === null,\n        $splice1() !== undefined,\n        names[1] === undefined,\n        names[1] !== null,\n    ];\n}',
            '{"version":3,"file":"null-undefined-equality.test.jsx","sourceRoot":"","sources":["expressions/null-undefined-equality.test.tsx"],"names":[],"mappings":"AAyB0B,wBAAA,GAAG,EAAE;IACrB,MAAM,KAAK,GAAG,CAAC,GAAG,CAAC,CAAC;IACpB,OAAO;QACL,UAAQ,KAAK,SAAS;QACtB,UAAQ,KAAK,IAAI;QACjB,UAAM,KAAK,IAAI;QACf,UAAM,KAAK,SAAS;QACpB,KAAK,CAAC,CAAC,CAAC,KAAK,SAAS;QACtB,KAAK,CAAC,CAAC,CAAC,KAAK,IAAI;KAClB,CAAC;AACJ,CAAC"}',
          ),
        ),
      ),
      [true, true, true, true, true, true],
    );
  });
});
