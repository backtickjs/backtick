import { cs } from "@backtickjs/core";
// `?` on a property means omittable: an absent member reads as null — the
// language's absent value; `undefined` never arises — and `?.` composes on
// top for the nullable reads.
const read = cs.create(
  [6, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "optionalProperty.tsx",
    fileHash: "s2jnh908sr3n",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [6, 17, 8, 2],
    parameters: [
      {
        kind: "param",
        loc: [6, 18, 6, 62],
        name: {
          kind: "id",
          loc: [6, 18, 6, 19],
          text: "o",
          bindingKey: "o$s2jnh908sr3n$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [6, 67, 8, 2],
      statements: [
        {
          kind: "return",
          loc: [7, 3, 7, 37],
          expression: {
            kind: "arr",
            loc: [7, 10, 7, 36],
            elements: [
              {
                kind: ".",
                loc: [7, 11, 7, 18],
                expression: {
                  kind: "id",
                  loc: [7, 11, 7, 12],
                  text: "o",
                  bindingKey: "o$s2jnh908sr3n$0",
                },
                name: "label",
              },
              {
                kind: "binop",
                loc: [7, 20, 7, 35],
                left: {
                  kind: "?.",
                  loc: [7, 20, 7, 30],
                  expression: {
                    kind: ".",
                    loc: [7, 20, 7, 27],
                    expression: {
                      kind: "id",
                      loc: [7, 20, 7, 21],
                      text: "o",
                      bindingKey: "o$s2jnh908sr3n$0",
                    },
                    name: "inner",
                  },
                  name: "z",
                },
                operatorToken: "??",
                right: {
                  kind: "number",
                  loc: [7, 34, 7, 35],
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
const optionalProperty = cs.create(
  [10, 26, 14, 4],
  {
    version: "0.0.0",
    filePath: "optionalProperty.tsx",
    fileHash: "s2jnh908sr3n",
    splices: { $read: { value: read, params: [] } },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [10, 30, 14, 2],
    properties: [
      {
        kind: ":",
        loc: [11, 3, 11, 50],
        name: "present",
        initializer: {
          kind: "()",
          loc: [11, 12, 11, 50],
          expression: {
            kind: "splice",
            loc: [11, 12, 11, 17],
            key: "$read",
          },
          arguments: [
            {
              kind: "obj",
              loc: [11, 18, 11, 49],
              properties: [
                {
                  kind: ":",
                  loc: [11, 20, 11, 30],
                  name: "label",
                  initializer: {
                    kind: "string",
                    loc: [11, 27, 11, 30],
                    text: "a",
                  },
                },
                {
                  kind: ":",
                  loc: [11, 32, 11, 47],
                  name: "inner",
                  initializer: {
                    kind: "obj",
                    loc: [11, 39, 11, 47],
                    properties: [
                      {
                        kind: ":",
                        loc: [11, 41, 11, 45],
                        name: "z",
                        initializer: {
                          kind: "number",
                          loc: [11, 44, 11, 45],
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
        loc: [12, 3, 12, 44],
        name: "partial",
        initializer: {
          kind: "()",
          loc: [12, 12, 12, 44],
          expression: {
            kind: "splice",
            loc: [12, 12, 12, 17],
            key: "$read",
          },
          arguments: [
            {
              kind: "obj",
              loc: [12, 18, 12, 43],
              properties: [
                {
                  kind: ":",
                  loc: [12, 20, 12, 30],
                  name: "label",
                  initializer: {
                    kind: "string",
                    loc: [12, 27, 12, 30],
                    text: "b",
                  },
                },
                {
                  kind: ":",
                  loc: [12, 32, 12, 41],
                  name: "inner",
                  initializer: {
                    kind: "obj",
                    loc: [12, 39, 12, 41],
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
        loc: [13, 3, 13, 33],
        name: "omitted",
        initializer: {
          kind: "()",
          loc: [13, 12, 13, 33],
          expression: {
            kind: "splice",
            loc: [13, 12, 13, 17],
            key: "$read",
          },
          arguments: [
            {
              kind: "obj",
              loc: [13, 18, 13, 32],
              properties: [
                {
                  kind: ":",
                  loc: [13, 20, 13, 30],
                  name: "label",
                  initializer: {
                    kind: "string",
                    loc: [13, 27, 13, 30],
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
);
