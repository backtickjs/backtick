import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs } from "@backtickjs/core";
// A host component, and a binding of the same name an enclosing script holds.
// Scope decides: the nested script's `<Card>` is the captured function, and
// only the one outside every script binding it is the host's.
async function Card(props) {
  return _jsx("h2", { children: props.title });
}
// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same name
// is the host's component, spliced as before.
const scriptBoundTagScope = cs.create(
  [14, 29, 30, 3],
  {
    version: "0.0.0",
    filePath: "scriptBoundTagScope.tsx",
    fileHash: "2ogi0u0zkn2ax",
    splices: { $Card: { value: Card, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [14, 32, 30, 2],
    statements: [
      {
        kind: "const",
        loc: [15, 3, 20, 5],
        name: {
          kind: "id",
          loc: [15, 9, 15, 14],
          text: "twice",
          bindingKey: "twice$2ogi0u0zkn2ax$0",
        },
        initializer: {
          kind: "=>",
          loc: [15, 17, 20, 4],
          parameters: [
            {
              kind: "param",
              loc: [15, 18, 15, 65],
              name: {
                kind: "id",
                loc: [15, 18, 15, 22],
                text: "Card",
                bindingKey: "Card$2ogi0u0zkn2ax$1",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [16, 5, 19, 11],
            type: {
              kind: "string",
              loc: [16, 6, 16, 9],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [17, 7, 17, 21],
                type: {
                  kind: "id",
                  loc: [17, 8, 17, 12],
                  text: "Card",
                  bindingKey: "Card$2ogi0u0zkn2ax$1",
                },
                attributes: [
                  {
                    name: "n",
                    initializer: {
                      kind: "number",
                      loc: [17, 16, 17, 17],
                      value: 1,
                    },
                  },
                ],
                children: [],
              },
              {
                kind: "jsx",
                loc: [18, 7, 18, 21],
                type: {
                  kind: "id",
                  loc: [18, 8, 18, 12],
                  text: "Card",
                  bindingKey: "Card$2ogi0u0zkn2ax$1",
                },
                attributes: [
                  {
                    name: "n",
                    initializer: {
                      kind: "number",
                      loc: [18, 16, 18, 17],
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
        loc: [22, 3, 29, 5],
        expression: {
          kind: "jsx",
          loc: [23, 5, 28, 15],
          type: {
            kind: "string",
            loc: [23, 6, 23, 13],
            text: "section",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [24, 7, 24, 28],
              type: {
                kind: "splice",
                loc: [24, 8, 24, 12],
                key: "$Card",
              },
              attributes: [
                {
                  name: "title",
                  initializer: {
                    kind: "string",
                    loc: [24, 19, 24, 25],
                    text: "host",
                  },
                },
              ],
              children: [],
            },
            {
              kind: "()",
              loc: [25, 8, 27, 9],
              expression: {
                kind: "id",
                loc: [25, 8, 25, 13],
                text: "twice",
                bindingKey: "twice$2ogi0u0zkn2ax$0",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [25, 14, 27, 8],
                  parameters: [
                    {
                      kind: "param",
                      loc: [25, 15, 25, 35],
                      name: {
                        kind: "id",
                        loc: [25, 15, 25, 20],
                        text: "props",
                        bindingKey: "props$2ogi0u0zkn2ax$2",
                      },
                    },
                  ],
                  body: {
                    kind: "jsx",
                    loc: [26, 9, 26, 34],
                    type: {
                      kind: "string",
                      loc: [26, 10, 26, 11],
                      text: "i",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "binop",
                        loc: [26, 13, 26, 29],
                        left: {
                          kind: "string",
                          loc: [26, 13, 26, 19],
                          text: "row ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: ".",
                          loc: [26, 22, 26, 29],
                          expression: {
                            kind: "id",
                            loc: [26, 22, 26, 27],
                            text: "props",
                            bindingKey: "props$2ogi0u0zkn2ax$2",
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
