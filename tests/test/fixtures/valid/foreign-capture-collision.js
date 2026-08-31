import { cs } from "@backtickjs/core";
// A fragment written under one `base` is carried out by host code and spliced
// into a script written under a different `base`.
let carried;
const source = cs.create(
  [7, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "foreign-capture-collision.ts",
    fileHash: "1rp2onbxu1oco",
    kind: "value",
    splices: {
      $0splice0:
        ((carried = cs.create(
          [9, 24, 9, 32],
          {
            version: "0.0.0",
            filePath: "foreign-capture-collision.ts",
            fileHash: "1rp2onbxu1oco",
            kind: "value",
            splices: {},
            captures: ["base$1rp2onbxu1oco$0"],
            declarations: [],
          },
          (v) => v.identifier([9, 27, 9, 31], "base", "base$1rp2onbxu1oco$0"),
        )),
        carried),
    },
    captures: [],
    declarations: ["base$1rp2onbxu1oco$0"],
  },
  (v) =>
    v.block(
      [7, 19, 10, 2],
      [
        v.variableDeclaration(
          [8, 3, 8, 18],
          "const",
          v.identifier([8, 9, 8, 13], "base", "base$1rp2onbxu1oco$0"),
          v.number([8, 16, 8, 17], 1),
        ),
        v.return([9, 3, 9, 45], v.splice([9, 10, 9, 44], "$0splice0")),
      ],
    ),
);
function take() {
  if (carried === undefined) {
    throw new Error("source must be built first");
  }
  return carried;
}
export default cs.create(
  [19, 16, 22, 3],
  {
    version: "0.0.0",
    filePath: "foreign-capture-collision.ts",
    fileHash: "1rp2onbxu1oco",
    kind: "value",
    splices: {
      $source: source,
      $0splice0: cs.create(
        [21, 22, 21, 42],
        {
          version: "0.0.0",
          filePath: "foreign-capture-collision.ts",
          fileHash: "1rp2onbxu1oco",
          kind: "value",
          splices: { $0splice0: take() },
          captures: ["base$1rp2onbxu1oco$1"],
          declarations: [],
        },
        (v) =>
          v.binop(
            [21, 25, 21, 41],
            v.identifier([21, 25, 21, 29], "base", "base$1rp2onbxu1oco$1"),
            "+",
            v.splice([21, 32, 21, 41], "$0splice0"),
          ),
      ),
    },
    captures: [],
    declarations: ["base$1rp2onbxu1oco$1"],
  },
  (v) =>
    v.block(
      [19, 19, 22, 2],
      [
        v.variableDeclaration(
          [20, 3, 20, 20],
          "const",
          v.identifier([20, 9, 20, 13], "base", "base$1rp2onbxu1oco$1"),
          v.number([20, 16, 20, 19], 100),
        ),
        v.return(
          [21, 3, 21, 44],
          v.binop(
            [21, 10, 21, 43],
            v.splice([21, 10, 21, 17], "$source"),
            "+",
            v.splice([21, 20, 21, 43], "$0splice0"),
          ),
        ),
      ],
    ),
);
