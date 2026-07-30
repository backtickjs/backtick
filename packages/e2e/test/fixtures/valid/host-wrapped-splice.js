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
                    () => ({
                      kind: 80,
                      loc: [18, 33, 18, 38],
                      text: "outer",
                      bindingKey: "outer$xrqzjp57nqfg$0",
                    }),
                  ),
                ),
              },
              captures: ["outer$xrqzjp57nqfg$0"],
              spliceParams: { $0splice0: [] },
            },
            () => ({
              kind: 242,
              loc: [16, 21, 19, 6],
              statements: [
                {
                  kind: 261,
                  loc: [17, 7, 17, 25],
                  name: {
                    kind: 80,
                    loc: [17, 13, 17, 19],
                    text: "middle",
                    bindingKey: "middle$xrqzjp57nqfg$1",
                  },
                  initializer: {
                    kind: 9,
                    loc: [17, 22, 17, 24],
                    value: 10,
                  },
                  keyword: "const",
                },
                {
                  kind: 254,
                  loc: [18, 7, 18, 42],
                  expression: {
                    kind: 227,
                    loc: [18, 14, 18, 41],
                    left: {
                      kind: 80,
                      loc: [18, 14, 18, 20],
                      text: "middle",
                      bindingKey: "middle$xrqzjp57nqfg$1",
                    },
                    operatorToken: "+",
                    right: {
                      kind: 1000,
                      loc: [18, 23, 18, 41],
                      key: "$0splice0",
                    },
                  },
                },
              ],
            }),
          ),
        ),
      },
      captures: [],
      spliceParams: { $start: [], $0splice0: ["outer$xrqzjp57nqfg$0"] },
    },
    () => ({
      kind: 242,
      loc: [14, 13, 20, 4],
      statements: [
        {
          kind: 261,
          loc: [15, 5, 15, 26],
          name: {
            kind: 80,
            loc: [15, 11, 15, 16],
            text: "outer",
            bindingKey: "outer$xrqzjp57nqfg$0",
          },
          initializer: {
            kind: 1000,
            loc: [15, 19, 15, 25],
            key: "$start",
          },
          keyword: "const",
        },
        {
          kind: 254,
          loc: [16, 5, 19, 10],
          expression: {
            kind: 1000,
            loc: [16, 12, 19, 9],
            key: "$0splice0",
          },
        },
      ],
    }),
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
    () => ({
      kind: 227,
      loc: [24, 13, 24, 23],
      left: {
        kind: 1000,
        loc: [24, 13, 24, 19],
        key: "$start",
      },
      operatorToken: "+",
      right: {
        kind: 9,
        loc: [24, 22, 24, 23],
        value: 1,
      },
    }),
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
          () => ({
            kind: 9,
            loc: [31, 29, 31, 30],
            value: 1,
          }),
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
          () => ({
            kind: 9,
            loc: [31, 46, 31, 47],
            value: 2,
          }),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  () => ({
    kind: 227,
    loc: [31, 19, 31, 50],
    left: {
      kind: 1000,
      loc: [31, 19, 31, 33],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: 1000,
      loc: [31, 36, 31, 50],
      key: "$0splice1",
    },
  }),
);
