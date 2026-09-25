import { cs, state } from "@backtickjs/core";
// A host object with behaviour reaching a cell, refused where it is written.
//
// A cell is the one place a splice lands with nothing waiting for it: every
// other position has a bound — the binding, the receiver a member is read off,
// the operator it stands beside — and `$state` takes its initial unbound, so
// that the width the host gave the value survives. `State<Date>` is a
// `ClientHandle` and a `ClientHandle` is a client value, so the binding it
// lands in would take it and the bundle would be the first to say no.
//
// What says no here is the splice itself: what it answers with is checked
// against `ClientUnknown`, which a `Date` is not.
const host = new Date();
export default cs.create(
  "1mjtyrwg34xe9:16:15",
  {
    params: [
      { kind: "splice", value: state, bindings: [] },
      { kind: "splice", value: host, bindings: [] },
    ],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 16, column: 18 }, end: { line: 21, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 18, column: 2 }, end: { line: 18, column: 29 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 18, column: 8 },
              end: { line: 18, column: 28 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 18, column: 8 },
                end: { line: 18, column: 12 },
              },
              name: "held",
              key: "held$1mjtyrwg34xe9$0",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 18, column: 15 },
                end: { line: 18, column: 28 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 18, column: 15 },
                  end: { line: 18, column: 21 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Splice",
                  loc: {
                    start: { line: 18, column: 22 },
                    end: { line: 18, column: 27 },
                  },
                  param: 1,
                },
              ],
              optional: false,
            },
          },
        ],
      },
      {
        type: "ExpressionStatement",
        loc: { start: { line: 20, column: 2 }, end: { line: 20, column: 18 } },
        expression: {
          type: "CallExpression",
          loc: {
            start: { line: 20, column: 2 },
            end: { line: 20, column: 17 },
          },
          callee: {
            type: "MemberExpression",
            loc: {
              start: { line: 20, column: 2 },
              end: { line: 20, column: 10 },
            },
            object: {
              type: "Identifier",
              loc: {
                start: { line: 20, column: 2 },
                end: { line: 20, column: 6 },
              },
              name: "held",
              key: "held$1mjtyrwg34xe9$0",
            },
            property: {
              type: "Identifier",
              loc: {
                start: { line: 20, column: 7 },
                end: { line: 20, column: 10 },
              },
              name: "set",
            },
            computed: false,
            optional: false,
          },
          arguments: [
            {
              type: "Splice",
              loc: {
                start: { line: 20, column: 11 },
                end: { line: 20, column: 16 },
              },
              param: 1,
            },
          ],
          optional: false,
        },
      },
    ],
  }),
  "export default ($0, $1) => {\n    const held = $0()($1());\n    held.set($1());\n};",
  '{"version":3,"file":"state-holds-host-object.test.jsx","sourceRoot":"","sources":["state-holds-host-object.test.tsx"],"names":[],"mappings":"eAekB;IAEhB,MAAM,IAAI,GAAG,IAAM,CAAC,IAAK,CAAC,CAAC;IAE3B,IAAI,CAAC,GAAG,CAAC,IAAK,CAAC,CAAC;AAClB,CAAC"}',
);
