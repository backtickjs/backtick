import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects = cs.create(
  "3q2gz79xhvvfp:8:30",
  { splices: {}, captures: [] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 8, column: 33 }, end: { line: 10, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 9, column: 2 }, end: { line: 9, column: 14 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 9, column: 8 },
              end: { line: 9, column: 13 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 9, column: 8 },
                end: { line: 9, column: 9 },
              },
              name: "x",
              key: "x$3q2gz79xhvvfp$0",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 9, column: 12 },
                end: { line: 9, column: 13 },
              },
              value: 1,
            },
          },
        ],
      },
    ],
  }),
  "() => {\n    const x = 1;\n}",
  '{"version":3,"file":"action-composition.test.jsx","sourceRoot":"","sources":["action-composition.test.tsx"],"names":[],"mappings":"AAOiC;IAC/B,MAAM,CAAC,GAAG,CAAC,CAAC;AACd,CAAC,CAAA"}',
);
const composed = cs.create(
  "3q2gz79xhvvfp:12:31",
  { splices: { $effects: { value: effects, params: [] } }, captures: [] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 12, column: 34 }, end: { line: 14, column: 1 } },
    body: [
      {
        type: "ExpressionStatement",
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 11 } },
        expression: {
          type: "Splice",
          loc: {
            start: { line: 13, column: 2 },
            end: { line: 13, column: 10 },
          },
          key: "$effects",
        },
      },
    ],
  }),
  "$0 => {\n    $0();\n}",
  '{"version":3,"file":"action-composition.test.jsx","sourceRoot":"","sources":["action-composition.test.tsx"],"names":[],"mappings":"AAWkC;IAChC,IAAQ,CAAC;AACX,CAAC,CAAA"}',
);
it("actionComposition", async (t) => {
  await snapshotCase(
    t,
    "actionComposition",
    cs.create(
      "3q2gz79xhvvfp:20:4",
      { splices: { $composed: { value: composed, params: [] } }, captures: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 20, column: 7 }, end: { line: 22, column: 5 } },
        body: [
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 21, column: 6 },
              end: { line: 21, column: 16 },
            },
            expression: {
              type: "Splice",
              loc: {
                start: { line: 21, column: 6 },
                end: { line: 21, column: 15 },
              },
              key: "$composed",
            },
          },
        ],
      }),
      "$0 => {\n    $0();\n}",
      '{"version":3,"file":"action-composition.test.jsx","sourceRoot":"","sources":["action-composition.test.tsx"],"names":[],"mappings":"AAmBO;IACD,IAAS,CAAC;AACZ,CAAC,CAAA"}',
    ),
  );
});
