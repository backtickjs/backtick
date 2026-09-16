import { cs } from "@backtickjs/core";
// A tag naming a parameter of an arrow in the enclosing script. The nested
// scripts sit inside the arrow's body, so the parameter reaches them through
// the holes they fill rather than as a capture of the whole script.
const scriptBoundTagParam = cs.create(
  [7, 29, 15, 3],
  {
    version: "0.0.0",
    filePath: "scriptBoundTagParam.tsx",
    fileHash: "38ql2l88yay4",
    splices: {
      $0splice0: {
        value: cs.create(
          [10, 10, 10, 27],
          {
            version: "0.0.0",
            filePath: "scriptBoundTagParam.tsx",
            fileHash: "38ql2l88yay4",
            splices: {},
            captures: ["Row$38ql2l88yay4$1"],
          },
          () => ({
            kind: "jsx",
            loc: [10, 13, 10, 26],
            type: {
              kind: "id",
              loc: [10, 14, 10, 17],
              text: "Row",
              bindingKey: "Row$38ql2l88yay4$1",
            },
            attributes: [
              {
                name: "n",
                initializer: {
                  kind: "number",
                  loc: [10, 21, 10, 22],
                  value: 1,
                },
              },
            ],
            children: [],
          }),
        ),
        params: ["Row$38ql2l88yay4$1"],
      },
      $0splice1: {
        value: cs.create(
          [11, 10, 11, 27],
          {
            version: "0.0.0",
            filePath: "scriptBoundTagParam.tsx",
            fileHash: "38ql2l88yay4",
            splices: {},
            captures: ["Row$38ql2l88yay4$1"],
          },
          () => ({
            kind: "jsx",
            loc: [11, 13, 11, 26],
            type: {
              kind: "id",
              loc: [11, 14, 11, 17],
              text: "Row",
              bindingKey: "Row$38ql2l88yay4$1",
            },
            attributes: [
              {
                name: "n",
                initializer: {
                  kind: "number",
                  loc: [11, 21, 11, 22],
                  value: 2,
                },
              },
            ],
            children: [],
          }),
        ),
        params: ["Row$38ql2l88yay4$1"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [7, 32, 15, 2],
    statements: [
      {
        kind: "const",
        loc: [8, 3, 13, 5],
        name: {
          kind: "id",
          loc: [8, 9, 8, 14],
          text: "twice",
          bindingKey: "twice$38ql2l88yay4$0",
        },
        initializer: {
          kind: "=>",
          loc: [8, 17, 13, 4],
          parameters: [
            {
              kind: "param",
              loc: [8, 18, 8, 60],
              name: {
                kind: "id",
                loc: [8, 18, 8, 21],
                text: "Row",
                bindingKey: "Row$38ql2l88yay4$1",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [9, 5, 12, 10],
            type: {
              kind: "string",
              loc: [9, 6, 9, 8],
              text: "ul",
            },
            attributes: [],
            children: [
              {
                kind: "splice",
                loc: [10, 8, 10, 28],
                key: "$0splice0",
              },
              {
                kind: "splice",
                loc: [11, 8, 11, 28],
                key: "$0splice1",
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [14, 3, 14, 63],
        expression: {
          kind: "()",
          loc: [14, 10, 14, 62],
          expression: {
            kind: "id",
            loc: [14, 10, 14, 15],
            text: "twice",
            bindingKey: "twice$38ql2l88yay4$0",
          },
          arguments: [
            {
              kind: "=>",
              loc: [14, 16, 14, 61],
              parameters: [
                {
                  kind: "param",
                  loc: [14, 17, 14, 33],
                  name: {
                    kind: "id",
                    loc: [14, 17, 14, 18],
                    text: "p",
                    bindingKey: "p$38ql2l88yay4$2",
                  },
                },
              ],
              body: {
                kind: "jsx",
                loc: [14, 38, 14, 61],
                type: {
                  kind: "string",
                  loc: [14, 39, 14, 41],
                  text: "li",
                },
                attributes: [],
                children: [
                  {
                    kind: "binop",
                    loc: [14, 43, 14, 55],
                    left: {
                      kind: "string",
                      loc: [14, 43, 14, 49],
                      text: "row ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: ".",
                      loc: [14, 52, 14, 55],
                      expression: {
                        kind: "id",
                        loc: [14, 52, 14, 53],
                        text: "p",
                        bindingKey: "p$38ql2l88yay4$2",
                      },
                      name: "n",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  }),
);
