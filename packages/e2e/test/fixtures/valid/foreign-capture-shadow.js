import { cs } from "@backtickjs/core";
// Two distinct captures of one entry that want the same name.
//
// An entry's own free variables can never collide — within one script `base`
// resolves outward to exactly one binding. But an entry also receives whatever
// the arguments it inlines capture, and a fragment written under the outer
// `base` can be carried by host code into a script written under the inner one.
// Both then land in the same environment, under the same source name.
//
// Everything stays nested so both bindings are actually in scope where they are
// threaded to — carrying the fragment somewhere the outer `base` does not
// enclose is a different error.
function inner(carried) {
  return cs.create(
    [15, 10, 18, 5],
    {
      version: "0.0.0",
      filePath: "foreign-capture-shadow.ts",
      fileHash: "2dzpugititb9o",
      kind: "value",
      splices: {
        $0splice0: cs.create(
          [17, 14, 17, 33],
          {
            version: "0.0.0",
            filePath: "foreign-capture-shadow.ts",
            fileHash: "2dzpugititb9o",
            kind: "value",
            splices: { $carried: carried },
            captures: ["base$2dzpugititb9o$0"],
            declarations: [],
            spliceScopes: { $carried: [] },
          },
          (v) =>
            v.binop(
              [17, 17, 17, 32],
              v.identifier([17, 17, 17, 21], "base", "base$2dzpugititb9o$0"),
              "+",
              v.splice([17, 24, 17, 32], "$carried"),
            ),
        ),
      },
      captures: [],
      declarations: ["base$2dzpugititb9o$0"],
      spliceScopes: { $0splice0: ["base$2dzpugititb9o$0"] },
    },
    (v) =>
      v.block(
        [15, 13, 18, 4],
        [
          v.variableDeclaration(
            [16, 5, 16, 22],
            "const",
            v.identifier([16, 11, 16, 15], "base", "base$2dzpugititb9o$0"),
            v.number([16, 18, 16, 21], 100),
          ),
          v.return([17, 5, 17, 35], v.splice([17, 12, 17, 34], "$0splice0")),
        ],
      ),
  );
}
export default cs.create(
  [21, 16, 24, 3],
  {
    version: "0.0.0",
    filePath: "foreign-capture-shadow.ts",
    fileHash: "2dzpugititb9o",
    kind: "value",
    splices: {
      $0splice0: inner(
        cs.create(
          [23, 18, 23, 26],
          {
            version: "0.0.0",
            filePath: "foreign-capture-shadow.ts",
            fileHash: "2dzpugititb9o",
            kind: "value",
            splices: {},
            captures: ["base$2dzpugititb9o$1"],
            declarations: [],
            spliceScopes: {},
          },
          (v) => v.identifier([23, 21, 23, 25], "base", "base$2dzpugititb9o$1"),
        ),
      ),
    },
    captures: [],
    declarations: ["base$2dzpugititb9o$1"],
    spliceScopes: { $0splice0: ["base$2dzpugititb9o$1"] },
  },
  (v) =>
    v.block(
      [21, 19, 24, 2],
      [
        v.variableDeclaration(
          [22, 3, 22, 18],
          "const",
          v.identifier([22, 9, 22, 13], "base", "base$2dzpugititb9o$1"),
          v.number([22, 16, 22, 17], 1),
        ),
        v.return([23, 3, 23, 29], v.splice([23, 10, 23, 28], "$0splice0")),
      ],
    ),
);
