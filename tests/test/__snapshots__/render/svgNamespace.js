import { cs, For } from "@backtickjs/core";
// SVG written the way it is pasted: no tag says which language it is from.
// Where an element is drawn does — inside an `svg` it is SVG's, and a
// `foreignObject` holds HTML again — so a circle a host component or a function
// the script holds draws is SVG's once it stands inside the `svg`, and a
// `title` or an `a`, whose names both languages use, is whichever one encloses
// it.
async function Ring() {
  return cs.create(
    [10, 10, 10, 78],
    {
      version: "0.0.0",
      filePath: "svgNamespace.tsx",
      fileHash: "25ixgiloxdmbo",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [10, 13, 10, 77],
      type: {
        kind: "string",
        loc: [10, 14, 10, 20],
        text: "circle",
      },
      attributes: [
        {
          name: "cx",
          initializer: {
            kind: "string",
            loc: [10, 24, 10, 27],
            text: "5",
          },
        },
        {
          name: "cy",
          initializer: {
            kind: "string",
            loc: [10, 31, 10, 34],
            text: "5",
          },
        },
        {
          name: "r",
          initializer: {
            kind: "string",
            loc: [10, 37, 10, 40],
            text: "4",
          },
        },
        {
          name: "fill",
          initializer: {
            kind: "string",
            loc: [10, 46, 10, 52],
            text: "none",
          },
        },
        {
          name: "stroke",
          initializer: {
            kind: "string",
            loc: [10, 60, 10, 74],
            text: "currentColor",
          },
        },
      ],
      children: [],
    }),
  );
}
const svgNamespace = cs.create(
  [13, 22, 32, 3],
  {
    version: "0.0.0",
    filePath: "svgNamespace.tsx",
    fileHash: "25ixgiloxdmbo",
    splices: {
      $Ring: { value: Ring, params: [] },
      $For: { value: For, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [13, 25, 32, 2],
    statements: [
      {
        kind: "const",
        loc: [14, 3, 18, 5],
        name: {
          kind: "id",
          loc: [14, 9, 14, 12],
          text: "Dot",
          bindingKey: "Dot$25ixgiloxdmbo$0",
        },
        initializer: {
          kind: "=>",
          loc: [14, 15, 18, 4],
          parameters: [
            {
              kind: "param",
              loc: [14, 16, 14, 36],
              name: {
                kind: "id",
                loc: [14, 16, 14, 21],
                text: "props",
                bindingKey: "props$25ixgiloxdmbo$1",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [15, 5, 17, 14],
            type: {
              kind: "string",
              loc: [15, 6, 15, 12],
              text: "circle",
            },
            attributes: [
              {
                name: "cx",
                initializer: {
                  kind: ".",
                  loc: [15, 17, 15, 24],
                  expression: {
                    kind: "id",
                    loc: [15, 17, 15, 22],
                    text: "props",
                    bindingKey: "props$25ixgiloxdmbo$1",
                  },
                  name: "x",
                },
              },
              {
                name: "cy",
                initializer: {
                  kind: "string",
                  loc: [15, 29, 15, 32],
                  text: "5",
                },
              },
              {
                name: "r",
                initializer: {
                  kind: "string",
                  loc: [15, 35, 15, 38],
                  text: "2",
                },
              },
            ],
            children: [
              {
                kind: "jsx",
                loc: [16, 7, 16, 40],
                type: {
                  kind: "string",
                  loc: [16, 8, 16, 13],
                  text: "title",
                },
                attributes: [],
                children: [
                  {
                    kind: "binop",
                    loc: [16, 15, 16, 31],
                    left: {
                      kind: "string",
                      loc: [16, 15, 16, 21],
                      text: "dot ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: ".",
                      loc: [16, 24, 16, 31],
                      expression: {
                        kind: "id",
                        loc: [16, 24, 16, 29],
                        text: "props",
                        bindingKey: "props$25ixgiloxdmbo$1",
                      },
                      name: "x",
                    },
                  },
                ],
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [20, 3, 31, 5],
        expression: {
          kind: "jsx",
          loc: [21, 5, 30, 11],
          type: {
            kind: "string",
            loc: [21, 6, 21, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [22, 7, 22, 39],
              type: {
                kind: "string",
                loc: [22, 8, 22, 9],
                text: "a",
              },
              attributes: [
                {
                  name: "href",
                  initializer: {
                    kind: "string",
                    loc: [22, 15, 22, 24],
                    text: "/shapes",
                  },
                },
              ],
              children: [
                {
                  kind: "string",
                  loc: [22, 26, 22, 34],
                  text: "shapes",
                },
              ],
            },
            {
              kind: "jsx",
              loc: [23, 7, 29, 13],
              type: {
                kind: "string",
                loc: [23, 8, 23, 11],
                text: "svg",
              },
              attributes: [
                {
                  name: "viewBox",
                  initializer: {
                    kind: "string",
                    loc: [23, 20, 23, 31],
                    text: "0 0 30 10",
                  },
                },
                {
                  name: "width",
                  initializer: {
                    kind: "string",
                    loc: [23, 38, 23, 43],
                    text: "120",
                  },
                },
              ],
              children: [
                {
                  kind: "jsx",
                  loc: [24, 9, 24, 17],
                  type: {
                    kind: "splice",
                    loc: [24, 10, 24, 14],
                    key: "$Ring",
                  },
                  attributes: [],
                  children: [],
                },
                {
                  kind: "jsx",
                  loc: [25, 9, 25, 66],
                  type: {
                    kind: "splice",
                    loc: [25, 10, 25, 13],
                    key: "$For",
                  },
                  attributes: [
                    {
                      name: "each",
                      initializer: {
                        kind: "arr",
                        loc: [25, 20, 25, 28],
                        elements: [
                          {
                            kind: "number",
                            loc: [25, 21, 25, 23],
                            value: 10,
                          },
                          {
                            kind: "number",
                            loc: [25, 25, 25, 27],
                            value: 20,
                          },
                        ],
                      },
                    },
                  ],
                  children: [
                    {
                      kind: "=>",
                      loc: [25, 31, 25, 59],
                      parameters: [
                        {
                          kind: "param",
                          loc: [25, 32, 25, 41],
                          name: {
                            kind: "id",
                            loc: [25, 32, 25, 33],
                            text: "x",
                            bindingKey: "x$25ixgiloxdmbo$2",
                          },
                        },
                      ],
                      body: {
                        kind: "jsx",
                        loc: [25, 46, 25, 59],
                        type: {
                          kind: "id",
                          loc: [25, 47, 25, 50],
                          text: "Dot",
                          bindingKey: "Dot$25ixgiloxdmbo$0",
                        },
                        attributes: [
                          {
                            name: "x",
                            initializer: {
                              kind: "id",
                              loc: [25, 54, 25, 55],
                              text: "x",
                              bindingKey: "x$25ixgiloxdmbo$2",
                            },
                          },
                        ],
                        children: [],
                      },
                    },
                  ],
                },
                {
                  kind: "jsx",
                  loc: [26, 9, 28, 25],
                  type: {
                    kind: "string",
                    loc: [26, 10, 26, 23],
                    text: "foreignObject",
                  },
                  attributes: [
                    {
                      name: "x",
                      initializer: {
                        kind: "string",
                        loc: [26, 26, 26, 29],
                        text: "0",
                      },
                    },
                    {
                      name: "y",
                      initializer: {
                        kind: "string",
                        loc: [26, 32, 26, 35],
                        text: "0",
                      },
                    },
                    {
                      name: "width",
                      initializer: {
                        kind: "string",
                        loc: [26, 42, 26, 46],
                        text: "10",
                      },
                    },
                    {
                      name: "height",
                      initializer: {
                        kind: "string",
                        loc: [26, 54, 26, 58],
                        text: "10",
                      },
                    },
                  ],
                  children: [
                    {
                      kind: "jsx",
                      loc: [27, 11, 27, 32],
                      type: {
                        kind: "string",
                        loc: [27, 12, 27, 13],
                        text: "p",
                      },
                      attributes: [],
                      children: [
                        {
                          kind: "string",
                          loc: [27, 15, 27, 27],
                          text: "html again",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
