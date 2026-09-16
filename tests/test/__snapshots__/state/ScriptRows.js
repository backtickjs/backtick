import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// Storage a script declares for itself, rather than one a component owns and
// splices in. `$state(...)` is an ordinary call of an imported value, and the
// cell is what the call answers with: each time it is evaluated there is
// another cell, which is what lets a script build a row that carries its own.
async function ScriptRows() {
  const build = cs.create(
    [8, 17, 10, 5],
    {
      version: "0.0.0",
      filePath: "ScriptRows.tsx",
      fileHash: "zzf8vznf5mzw",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [8, 20, 10, 4],
      parameters: [
        {
          kind: "param",
          loc: [8, 21, 8, 34],
          name: {
            kind: "id",
            loc: [8, 21, 8, 26],
            text: "label",
            bindingKey: "label$zzf8vznf5mzw$0",
          },
        },
      ],
      body: {
        kind: "{}",
        loc: [8, 39, 10, 4],
        statements: [
          {
            kind: "return",
            loc: [9, 5, 9, 37],
            expression: {
              kind: "obj",
              loc: [9, 12, 9, 36],
              properties: [
                {
                  kind: ":",
                  loc: [9, 14, 9, 34],
                  name: "label",
                  initializer: {
                    kind: "()",
                    loc: [9, 21, 9, 34],
                    expression: {
                      kind: "splice",
                      loc: [9, 21, 9, 27],
                      key: "$state",
                    },
                    arguments: [
                      {
                        kind: "id",
                        loc: [9, 28, 9, 33],
                        text: "label",
                        bindingKey: "label$zzf8vznf5mzw$0",
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
      [14, 14, 14, 35],
      {
        version: "0.0.0",
        filePath: "ScriptRows.tsx",
        fileHash: "zzf8vznf5mzw",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "string",
        loc: [14, 17, 14, 34],
        text: "font-size: 16px",
      }),
    ),
    onclick: cs.create(
      [15, 16, 18, 9],
      {
        version: "0.0.0",
        filePath: "ScriptRows.tsx",
        fileHash: "zzf8vznf5mzw",
        splices: { $build: { value: build, params: [] } },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [15, 19, 18, 8],
        parameters: [],
        body: {
          kind: "{}",
          loc: [15, 25, 18, 8],
          statements: [
            {
              kind: "const",
              loc: [16, 9, 16, 35],
              name: {
                kind: "id",
                loc: [16, 15, 16, 18],
                text: "row",
                bindingKey: "row$zzf8vznf5mzw$1",
              },
              initializer: {
                kind: "()",
                loc: [16, 21, 16, 34],
                expression: {
                  kind: "splice",
                  loc: [16, 21, 16, 27],
                  key: "$build",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [16, 28, 16, 33],
                    text: "one",
                  },
                ],
              },
            },
            {
              kind: "()",
              loc: [17, 9, 17, 51],
              expression: {
                kind: ".",
                loc: [17, 9, 17, 24],
                expression: {
                  kind: ".",
                  loc: [17, 9, 17, 18],
                  expression: {
                    kind: "id",
                    loc: [17, 9, 17, 12],
                    text: "row",
                    bindingKey: "row$zzf8vznf5mzw$1",
                  },
                  name: "label",
                },
                name: "write",
              },
              arguments: [
                {
                  kind: "binop",
                  loc: [17, 25, 17, 50],
                  left: {
                    kind: "()",
                    loc: [17, 25, 17, 41],
                    expression: {
                      kind: ".",
                      loc: [17, 25, 17, 39],
                      expression: {
                        kind: ".",
                        loc: [17, 25, 17, 34],
                        expression: {
                          kind: "id",
                          loc: [17, 25, 17, 28],
                          text: "row",
                          bindingKey: "row$zzf8vznf5mzw$1",
                        },
                        name: "label",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [17, 44, 17, 50],
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
      [20, 8, 20, 38],
      {
        version: "0.0.0",
        filePath: "ScriptRows.tsx",
        fileHash: "zzf8vznf5mzw",
        splices: { $build: { value: build, params: [] } },
        captures: [],
      },
      () => ({
        kind: "()",
        loc: [20, 11, 20, 37],
        expression: {
          kind: ".",
          loc: [20, 11, 20, 35],
          expression: {
            kind: ".",
            loc: [20, 11, 20, 30],
            expression: {
              kind: "()",
              loc: [20, 11, 20, 24],
              expression: {
                kind: "splice",
                loc: [20, 11, 20, 17],
                key: "$build",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [20, 18, 20, 23],
                  text: "one",
                },
              ],
            },
            name: "label",
          },
          name: "read",
        },
        arguments: [],
      }),
    ),
  });
}
