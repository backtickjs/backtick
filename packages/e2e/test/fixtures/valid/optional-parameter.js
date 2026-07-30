import { cs } from "@backtickjs/core";
// `?` marks a nullable parameter — sugar for `T | null`, not an optional
// argument: callers pass `null` explicitly, and `undefined` never arises.
const greet = cs.create(
  [5, 15, 7, 3],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [5, 18, 7, 2],
      [
        v.parameterDeclaration(
          [5, 19, 5, 32],
          v.identifier([5, 19, 5, 23], "name", "name$hlti23avj5mo$0"),
        ),
      ],
      v.block(
        [5, 37, 7, 2],
        [
          v.returnStatement(
            [6, 3, 6, 28],
            v.callExpression(
              [6, 10, 6, 27],
              v.propertyAccessExpression(
                [6, 10, 6, 22],
                v.identifier([6, 10, 6, 14], "name", "name$hlti23avj5mo$0"),
                true,
                "concat",
              ),
              false,
              [v.stringLiteral([6, 23, 6, 26], "!")],
            ),
          ),
        ],
      ),
    ),
);
// A function-typed annotation unions parenthesized: `(() => number) | null`.
const double = cs.create(
  [10, 16, 10, 27],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [10, 19, 10, 26],
      [],
      v.numericLiteral([10, 25, 10, 26], 2),
    ),
);
const call = cs.create(
  [12, 14, 14, 3],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [12, 17, 14, 2],
      [
        v.parameterDeclaration(
          [12, 18, 12, 35],
          v.identifier([12, 18, 12, 20], "cb", "cb$hlti23avj5mo$1"),
        ),
      ],
      v.block(
        [12, 40, 14, 2],
        [
          v.returnStatement(
            [13, 3, 13, 22],
            v.binaryExpression(
              [13, 10, 13, 21],
              v.callExpression(
                [13, 10, 13, 16],
                v.identifier([13, 10, 13, 12], "cb", "cb$hlti23avj5mo$1"),
                true,
                [],
              ),
              "??",
              v.numericLiteral([13, 20, 13, 21], 0),
            ),
          ),
        ],
      ),
    ),
);
export default cs.create(
  [16, 16, 21, 4],
  {
    version: "0.0.0",
    filePath: "optional-parameter.ts",
    fileHash: "hlti23avj5mo",
    kind: "value",
    splices: { $greet: greet, $call: call, $double: double },
    captures: [],
    spliceParams: { $greet: [], $call: [], $double: [] },
  },
  (v) =>
    v.objectLiteralExpression(
      [16, 20, 21, 2],
      [
        v.propertyAssignment(
          [17, 3, 17, 22],
          "named",
          v.callExpression(
            [17, 10, 17, 22],
            v.splice([17, 10, 17, 16], "$greet"),
            false,
            [v.stringLiteral([17, 17, 17, 21], "hi")],
          ),
        ),
        v.propertyAssignment(
          [18, 3, 18, 25],
          "explicit",
          v.callExpression(
            [18, 13, 18, 25],
            v.splice([18, 13, 18, 19], "$greet"),
            false,
            [v.nullLiteral([18, 20, 18, 24])],
          ),
        ),
        v.propertyAssignment(
          [19, 3, 19, 27],
          "supplied",
          v.callExpression(
            [19, 13, 19, 27],
            v.splice([19, 13, 19, 18], "$call"),
            false,
            [v.splice([19, 19, 19, 26], "$double")],
          ),
        ),
        v.propertyAssignment(
          [20, 3, 20, 24],
          "fallback",
          v.callExpression(
            [20, 13, 20, 24],
            v.splice([20, 13, 20, 18], "$call"),
            false,
            [v.nullLiteral([20, 19, 20, 23])],
          ),
        ),
      ],
    ),
);
