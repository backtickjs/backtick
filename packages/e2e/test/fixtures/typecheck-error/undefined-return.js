import { cs } from "@backtickjs/core";
const lying = cs.create(
  [11, 36, 11, 50],
  {
    version: "0.0.0",
    filePath: "undefined-return.ts",
    fileHash: "19ws50ksjspoc",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) => v.arrow([11, 39, 11, 49], [], v.string([11, 45, 11, 49], "hi")),
);
export default cs.create(
  [13, 16, 17, 3],
  {
    version: "0.0.0",
    filePath: "undefined-return.ts",
    fileHash: "19ws50ksjspoc",
    kind: "value",
    splices: { $lying: lying },
    captures: [],
    spliceParams: { $lying: [] },
  },
  (v) =>
    v.block(
      [13, 19, 17, 2],
      [
        v.variableDeclaration(
          [14, 3, 14, 25],
          "const",
          v.identifier([14, 9, 14, 15], "stored", "stored$19ws50ksjspoc$0"),
          v.splice([14, 18, 14, 24], "$lying"),
        ),
        v.variableDeclaration(
          [15, 3, 15, 27],
          "const",
          v.identifier([15, 9, 15, 15], "caught", "caught$19ws50ksjspoc$1"),
          v.call([15, 18, 15, 26], v.splice([15, 18, 15, 24], "$lying"), []),
        ),
        v.return([16, 3, 16, 12], v.number([16, 10, 16, 11], 1)),
      ],
    ),
);
