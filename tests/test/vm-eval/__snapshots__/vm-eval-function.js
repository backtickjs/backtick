import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = await bundler.run(
  cs.create(
    [8, 33, 8, 70],
    {
      version: "0.0.0",
      filePath: "vm-eval/vm-eval-function.test.tsx",
      fileHash: "2gdq31n43zxn8",
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
            bindingKey: "name$2gdq31n43zxn8$0",
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
          bindingKey: "name$2gdq31n43zxn8$0",
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
      filePath: "vm-eval/vm-eval-function.test.tsx",
      fileHash: "2gdq31n43zxn8",
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
            bindingKey: "props$2gdq31n43zxn8$1",
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
                bindingKey: "props$2gdq31n43zxn8$1",
              },
              name: "count",
            },
          },
        ],
      },
    }),
  ),
);
it("vmEvalFunction", async (t) => {
  await snapshotCase(
    t,
    "vmEvalFunction",
    cs.create(
      [18, 5, 21, 12],
      {
        version: "0.0.0",
        filePath: "vm-eval/vm-eval-function.test.tsx",
        fileHash: "2gdq31n43zxn8",
        splices: {
          $vm: { value: vm, params: [] },
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
            loc: [19, 7, 19, 45],
            type: {
              kind: "string",
              loc: [19, 8, 19, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "()",
                loc: [19, 14, 19, 37],
                expression: {
                  kind: "()",
                  loc: [19, 14, 19, 30],
                  expression: {
                    kind: ".",
                    loc: [19, 14, 19, 22],
                    expression: {
                      kind: "splice",
                      loc: [19, 14, 19, 17],
                      key: "$vm",
                    },
                    name: "eval",
                  },
                  arguments: [
                    {
                      kind: "splice",
                      loc: [19, 23, 19, 29],
                      key: "$greet",
                    },
                  ],
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [19, 31, 19, 36],
                    text: "ada",
                  },
                ],
              },
            ],
          },
          {
            kind: "()",
            loc: [20, 8, 20, 38],
            expression: {
              kind: "()",
              loc: [20, 8, 20, 24],
              expression: {
                kind: ".",
                loc: [20, 8, 20, 16],
                expression: {
                  kind: "splice",
                  loc: [20, 8, 20, 11],
                  key: "$vm",
                },
                name: "eval",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [20, 17, 20, 23],
                  key: "$badge",
                },
              ],
            },
            arguments: [
              {
                kind: "obj",
                loc: [20, 25, 20, 37],
                properties: [
                  {
                    kind: ":",
                    loc: [20, 27, 20, 35],
                    name: {
                      kind: "string",
                      loc: [20, 27, 20, 32],
                      text: "count",
                    },
                    initializer: {
                      kind: "number",
                      loc: [20, 34, 20, 35],
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
