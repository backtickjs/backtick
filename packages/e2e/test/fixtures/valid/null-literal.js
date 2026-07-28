import { cs } from "@backtickjs/core";
// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash = cs.create(
  [5, 58, 12, 3],
  {
    version: "0.0.0",
    filePath: "null-literal.ts",
    fileHash: "2albtvza6nmmn",
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["value$2albtvza6nmmn$0"],
    captured: [],
  },
  (v) =>
    v.arrow(
      [5, 61, 12, 2],
      [v.identifier([6, 3, 6, 8], "value", "value$2albtvza6nmmn$0")],
      v.block(
        [7, 6, 12, 2],
        [
          v.if(
            [8, 3, 10, 4],
            v.binop(
              [8, 7, 8, 21],
              v.identifier([8, 7, 8, 12], "value", "value$2albtvza6nmmn$0"),
              "===",
              v.null([8, 17, 8, 21]),
            ),
            v.block(
              [8, 23, 10, 4],
              [v.return([9, 5, 9, 16], v.string([9, 12, 9, 15], "-"))],
            ),
            null,
          ),
          v.return(
            [11, 3, 11, 16],
            v.identifier([11, 10, 11, 15], "value", "value$2albtvza6nmmn$0"),
          ),
        ],
      ),
    ),
);
export default cs.create(
  [14, 16, 18, 4],
  {
    version: "0.0.0",
    filePath: "null-literal.ts",
    fileHash: "2albtvza6nmmn",
    kind: "value",
    splices: { $orDash: orDash },
    captures: [],
    declarations: [],
    captured: [],
  },
  (v) =>
    v.object([14, 20, 18, 2], {
      missing: v.call([15, 12, 15, 25], v.splice([15, 12, 15, 19], "$orDash"), [
        v.null([15, 20, 15, 24]),
      ]),
      present: v.call([16, 12, 16, 25], v.splice([16, 12, 16, 19], "$orDash"), [
        v.string([16, 20, 16, 24], "hi"),
      ]),
      bare: v.null([17, 9, 17, 13]),
    }),
);
