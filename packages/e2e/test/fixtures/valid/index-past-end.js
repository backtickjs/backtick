import { cs } from "@backtickjs/core";
// Where the two rules part company, pinned so a client implementer can see it:
// `names[9]` types as `string`, because TypeScript's indexed access says the
// element type, and reads as null, because the runtime read is total. Nothing
// faults; the type simply doesn't mention the floor under it.
export default cs.create(
  [7, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "index-past-end.ts",
    fileHash: "2hkx7916f6ioy",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [7, 19, 10, 2],
      [
        v.variableDeclaration(
          [8, 3, 8, 33],
          "const",
          v.identifier([8, 9, 8, 14], "names", "names$2hkx7916f6ioy$0"),
          v.array(
            [8, 17, 8, 32],
            [v.string([8, 18, 8, 24], "zero"), v.string([8, 26, 8, 31], "one")],
          ),
        ),
        v.return(
          [9, 3, 9, 19],
          v.index(
            [9, 10, 9, 18],
            v.identifier([9, 10, 9, 15], "names", "names$2hkx7916f6ioy$0"),
            v.number([9, 16, 9, 17], 9),
          ),
        ),
      ],
    ),
);
