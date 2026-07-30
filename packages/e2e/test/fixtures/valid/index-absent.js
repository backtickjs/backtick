import { cs } from "@backtickjs/core";
// A key an object hasn't got reads as the language's one absent value. A
// record's member reads as `string | null` — a record says nothing about which
// keys it has — so this one is answered rather than assumed.
const table = { here: "yes" };
export default cs.create(
  [8, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "index-absent.ts",
    fileHash: "2bxuydarg0iof",
    kind: "value",
    splices: { $table: table },
    captures: [],
    spliceParams: { $table: [] },
  },
  (v) =>
    v.block(
      [8, 19, 12, 2],
      [
        v.variableDeclaration(
          [9, 3, 9, 33],
          v.identifier([9, 9, 9, 14], "names", "names$2bxuydarg0iof$0"),
          v.arrayLiteralExpression(
            [9, 17, 9, 32],
            [
              v.stringLiteral([9, 18, 9, 24], "zero"),
              v.stringLiteral([9, 26, 9, 31], "one"),
            ],
          ),
          "const",
        ),
        v.variableDeclaration(
          [10, 3, 10, 47],
          v.identifier([10, 9, 10, 16], "missing", "missing$2bxuydarg0iof$1"),
          v.binaryExpression(
            [10, 19, 10, 46],
            v.elementAccessExpression(
              [10, 19, 10, 36],
              v.splice([10, 19, 10, 25], "$table"),
              v.stringLiteral([10, 26, 10, 35], "nowhere"),
            ),
            "??",
            v.stringLiteral([10, 40, 10, 46], "gone"),
          ),
          "const",
        ),
        v.returnStatement(
          [11, 3, 11, 35],
          v.binaryExpression(
            [11, 10, 11, 34],
            v.binaryExpression(
              [11, 10, 11, 24],
              v.elementAccessExpression(
                [11, 10, 11, 18],
                v.identifier(
                  [11, 10, 11, 15],
                  "names",
                  "names$2bxuydarg0iof$0",
                ),
                v.numericLiteral([11, 16, 11, 17], 1),
              ),
              "+",
              v.stringLiteral([11, 21, 11, 24], "/"),
            ),
            "+",
            v.identifier(
              [11, 27, 11, 34],
              "missing",
              "missing$2bxuydarg0iof$1",
            ),
          ),
        ),
      ],
    ),
);
