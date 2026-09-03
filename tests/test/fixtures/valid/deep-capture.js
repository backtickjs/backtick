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
      splices: {
        $start: { value: start, params: [] },
        $0splice0: {
          value: cs.create(
            [17, 14, 20, 7],
            {
              version: "0.0.0",
              filePath: "deep-capture.ts",
              fileHash: "1mlv4ugew6yjv",
              splices: {
                $0splice0: {
                  value: cs.create(
                    [19, 25, 19, 34],
                    {
                      version: "0.0.0",
                      filePath: "deep-capture.ts",
                      fileHash: "1mlv4ugew6yjv",
                      splices: {},
                      captures: ["outer$1mlv4ugew6yjv$0"],
                    },
                    () => ({
                      kind: "id",
                      loc: [19, 28, 19, 33],
                      text: "outer",
                      bindingKey: "outer$1mlv4ugew6yjv$0",
                    }),
                  ),
                  params: [],
                },
              },
              captures: ["outer$1mlv4ugew6yjv$0"],
            },
            () => ({
              kind: "{}",
              loc: [17, 17, 20, 6],
              statements: [
                {
                  kind: "const",
                  loc: [18, 7, 18, 25],
                  name: {
                    kind: "id",
                    loc: [18, 13, 18, 19],
                    text: "middle",
                    bindingKey: "middle$1mlv4ugew6yjv$1",
                  },
                  initializer: {
                    kind: "number",
                    loc: [18, 22, 18, 24],
                    value: 10,
                  },
                },
                {
                  kind: "return",
                  loc: [19, 7, 19, 36],
                  expression: {
                    kind: "binop",
                    loc: [19, 14, 19, 35],
                    left: {
                      kind: "id",
                      loc: [19, 14, 19, 20],
                      text: "middle",
                      bindingKey: "middle$1mlv4ugew6yjv$1",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "splice",
                      loc: [19, 23, 19, 35],
                      key: "$0splice0",
                    },
                  },
                },
              ],
            }),
          ),
          params: ["outer$1mlv4ugew6yjv$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [15, 13, 21, 4],
      statements: [
        {
          kind: "const",
          loc: [16, 5, 16, 26],
          name: {
            kind: "id",
            loc: [16, 11, 16, 16],
            text: "outer",
            bindingKey: "outer$1mlv4ugew6yjv$0",
          },
          initializer: {
            kind: "splice",
            loc: [16, 19, 16, 25],
            key: "$start",
          },
        },
        {
          kind: "return",
          loc: [17, 5, 20, 9],
          expression: {
            kind: "splice",
            loc: [17, 12, 20, 8],
            key: "$0splice0",
          },
        },
      ],
    }),
  );
}
export default cs.create(
  [24, 16, 24, 51],
  {
    version: "0.0.0",
    filePath: "deep-capture.ts",
    fileHash: "1mlv4ugew6yjv",
    splices: {
      $0splice0: {
        value: wrap(
          cs.create(
            [24, 26, 24, 31],
            {
              version: "0.0.0",
              filePath: "deep-capture.ts",
              fileHash: "1mlv4ugew6yjv",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [24, 29, 24, 30],
              value: 1,
            }),
          ),
        ),
        params: [],
      },
      $0splice1: {
        value: wrap(
          cs.create(
            [24, 43, 24, 48],
            {
              version: "0.0.0",
              filePath: "deep-capture.ts",
              fileHash: "1mlv4ugew6yjv",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [24, 46, 24, 47],
              value: 2,
            }),
          ),
        ),
        params: [],
      },
    },
    captures: [],
  },
  () => ({
    kind: "binop",
    loc: [24, 19, 24, 50],
    left: {
      kind: "splice",
      loc: [24, 19, 24, 33],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: "splice",
      loc: [24, 36, 24, 50],
      key: "$0splice1",
    },
  }),
);
