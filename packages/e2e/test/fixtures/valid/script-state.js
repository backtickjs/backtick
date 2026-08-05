import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs, Text } from "@backtickjs/core";
// Storage a script declares for itself, rather than one a component owns and
// splices in. `state(...)` is a declaration and not a call of a name: each time
// the declaration is evaluated there is another cell, which is what lets a
// script build a row that carries its own.
async function Rows() {
  const build = cs.create(
    [8, 17, 10, 5],
    {
      version: "0.0.0",
      filePath: "script-state.tsx",
      fileHash: "1ntlpgrpbrfuo",
      kind: "value",
      splices: {},
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: 220,
      loc: [8, 20, 10, 4],
      parameters: [
        {
          kind: 170,
          loc: [8, 21, 8, 34],
          name: {
            kind: 80,
            loc: [8, 21, 8, 26],
            text: "label",
            bindingKey: "label$1ntlpgrpbrfuo$0",
          },
        },
      ],
      body: {
        kind: 242,
        loc: [8, 39, 10, 4],
        statements: [
          {
            kind: 254,
            loc: [9, 5, 9, 36],
            expression: {
              kind: 211,
              loc: [9, 12, 9, 35],
              properties: [
                {
                  kind: 304,
                  loc: [9, 14, 9, 33],
                  name: "label",
                  initializer: {
                    kind: 1002,
                    loc: [9, 21, 9, 33],
                    initial: {
                      kind: 80,
                      loc: [9, 27, 9, 32],
                      text: "label",
                      bindingKey: "label$1ntlpgrpbrfuo$0",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    }),
  );
  return _jsx(Text, {
    style: {
      fontSize: cs.create(
        [14, 26, 14, 32],
        {
          version: "0.0.0",
          filePath: "script-state.tsx",
          fileHash: "1ntlpgrpbrfuo",
          kind: "value",
          splices: {},
          captures: [],
          spliceParams: {},
        },
        () => ({
          kind: 9,
          loc: [14, 29, 14, 31],
          value: 16,
        }),
      ),
    },
    onPress: cs.create(
      [15, 16, 18, 9],
      {
        version: "0.0.0",
        filePath: "script-state.tsx",
        fileHash: "1ntlpgrpbrfuo",
        kind: "value",
        splices: { $build: build },
        captures: [],
        spliceParams: { $build: [] },
      },
      () => ({
        kind: 220,
        loc: [15, 19, 18, 8],
        parameters: [],
        body: {
          kind: 242,
          loc: [15, 25, 18, 8],
          statements: [
            {
              kind: 244,
              loc: [16, 9, 16, 35],
              declarationList: {
                kind: 262,
                loc: [16, 9, 16, 34],
                declarations: [
                  {
                    kind: 261,
                    loc: [16, 15, 16, 34],
                    name: {
                      kind: 80,
                      loc: [16, 15, 16, 18],
                      text: "row",
                      bindingKey: "row$1ntlpgrpbrfuo$1",
                    },
                    initializer: {
                      kind: 214,
                      loc: [16, 21, 16, 34],
                      expression: {
                        kind: 1000,
                        loc: [16, 21, 16, 27],
                        key: "$build",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 11,
                          loc: [16, 28, 16, 33],
                          text: "one",
                        },
                      ],
                    },
                  },
                ],
                keyword: "const",
              },
            },
            {
              kind: 214,
              loc: [17, 9, 17, 51],
              expression: {
                kind: 212,
                loc: [17, 9, 17, 24],
                expression: {
                  kind: 212,
                  loc: [17, 9, 17, 18],
                  expression: {
                    kind: 80,
                    loc: [17, 9, 17, 12],
                    text: "row",
                    bindingKey: "row$1ntlpgrpbrfuo$1",
                  },
                  questionDotToken: false,
                  name: "label",
                },
                questionDotToken: false,
                name: "write",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 227,
                  loc: [17, 25, 17, 50],
                  left: {
                    kind: 214,
                    loc: [17, 25, 17, 41],
                    expression: {
                      kind: 212,
                      loc: [17, 25, 17, 39],
                      expression: {
                        kind: 212,
                        loc: [17, 25, 17, 34],
                        expression: {
                          kind: 80,
                          loc: [17, 25, 17, 28],
                          text: "row",
                          bindingKey: "row$1ntlpgrpbrfuo$1",
                        },
                        questionDotToken: false,
                        name: "label",
                      },
                      questionDotToken: false,
                      name: "read",
                    },
                    questionDotToken: false,
                    arguments: [],
                  },
                  operatorToken: "+",
                  right: {
                    kind: 11,
                    loc: [17, 44, 17, 50],
                    text: " !!!",
                  },
                },
              ],
            },
          ],
        },
      }),
    ),
    children: cs.create(
      [20, 8, 20, 38],
      {
        version: "0.0.0",
        filePath: "script-state.tsx",
        fileHash: "1ntlpgrpbrfuo",
        kind: "value",
        splices: { $build: build },
        captures: [],
        spliceParams: { $build: [] },
      },
      () => ({
        kind: 214,
        loc: [20, 11, 20, 37],
        expression: {
          kind: 212,
          loc: [20, 11, 20, 35],
          expression: {
            kind: 212,
            loc: [20, 11, 20, 30],
            expression: {
              kind: 214,
              loc: [20, 11, 20, 24],
              expression: {
                kind: 1000,
                loc: [20, 11, 20, 17],
                key: "$build",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 11,
                  loc: [20, 18, 20, 23],
                  text: "one",
                },
              ],
            },
            questionDotToken: false,
            name: "label",
          },
          questionDotToken: false,
          name: "read",
        },
        questionDotToken: false,
        arguments: [],
      }),
    ),
  });
}
export default _jsx(Rows, {});
