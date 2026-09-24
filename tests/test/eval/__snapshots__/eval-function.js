import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = await bundler.run(
  cs.create(
    [8, 33, 8, 70],
    {
      version: "0.0.0",
      filePath: "eval/eval-function.test.tsx",
      fileHash: "1061hn7xljcgj",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [8, 36, 8, 69],
      parameters: [
        {
          kind: "param",
          loc: [8, 37, 8, 49],
          name: {
            kind: "id",
            loc: [8, 37, 8, 41],
            text: "name",
            bindingKey: "name$1061hn7xljcgj$0",
          },
        },
      ],
      body: {
        kind: "binop",
        loc: [8, 54, 8, 69],
        left: {
          kind: "string",
          loc: [8, 54, 8, 62],
          text: "hello ",
        },
        operatorToken: "+",
        right: {
          kind: "id",
          loc: [8, 65, 8, 69],
          text: "name",
          bindingKey: "name$1061hn7xljcgj$0",
        },
      },
    }),
  ),
);
const badge = await bundler.run(
  cs.create(
    [11, 3, 11, 68],
    {
      version: "0.0.0",
      filePath: "eval/eval-function.test.tsx",
      fileHash: "1061hn7xljcgj",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [11, 6, 11, 67],
      parameters: [
        {
          kind: "param",
          loc: [11, 7, 11, 31],
          name: {
            kind: "id",
            loc: [11, 7, 11, 12],
            text: "props",
            bindingKey: "props$1061hn7xljcgj$1",
          },
        },
      ],
      body: {
        kind: "jsx",
        loc: [11, 36, 11, 67],
        type: {
          kind: "string",
          loc: [11, 37, 11, 38],
          text: "b",
        },
        attributes: [],
        children: [
          {
            kind: "binop",
            loc: [11, 40, 11, 62],
            left: {
              kind: "string",
              loc: [11, 40, 11, 48],
              text: "count ",
            },
            operatorToken: "+",
            right: {
              kind: ".",
              loc: [11, 51, 11, 62],
              expression: {
                kind: "id",
                loc: [11, 51, 11, 56],
                text: "props",
                bindingKey: "props$1061hn7xljcgj$1",
              },
              name: "count",
            },
          },
        ],
      },
    }),
  ),
);
it("evalFunction", async (t) => {
  await snapshotCase(
    t,
    "evalFunction",
    cs.create(
      [18, 5, 21, 12],
      {
        version: "0.0.0",
        filePath: "eval/eval-function.test.tsx",
        fileHash: "1061hn7xljcgj",
        splices: {
          $greet: { value: greet, params: [] },
          $badge: { value: badge, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "jsx",
        loc: [18, 8, 21, 11],
        type: {
          kind: "string",
          loc: [18, 9, 18, 12],
          text: "div",
        },
        attributes: [],
        children: [
          {
            kind: "jsx",
            loc: [19, 7, 19, 41],
            type: {
              kind: "string",
              loc: [19, 8, 19, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "()",
                loc: [19, 14, 19, 33],
                expression: {
                  kind: "()",
                  loc: [19, 14, 19, 26],
                  expression: {
                    kind: "bltn",
                    loc: [19, 14, 19, 18],
                    name: "eval",
                  },
                  arguments: [
                    {
                      kind: "splice",
                      loc: [19, 19, 19, 25],
                      key: "$greet",
                    },
                  ],
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [19, 27, 19, 32],
                    text: "ada",
                  },
                ],
              },
            ],
          },
          {
            kind: "()",
            loc: [20, 8, 20, 34],
            expression: {
              kind: "()",
              loc: [20, 8, 20, 20],
              expression: {
                kind: "bltn",
                loc: [20, 8, 20, 12],
                name: "eval",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [20, 13, 20, 19],
                  key: "$badge",
                },
              ],
            },
            arguments: [
              {
                kind: "obj",
                loc: [20, 21, 20, 33],
                properties: [
                  {
                    kind: ":",
                    loc: [20, 23, 20, 31],
                    name: {
                      kind: "string",
                      loc: [20, 23, 20, 28],
                      text: "count",
                    },
                    initializer: {
                      kind: "number",
                      loc: [20, 30, 20, 31],
                      value: 3,
                    },
                  },
                ],
              },
            ],
          },
        ],
      }),
    ),
  );
});
