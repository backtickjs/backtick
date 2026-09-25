import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment) {
  return cs.create(
    "3cvzb2rrvx0i4:13:9",
    { params: [{ kind: "splice", value: fragment, bindings: [] }] },
    () => ({
      type: "ArrowFunctionExpression",
      loc: { start: { line: 13, column: 12 }, end: { line: 18, column: 3 } },
      params: [
        {
          type: "Identifier",
          loc: {
            start: { line: 13, column: 13 },
            end: { line: 13, column: 17 },
          },
          name: "flag",
          key: "flag$3cvzb2rrvx0i4$0",
        },
      ],
      body: {
        type: "BlockStatement",
        loc: { start: { line: 13, column: 31 }, end: { line: 18, column: 3 } },
        body: [
          {
            type: "IfStatement",
            loc: {
              start: { line: 14, column: 4 },
              end: { line: 16, column: 5 },
            },
            test: {
              type: "Identifier",
              loc: {
                start: { line: 14, column: 8 },
                end: { line: 14, column: 12 },
              },
              name: "flag",
              key: "flag$3cvzb2rrvx0i4$0",
            },
            consequent: {
              type: "BlockStatement",
              loc: {
                start: { line: 14, column: 14 },
                end: { line: 16, column: 5 },
              },
              body: [
                {
                  type: "ReturnStatement",
                  loc: {
                    start: { line: 15, column: 6 },
                    end: { line: 15, column: 23 },
                  },
                  argument: {
                    type: "Splice",
                    loc: {
                      start: { line: 15, column: 13 },
                      end: { line: 15, column: 22 },
                    },
                    param: 0,
                  },
                },
              ],
            },
            alternate: null,
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 17, column: 4 },
              end: { line: 17, column: 21 },
            },
            argument: {
              type: "Literal",
              loc: {
                start: { line: 17, column: 11 },
                end: { line: 17, column: 20 },
              },
              value: "skipped",
            },
          },
        ],
      },
      expression: false,
    }),
    'export default ($0) => (flag) => {\n    if (flag) {\n        return $0();\n    }\n    return "skipped";\n};',
    '{"version":3,"file":"splice-laziness.test.jsx","sourceRoot":"","sources":["splice-laziness.test.tsx"],"names":[],"mappings":"eAYY,QAAA,CAAC,IAAa,EAAE,EAAE;IAC1B,IAAI,IAAI,EAAE,CAAC;QACT,OAAO,IAAS,CAAC;IACnB,CAAC;IACD,OAAO,SAAS,CAAC;AACnB,CAAC"}',
  );
}
const ok = cs.create(
  "3cvzb2rrvx0i4:21:11",
  { params: [] },
  () => ({
    type: "Literal",
    loc: { start: { line: 21, column: 14 }, end: { line: 21, column: 25 } },
    value: "evaluated",
  }),
  'export default () => "evaluated";',
  '{"version":3,"file":"splice-laziness.test.jsx","sourceRoot":"","sources":["splice-laziness.test.tsx"],"names":[],"mappings":"eAoBc,MAAA,WAAW"}',
);
const broken = cs.create(
  "3cvzb2rrvx0i4:23:15",
  { params: [] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 23, column: 18 }, end: { line: 25, column: 1 } },
    body: [
      {
        type: "ThrowStatement",
        loc: { start: { line: 24, column: 2 }, end: { line: 24, column: 51 } },
        argument: {
          type: "Literal",
          loc: {
            start: { line: 24, column: 8 },
            end: { line: 24, column: 50 },
          },
          value: "the guarded fragment must never evaluate",
        },
      },
    ],
  }),
  'export default () => {\n    throw "the guarded fragment must never evaluate";\n};',
  '{"version":3,"file":"splice-laziness.test.jsx","sourceRoot":"","sources":["splice-laziness.test.tsx"],"names":[],"mappings":"eAsBkB;IAChB,MAAM,0CAA0C,CAAC;AACnD,CAAC"}',
);
it("spliceLaziness", async (t) => {
  await snapshotCase(
    t,
    "spliceLaziness",
    cs.create(
      "3cvzb2rrvx0i4:31:4",
      {
        params: [
          { kind: "splice", value: guard(ok), bindings: [] },
          { kind: "splice", value: guard(broken), bindings: [] },
        ],
      },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 31, column: 8 }, end: { line: 34, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 32, column: 6 },
              end: { line: 32, column: 31 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 32, column: 6 },
                end: { line: 32, column: 11 },
              },
              name: "taken",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 32, column: 13 },
                end: { line: 32, column: 31 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 32, column: 13 },
                  end: { line: 32, column: 25 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 32, column: 26 },
                    end: { line: 32, column: 30 },
                  },
                  value: true,
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 33, column: 6 },
              end: { line: 33, column: 38 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 33, column: 6 },
                end: { line: 33, column: 13 },
              },
              name: "skipped",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 33, column: 15 },
                end: { line: 33, column: 38 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 33, column: 15 },
                  end: { line: 33, column: 31 },
                },
                param: 1,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 33, column: 32 },
                    end: { line: 33, column: 37 },
                  },
                  value: false,
                },
              ],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
      "export default ($0, $1) => ({\n    taken: $0()(true),\n    skipped: $1()(false),\n});",
      '{"version":3,"file":"splice-laziness.test.jsx","sourceRoot":"","sources":["splice-laziness.test.tsx"],"names":[],"mappings":"eA8BO,YAAA,CAAC;IACF,KAAK,EAAE,IAAC,CAAY,IAAI,CAAC;IACzB,OAAO,EAAE,IAAC,CAAgB,KAAK,CAAC;CACjC,CAAC"}',
    ),
  );
});
