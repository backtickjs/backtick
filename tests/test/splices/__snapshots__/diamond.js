import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler
// shares each script rather than re-expanding it per path, so the payload has
// one entry per level (linear) — not one per path, which would blow up as
// 2^depth.
const d0 = cs.create(
  "23y608t6y2wp3:10:11",
  { params: [] },
  () => ({
    type: "Literal",
    loc: { start: { line: 10, column: 14 }, end: { line: 10, column: 15 } },
    value: 1,
  }),
  "export default () => 1;",
  '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"eASc,MAAA,CAAC"}',
);
const d1 = cs.create(
  "23y608t6y2wp3:12:11",
  { params: [{ kind: "splice", value: d0, bindings: [] }] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 12, column: 14 }, end: { line: 14, column: 1 } },
    body: [
      {
        type: "ReturnStatement",
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 19 } },
        argument: {
          type: "BinaryExpression",
          loc: {
            start: { line: 13, column: 9 },
            end: { line: 13, column: 18 },
          },
          operator: "+",
          left: {
            type: "Splice",
            loc: {
              start: { line: 13, column: 9 },
              end: { line: 13, column: 12 },
            },
            param: 0,
          },
          right: {
            type: "Splice",
            loc: {
              start: { line: 13, column: 15 },
              end: { line: 13, column: 18 },
            },
            param: 0,
          },
        },
      },
    ],
  }),
  "export default ($0) => {\n    return $0() + $0();\n};",
  '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"eAWc;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC"}',
);
const d2 = cs.create(
  "23y608t6y2wp3:16:11",
  { params: [{ kind: "splice", value: d1, bindings: [] }] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 16, column: 14 }, end: { line: 18, column: 1 } },
    body: [
      {
        type: "ReturnStatement",
        loc: { start: { line: 17, column: 2 }, end: { line: 17, column: 19 } },
        argument: {
          type: "BinaryExpression",
          loc: {
            start: { line: 17, column: 9 },
            end: { line: 17, column: 18 },
          },
          operator: "+",
          left: {
            type: "Splice",
            loc: {
              start: { line: 17, column: 9 },
              end: { line: 17, column: 12 },
            },
            param: 0,
          },
          right: {
            type: "Splice",
            loc: {
              start: { line: 17, column: 15 },
              end: { line: 17, column: 18 },
            },
            param: 0,
          },
        },
      },
    ],
  }),
  "export default ($0) => {\n    return $0() + $0();\n};",
  '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"eAec;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC"}',
);
const d3 = cs.create(
  "23y608t6y2wp3:20:11",
  { params: [{ kind: "splice", value: d2, bindings: [] }] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 20, column: 14 }, end: { line: 22, column: 1 } },
    body: [
      {
        type: "ReturnStatement",
        loc: { start: { line: 21, column: 2 }, end: { line: 21, column: 19 } },
        argument: {
          type: "BinaryExpression",
          loc: {
            start: { line: 21, column: 9 },
            end: { line: 21, column: 18 },
          },
          operator: "+",
          left: {
            type: "Splice",
            loc: {
              start: { line: 21, column: 9 },
              end: { line: 21, column: 12 },
            },
            param: 0,
          },
          right: {
            type: "Splice",
            loc: {
              start: { line: 21, column: 15 },
              end: { line: 21, column: 18 },
            },
            param: 0,
          },
        },
      },
    ],
  }),
  "export default ($0) => {\n    return $0() + $0();\n};",
  '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"eAmBc;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC"}',
);
const d4 = cs.create(
  "23y608t6y2wp3:24:11",
  { params: [{ kind: "splice", value: d3, bindings: [] }] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 24, column: 14 }, end: { line: 26, column: 1 } },
    body: [
      {
        type: "ReturnStatement",
        loc: { start: { line: 25, column: 2 }, end: { line: 25, column: 19 } },
        argument: {
          type: "BinaryExpression",
          loc: {
            start: { line: 25, column: 9 },
            end: { line: 25, column: 18 },
          },
          operator: "+",
          left: {
            type: "Splice",
            loc: {
              start: { line: 25, column: 9 },
              end: { line: 25, column: 12 },
            },
            param: 0,
          },
          right: {
            type: "Splice",
            loc: {
              start: { line: 25, column: 15 },
              end: { line: 25, column: 18 },
            },
            param: 0,
          },
        },
      },
    ],
  }),
  "export default ($0) => {\n    return $0() + $0();\n};",
  '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"eAuBc;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC"}',
);
it("diamond", async (t) => {
  await snapshotCase(t, "diamond", d4);
});
