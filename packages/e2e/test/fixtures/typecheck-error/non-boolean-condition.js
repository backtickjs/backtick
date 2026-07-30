import { cs } from "@backtickjs/core";
// A condition must be a boolean: the language has no truthiness, so a
// string tested directly is a type error.
export default cs.create(
  [5, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "non-boolean-condition.ts",
    fileHash: "7s4lkv4w2ddn",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [5, 19, 10, 2],
      [
        v.parameterDeclaration(
          [5, 20, 5, 32],
          v.identifier([5, 20, 5, 24], "name", "name$7s4lkv4w2ddn$0"),
        ),
      ],
      v.block(
        [5, 37, 10, 2],
        [
          v.ifStatement(
            [6, 3, 8, 4],
            v.identifier([6, 7, 6, 11], "name", "name$7s4lkv4w2ddn$0"),
            v.block(
              [6, 13, 8, 4],
              [
                v.returnStatement(
                  [7, 5, 7, 17],
                  v.identifier([7, 12, 7, 16], "name", "name$7s4lkv4w2ddn$0"),
                ),
              ],
            ),
            null,
          ),
          v.returnStatement(
            [9, 3, 9, 22],
            v.stringLiteral([9, 10, 9, 21], "anonymous"),
          ),
        ],
      ),
    ),
);
