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
        "2qc2q8eqg8g22:14:15",
        { params: [] },
        "() => [1, 2]",
        '{"version":3,"file":"expansion-captures.test.jsx","sourceRoot":"","sources":["splices/expansion-captures.test.tsx"],"names":[],"mappings":"AAakB,MAAA,CAAC,CAAC,EAAE,CAAC,CAAC"}',
      ),
      children: (n) =>
        cs.create(
          "2qc2q8eqg8g22:16:8",
          {
            params: [
              { kind: "splice", value: label, bindings: [] },
              { kind: "splice", value: n, bindings: [] },
            ],
          },
          "($splice0, $splice1) => <li>\n          {$splice0()} {$splice1()}\n        </li>",
          '{"version":3,"file":"expansion-captures.test.jsx","sourceRoot":"","sources":["splices/expansion-captures.test.tsx"],"names":[],"mappings":"AAeW,wBAAA,CAAC,EAAE,CACJ;UAAA,CAAC,UAAM,CAAE,CAAA,CAAC,UAAE,CACd;QAAA,EAAE,EAAE,CAAC"}',
        ),
    }),
  });
it("expansionCapturesArgument", async (t) => {
  await snapshotCase(
    t,
    "expansionCapturesArgument",
    cs.create(
      "2qc2q8eqg8g22:25:53",
      { params: [{ kind: "splice", value: rows, bindings: [] }] },
      '($splice0) => $splice0()("row")',
      '{"version":3,"file":"expansion-captures.test.jsx","sourceRoot":"","sources":["splices/expansion-captures.test.tsx"],"names":[],"mappings":"AAwBwD,cAAA,UAAK,CAAC,KAAK,CAAC"}',
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
      "2qc2q8eqg8g22:34:4",
      {
        params: [
          {
            kind: "splice",
            value: (n) =>
              cs.create(
                "2qc2q8eqg8g22:36:43",
                {
                  params: [
                    { kind: "splice", value: n, bindings: [] },
                    { kind: "capture", key: "base$2qc2q8eqg8g22$0" },
                  ],
                },
                "($splice0, $capture1) => $capture1 + $splice0($capture1)",
                '{"version":3,"file":"expansion-captures.test.jsx","sourceRoot":"","sources":["splices/expansion-captures.test.tsx"],"names":[],"mappings":"AAmC8C,yBAAA,SAAI,GAAG,mBAAE"}',
              ),
            bindings: ["base$2qc2q8eqg8g22$0"],
          },
        ],
      },
      "($splice0) => {\n    const base = 10;\n    const add = $splice0(base);\n    return add(1) + add(2);\n}",
      '{"version":3,"file":"expansion-captures.test.jsx","sourceRoot":"","sources":["splices/expansion-captures.test.tsx"],"names":[],"mappings":"AAiCO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC;IAChB,MAAM,GAAG,GAAG,cAAC,CAAuC;IACpD,OAAO,GAAG,CAAC,CAAC,CAAC,GAAG,GAAG,CAAC,CAAC,CAAC,CAAC;AACzB,CAAC"}',
    ),
  );
});
