import { cs } from "@backtickjs/core";
// Three scripts, and the binding skips the middle one.
//
// The outer script declares `outer`; the innermost references it. The script
// between them neither declares nor mentions it, so it has no capture of its
// own — the binding still has to reach through it, and the outer script has to
// know its declaration escaped even though the script that took it is two
// levels down.
//
// Two call sites make the outer script polymorphic, so its splice arrives as a
// thunk: `captured` is what the hole hands that thunk, which is the only place
// a wrong answer would show up.
function wrap(start) {
  return cs.create(
    [15, 10, 21, 5],
    {
      version: "0.0.0",
      filePath: "deep-capture.ts",
      fileHash: "1mlv4ugew6yjv",
      kind: "value",
      splices: {
        $start: start,
        $0splice0: cs.create(
          [17, 14, 20, 7],
          {
            version: "0.0.0",
            filePath: "deep-capture.ts",
            fileHash: "1mlv4ugew6yjv",
            kind: "value",
            splices: {
              $0splice0: cs.create(
                [19, 25, 19, 34],
                {
                  version: "0.0.0",
                  filePath: "deep-capture.ts",
                  fileHash: "1mlv4ugew6yjv",
                  kind: "value",
                  splices: {},
                  captures: ["outer$1mlv4ugew6yjv$0"],
                  spliceParams: {},
                },
                (v) =>
                  v.identifier(
                    [19, 28, 19, 33],
                    "outer",
                    "outer$1mlv4ugew6yjv$0",
                  ),
              ),
            },
            captures: [],
            spliceParams: { $0splice0: [] },
          },
          (v) =>
            v.block(
              [17, 17, 20, 6],
              [
                v.variableDeclaration(
                  [18, 7, 18, 25],
                  "const",
                  v.identifier(
                    [18, 13, 18, 19],
                    "middle",
                    "middle$1mlv4ugew6yjv$1",
                  ),
                  v.number([18, 22, 18, 24], 10),
                ),
                v.return(
                  [19, 7, 19, 36],
                  v.binop(
                    [19, 14, 19, 35],
                    v.identifier(
                      [19, 14, 19, 20],
                      "middle",
                      "middle$1mlv4ugew6yjv$1",
                    ),
                    "+",
                    v.splice([19, 23, 19, 35], "$0splice0"),
                  ),
                ),
              ],
            ),
        ),
      },
      captures: [],
      spliceParams: { $start: [], $0splice0: ["outer$1mlv4ugew6yjv$0"] },
    },
    (v) =>
      v.block(
        [15, 13, 21, 4],
        [
          v.variableDeclaration(
            [16, 5, 16, 26],
            "const",
            v.identifier([16, 11, 16, 16], "outer", "outer$1mlv4ugew6yjv$0"),
            v.splice([16, 19, 16, 25], "$start"),
          ),
          v.return([17, 5, 20, 9], v.splice([17, 12, 20, 8], "$0splice0")),
        ],
      ),
  );
}
export default cs.create(
  [24, 16, 24, 51],
  {
    version: "0.0.0",
    filePath: "deep-capture.ts",
    fileHash: "1mlv4ugew6yjv",
    kind: "value",
    splices: {
      $0splice0: wrap(
        cs.create(
          [24, 26, 24, 31],
          {
            version: "0.0.0",
            filePath: "deep-capture.ts",
            fileHash: "1mlv4ugew6yjv",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.number([24, 29, 24, 30], 1),
        ),
      ),
      $0splice1: wrap(
        cs.create(
          [24, 43, 24, 48],
          {
            version: "0.0.0",
            filePath: "deep-capture.ts",
            fileHash: "1mlv4ugew6yjv",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.number([24, 46, 24, 47], 2),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  (v) =>
    v.binop(
      [24, 19, 24, 50],
      v.splice([24, 19, 24, 33], "$0splice0"),
      "+",
      v.splice([24, 36, 24, 50], "$0splice1"),
    ),
);
