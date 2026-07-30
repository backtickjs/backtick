import { cs } from "@backtickjs/core";
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create(
  [5, 28, 8, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "action",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [5, 31, 8, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 13],
          v.identifier([6, 7, 6, 8], "n", "n$gyja921xjk87$0"),
          v.numericLiteral([6, 11, 6, 12], 0),
          "let",
        ),
        v.binaryExpression(
          [7, 3, 7, 8],
          v.identifier([7, 3, 7, 4], "n", "n$gyja921xjk87$0"),
          "=",
          v.numericLiteral([7, 7, 7, 8], 1),
        ),
      ],
    ),
);
const onTap = cs.create(
  [10, 45, 12, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "value",
    splices: { $beep: beep },
    captures: [],
    spliceParams: { $beep: [] },
  },
  (v) =>
    v.arrowFunction(
      [10, 48, 12, 2],
      [
        v.parameterDeclaration(
          [10, 49, 10, 59],
          v.identifier([10, 49, 10, 51], "id", "id$gyja921xjk87$1"),
        ),
      ],
      v.block([10, 64, 12, 2], [v.splice([11, 3, 11, 8], "$beep")]),
    ),
);
export default cs.create(
  [14, 16, 20, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "value",
    splices: { $onTap: onTap },
    captures: [],
    spliceParams: { $onTap: [] },
  },
  (v) =>
    v.block(
      [14, 19, 20, 2],
      [
        v.variableDeclaration(
          [15, 3, 18, 5],
          v.identifier([15, 9, 15, 17], "handlers", "handlers$gyja921xjk87$2"),
          v.objectLiteralExpression(
            [15, 20, 18, 4],
            [
              v.propertyAssignment(
                [16, 5, 16, 16],
                "tap",
                v.splice([16, 10, 16, 16], "$onTap"),
              ),
              v.propertyAssignment(
                [17, 5, 17, 17],
                "hold",
                v.splice([17, 11, 17, 17], "$onTap"),
              ),
            ],
          ),
          "const",
        ),
        v.returnStatement(
          [19, 3, 19, 19],
          v.identifier([19, 10, 19, 18], "handlers", "handlers$gyja921xjk87$2"),
        ),
      ],
    ),
);
