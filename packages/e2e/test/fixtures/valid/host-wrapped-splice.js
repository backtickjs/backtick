import { cs } from "@backtickjs/core";
// Splices that arrive through host code — the case a hole can never be resolved
// from source, because what the compiler sees at the hole is a call expression
// and not a template.
//
// Two shapes, and the second is the one that matters. `foo` builds a new script,
// written at its own location outside the enclosing one, so nothing about it
// looks lexical. `same` hands back the template it was given: the script that
// lands at the hole *is* written inside the enclosing script's span, and still
// can't be read off that span, because only running `same` says it goes there.
// Anything that resolves a hole by comparing spans gets this one wrong.
function wrap(start) {
  return cs.create(
    [14, 10, 20, 5],
    {
      version: "0.0.0",
      filePath: "host-wrapped-splice.ts",
      fileHash: "xrqzjp57nqfg",
      kind: "value",
      splices: {
        $start: start,
        $0splice0: foo(
          cs.create(
            [16, 18, 19, 7],
            {
              version: "0.0.0",
              filePath: "host-wrapped-splice.ts",
              fileHash: "xrqzjp57nqfg",
              kind: "value",
              splices: {
                $0splice0: same(
                  cs.create(
                    [18, 30, 18, 39],
                    {
                      version: "0.0.0",
                      filePath: "host-wrapped-splice.ts",
                      fileHash: "xrqzjp57nqfg",
                      kind: "value",
                      splices: {},
                      captures: ["outer$xrqzjp57nqfg$0"],
                      spliceParams: {},
                    },
                    (v) =>
                      v.identifier(
                        [18, 33, 18, 38],
                        "outer",
                        "outer$xrqzjp57nqfg$0",
                      ),
                  ),
                ),
              },
              captures: ["outer$xrqzjp57nqfg$0"],
              spliceParams: { $0splice0: [] },
            },
            (v) =>
              v.block(
                [16, 21, 19, 6],
                [
                  v.variableDeclaration(
                    [17, 7, 17, 25],
                    v.identifier(
                      [17, 13, 17, 19],
                      "middle",
                      "middle$xrqzjp57nqfg$1",
                    ),
                    v.numericLiteral([17, 22, 17, 24], 10),
                    "const",
                  ),
                  v.returnStatement(
                    [18, 7, 18, 42],
                    v.binaryExpression(
                      [18, 14, 18, 41],
                      v.identifier(
                        [18, 14, 18, 20],
                        "middle",
                        "middle$xrqzjp57nqfg$1",
                      ),
                      "+",
                      v.splice([18, 23, 18, 41], "$0splice0"),
                    ),
                  ),
                ],
              ),
          ),
        ),
      },
      captures: [],
      spliceParams: { $start: [], $0splice0: ["outer$xrqzjp57nqfg$0"] },
    },
    (v) =>
      v.block(
        [14, 13, 20, 4],
        [
          v.variableDeclaration(
            [15, 5, 15, 26],
            v.identifier([15, 11, 15, 16], "outer", "outer$xrqzjp57nqfg$0"),
            v.splice([15, 19, 15, 25], "$start"),
            "const",
          ),
          v.returnStatement(
            [16, 5, 19, 10],
            v.splice([16, 12, 19, 9], "$0splice0"),
          ),
        ],
      ),
  );
}
function foo(start) {
  return cs.create(
    [24, 10, 24, 24],
    {
      version: "0.0.0",
      filePath: "host-wrapped-splice.ts",
      fileHash: "xrqzjp57nqfg",
      kind: "value",
      splices: { $start: start },
      captures: [],
      spliceParams: { $start: [] },
    },
    (v) =>
      v.binaryExpression(
        [24, 13, 24, 23],
        v.splice([24, 13, 24, 19], "$start"),
        "+",
        v.numericLiteral([24, 22, 24, 23], 1),
      ),
  );
}
function same(script) {
  return script;
}
export default cs.create(
  [31, 16, 31, 51],
  {
    version: "0.0.0",
    filePath: "host-wrapped-splice.ts",
    fileHash: "xrqzjp57nqfg",
    kind: "value",
    splices: {
      $0splice0: wrap(
        cs.create(
          [31, 26, 31, 31],
          {
            version: "0.0.0",
            filePath: "host-wrapped-splice.ts",
            fileHash: "xrqzjp57nqfg",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.numericLiteral([31, 29, 31, 30], 1),
        ),
      ),
      $0splice1: wrap(
        cs.create(
          [31, 43, 31, 48],
          {
            version: "0.0.0",
            filePath: "host-wrapped-splice.ts",
            fileHash: "xrqzjp57nqfg",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          (v) => v.numericLiteral([31, 46, 31, 47], 2),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  (v) =>
    v.binaryExpression(
      [31, 19, 31, 50],
      v.splice([31, 19, 31, 33], "$0splice0"),
      "+",
      v.splice([31, 36, 31, 50], "$0splice1"),
    ),
);
