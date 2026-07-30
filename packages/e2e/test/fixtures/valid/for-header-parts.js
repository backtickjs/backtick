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
          "let",
          v.identifier([6, 7, 6, 8], "i", "i$2mxyjvdrslxo1$0"),
          v.number([6, 11, 6, 12], 0),
        ),
        v.variableDeclaration(
          [7, 3, 7, 17],
          "let",
          v.identifier([7, 7, 7, 11], "seen", "seen$2mxyjvdrslxo1$1"),
          v.string([7, 14, 7, 16], ""),
        ),
        v.for(
          [8, 3, 11, 4],
          null,
          v.binop(
            [8, 10, 8, 15],
            v.identifier([8, 10, 8, 11], "i", "i$2mxyjvdrslxo1$0"),
            "<",
            v.number([8, 14, 8, 15], 3),
          ),
          null,
          v.block(
            [8, 19, 11, 4],
            [
              v.assignment(
                [9, 5, 9, 20],
                v.identifier([9, 5, 9, 9], "seen", "seen$2mxyjvdrslxo1$1"),
                v.binop(
                  [9, 12, 9, 20],
                  v.identifier([9, 12, 9, 16], "seen", "seen$2mxyjvdrslxo1$1"),
                  "+",
                  v.identifier([9, 19, 9, 20], "i", "i$2mxyjvdrslxo1$0"),
                ),
              ),
              v.assignment(
                [10, 5, 10, 14],
                v.identifier([10, 5, 10, 6], "i", "i$2mxyjvdrslxo1$0"),
                v.binop(
                  [10, 9, 10, 14],
                  v.identifier([10, 9, 10, 10], "i", "i$2mxyjvdrslxo1$0"),
                  "+",
                  v.number([10, 13, 10, 14], 1),
                ),
              ),
            ],
          ),
        ),
        v.return(
          [12, 3, 12, 15],
          v.identifier([12, 10, 12, 14], "seen", "seen$2mxyjvdrslxo1$1"),
        ),
      ],
    ),
);
