import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A tag naming a parameter of an arrow in the enclosing script. The nested
// scripts sit inside the arrow's body, so the parameter reaches them through
// the holes they fill rather than as a capture of the whole script.
it("scriptBoundTagParam", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagParam",
    cs.create(
      [13, 5, 21, 7],
      {
        version: "0.0.0",
        filePath: "captures/script-bound-tag-param.test.tsx",
        fileHash: "3ehgcl2xwg3z1",
        splices: {
          $0splice0: {
            value: cs.create(
              [16, 14, 16, 31],
              {
                version: "0.0.0",
                filePath: "captures/script-bound-tag-param.test.tsx",
                fileHash: "3ehgcl2xwg3z1",
                splices: {},
                captures: ["Row$3ehgcl2xwg3z1$1"],
              },
              () => ({
                kind: "jsx",
                loc: [16, 17, 16, 30],
                type: {
                  kind: "id",
                  loc: [16, 18, 16, 21],
                  text: "Row",
                  bindingKey: "Row$3ehgcl2xwg3z1$1",
                },
                attributes: [
                  {
                    name: "n",
                    initializer: {
                      kind: "number",
                      loc: [16, 25, 16, 26],
                      value: 1,
                    },
                  },
                ],
                children: [],
              }),
            ),
            params: ["Row$3ehgcl2xwg3z1$1"],
          },
          $0splice1: {
            value: cs.create(
              [17, 14, 17, 31],
              {
                version: "0.0.0",
                filePath: "captures/script-bound-tag-param.test.tsx",
                fileHash: "3ehgcl2xwg3z1",
                splices: {},
                captures: ["Row$3ehgcl2xwg3z1$1"],
              },
              () => ({
                kind: "jsx",
                loc: [17, 17, 17, 30],
                type: {
                  kind: "id",
                  loc: [17, 18, 17, 21],
                  text: "Row",
                  bindingKey: "Row$3ehgcl2xwg3z1$1",
                },
                attributes: [
                  {
                    name: "n",
                    initializer: {
                      kind: "number",
                      loc: [17, 25, 17, 26],
                      value: 2,
                    },
                  },
                ],
                children: [],
              }),
            ),
            params: ["Row$3ehgcl2xwg3z1$1"],
          },
        },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [13, 8, 21, 6],
        statements: [
          {
            kind: "const",
            loc: [14, 7, 19, 9],
            name: {
              kind: "id",
              loc: [14, 13, 14, 18],
              text: "twice",
              bindingKey: "twice$3ehgcl2xwg3z1$0",
            },
            initializer: {
              kind: "=>",
              loc: [14, 21, 19, 8],
              parameters: [
                {
                  kind: "param",
                  loc: [14, 22, 14, 64],
                  name: {
                    kind: "id",
                    loc: [14, 22, 14, 25],
                    text: "Row",
                    bindingKey: "Row$3ehgcl2xwg3z1$1",
                  },
                },
              ],
              body: {
                kind: "jsx",
                loc: [15, 9, 18, 14],
                type: {
                  kind: "string",
                  loc: [15, 10, 15, 12],
                  text: "ul",
                },
                attributes: [],
                children: [
                  {
                    kind: "splice",
                    loc: [16, 12, 16, 32],
                    key: "$0splice0",
                  },
                  {
                    kind: "splice",
                    loc: [17, 12, 17, 32],
                    key: "$0splice1",
                  },
                ],
              },
            },
          },
          {
            kind: "return",
            loc: [20, 7, 20, 67],
            expression: {
              kind: "()",
              loc: [20, 14, 20, 66],
              expression: {
                kind: "id",
                loc: [20, 14, 20, 19],
                text: "twice",
                bindingKey: "twice$3ehgcl2xwg3z1$0",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [20, 20, 20, 65],
                  parameters: [
                    {
                      kind: "param",
                      loc: [20, 21, 20, 37],
                      name: {
                        kind: "id",
                        loc: [20, 21, 20, 22],
                        text: "p",
                        bindingKey: "p$3ehgcl2xwg3z1$2",
                      },
                    },
                  ],
                  body: {
                    kind: "jsx",
                    loc: [20, 42, 20, 65],
                    type: {
                      kind: "string",
                      loc: [20, 43, 20, 45],
                      text: "li",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "binop",
                        loc: [20, 47, 20, 59],
                        left: {
                          kind: "string",
                          loc: [20, 47, 20, 53],
                          text: "row ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: ".",
                          loc: [20, 56, 20, 59],
                          expression: {
                            kind: "id",
                            loc: [20, 56, 20, 57],
                            text: "p",
                            bindingKey: "p$3ehgcl2xwg3z1$2",
                          },
                          name: "n",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
