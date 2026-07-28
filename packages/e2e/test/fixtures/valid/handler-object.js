import { cs } from "@backtickjs/core";
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create(
  [5, 28, 8, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "action",
    splices: {},
    captures: [],
    declarations: ["n$gyja921xjk87$0"],
    captured: [],
  },
  (v) =>
    v.block(
      [5, 31, 8, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 13],
          "let",
          v.identifier([6, 7, 6, 8], "n", "n$gyja921xjk87$0"),
          v.number([6, 11, 6, 12], 0),
        ),
        v.assignment(
          [7, 3, 7, 8],
          v.identifier([7, 3, 7, 4], "n", "n$gyja921xjk87$0"),
          v.number([7, 7, 7, 8], 1),
        ),
      ],
    ),
);
const onTap = cs.create(
  [10, 45, 12, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "value",
    splices: { $beep: beep },
    captures: [],
    declarations: ["id$gyja921xjk87$1"],
    captured: [],
  },
  (v) =>
    v.arrow(
      [10, 48, 12, 2],
      [v.identifier([10, 49, 10, 51], "id", "id$gyja921xjk87$1")],
      v.block([10, 64, 12, 2], [v.splice([11, 3, 11, 8], "$beep")]),
    ),
);
export default cs.create(
  [14, 16, 20, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "value",
    splices: { $onTap: onTap },
    captures: [],
    declarations: ["handlers$gyja921xjk87$2"],
    captured: [],
  },
  (v) =>
    v.block(
      [14, 19, 20, 2],
      [
        v.variableDeclaration(
          [15, 3, 18, 5],
          "const",
          v.identifier([15, 9, 15, 17], "handlers", "handlers$gyja921xjk87$2"),
          v.object([15, 20, 18, 4], {
            tap: v.splice([16, 10, 16, 16], "$onTap"),
            hold: v.splice([17, 11, 17, 17], "$onTap"),
          }),
        ),
        v.return(
          [19, 3, 19, 19],
          v.identifier([19, 10, 19, 18], "handlers", "handlers$gyja921xjk87$2"),
        ),
      ],
    ),
);
