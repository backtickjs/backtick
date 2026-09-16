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
    [16, 10, 22, 5],
    {
      version: "0.0.0",
      filePath: "deepCapture.tsx",
      fileHash: "99tg62v0y8in",
      splices: {
        $start: { value: start, params: [] },
        $0splice0: {
          value: cs.create(
            [18, 14, 21, 7],
            {
              version: "0.0.0",
              filePath: "deepCapture.tsx",
              fileHash: "99tg62v0y8in",
              splices: {
                $0splice0: {
                  value: cs.create(
                    [20, 25, 20, 34],
                    {
                      version: "0.0.0",
                      filePath: "deepCapture.tsx",
                      fileHash: "99tg62v0y8in",
                      splices: {},
                      captures: ["outer$99tg62v0y8in$0"],
                    },
                    () => ({
                      kind: "id",
                      loc: [20, 28, 20, 33],
                      text: "outer",
                      bindingKey: "outer$99tg62v0y8in$0",
                    }),
                  ),
                  params: [],
                },
              },
              captures: ["outer$99tg62v0y8in$0"],
            },
            () => ({
              kind: "{}",
              loc: [18, 17, 21, 6],
              statements: [
                {
                  kind: "const",
                  loc: [19, 7, 19, 25],
                  name: {
                    kind: "id",
                    loc: [19, 13, 19, 19],
                    text: "middle",
                    bindingKey: "middle$99tg62v0y8in$1",
                  },
                  initializer: {
                    kind: "number",
                    loc: [19, 22, 19, 24],
                    value: 10,
                  },
                },
                {
                  kind: "return",
                  loc: [20, 7, 20, 36],
                  expression: {
                    kind: "binop",
                    loc: [20, 14, 20, 35],
                    left: {
                      kind: "id",
                      loc: [20, 14, 20, 20],
                      text: "middle",
                      bindingKey: "middle$99tg62v0y8in$1",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "splice",
                      loc: [20, 23, 20, 35],
                      key: "$0splice0",
                    },
                  },
                },
              ],
            }),
          ),
          params: ["outer$99tg62v0y8in$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [16, 13, 22, 4],
      statements: [
        {
          kind: "const",
          loc: [17, 5, 17, 26],
          name: {
            kind: "id",
            loc: [17, 11, 17, 16],
            text: "outer",
            bindingKey: "outer$99tg62v0y8in$0",
          },
          initializer: {
            kind: "splice",
            loc: [17, 19, 17, 25],
            key: "$start",
          },
        },
        {
          kind: "return",
          loc: [18, 5, 21, 9],
          expression: {
            kind: "splice",
            loc: [18, 12, 21, 8],
            key: "$0splice0",
          },
        },
      ],
    }),
  );
}
const deepCapture = cs.create(
  [25, 21, 25, 56],
  {
    version: "0.0.0",
    filePath: "deepCapture.tsx",
    fileHash: "99tg62v0y8in",
    splices: {
      $0splice0: {
        value: wrap(
          cs.create(
            [25, 31, 25, 36],
            {
              version: "0.0.0",
              filePath: "deepCapture.tsx",
              fileHash: "99tg62v0y8in",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [25, 34, 25, 35],
              value: 1,
            }),
          ),
        ),
        params: [],
      },
      $0splice1: {
        value: wrap(
          cs.create(
            [25, 48, 25, 53],
            {
              version: "0.0.0",
              filePath: "deepCapture.tsx",
              fileHash: "99tg62v0y8in",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [25, 51, 25, 52],
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
    loc: [25, 24, 25, 55],
    left: {
      kind: "splice",
      loc: [25, 24, 25, 38],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: "splice",
      loc: [25, 41, 25, 55],
      key: "$0splice1",
    },
  }),
);
