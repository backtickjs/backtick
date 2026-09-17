import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?` on a property means omittable: an absent member reads as null — the
// language's absent value; `undefined` never arises — and `?.` composes on
// top for the nullable reads.
const read = cs.create(
  [8, 14, 10, 3],
  {
    version: "0.0.0",
    filePath: "objects/optional-property.test.tsx",
    fileHash: "1pn78z89zmc5d",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [8, 17, 10, 2],
    parameters: [
      {
        kind: "param",
        loc: [8, 18, 8, 62],
        name: {
          kind: "id",
          loc: [8, 18, 8, 19],
          text: "o",
          bindingKey: "o$1pn78z89zmc5d$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [8, 67, 10, 2],
      statements: [
        {
          kind: "return",
          loc: [9, 3, 9, 37],
          expression: {
            kind: "arr",
            loc: [9, 10, 9, 36],
            elements: [
              {
                kind: ".",
                loc: [9, 11, 9, 18],
                expression: {
                  kind: "id",
                  loc: [9, 11, 9, 12],
                  text: "o",
                  bindingKey: "o$1pn78z89zmc5d$0",
                },
                name: "label",
              },
              {
                kind: "binop",
                loc: [9, 20, 9, 35],
                left: {
                  kind: "?.",
                  loc: [9, 20, 9, 30],
                  expression: {
                    kind: ".",
                    loc: [9, 20, 9, 27],
                    expression: {
                      kind: "id",
                      loc: [9, 20, 9, 21],
                      text: "o",
                      bindingKey: "o$1pn78z89zmc5d$0",
                    },
                    name: "inner",
                  },
                  name: "z",
                },
                operatorToken: "??",
                right: {
                  kind: "number",
                  loc: [9, 34, 9, 35],
                  value: 0,
                },
              },
            ],
          },
        },
      ],
    },
  }),
);
it("optionalProperty", async (t) => {
  await snapshotCase(
    t,
    "optionalProperty",
    cs.create(
      [16, 5, 20, 8],
      {
        version: "0.0.0",
        filePath: "objects/optional-property.test.tsx",
        fileHash: "1pn78z89zmc5d",
        splices: { $read: { value: read, params: [] } },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [16, 9, 20, 6],
        properties: [
          {
            kind: ":",
            loc: [17, 7, 17, 54],
            name: {
              kind: "string",
              loc: [17, 7, 17, 14],
              text: "present",
            },
            initializer: {
              kind: "()",
              loc: [17, 16, 17, 54],
              expression: {
                kind: "splice",
                loc: [17, 16, 17, 21],
                key: "$read",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [17, 22, 17, 53],
                  properties: [
                    {
                      kind: ":",
                      loc: [17, 24, 17, 34],
                      name: {
                        kind: "string",
                        loc: [17, 24, 17, 29],
                        text: "label",
                      },
                      initializer: {
                        kind: "string",
                        loc: [17, 31, 17, 34],
                        text: "a",
                      },
                    },
                    {
                      kind: ":",
                      loc: [17, 36, 17, 51],
                      name: {
                        kind: "string",
                        loc: [17, 36, 17, 41],
                        text: "inner",
                      },
                      initializer: {
                        kind: "obj",
                        loc: [17, 43, 17, 51],
                        properties: [
                          {
                            kind: ":",
                            loc: [17, 45, 17, 49],
                            name: {
                              kind: "string",
                              loc: [17, 45, 17, 46],
                              text: "z",
                            },
                            initializer: {
                              kind: "number",
                              loc: [17, 48, 17, 49],
                              value: 3,
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
          {
            kind: ":",
            loc: [18, 7, 18, 48],
            name: {
              kind: "string",
              loc: [18, 7, 18, 14],
              text: "partial",
            },
            initializer: {
              kind: "()",
              loc: [18, 16, 18, 48],
              expression: {
                kind: "splice",
                loc: [18, 16, 18, 21],
                key: "$read",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [18, 22, 18, 47],
                  properties: [
                    {
                      kind: ":",
                      loc: [18, 24, 18, 34],
                      name: {
                        kind: "string",
                        loc: [18, 24, 18, 29],
                        text: "label",
                      },
                      initializer: {
                        kind: "string",
                        loc: [18, 31, 18, 34],
                        text: "b",
                      },
                    },
                    {
                      kind: ":",
                      loc: [18, 36, 18, 45],
                      name: {
                        kind: "string",
                        loc: [18, 36, 18, 41],
                        text: "inner",
                      },
                      initializer: {
                        kind: "obj",
                        loc: [18, 43, 18, 45],
                        properties: [],
                      },
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [19, 7, 19, 37],
            name: {
              kind: "string",
              loc: [19, 7, 19, 14],
              text: "omitted",
            },
            initializer: {
              kind: "()",
              loc: [19, 16, 19, 37],
              expression: {
                kind: "splice",
                loc: [19, 16, 19, 21],
                key: "$read",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [19, 22, 19, 36],
                  properties: [
                    {
                      kind: ":",
                      loc: [19, 24, 19, 34],
                      name: {
                        kind: "string",
                        loc: [19, 24, 19, 29],
                        text: "label",
                      },
                      initializer: {
                        kind: "string",
                        loc: [19, 31, 19, 34],
                        text: "c",
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
