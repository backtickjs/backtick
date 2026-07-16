import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    filePath: "arrow.ts",
    fileHash: "357jk2g9zktff",
    splices: {},
    captures: [],
    declarations: [
      "base$357jk2g9zktff$0",
      "one$357jk2g9zktff$1",
      "two$357jk2g9zktff$2",
    ],
  },
  (v) =>
    v.block(
      [3, 19, 6, 2],
      [
        v.variableDeclaration(
          [4, 3, 4, 19],
          "const",
          v.identifier([4, 9, 4, 13], "base", "base$357jk2g9zktff$0"),
          v.number([4, 16, 4, 18], 10),
        ),
        v.return(
          [5, 3, 5, 57],
          v.arrow(
            [5, 10, 5, 56],
            [
              v.identifier([5, 11, 5, 14], "one", "one$357jk2g9zktff$1"),
              v.identifier([5, 24, 5, 27], "two", "two$357jk2g9zktff$2"),
            ],
            v.binop(
              [5, 40, 5, 56],
              v.binop(
                [5, 40, 5, 49],
                v.identifier([5, 40, 5, 43], "one", "one$357jk2g9zktff$1"),
                "+",
                v.identifier([5, 46, 5, 49], "two", "two$357jk2g9zktff$2"),
              ),
              "+",
              v.identifier([5, 52, 5, 56], "base", "base$357jk2g9zktff$0"),
            ),
          ),
        ),
      ],
    ),
);
