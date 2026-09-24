import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler
// shares each script rather than re-expanding it per path, so the payload has
// one entry per level (linear) — not one per path, which would blow up as
// 2^depth.
const d0 = cs.create(
  { start: { line: 10, column: 11 }, end: { line: 10, column: 16 } },
  {
    filePath: "splices/diamond.test.tsx",
    fileHash: "23y608t6y2wp3",
    splices: {},
    captures: [],
  },
  () => ({
    type: "Literal",
    loc: { start: { line: 10, column: 14 }, end: { line: 10, column: 15 } },
    value: 1,
  }),
  "() => 1",
  '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"AASc,MAAA,CAAC,CAAA"}',
);
const d1 = cs.create(
  { start: { line: 12, column: 11 }, end: { line: 14, column: 2 } },
  {
    filePath: "splices/diamond.test.tsx",
    fileHash: "23y608t6y2wp3",
    splices: { $d0: { value: d0, params: [] } },
    captures: [],
  },
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
            key: "$d0",
          },
          right: {
            type: "Splice",
            loc: {
              start: { line: 13, column: 15 },
              end: { line: 13, column: 18 },
            },
            key: "$d0",
          },
        },
      },
    ],
  }),
  "$0 => {\n    return $0() + $0();\n}",
  '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"AAWc;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC,CAAA"}',
);
const d2 = cs.create(
  { start: { line: 16, column: 11 }, end: { line: 18, column: 2 } },
  {
    filePath: "splices/diamond.test.tsx",
    fileHash: "23y608t6y2wp3",
    splices: { $d1: { value: d1, params: [] } },
    captures: [],
  },
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
            key: "$d1",
          },
          right: {
            type: "Splice",
            loc: {
              start: { line: 17, column: 15 },
              end: { line: 17, column: 18 },
            },
            key: "$d1",
          },
        },
      },
    ],
  }),
  "$0 => {\n    return $0() + $0();\n}",
  '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"AAec;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC,CAAA"}',
);
const d3 = cs.create(
  { start: { line: 20, column: 11 }, end: { line: 22, column: 2 } },
  {
    filePath: "splices/diamond.test.tsx",
    fileHash: "23y608t6y2wp3",
    splices: { $d2: { value: d2, params: [] } },
    captures: [],
  },
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
            key: "$d2",
          },
          right: {
            type: "Splice",
            loc: {
              start: { line: 21, column: 15 },
              end: { line: 21, column: 18 },
            },
            key: "$d2",
          },
        },
      },
    ],
  }),
  "$0 => {\n    return $0() + $0();\n}",
  '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"AAmBc;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC,CAAA"}',
);
const d4 = cs.create(
  { start: { line: 24, column: 11 }, end: { line: 26, column: 2 } },
  {
    filePath: "splices/diamond.test.tsx",
    fileHash: "23y608t6y2wp3",
    splices: { $d3: { value: d3, params: [] } },
    captures: [],
  },
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
            key: "$d3",
          },
          right: {
            type: "Splice",
            loc: {
              start: { line: 25, column: 15 },
              end: { line: 25, column: 18 },
            },
            key: "$d3",
          },
        },
      },
    ],
  }),
  "$0 => {\n    return $0() + $0();\n}",
  '{"version":3,"file":"diamond.test.jsx","sourceRoot":"","sources":["diamond.test.tsx"],"names":[],"mappings":"AAuBc;IACZ,OAAO,IAAG,GAAG,IAAG,CAAC;AACnB,CAAC,CAAA"}',
);
it("diamond", async (t) => {
  await snapshotCase(t, "diamond", d4);
});
