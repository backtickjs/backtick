import { cs } from "@backtickjs/core";
// A statement discards its expression, which is only silent for `void` — an
// action's result. Discarding a value is a mistake; calling an action is
// the point.
const getValue = cs.create(
  [6, 18, 8, 3],
  {
    version: "0.0.0",
    filePath: "discarded-value.ts",
    fileHash: "1y1jdbv3pfwln",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [6, 21, 8, 2],
      [],
      v.block(
        [6, 27, 8, 2],
        [v.returnStatement([7, 3, 7, 12], v.numericLiteral([7, 10, 7, 11], 1))],
      ),
    ),
);
const ping = cs.create(
  [10, 14, 13, 3],
  {
    version: "0.0.0",
    filePath: "discarded-value.ts",
    fileHash: "1y1jdbv3pfwln",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [10, 17, 13, 2],
      [],
      v.block(
        [10, 23, 13, 2],
        [
          v.variableDeclaration(
            [11, 3, 11, 13],
            v.identifier([11, 7, 11, 8], "n", "n$1y1jdbv3pfwln$0"),
            v.numericLiteral([11, 11, 11, 12], 0),
            "let",
          ),
          v.binaryExpression(
            [12, 3, 12, 8],
            v.identifier([12, 3, 12, 4], "n", "n$1y1jdbv3pfwln$0"),
            "=",
            v.numericLiteral([12, 7, 12, 8], 1),
          ),
        ],
      ),
    ),
);
const action = cs.create(
  [15, 16, 18, 3],
  {
    version: "0.0.0",
    filePath: "discarded-value.ts",
    fileHash: "1y1jdbv3pfwln",
    kind: "action",
    splices: { $ping: ping, $getValue: getValue },
    captures: [],
    spliceParams: { $ping: [], $getValue: [] },
  },
  (v) =>
    v.block(
      [15, 19, 18, 2],
      [
        v.callExpression(
          [16, 3, 16, 10],
          v.splice([16, 3, 16, 8], "$ping"),
          false,
          [],
        ),
        v.callExpression(
          [17, 3, 17, 14],
          v.splice([17, 3, 17, 12], "$getValue"),
          false,
          [],
        ),
      ],
    ),
);
