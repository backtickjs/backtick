import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Storage a script declares for itself, rather than one a component owns and
// splices in. `$state(...)` is an ordinary call of an imported value, and the
// cell is what the call answers with: each time it is evaluated there is
// another cell, which is what lets a script build a row that carries its own.
async function ScriptRows() {
  const build = cs.create(
    [10, 17, 12, 5],
    {
      version: "0.0.0",
      filePath: "state/script-state.test.tsx",
      fileHash: "3f2468k5dp5lo",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [10, 20, 12, 4],
      parameters: [
        {
          kind: "param",
          loc: [10, 21, 10, 34],
          name: {
            kind: "id",
            loc: [10, 21, 10, 26],
            text: "label",
            bindingKey: "label$3f2468k5dp5lo$0",
          },
        },
      ],
      body: {
        kind: "{}",
        loc: [10, 39, 12, 4],
        statements: [
          {
            kind: "return",
            loc: [11, 5, 11, 37],
            expression: {
              kind: "obj",
              loc: [11, 12, 11, 36],
              properties: [
                {
                  kind: ":",
                  loc: [11, 14, 11, 34],
                  name: "label",
                  initializer: {
                    kind: "()",
                    loc: [11, 21, 11, 34],
                    expression: {
                      kind: "splice",
                      loc: [11, 21, 11, 27],
                      key: "$state",
                    },
                    arguments: [
                      {
                        kind: "id",
                        loc: [11, 28, 11, 33],
                        text: "label",
                        bindingKey: "label$3f2468k5dp5lo$0",
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    }),
  );
  return _jsx("span", {
    style: cs.create(
      [16, 14, 16, 35],
      {
        version: "0.0.0",
        filePath: "state/script-state.test.tsx",
        fileHash: "3f2468k5dp5lo",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "string",
        loc: [16, 17, 16, 34],
        text: "font-size: 16px",
      }),
    ),
    onclick: cs.create(
      [17, 16, 20, 9],
      {
        version: "0.0.0",
        filePath: "state/script-state.test.tsx",
        fileHash: "3f2468k5dp5lo",
        splices: { $build: { value: build, params: [] } },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [17, 19, 20, 8],
        parameters: [],
        body: {
          kind: "{}",
          loc: [17, 25, 20, 8],
          statements: [
            {
              kind: "const",
              loc: [18, 9, 18, 35],
              name: {
                kind: "id",
                loc: [18, 15, 18, 18],
                text: "row",
                bindingKey: "row$3f2468k5dp5lo$1",
              },
              initializer: {
                kind: "()",
                loc: [18, 21, 18, 34],
                expression: {
                  kind: "splice",
                  loc: [18, 21, 18, 27],
                  key: "$build",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [18, 28, 18, 33],
                    text: "one",
                  },
                ],
              },
            },
            {
              kind: "()",
              loc: [19, 9, 19, 48],
              expression: {
                kind: ".",
                loc: [19, 9, 19, 22],
                expression: {
                  kind: ".",
                  loc: [19, 9, 19, 18],
                  expression: {
                    kind: "id",
                    loc: [19, 9, 19, 12],
                    text: "row",
                    bindingKey: "row$3f2468k5dp5lo$1",
                  },
                  name: "label",
                },
                name: "set",
              },
              arguments: [
                {
                  kind: "binop",
                  loc: [19, 23, 19, 47],
                  left: {
                    kind: "()",
                    loc: [19, 23, 19, 38],
                    expression: {
                      kind: ".",
                      loc: [19, 23, 19, 36],
                      expression: {
                        kind: ".",
                        loc: [19, 23, 19, 32],
                        expression: {
                          kind: "id",
                          loc: [19, 23, 19, 26],
                          text: "row",
                          bindingKey: "row$3f2468k5dp5lo$1",
                        },
                        name: "label",
                      },
                      name: "get",
                    },
                    arguments: [],
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [19, 41, 19, 47],
                    text: " !!!",
                  },
                },
              ],
            },
          ],
        },
      }),
    ),
    children: cs.create(
      [22, 8, 22, 37],
      {
        version: "0.0.0",
        filePath: "state/script-state.test.tsx",
        fileHash: "3f2468k5dp5lo",
        splices: { $build: { value: build, params: [] } },
        captures: [],
      },
      () => ({
        kind: "()",
        loc: [22, 11, 22, 36],
        expression: {
          kind: ".",
          loc: [22, 11, 22, 34],
          expression: {
            kind: ".",
            loc: [22, 11, 22, 30],
            expression: {
              kind: "()",
              loc: [22, 11, 22, 24],
              expression: {
                kind: "splice",
                loc: [22, 11, 22, 17],
                key: "$build",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [22, 18, 22, 23],
                  text: "one",
                },
              ],
            },
            name: "label",
          },
          name: "get",
        },
        arguments: [],
      }),
    ),
  });
}
it("ScriptRows", async (t) => {
  await snapshotCase(t, "ScriptRows", _jsx(ScriptRows, {}));
});
