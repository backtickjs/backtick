import { jsx as _jsx } from "@backtickjs/web/jsx-runtime";
import { cs } from "@backtickjs/core";
// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same name
// is the host's component, spliced as before.
async function Card(props) {
  return _jsx("h2", { children: props.title });
}
export default cs.create(
  [11, 16, 25, 3],
  {
    version: "0.0.0",
    filePath: "script-bound-tag-scope.tsx",
    fileHash: "2cysdirww84u9",
    splices: { $Card: { value: Card, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [11, 19, 25, 2],
    statements: [
      {
        kind: "const",
        loc: [12, 3, 17, 5],
        name: {
          kind: "id",
          loc: [12, 9, 12, 14],
          text: "twice",
          bindingKey: "twice$2cysdirww84u9$0",
        },
        initializer: {
          kind: "=>",
          loc: [12, 17, 17, 4],
          parameters: [
            {
              kind: "param",
              loc: [12, 18, 12, 65],
              name: {
                kind: "id",
                loc: [12, 18, 12, 22],
                text: "Card",
                bindingKey: "Card$2cysdirww84u9$1",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [13, 5, 16, 11],
            type: {
              kind: "string",
              loc: [13, 6, 13, 9],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [14, 7, 14, 21],
                type: {
                  kind: "id",
                  loc: [14, 8, 14, 12],
                  text: "Card",
                  bindingKey: "Card$2cysdirww84u9$1",
                },
                attributes: [
                  {
                    name: "n",
                    initializer: {
                      kind: "number",
                      loc: [14, 16, 14, 17],
                      value: 1,
                    },
                  },
                ],
                children: [],
              },
              {
                kind: "jsx",
                loc: [15, 7, 15, 21],
                type: {
                  kind: "id",
                  loc: [15, 8, 15, 12],
                  text: "Card",
                  bindingKey: "Card$2cysdirww84u9$1",
                },
                attributes: [
                  {
                    name: "n",
                    initializer: {
                      kind: "number",
                      loc: [15, 16, 15, 17],
                      value: 2,
                    },
                  },
                ],
                children: [],
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [19, 3, 24, 5],
        expression: {
          kind: "jsx",
          loc: [20, 5, 23, 15],
          type: {
            kind: "string",
            loc: [20, 6, 20, 13],
            text: "section",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [21, 7, 21, 28],
              type: {
                kind: "splice",
                loc: [21, 8, 21, 12],
                key: "$Card",
              },
              attributes: [
                {
                  name: "title",
                  initializer: {
                    kind: "string",
                    loc: [21, 19, 21, 25],
                    text: "host",
                  },
                },
              ],
              children: [],
            },
            {
              kind: "()",
              loc: [22, 8, 22, 66],
              expression: {
                kind: "id",
                loc: [22, 8, 22, 13],
                text: "twice",
                bindingKey: "twice$2cysdirww84u9$0",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [22, 14, 22, 65],
                  parameters: [
                    {
                      kind: "param",
                      loc: [22, 15, 22, 35],
                      name: {
                        kind: "id",
                        loc: [22, 15, 22, 20],
                        text: "props",
                        bindingKey: "props$2cysdirww84u9$2",
                      },
                    },
                  ],
                  body: {
                    kind: "jsx",
                    loc: [22, 40, 22, 65],
                    type: {
                      kind: "string",
                      loc: [22, 41, 22, 42],
                      text: "i",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "binop",
                        loc: [22, 44, 22, 60],
                        left: {
                          kind: "string",
                          loc: [22, 44, 22, 50],
                          text: "row ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: ".",
                          loc: [22, 53, 22, 60],
                          expression: {
                            kind: "id",
                            loc: [22, 53, 22, 58],
                            text: "props",
                            bindingKey: "props$2cysdirww84u9$2",
                          },
                          name: "n",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
