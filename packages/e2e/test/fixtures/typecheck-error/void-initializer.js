import { cs } from "@backtickjs/core";
// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.create(
  [5, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "void-initializer.ts",
    fileHash: "3hyzmfxyz75s4",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [5, 17, 8, 2],
      [],
      v.block(
        [5, 23, 8, 2],
        [
          v.variableDeclaration(
            [6, 3, 6, 13],
            v.identifier([6, 7, 6, 8], "n", "n$3hyzmfxyz75s4$0"),
            v.numericLiteral([6, 11, 6, 12], 0),
            "let",
          ),
          v.binaryExpression(
            [7, 3, 7, 8],
            v.identifier([7, 3, 7, 4], "n", "n$3hyzmfxyz75s4$0"),
            "=",
            v.numericLiteral([7, 7, 7, 8], 1),
          ),
        ],
      ),
    ),
);
const script = cs.create(
  [10, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "void-initializer.ts",
    fileHash: "3hyzmfxyz75s4",
    kind: "value",
    splices: { $ping: ping },
    captures: [],
    spliceParams: { $ping: [] },
  },
  (v) =>
    v.block(
      [10, 19, 13, 2],
      [
        v.variableDeclaration(
          [11, 3, 11, 21],
          v.identifier([11, 9, 11, 10], "x", "x$3hyzmfxyz75s4$1"),
          v.callExpression(
            [11, 13, 11, 20],
            v.splice([11, 13, 11, 18], "$ping"),
            false,
            [],
          ),
          "const",
        ),
        v.returnStatement(
          [12, 3, 12, 12],
          v.numericLiteral([12, 10, 12, 11], 1),
        ),
      ],
    ),
);
const action = cs.create(
  [15, 16, 17, 3],
  {
    version: "0.0.0",
    filePath: "void-initializer.ts",
    fileHash: "3hyzmfxyz75s4",
    kind: "action",
    splices: { $ping: ping },
    captures: [],
    spliceParams: { $ping: [] },
  },
  (v) =>
    v.block(
      [15, 19, 17, 2],
      [
        v.variableDeclaration(
          [16, 3, 16, 21],
          v.identifier([16, 9, 16, 10], "x", "x$3hyzmfxyz75s4$2"),
          v.callExpression(
            [16, 13, 16, 20],
            v.splice([16, 13, 16, 18], "$ping"),
            false,
            [],
          ),
          "const",
        ),
      ],
    ),
);
// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.create(
  [21, 15, 23, 3],
  {
    version: "0.0.0",
    filePath: "void-initializer.ts",
    fileHash: "3hyzmfxyz75s4",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [21, 18, 23, 2],
      [v.identifier([21, 19, 21, 23], "text", "text$3hyzmfxyz75s4$3")],
      v.block(
        [21, 36, 23, 2],
        [
          v.returnStatement(
            [22, 3, 22, 15],
            v.identifier([22, 10, 22, 14], "text", "text$3hyzmfxyz75s4$3"),
          ),
        ],
      ),
    ),
);
const wrongArgument = cs.create(
  [25, 23, 28, 3],
  {
    version: "0.0.0",
    filePath: "void-initializer.ts",
    fileHash: "3hyzmfxyz75s4",
    kind: "value",
    splices: { $label: label },
    captures: [],
    spliceParams: { $label: [] },
  },
  (v) =>
    v.block(
      [25, 26, 28, 2],
      [
        v.variableDeclaration(
          [26, 3, 26, 26],
          v.identifier([26, 9, 26, 10], "x", "x$3hyzmfxyz75s4$4"),
          v.callExpression(
            [26, 13, 26, 25],
            v.splice([26, 13, 26, 19], "$label"),
            false,
            [v.trueLiteral([26, 20, 26, 24])],
          ),
          "const",
        ),
        v.returnStatement(
          [27, 3, 27, 12],
          v.numericLiteral([27, 10, 27, 11], 1),
        ),
      ],
    ),
);
