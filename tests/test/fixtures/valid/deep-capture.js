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
        $start: start,
        $0splice0: cs.create(
          [17, 14, 20, 7],
          {
            version: "0.0.0",
            filePath: "deep-capture.ts",
            fileHash: "1mlv4ugew6yjv",
            splices: {
              $0splice0: cs.create(
                [19, 25, 19, 34],
                {
                  version: "0.0.0",
                  filePath: "deep-capture.ts",
                  fileHash: "1mlv4ugew6yjv",
                  splices: {},
                  captures: ["outer$1mlv4ugew6yjv$0"],
                  spliceParams: {},
                },
                () => ({
                  kind: 80,
                  loc: [19, 28, 19, 33],
                  text: "outer",
                  bindingKey: "outer$1mlv4ugew6yjv$0",
                }),
              ),
            },
            captures: ["outer$1mlv4ugew6yjv$0"],
            spliceParams: { $0splice0: [] },
          },
          () => ({
            kind: 242,
            loc: [17, 17, 20, 6],
            statements: [
              {
                kind: 244,
                loc: [18, 7, 18, 25],
                declarationList: {
                  kind: 262,
                  loc: [18, 7, 18, 24],
                  declarations: [
                    {
                      kind: 261,
                      loc: [18, 13, 18, 24],
                      name: {
                        kind: 80,
                        loc: [18, 13, 18, 19],
                        text: "middle",
                        bindingKey: "middle$1mlv4ugew6yjv$1",
                      },
                      initializer: {
                        kind: 9,
                        loc: [18, 22, 18, 24],
                        value: 10,
                      },
                    },
                  ],
                  keyword: "const",
                },
              },
              {
                kind: 254,
                loc: [19, 7, 19, 36],
                expression: {
                  kind: 227,
                  loc: [19, 14, 19, 35],
                  left: {
                    kind: 80,
                    loc: [19, 14, 19, 20],
                    text: "middle",
                    bindingKey: "middle$1mlv4ugew6yjv$1",
                  },
                  operatorToken: "+",
                  right: {
                    kind: 1000,
                    loc: [19, 23, 19, 35],
                    key: "$0splice0",
                  },
                },
              },
            ],
          }),
        ),
      },
      captures: [],
      spliceParams: { $start: [], $0splice0: ["outer$1mlv4ugew6yjv$0"] },
    },
    () => ({
      kind: 242,
      loc: [15, 13, 21, 4],
      statements: [
        {
          kind: 244,
          loc: [16, 5, 16, 26],
          declarationList: {
            kind: 262,
            loc: [16, 5, 16, 25],
            declarations: [
              {
                kind: 261,
                loc: [16, 11, 16, 25],
                name: {
                  kind: 80,
                  loc: [16, 11, 16, 16],
                  text: "outer",
                  bindingKey: "outer$1mlv4ugew6yjv$0",
                },
                initializer: {
                  kind: 1000,
                  loc: [16, 19, 16, 25],
                  key: "$start",
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [17, 5, 20, 9],
          expression: {
            kind: 1000,
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
      $0splice0: wrap(
        cs.create(
          [24, 26, 24, 31],
          {
            version: "0.0.0",
            filePath: "deep-capture.ts",
            fileHash: "1mlv4ugew6yjv",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [24, 29, 24, 30],
            value: 1,
          }),
        ),
      ),
      $0splice1: wrap(
        cs.create(
          [24, 43, 24, 48],
          {
            version: "0.0.0",
            filePath: "deep-capture.ts",
            fileHash: "1mlv4ugew6yjv",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [24, 46, 24, 47],
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
    loc: [24, 19, 24, 50],
    left: {
      kind: 1000,
      loc: [24, 19, 24, 33],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: 1000,
      loc: [24, 36, 24, 50],
      key: "$0splice1",
    },
  }),
);
