import { cs } from "@backtickjs/core";
// Every part of the header is optional: this one declares nothing and updates
// nothing, leaving both to the block around it and the body.
export default cs.create(
  [5, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "for-header-parts.ts",
    fileHash: "2mxyjvdrslxo1",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [5, 19, 13, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 13],
          v.identifier([6, 7, 6, 8], "i", "i$2mxyjvdrslxo1$0"),
          v.numericLiteral([6, 11, 6, 12], 0),
          "let",
        ),
        v.variableDeclaration(
          [7, 3, 7, 17],
          v.identifier([7, 7, 7, 11], "seen", "seen$2mxyjvdrslxo1$1"),
          v.stringLiteral([7, 14, 7, 16], ""),
          "let",
        ),
        v.forStatement(
          [8, 3, 11, 4],
          null,
          v.binaryExpression(
            [8, 10, 8, 15],
            v.identifier([8, 10, 8, 11], "i", "i$2mxyjvdrslxo1$0"),
            "<",
            v.numericLiteral([8, 14, 8, 15], 3),
          ),
          null,
          v.block(
            [8, 19, 11, 4],
            [
              v.binaryExpression(
                [9, 5, 9, 20],
                v.identifier([9, 5, 9, 9], "seen", "seen$2mxyjvdrslxo1$1"),
                "=",
                v.binaryExpression(
                  [9, 12, 9, 20],
                  v.identifier([9, 12, 9, 16], "seen", "seen$2mxyjvdrslxo1$1"),
                  "+",
                  v.identifier([9, 19, 9, 20], "i", "i$2mxyjvdrslxo1$0"),
                ),
              ),
              v.binaryExpression(
                [10, 5, 10, 14],
                v.identifier([10, 5, 10, 6], "i", "i$2mxyjvdrslxo1$0"),
                "=",
                v.binaryExpression(
                  [10, 9, 10, 14],
                  v.identifier([10, 9, 10, 10], "i", "i$2mxyjvdrslxo1$0"),
                  "+",
                  v.numericLiteral([10, 13, 10, 14], 1),
                ),
              ),
            ],
          ),
        ),
        v.returnStatement(
          [12, 3, 12, 15],
          v.identifier([12, 10, 12, 14], "seen", "seen$2mxyjvdrslxo1$1"),
        ),
      ],
    ),
);
