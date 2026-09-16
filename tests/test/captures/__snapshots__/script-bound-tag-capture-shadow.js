import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
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
    [16, 10, 19, 5],
    {
      version: "0.0.0",
      filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
      fileHash: "2mv5sg07ackia",
      splices: {
        $label: { value: label, params: [] },
        $0splice0: {
          value: cs.create(
            [18, 18, 18, 36],
            {
              version: "0.0.0",
              filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
              fileHash: "2mv5sg07ackia",
              splices: {},
              captures: ["Card$2mv5sg07ackia$0"],
            },
            () => ({
              kind: "jsx",
              loc: [18, 21, 18, 35],
              type: {
                kind: "id",
                loc: [18, 22, 18, 26],
                text: "Card",
                bindingKey: "Card$2mv5sg07ackia$0",
              },
              attributes: [
                {
                  name: "n",
                  initializer: {
                    kind: "number",
                    loc: [18, 30, 18, 31],
                    value: 1,
                  },
                },
              ],
              children: [],
            }),
          ),
          params: ["Card$2mv5sg07ackia$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [16, 13, 19, 4],
      statements: [
        {
          kind: "const",
          loc: [17, 5, 17, 70],
          name: {
            kind: "id",
            loc: [17, 11, 17, 15],
            text: "Card",
            bindingKey: "Card$2mv5sg07ackia$0",
          },
          initializer: {
            kind: "=>",
            loc: [17, 18, 17, 69],
            parameters: [
              {
                kind: "param",
                loc: [17, 19, 17, 39],
                name: {
                  kind: "id",
                  loc: [17, 19, 17, 24],
                  text: "props",
                  bindingKey: "props$2mv5sg07ackia$1",
                },
              },
            ],
            body: {
              kind: "jsx",
              loc: [17, 44, 17, 69],
              type: {
                kind: "string",
                loc: [17, 45, 17, 46],
                text: "i",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [17, 48, 17, 64],
                  left: {
                    kind: "splice",
                    loc: [17, 48, 17, 54],
                    key: "$label",
                  },
                  operatorToken: "+",
                  right: {
                    kind: ".",
                    loc: [17, 57, 17, 64],
                    expression: {
                      kind: "id",
                      loc: [17, 57, 17, 62],
                      text: "props",
                      bindingKey: "props$2mv5sg07ackia$1",
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
          loc: [18, 5, 18, 43],
          expression: {
            kind: "jsx",
            loc: [18, 12, 18, 42],
            type: {
              kind: "string",
              loc: [18, 13, 18, 14],
              text: "p",
            },
            attributes: [],
            children: [
              {
                kind: "splice",
                loc: [18, 16, 18, 37],
                key: "$0splice0",
              },
            ],
          },
        },
      ],
    }),
  );
}
it("scriptBoundTagCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagCaptureShadow",
    cs.create(
      [26, 5, 30, 12],
      {
        version: "0.0.0",
        filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
        fileHash: "2mv5sg07ackia",
        splices: {
          $0splice0: {
            value: labelled(
              cs.create(
                [28, 19, 28, 26],
                {
                  version: "0.0.0",
                  filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
                  fileHash: "2mv5sg07ackia",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "string",
                  loc: [28, 22, 28, 25],
                  text: "a",
                }),
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: labelled(
              cs.create(
                [29, 19, 29, 26],
                {
                  version: "0.0.0",
                  filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
                  fileHash: "2mv5sg07ackia",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "string",
                  loc: [29, 22, 29, 25],
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
        loc: [26, 8, 30, 11],
        type: {
          kind: "string",
          loc: [26, 9, 26, 12],
          text: "div",
        },
        attributes: [],
        children: [
          {
            kind: "jsx",
            loc: [27, 7, 27, 28],
            type: {
              kind: "splice",
              loc: [27, 8, 27, 12],
              key: "$Card",
            },
            attributes: [
              {
                name: "title",
                initializer: {
                  kind: "string",
                  loc: [27, 19, 27, 25],
                  text: "host",
                },
              },
            ],
            children: [],
          },
          {
            kind: "splice",
            loc: [28, 8, 28, 28],
            key: "$0splice0",
          },
          {
            kind: "splice",
            loc: [29, 8, 29, 28],
            key: "$0splice1",
          },
        ],
      }),
    ),
  );
});
// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same
// name is the host's component, spliced as before.
it("scriptBoundTagScope", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagScope",
    cs.create(
      [41, 5, 57, 7],
      {
        version: "0.0.0",
        filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
        fileHash: "2mv5sg07ackia",
        splices: { $Card: { value: Card, params: [] } },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [41, 8, 57, 6],
        statements: [
          {
            kind: "const",
            loc: [42, 7, 47, 9],
            name: {
              kind: "id",
              loc: [42, 13, 42, 18],
              text: "twice",
              bindingKey: "twice$2mv5sg07ackia$2",
            },
            initializer: {
              kind: "=>",
              loc: [42, 21, 47, 8],
              parameters: [
                {
                  kind: "param",
                  loc: [42, 22, 42, 69],
                  name: {
                    kind: "id",
                    loc: [42, 22, 42, 26],
                    text: "Card",
                    bindingKey: "Card$2mv5sg07ackia$3",
                  },
                },
              ],
              body: {
                kind: "jsx",
                loc: [43, 9, 46, 15],
                type: {
                  kind: "string",
                  loc: [43, 10, 43, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [44, 11, 44, 25],
                    type: {
                      kind: "id",
                      loc: [44, 12, 44, 16],
                      text: "Card",
                      bindingKey: "Card$2mv5sg07ackia$3",
                    },
                    attributes: [
                      {
                        name: "n",
                        initializer: {
                          kind: "number",
                          loc: [44, 20, 44, 21],
                          value: 1,
                        },
                      },
                    ],
                    children: [],
                  },
                  {
                    kind: "jsx",
                    loc: [45, 11, 45, 25],
                    type: {
                      kind: "id",
                      loc: [45, 12, 45, 16],
                      text: "Card",
                      bindingKey: "Card$2mv5sg07ackia$3",
                    },
                    attributes: [
                      {
                        name: "n",
                        initializer: {
                          kind: "number",
                          loc: [45, 20, 45, 21],
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
            loc: [49, 7, 56, 9],
            expression: {
              kind: "jsx",
              loc: [50, 9, 55, 19],
              type: {
                kind: "string",
                loc: [50, 10, 50, 17],
                text: "section",
              },
              attributes: [],
              children: [
                {
                  kind: "jsx",
                  loc: [51, 11, 51, 32],
                  type: {
                    kind: "splice",
                    loc: [51, 12, 51, 16],
                    key: "$Card",
                  },
                  attributes: [
                    {
                      name: "title",
                      initializer: {
                        kind: "string",
                        loc: [51, 23, 51, 29],
                        text: "host",
                      },
                    },
                  ],
                  children: [],
                },
                {
                  kind: "()",
                  loc: [52, 12, 54, 13],
                  expression: {
                    kind: "id",
                    loc: [52, 12, 52, 17],
                    text: "twice",
                    bindingKey: "twice$2mv5sg07ackia$2",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [52, 18, 54, 12],
                      parameters: [
                        {
                          kind: "param",
                          loc: [52, 19, 52, 39],
                          name: {
                            kind: "id",
                            loc: [52, 19, 52, 24],
                            text: "props",
                            bindingKey: "props$2mv5sg07ackia$4",
                          },
                        },
                      ],
                      body: {
                        kind: "jsx",
                        loc: [53, 13, 53, 38],
                        type: {
                          kind: "string",
                          loc: [53, 14, 53, 15],
                          text: "i",
                        },
                        attributes: [],
                        children: [
                          {
                            kind: "binop",
                            loc: [53, 17, 53, 33],
                            left: {
                              kind: "string",
                              loc: [53, 17, 53, 23],
                              text: "row ",
                            },
                            operatorToken: "+",
                            right: {
                              kind: ".",
                              loc: [53, 26, 53, 33],
                              expression: {
                                kind: "id",
                                loc: [53, 26, 53, 31],
                                text: "props",
                                bindingKey: "props$2mv5sg07ackia$4",
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
    ),
  );
});
