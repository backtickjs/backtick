import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 13, 3],
  {
    filePath: "try-catch.ts",
    fileHash: "2osmwga78xnj6",
    splices: {},
    captures: [],
    declarations: ["message$2osmwga78xnj6$0", "error$2osmwga78xnj6$1"],
  },
  (v) =>
    v.block(
      [3, 19, 13, 2],
      [
        v.variableDeclaration(
          [4, 3, 4, 26],
          "const",
          v.identifier([4, 9, 4, 16], "message", "message$2osmwga78xnj6$0"),
          v.string([4, 19, 4, 25], "boom"),
        ),
        v.try(
          [5, 3, 12, 4],
          v.block(
            [5, 7, 7, 4],
            [
              v.throw(
                [6, 5, 6, 19],
                v.identifier(
                  [6, 11, 6, 18],
                  "message",
                  "message$2osmwga78xnj6$0",
                ),
              ),
            ],
          ),
          v.identifier([7, 12, 7, 17], "error", "error$2osmwga78xnj6$1"),
          v.block(
            [7, 19, 12, 4],
            [
              v.if(
                [8, 5, 10, 6],
                v.binop(
                  [8, 9, 8, 26],
                  v.identifier([8, 9, 8, 14], "error", "error$2osmwga78xnj6$1"),
                  "===",
                  v.identifier(
                    [8, 19, 8, 26],
                    "message",
                    "message$2osmwga78xnj6$0",
                  ),
                ),
                v.block(
                  [8, 28, 10, 6],
                  [
                    v.return(
                      [9, 7, 9, 28],
                      v.string([9, 14, 9, 27], "caught boom"),
                    ),
                  ],
                ),
                null,
              ),
              v.return(
                [11, 5, 11, 36],
                v.string([11, 12, 11, 35], "caught something else"),
              ),
            ],
          ),
        ),
      ],
    ),
);
