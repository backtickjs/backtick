import { jsx as _jsx } from "@backtickjs/web-client/jsx-runtime";
import { cs } from "@backtickjs/core";
// A host component, and a binding of the same name an enclosing script holds.
// Scope decides: the nested script's `<Card>` is the captured function, and
// only the one outside every script binding it is the host's.
async function Card(props) {
  return _jsx("h2", { children: props.title });
}
// Instantiated twice with different labels, so the enclosing script is
// polymorphic and its nested script's captures arrive through a thunk.
function labelled(label) {
  return cs.create(
    [14, 10, 17, 5],
    {
      version: "0.0.0",
      filePath: "script-bound-tag-capture-shadow.tsx",
      fileHash: "3v8jgf5cjk8bw",
      splices: {
        $label: { value: label, params: [] },
        $0splice0: {
          value: cs.create(
            [16, 18, 16, 36],
            {
              version: "0.0.0",
              filePath: "script-bound-tag-capture-shadow.tsx",
              fileHash: "3v8jgf5cjk8bw",
              splices: {},
              captures: ["Card$3v8jgf5cjk8bw$0"],
            },
            () => ({
              kind: "jsx",
              loc: [16, 21, 16, 35],
              type: {
                kind: "id",
                loc: [16, 22, 16, 26],
                text: "Card",
                bindingKey: "Card$3v8jgf5cjk8bw$0",
              },
              attributes: [
                {
                  name: "n",
                  initializer: {
                    kind: "number",
                    loc: [16, 30, 16, 31],
                    value: 1,
                  },
                },
              ],
              children: [],
            }),
          ),
          params: ["Card$3v8jgf5cjk8bw$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [14, 13, 17, 4],
      statements: [
        {
          kind: "const",
          loc: [15, 5, 15, 70],
          name: {
            kind: "id",
            loc: [15, 11, 15, 15],
            text: "Card",
            bindingKey: "Card$3v8jgf5cjk8bw$0",
          },
          initializer: {
            kind: "=>",
            loc: [15, 18, 15, 69],
            parameters: [
              {
                kind: "param",
                loc: [15, 19, 15, 39],
                name: {
                  kind: "id",
                  loc: [15, 19, 15, 24],
                  text: "props",
                  bindingKey: "props$3v8jgf5cjk8bw$1",
                },
              },
            ],
            body: {
              kind: "jsx",
              loc: [15, 44, 15, 69],
              type: {
                kind: "string",
                loc: [15, 45, 15, 46],
                text: "i",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [15, 48, 15, 64],
                  left: {
                    kind: "splice",
                    loc: [15, 48, 15, 54],
                    key: "$label",
                  },
                  operatorToken: "+",
                  right: {
                    kind: ".",
                    loc: [15, 57, 15, 64],
                    expression: {
                      kind: "id",
                      loc: [15, 57, 15, 62],
                      text: "props",
                      bindingKey: "props$3v8jgf5cjk8bw$1",
                    },
                    name: "n",
                  },
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [16, 5, 16, 43],
          expression: {
            kind: "jsx",
            loc: [16, 12, 16, 42],
            type: {
              kind: "string",
              loc: [16, 13, 16, 14],
              text: "p",
            },
            attributes: [],
            children: [
              {
                kind: "splice",
                loc: [16, 16, 16, 37],
                key: "$0splice0",
              },
            ],
          },
        },
      ],
    }),
  );
}
export default cs.create(
  [20, 16, 24, 8],
  {
    version: "0.0.0",
    filePath: "script-bound-tag-capture-shadow.tsx",
    fileHash: "3v8jgf5cjk8bw",
    splices: {
      $0splice0: {
        value: labelled(
          cs.create(
            [22, 15, 22, 22],
            {
              version: "0.0.0",
              filePath: "script-bound-tag-capture-shadow.tsx",
              fileHash: "3v8jgf5cjk8bw",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "string",
              loc: [22, 18, 22, 21],
              text: "a",
            }),
          ),
        ),
        params: [],
      },
      $0splice1: {
        value: labelled(
          cs.create(
            [23, 15, 23, 22],
            {
              version: "0.0.0",
              filePath: "script-bound-tag-capture-shadow.tsx",
              fileHash: "3v8jgf5cjk8bw",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "string",
              loc: [23, 18, 23, 21],
              text: "b",
            }),
          ),
        ),
        params: [],
      },
      $Card: { value: Card, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [20, 19, 24, 7],
    type: {
      kind: "string",
      loc: [20, 20, 20, 23],
      text: "div",
    },
    attributes: [],
    children: [
      {
        kind: "jsx",
        loc: [21, 3, 21, 24],
        type: {
          kind: "splice",
          loc: [21, 4, 21, 8],
          key: "$Card",
        },
        attributes: [
          {
            name: "title",
            initializer: {
              kind: "string",
              loc: [21, 15, 21, 21],
              text: "host",
            },
          },
        ],
        children: [],
      },
      {
        kind: "splice",
        loc: [22, 4, 22, 24],
        key: "$0splice0",
      },
      {
        kind: "splice",
        loc: [23, 4, 23, 24],
        key: "$0splice1",
      },
    ],
  }),
);
