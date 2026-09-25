import { cs } from "@backtickjs/core";
// Typed code can't put an action in a container (see `Spliceable`), but an
// untyped caller can; the lowering backstop refuses to ship it.
const action = cs.create(
  "wf1ni21eddai:5:15",
  { params: [] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 5, column: 18 }, end: { line: 7, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 6, column: 2 }, end: { line: 6, column: 14 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 6, column: 8 },
              end: { line: 6, column: 13 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 6, column: 8 },
                end: { line: 6, column: 9 },
              },
              name: "x",
              key: "x$wf1ni21eddai$0",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 6, column: 12 },
                end: { line: 6, column: 13 },
              },
              value: 1,
            },
          },
        ],
      },
    ],
  }),
  "() => {\n    const x = 1;\n}",
  '{"version":3,"file":"action-member.test.jsx","sourceRoot":"","sources":["action-member.test.tsx"],"names":[],"mappings":"AAIkB;IAChB,MAAM,CAAC,GAAG,CAAC,CAAC;AACd,CAAC,CAAA"}',
);
export default cs.create(
  "wf1ni21eddai:9:15",
  { params: [{ kind: "splice", value: [action], bindings: [] }] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 9, column: 18 }, end: { line: 13, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 11, column: 2 }, end: { line: 11, column: 27 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 11, column: 8 },
              end: { line: 11, column: 26 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 11, column: 8 },
                end: { line: 11, column: 12 },
              },
              name: "list",
              key: "list$wf1ni21eddai$1",
            },
            init: {
              type: "Splice",
              loc: {
                start: { line: 11, column: 15 },
                end: { line: 11, column: 26 },
              },
              param: 0,
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 12, column: 2 }, end: { line: 12, column: 11 } },
        argument: {
          type: "Literal",
          loc: {
            start: { line: 12, column: 9 },
            end: { line: 12, column: 10 },
          },
          value: 1,
        },
      },
    ],
  }),
  "$0 => {\n    const list = $0();\n    return 1;\n}",
  '{"version":3,"file":"action-member.test.jsx","sourceRoot":"","sources":["action-member.test.tsx"],"names":[],"mappings":"AAQkB;IAEhB,MAAM,IAAI,GAAG,IAAC,CAAW;IACzB,OAAO,CAAC,CAAC;AACX,CAAC,CAAA"}',
);
