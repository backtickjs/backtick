import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For } from "@backtickjs/core";
import { render } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";
import { namespaced } from "./dom.ts";
// SVG written the way it is pasted: no tag says which language it is from.
// Where an element is drawn does — inside an `svg` it is SVG's, and a
// `foreignObject` holds HTML again — so a circle a host component or a function
// the script holds draws is SVG's once it stands inside the `svg`, and a
// `title` or an `a`, whose names both languages use, is whichever one encloses
// it.
async function Ring() {
  return cs.create(
    [15, 10, 15, 78],
    {
      version: "0.0.0",
      filePath: "render/svg-namespace.test.tsx",
      fileHash: "8n845jjtfvwm",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [15, 13, 15, 77],
      type: {
        kind: "string",
        loc: [15, 14, 15, 20],
        text: "circle",
      },
      attributes: [
        {
          name: "cx",
          initializer: {
            kind: "string",
            loc: [15, 24, 15, 27],
            text: "5",
          },
        },
        {
          name: "cy",
          initializer: {
            kind: "string",
            loc: [15, 31, 15, 34],
            text: "5",
          },
        },
        {
          name: "r",
          initializer: {
            kind: "string",
            loc: [15, 37, 15, 40],
            text: "4",
          },
        },
        {
          name: "fill",
          initializer: {
            kind: "string",
            loc: [15, 46, 15, 52],
            text: "none",
          },
        },
        {
          name: "stroke",
          initializer: {
            kind: "string",
            loc: [15, 60, 15, 74],
            text: "currentColor",
          },
        },
      ],
      children: [],
    }),
  );
}
const svgNamespace = cs.create(
  [18, 22, 37, 3],
  {
    version: "0.0.0",
    filePath: "render/svg-namespace.test.tsx",
    fileHash: "8n845jjtfvwm",
    splices: {
      $Ring: { value: Ring, params: [] },
      $For: { value: For, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [18, 25, 37, 2],
    statements: [
      {
        kind: "const",
        loc: [19, 3, 23, 5],
        name: {
          kind: "id",
          loc: [19, 9, 19, 12],
          text: "Dot",
          bindingKey: "Dot$8n845jjtfvwm$0",
        },
        initializer: {
          kind: "=>",
          loc: [19, 15, 23, 4],
          parameters: [
            {
              kind: "param",
              loc: [19, 16, 19, 36],
              name: {
                kind: "id",
                loc: [19, 16, 19, 21],
                text: "props",
                bindingKey: "props$8n845jjtfvwm$1",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [20, 5, 22, 14],
            type: {
              kind: "string",
              loc: [20, 6, 20, 12],
              text: "circle",
            },
            attributes: [
              {
                name: "cx",
                initializer: {
                  kind: ".",
                  loc: [20, 17, 20, 24],
                  expression: {
                    kind: "id",
                    loc: [20, 17, 20, 22],
                    text: "props",
                    bindingKey: "props$8n845jjtfvwm$1",
                  },
                  name: "x",
                },
              },
              {
                name: "cy",
                initializer: {
                  kind: "string",
                  loc: [20, 29, 20, 32],
                  text: "5",
                },
              },
              {
                name: "r",
                initializer: {
                  kind: "string",
                  loc: [20, 35, 20, 38],
                  text: "2",
                },
              },
            ],
            children: [
              {
                kind: "jsx",
                loc: [21, 7, 21, 40],
                type: {
                  kind: "string",
                  loc: [21, 8, 21, 13],
                  text: "title",
                },
                attributes: [],
                children: [
                  {
                    kind: "binop",
                    loc: [21, 15, 21, 31],
                    left: {
                      kind: "string",
                      loc: [21, 15, 21, 21],
                      text: "dot ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: ".",
                      loc: [21, 24, 21, 31],
                      expression: {
                        kind: "id",
                        loc: [21, 24, 21, 29],
                        text: "props",
                        bindingKey: "props$8n845jjtfvwm$1",
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
        loc: [25, 3, 36, 5],
        expression: {
          kind: "jsx",
          loc: [26, 5, 35, 11],
          type: {
            kind: "string",
            loc: [26, 6, 26, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [27, 7, 27, 39],
              type: {
                kind: "string",
                loc: [27, 8, 27, 9],
                text: "a",
              },
              attributes: [
                {
                  name: "href",
                  initializer: {
                    kind: "string",
                    loc: [27, 15, 27, 24],
                    text: "/shapes",
                  },
                },
              ],
              children: [
                {
                  kind: "string",
                  loc: [27, 26, 27, 34],
                  text: "shapes",
                },
              ],
            },
            {
              kind: "jsx",
              loc: [28, 7, 34, 13],
              type: {
                kind: "string",
                loc: [28, 8, 28, 11],
                text: "svg",
              },
              attributes: [
                {
                  name: "viewBox",
                  initializer: {
                    kind: "string",
                    loc: [28, 20, 28, 31],
                    text: "0 0 30 10",
                  },
                },
                {
                  name: "width",
                  initializer: {
                    kind: "string",
                    loc: [28, 38, 28, 43],
                    text: "120",
                  },
                },
              ],
              children: [
                {
                  kind: "jsx",
                  loc: [29, 9, 29, 17],
                  type: {
                    kind: "splice",
                    loc: [29, 10, 29, 14],
                    key: "$Ring",
                  },
                  attributes: [],
                  children: [],
                },
                {
                  kind: "jsx",
                  loc: [30, 9, 30, 66],
                  type: {
                    kind: "splice",
                    loc: [30, 10, 30, 13],
                    key: "$For",
                  },
                  attributes: [
                    {
                      name: "each",
                      initializer: {
                        kind: "arr",
                        loc: [30, 20, 30, 28],
                        elements: [
                          {
                            kind: "number",
                            loc: [30, 21, 30, 23],
                            value: 10,
                          },
                          {
                            kind: "number",
                            loc: [30, 25, 30, 27],
                            value: 20,
                          },
                        ],
                      },
                    },
                  ],
                  children: [
                    {
                      kind: "=>",
                      loc: [30, 31, 30, 59],
                      parameters: [
                        {
                          kind: "param",
                          loc: [30, 32, 30, 41],
                          name: {
                            kind: "id",
                            loc: [30, 32, 30, 33],
                            text: "x",
                            bindingKey: "x$8n845jjtfvwm$2",
                          },
                        },
                      ],
                      body: {
                        kind: "jsx",
                        loc: [30, 46, 30, 59],
                        type: {
                          kind: "id",
                          loc: [30, 47, 30, 50],
                          text: "Dot",
                          bindingKey: "Dot$8n845jjtfvwm$0",
                        },
                        attributes: [
                          {
                            name: "x",
                            initializer: {
                              kind: "id",
                              loc: [30, 54, 30, 55],
                              text: "x",
                              bindingKey: "x$8n845jjtfvwm$2",
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
                  loc: [31, 9, 33, 25],
                  type: {
                    kind: "string",
                    loc: [31, 10, 31, 23],
                    text: "foreignObject",
                  },
                  attributes: [
                    {
                      name: "x",
                      initializer: {
                        kind: "string",
                        loc: [31, 26, 31, 29],
                        text: "0",
                      },
                    },
                    {
                      name: "y",
                      initializer: {
                        kind: "string",
                        loc: [31, 32, 31, 35],
                        text: "0",
                      },
                    },
                    {
                      name: "width",
                      initializer: {
                        kind: "string",
                        loc: [31, 42, 31, 46],
                        text: "10",
                      },
                    },
                    {
                      name: "height",
                      initializer: {
                        kind: "string",
                        loc: [31, 54, 31, 58],
                        text: "10",
                      },
                    },
                  ],
                  children: [
                    {
                      kind: "jsx",
                      loc: [32, 11, 32, 32],
                      type: {
                        kind: "string",
                        loc: [32, 12, 32, 13],
                        text: "p",
                      },
                      attributes: [],
                      children: [
                        {
                          kind: "string",
                          loc: [32, 15, 32, 27],
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
it("svgNamespace", async (t) => {
  await snapshotCase(t, "svgNamespace", svgNamespace);
});
describe("an element's namespace", () => {
  it("is where the element is drawn", async () => {
    const { container } = await render(svgNamespace);
    // Sorted: a list builds its rows after the elements beside it, and the
    // order they are made in is not the claim.
    assert.deepEqual(namespaced(container).sort(), [
      "a",
      "div",
      "p",
      "svg:circle",
      "svg:circle",
      "svg:circle",
      "svg:foreignObject",
      "svg:svg",
      "svg:title",
      "svg:title",
    ]);
  });
});
