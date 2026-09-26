import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?` marks an optional parameter: a caller may omit it or pass `undefined`,
// and either way it binds `undefined`. `null` is a value of its own and not
// accepted here.
const greet = cs.create(
  "1i6s8vesd5nbi:8:14",
  { params: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 8, column: 17 }, end: { line: 10, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 8, column: 18 }, end: { line: 8, column: 22 } },
        name: "name",
        key: "name$1i6s8vesd5nbi$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 8, column: 36 }, end: { line: 10, column: 1 } },
      body: [
        {
          type: "ReturnStatement",
          loc: { start: { line: 9, column: 2 }, end: { line: 9, column: 27 } },
          argument: {
            type: "ChainExpression",
            loc: {
              start: { line: 9, column: 9 },
              end: { line: 9, column: 26 },
            },
            expression: {
              type: "CallExpression",
              loc: {
                start: { line: 9, column: 9 },
                end: { line: 9, column: 26 },
              },
              callee: {
                type: "MemberExpression",
                loc: {
                  start: { line: 9, column: 9 },
                  end: { line: 9, column: 21 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 9, column: 9 },
                    end: { line: 9, column: 13 },
                  },
                  name: "name",
                  key: "name$1i6s8vesd5nbi$0",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 9, column: 15 },
                    end: { line: 9, column: 21 },
                  },
                  name: "concat",
                },
                computed: false,
                optional: true,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 9, column: 22 },
                    end: { line: 9, column: 25 },
                  },
                  value: "!",
                },
              ],
              optional: false,
            },
          },
        },
      ],
    },
    expression: false,
  }),
  {
    code: 'export default () => (name) => {\n    return name?.concat("!");\n};',
    map: '{"version":3,"file":"optional-parameter.test.jsx","sourceRoot":"","sources":["optional-parameter.test.tsx"],"names":[],"mappings":"eAOiB,MAAA,CAAC,IAAa,EAAE,EAAE;IACjC,OAAO,IAAI,EAAE,MAAM,CAAC,GAAG,CAAC,CAAC;AAC3B,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
// A function-typed annotation unions parenthesized: `(() => number) |
// undefined`.
const double = cs.create(
  "1i6s8vesd5nbi:14:15",
  { params: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 14, column: 18 }, end: { line: 14, column: 25 } },
    params: [],
    body: {
      type: "Literal",
      loc: { start: { line: 14, column: 24 }, end: { line: 14, column: 25 } },
      value: 2,
    },
    expression: true,
  }),
  {
    code: "export default () => () => 2;",
    map: '{"version":3,"file":"optional-parameter.test.jsx","sourceRoot":"","sources":["optional-parameter.test.tsx"],"names":[],"mappings":"eAakB,MAAA,GAAG,EAAE,CAAC,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
const callIfGiven = cs.create(
  "1i6s8vesd5nbi:16:20",
  { params: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 16, column: 23 }, end: { line: 18, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 16, column: 24 }, end: { line: 16, column: 26 } },
        name: "cb",
        key: "cb$1i6s8vesd5nbi$1",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 16, column: 46 }, end: { line: 18, column: 1 } },
      body: [
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 17, column: 2 },
            end: { line: 17, column: 21 },
          },
          argument: {
            type: "LogicalExpression",
            loc: {
              start: { line: 17, column: 9 },
              end: { line: 17, column: 20 },
            },
            operator: "??",
            left: {
              type: "ChainExpression",
              loc: {
                start: { line: 17, column: 9 },
                end: { line: 17, column: 15 },
              },
              expression: {
                type: "CallExpression",
                loc: {
                  start: { line: 17, column: 9 },
                  end: { line: 17, column: 15 },
                },
                callee: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 9 },
                    end: { line: 17, column: 11 },
                  },
                  name: "cb",
                  key: "cb$1i6s8vesd5nbi$1",
                },
                arguments: [],
                optional: true,
              },
            },
            right: {
              type: "Literal",
              loc: {
                start: { line: 17, column: 19 },
                end: { line: 17, column: 20 },
              },
              value: 0,
            },
          },
        },
      ],
    },
    expression: false,
  }),
  {
    code: "export default () => (cb) => {\n    return cb?.() ?? 0;\n};",
    map: '{"version":3,"file":"optional-parameter.test.jsx","sourceRoot":"","sources":["optional-parameter.test.tsx"],"names":[],"mappings":"eAeuB,MAAA,CAAC,EAAiB,EAAE,EAAE;IAC3C,OAAO,EAAE,EAAE,EAAE,IAAI,CAAC,CAAC;AACrB,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
it("optionalParameter", async (t) => {
  await snapshotCase(
    t,
    "optionalParameter",
    cs.create(
      "1i6s8vesd5nbi:24:4",
      {
        params: [
          { kind: "splice", value: greet, bindings: [] },
          { kind: "splice", value: callIfGiven, bindings: [] },
          { kind: "splice", value: double, bindings: [] },
        ],
      },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 24, column: 8 }, end: { line: 31, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 25, column: 6 },
              end: { line: 25, column: 25 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 25, column: 6 },
                end: { line: 25, column: 11 },
              },
              name: "named",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 25, column: 13 },
                end: { line: 25, column: 25 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 25, column: 13 },
                  end: { line: 25, column: 19 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 25, column: 20 },
                    end: { line: 25, column: 24 },
                  },
                  value: "hi",
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
              start: { line: 26, column: 6 },
              end: { line: 26, column: 33 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 26, column: 6 },
                end: { line: 26, column: 14 },
              },
              name: "explicit",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 26, column: 16 },
                end: { line: 26, column: 33 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 26, column: 16 },
                  end: { line: 26, column: 22 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 26, column: 23 },
                    end: { line: 26, column: 32 },
                  },
                  name: "undefined",
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
              start: { line: 27, column: 6 },
              end: { line: 27, column: 23 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 27, column: 6 },
                end: { line: 27, column: 13 },
              },
              name: "omitted",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 27, column: 15 },
                end: { line: 27, column: 23 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 27, column: 15 },
                  end: { line: 27, column: 21 },
                },
                param: 0,
              },
              arguments: [],
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
              start: { line: 28, column: 6 },
              end: { line: 28, column: 37 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 28, column: 6 },
                end: { line: 28, column: 14 },
              },
              name: "supplied",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 28, column: 16 },
                end: { line: 28, column: 37 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 28, column: 16 },
                  end: { line: 28, column: 28 },
                },
                param: 1,
              },
              arguments: [
                {
                  type: "Splice",
                  loc: {
                    start: { line: 28, column: 29 },
                    end: { line: 28, column: 36 },
                  },
                  param: 2,
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
              start: { line: 29, column: 6 },
              end: { line: 29, column: 39 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 29, column: 6 },
                end: { line: 29, column: 14 },
              },
              name: "fallback",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 29, column: 16 },
                end: { line: 29, column: 39 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 29, column: 16 },
                  end: { line: 29, column: 28 },
                },
                param: 1,
              },
              arguments: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 29, column: 29 },
                    end: { line: 29, column: 38 },
                  },
                  name: "undefined",
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
              start: { line: 30, column: 6 },
              end: { line: 30, column: 37 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 30, column: 6 },
                end: { line: 30, column: 21 },
              },
              name: "omittedCallback",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 30, column: 23 },
                end: { line: 30, column: 37 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 30, column: 23 },
                  end: { line: 30, column: 35 },
                },
                param: 1,
              },
              arguments: [],
              optional: false,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
      {
        code: 'export default ($0, $1, $2) => ({\n    named: $0()("hi"),\n    explicit: $0()(undefined),\n    omitted: $0()(),\n    supplied: $1()($2()),\n    fallback: $1()(undefined),\n    omittedCallback: $1()(),\n});',
        map: '{"version":3,"file":"optional-parameter.test.jsx","sourceRoot":"","sources":["optional-parameter.test.tsx"],"names":[],"mappings":"eAuBO,gBAAA,CAAC;IACF,KAAK,EAAE,IAAM,CAAC,IAAI,CAAC;IACnB,QAAQ,EAAE,IAAM,CAAC,SAAS,CAAC;IAC3B,OAAO,EAAE,IAAM,EAAE;IACjB,QAAQ,EAAE,IAAY,CAAC,IAAO,CAAC;IAC/B,QAAQ,EAAE,IAAY,CAAC,SAAS,CAAC;IACjC,eAAe,EAAE,IAAY,EAAE;CAChC,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
