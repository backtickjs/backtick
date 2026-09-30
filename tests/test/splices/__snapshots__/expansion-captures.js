import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// A host function is declared once, as `$expn<n>`, and what its body reaches
// from outside itself arrives as a capture: an argument of an enclosing host
// function, or a binding an enclosing script hands the hole it fills.
// A render callback inside a host function, reading the function's argument:
// two expansions, the inner capturing the outer's argument.
const rows = (label) =>
  _jsx("ul", {
    children: _jsx(For, {
      each: cs.create(
        "d2vqxpxb54mo:14:15",
        { params: [] },
        "() => [1, 2]",
        '{"version":3,"file":"expansion-captures.test.jsx","sourceRoot":"","sources":["splices/expansion-captures.test.tsx"],"names":[],"mappings":"AAakB,MAAA,CAAC,CAAC,EAAE,CAAC,CAAC"}',
      ),
      children: (n) =>
        cs.create(
          "d2vqxpxb54mo:15:30",
          {
            params: [
              { kind: "splice", value: label, bindings: [] },
              { kind: "splice", value: n, bindings: [] },
            ],
          },
          "($splice0, $splice1) => <li>{$splice0()} {$splice1()}</li>",
          '{"version":3,"file":"expansion-captures.test.jsx","sourceRoot":"","sources":["splices/expansion-captures.test.tsx"],"names":[],"mappings":"AAciC,wBAAA,CAAC,EAAE,CAAC,CAAC,UAAQ,CAAE,CAAA,CAAC,UAAE,CAAC,EAAE,EAAE,CAAC"}',
        ),
    }),
  });
it("expansionCapturesArgument", async (t) => {
  await snapshotCase(
    t,
    "expansionCapturesArgument",
    cs.create(
      "d2vqxpxb54mo:21:53",
      { params: [{ kind: "splice", value: rows, bindings: [] }] },
      '($splice0) => $splice0()("row")',
      '{"version":3,"file":"expansion-captures.test.jsx","sourceRoot":"","sources":["splices/expansion-captures.test.tsx"],"names":[],"mappings":"AAoBwD,cAAA,UAAC,CAAO,KAAK,CAAC"}',
    ),
  );
});
// A host function written inside a script, whose script reads the enclosing
// script's binding: the declaration captures it.
it("expansionCapturesBinding", async (t) => {
  await snapshotCase(
    t,
    "expansionCapturesBinding",
    cs.create(
      "d2vqxpxb54mo:30:4",
      {
        params: [
          {
            kind: "splice",
            value: (n) =>
              cs.create(
                "d2vqxpxb54mo:32:43",
                {
                  params: [
                    { kind: "splice", value: n, bindings: [] },
                    { kind: "capture", key: "base$d2vqxpxb54mo$0" },
                  ],
                },
                "($splice0, $capture1) => $capture1 + $splice0($capture1)",
                '{"version":3,"file":"expansion-captures.test.jsx","sourceRoot":"","sources":["splices/expansion-captures.test.tsx"],"names":[],"mappings":"AA+B8C,yBAAA,SAAI,GAAG,mBAAE"}',
              ),
            bindings: ["base$d2vqxpxb54mo$0"],
          },
        ],
      },
      "($splice0) => {\n    const base = 10;\n    const add = $splice0(base);\n    return add(1) + add(2);\n}",
      '{"version":3,"file":"expansion-captures.test.jsx","sourceRoot":"","sources":["splices/expansion-captures.test.tsx"],"names":[],"mappings":"AA6BO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC;IAChB,MAAM,GAAG,GAAG,cAAC,CAAuC;IACpD,OAAO,GAAG,CAAC,CAAC,CAAC,GAAG,GAAG,CAAC,CAAC,CAAC,CAAC;AACzB,CAAC"}',
    ),
  );
});
