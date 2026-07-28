import { cs } from "@backtickjs/core";
// A hole inside a block that shadows an outer name. Two call sites make the
// script polymorphic, so the splice arrives as a thunk rather than inlined.
//
// Both `total` bindings are the entry's own, and both render under their source
// name — the inner one shadows the outer exactly as it does in the source, and a
// block frames its declarations, so nothing has to tell them apart. Only a
// binding an entry *captures* ever needed a distinct name, and those now live in
// `$env` where they cannot collide with a local at all.
function wrap(fragment) {
  return cs.create(
    [12, 10, 18, 5],
    {
      version: "0.0.0",
      filePath: "shadowed-hole.ts",
      fileHash: "2jup3dk7x37m7",
      kind: "value",
      splices: { $fragment: fragment },
      captures: [],
      spliceScopes: {
        $fragment: ["total$2jup3dk7x37m7$0", "total$2jup3dk7x37m7$1"],
      },
    },
    (v) =>
      v.block(
        [12, 13, 18, 4],
        [
          v.variableDeclaration(
            [13, 5, 13, 21],
            "const",
            v.identifier([13, 11, 13, 16], "total", "total$2jup3dk7x37m7$0"),
            v.number([13, 19, 13, 20], 1),
          ),
          v.block(
            [14, 5, 17, 6],
            [
              v.variableDeclaration(
                [15, 7, 15, 23],
                "const",
                v.identifier(
                  [15, 13, 15, 18],
                  "total",
                  "total$2jup3dk7x37m7$1",
                ),
                v.number([15, 21, 15, 22], 2),
              ),
              v.return(
                [16, 7, 16, 32],
                v.binop(
                  [16, 14, 16, 31],
                  v.identifier(
                    [16, 14, 16, 19],
                    "total",
                    "total$2jup3dk7x37m7$1",
                  ),
                  "+",
                  v.splice([16, 22, 16, 31], "$fragment"),
                ),
              ),
            ],
          ),
        ],
      ),
  );
}
export default cs.create(
  [21, 16, 21, 53],
  {
    version: "0.0.0",
    filePath: "shadowed-hole.ts",
    fileHash: "2jup3dk7x37m7",
    kind: "value",
    splices: {
      $0splice0: wrap(
        cs.create(
          [21, 26, 21, 32],
          {
            version: "0.0.0",
            filePath: "shadowed-hole.ts",
            fileHash: "2jup3dk7x37m7",
            kind: "value",
            splices: {},
            captures: [],
            spliceScopes: {},
          },
          (v) => v.number([21, 29, 21, 31], 10),
        ),
      ),
      $0splice1: wrap(
        cs.create(
          [21, 44, 21, 50],
          {
            version: "0.0.0",
            filePath: "shadowed-hole.ts",
            fileHash: "2jup3dk7x37m7",
            kind: "value",
            splices: {},
            captures: [],
            spliceScopes: {},
          },
          (v) => v.number([21, 47, 21, 49], 20),
        ),
      ),
    },
    captures: [],
    spliceScopes: { $0splice0: [], $0splice1: [] },
  },
  (v) =>
    v.binop(
      [21, 19, 21, 52],
      v.splice([21, 19, 21, 34], "$0splice0"),
      "+",
      v.splice([21, 37, 21, 52], "$0splice1"),
    ),
);
