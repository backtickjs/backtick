import { cs } from "@backtickjs/core";
// Narrowing must survive the boolean-condition checks: the tested condition
// stays in place in the virtual code (its check reads a sequenced
// duplicate), so `text !== null` still narrows `text` in the branch it
// guards and from a `&&` left operand into the right. The conditions cover
// each checked shape: a bare boolean identifier, a braced splice (whose
// duplicate re-renders the host expression), and comparison/`&&` forms that
// are boolean by construction and need no check.
const flags = {
  strict: cs.create(
    [10, 25, 10, 33],
    {
      version: "0.0.0",
      filePath: "condition-narrowing.ts",
      fileHash: "3ciy5yb38f51h",
      kind: "value",
      splices: {},
      captures: [],
      spliceParams: {},
    },
    (v) => v.booleanLiteral([10, 28, 10, 32], true),
  ),
};
const label = cs.create(
  [12, 72, 23, 3],
  {
    version: "0.0.0",
    filePath: "condition-narrowing.ts",
    fileHash: "3ciy5yb38f51h",
    kind: "value",
    splices: { $0splice0: flags.strict },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  (v) =>
    v.arrowFunction(
      [12, 75, 23, 2],
      [
        v.identifier([13, 3, 13, 7], "text", "text$3ciy5yb38f51h$0"),
        v.identifier([14, 3, 14, 8], "upper", "upper$3ciy5yb38f51h$1"),
      ],
      v.block(
        [15, 6, 23, 2],
        [
          v.ifStatement(
            [16, 3, 18, 4],
            v.binaryExpression(
              [16, 7, 16, 29],
              v.identifier([16, 7, 16, 12], "upper", "upper$3ciy5yb38f51h$1"),
              "&&",
              v.binaryExpression(
                [16, 16, 16, 29],
                v.identifier([16, 16, 16, 20], "text", "text$3ciy5yb38f51h$0"),
                "!==",
                v.nullLiteral([16, 25, 16, 29]),
              ),
            ),
            v.block(
              [16, 31, 18, 4],
              [
                v.returnStatement(
                  [17, 5, 17, 31],
                  v.callExpression(
                    [17, 12, 17, 30],
                    v.propertyAccessExpression(
                      [17, 12, 17, 28],
                      v.identifier(
                        [17, 12, 17, 16],
                        "text",
                        "text$3ciy5yb38f51h$0",
                      ),
                      false,
                      "toUpperCase",
                    ),
                    false,
                    [],
                  ),
                ),
              ],
            ),
            null,
          ),
          v.ifStatement(
            [19, 3, 21, 4],
            v.binaryExpression(
              [19, 7, 19, 65],
              v.binaryExpression(
                [19, 7, 19, 39],
                v.splice([19, 7, 19, 22], "$0splice0"),
                "&&",
                v.binaryExpression(
                  [19, 26, 19, 39],
                  v.identifier(
                    [19, 26, 19, 30],
                    "text",
                    "text$3ciy5yb38f51h$0",
                  ),
                  "!==",
                  v.nullLiteral([19, 35, 19, 39]),
                ),
              ),
              "&&",
              v.binaryExpression(
                [19, 43, 19, 65],
                v.callExpression(
                  [19, 43, 19, 57],
                  v.propertyAccessExpression(
                    [19, 43, 19, 54],
                    v.identifier(
                      [19, 43, 19, 47],
                      "text",
                      "text$3ciy5yb38f51h$0",
                    ),
                    false,
                    "charAt",
                  ),
                  false,
                  [v.numericLiteral([19, 55, 19, 56], 0)],
                ),
                "===",
                v.stringLiteral([19, 62, 19, 65], "!"),
              ),
            ),
            v.block(
              [19, 67, 21, 4],
              [
                v.returnStatement(
                  [20, 5, 20, 29],
                  v.callExpression(
                    [20, 12, 20, 28],
                    v.propertyAccessExpression(
                      [20, 12, 20, 23],
                      v.identifier(
                        [20, 12, 20, 16],
                        "text",
                        "text$3ciy5yb38f51h$0",
                      ),
                      false,
                      "concat",
                    ),
                    false,
                    [v.stringLiteral([20, 24, 20, 27], "?")],
                  ),
                ),
              ],
            ),
            null,
          ),
          v.returnStatement(
            [22, 3, 22, 17],
            v.stringLiteral([22, 10, 22, 16], "none"),
          ),
        ],
      ),
    ),
);
export default cs.create(
  [25, 16, 30, 4],
  {
    version: "0.0.0",
    filePath: "condition-narrowing.ts",
    fileHash: "3ciy5yb38f51h",
    kind: "value",
    splices: { $label: label },
    captures: [],
    spliceParams: { $label: [] },
  },
  (v) =>
    v.objectLiteralExpression([25, 20, 30, 2], {
      missing: v.callExpression(
        [26, 12, 26, 30],
        v.splice([26, 12, 26, 18], "$label"),
        false,
        [
          v.nullLiteral([26, 19, 26, 23]),
          v.booleanLiteral([26, 25, 26, 29], true),
        ],
      ),
      loud: v.callExpression(
        [27, 9, 27, 28],
        v.splice([27, 9, 27, 15], "$label"),
        false,
        [
          v.stringLiteral([27, 16, 27, 21], "!hi"),
          v.booleanLiteral([27, 23, 27, 27], true),
        ],
      ),
      quiet: v.callExpression(
        [28, 10, 28, 30],
        v.splice([28, 10, 28, 16], "$label"),
        false,
        [
          v.stringLiteral([28, 17, 28, 22], "!hi"),
          v.booleanLiteral([28, 24, 28, 29], false),
        ],
      ),
      plain: v.callExpression(
        [29, 10, 29, 29],
        v.splice([29, 10, 29, 16], "$label"),
        false,
        [
          v.stringLiteral([29, 17, 29, 21], "zz"),
          v.booleanLiteral([29, 23, 29, 28], false),
        ],
      ),
    }),
);
