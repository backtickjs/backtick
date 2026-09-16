import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An object with storage of its own, made by a client function: `state` holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs.create(
  [9, 17, 17, 3],
  {
    version: "0.0.0",
    filePath: "state/stateful-object.test.tsx",
    fileHash: "puojhazh65ai",
    splices: { $state: { value: state, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [9, 20, 17, 2],
    parameters: [
      {
        kind: "param",
        loc: [9, 21, 9, 36],
        name: {
          kind: "id",
          loc: [9, 21, 9, 28],
          text: "initial",
          bindingKey: "initial$puojhazh65ai$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [9, 41, 17, 2],
      statements: [
        {
          kind: "const",
          loc: [10, 3, 10, 33],
          name: {
            kind: "id",
            loc: [10, 9, 10, 14],
            text: "count",
            bindingKey: "count$puojhazh65ai$1",
          },
          initializer: {
            kind: "()",
            loc: [10, 17, 10, 32],
            expression: {
              kind: "splice",
              loc: [10, 17, 10, 23],
              key: "$state",
            },
            arguments: [
              {
                kind: "id",
                loc: [10, 24, 10, 31],
                text: "initial",
                bindingKey: "initial$puojhazh65ai$0",
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [11, 3, 16, 5],
          expression: {
            kind: "obj",
            loc: [11, 10, 16, 4],
            properties: [
              {
                kind: ":",
                loc: [12, 5, 12, 29],
                name: "read",
                initializer: {
                  kind: "=>",
                  loc: [12, 11, 12, 29],
                  parameters: [],
                  body: {
                    kind: "()",
                    loc: [12, 17, 12, 29],
                    expression: {
                      kind: ".",
                      loc: [12, 17, 12, 27],
                      expression: {
                        kind: "id",
                        loc: [12, 17, 12, 22],
                        text: "count",
                        bindingKey: "count$puojhazh65ai$1",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                },
              },
              {
                kind: ":",
                loc: [13, 5, 15, 6],
                name: "add",
                initializer: {
                  kind: "=>",
                  loc: [13, 10, 15, 6],
                  parameters: [
                    {
                      kind: "param",
                      loc: [13, 11, 13, 20],
                      name: {
                        kind: "id",
                        loc: [13, 11, 13, 12],
                        text: "n",
                        bindingKey: "n$puojhazh65ai$2",
                      },
                    },
                  ],
                  body: {
                    kind: "{}",
                    loc: [13, 25, 15, 6],
                    statements: [
                      {
                        kind: "()",
                        loc: [14, 7, 14, 36],
                        expression: {
                          kind: ".",
                          loc: [14, 7, 14, 18],
                          expression: {
                            kind: "id",
                            loc: [14, 7, 14, 12],
                            text: "count",
                            bindingKey: "count$puojhazh65ai$1",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [14, 19, 14, 35],
                            left: {
                              kind: "()",
                              loc: [14, 19, 14, 31],
                              expression: {
                                kind: ".",
                                loc: [14, 19, 14, 29],
                                expression: {
                                  kind: "id",
                                  loc: [14, 19, 14, 24],
                                  text: "count",
                                  bindingKey: "count$puojhazh65ai$1",
                                },
                                name: "read",
                              },
                              arguments: [],
                            },
                            operatorToken: "+",
                            right: {
                              kind: "id",
                              loc: [14, 34, 14, 35],
                              text: "n",
                              bindingKey: "n$puojhazh65ai$2",
                            },
                          },
                        ],
                      },
                    ],
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
it("statefulObject", async (t) => {
  await snapshotCase(
    t,
    "statefulObject",
    cs.create(
      [23, 5, 34, 7],
      {
        version: "0.0.0",
        filePath: "state/stateful-object.test.tsx",
        fileHash: "puojhazh65ai",
        splices: { $counter: { value: counter, params: [] } },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [23, 8, 34, 6],
        statements: [
          {
            kind: "const",
            loc: [24, 7, 24, 30],
            name: {
              kind: "id",
              loc: [24, 13, 24, 14],
              text: "c",
              bindingKey: "c$puojhazh65ai$3",
            },
            initializer: {
              kind: "()",
              loc: [24, 17, 24, 29],
              expression: {
                kind: "splice",
                loc: [24, 17, 24, 25],
                key: "$counter",
              },
              arguments: [
                {
                  kind: "number",
                  loc: [24, 26, 24, 28],
                  value: 10,
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [25, 7, 33, 9],
            expression: {
              kind: "jsx",
              loc: [26, 9, 32, 18],
              type: {
                kind: "string",
                loc: [26, 10, 26, 16],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [27, 20, 29, 12],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [27, 26, 29, 12],
                      statements: [
                        {
                          kind: "()",
                          loc: [28, 13, 28, 21],
                          expression: {
                            kind: ".",
                            loc: [28, 13, 28, 18],
                            expression: {
                              kind: "id",
                              loc: [28, 13, 28, 14],
                              text: "c",
                              bindingKey: "c$puojhazh65ai$3",
                            },
                            name: "add",
                          },
                          arguments: [
                            {
                              kind: "number",
                              loc: [28, 19, 28, 20],
                              value: 5,
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
              children: [
                {
                  kind: "()",
                  loc: [31, 12, 31, 20],
                  expression: {
                    kind: ".",
                    loc: [31, 12, 31, 18],
                    expression: {
                      kind: "id",
                      loc: [31, 12, 31, 13],
                      text: "c",
                      bindingKey: "c$puojhazh65ai$3",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
