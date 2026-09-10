import { jsx as _jsx } from "@backtickjs/web/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// A cell crossing a component boundary: declared once by the script that draws
// the pair, handed to each child as a prop, so both read one storage. The cell
// is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const Counter = async ({ size }) =>
  _jsx("span", {
    style: cs.create(
      [10, 12, 10, 51],
      {
        version: "0.0.0",
        filePath: "local-state-prop.tsx",
        fileHash: "1azh7gya00tyi",
        splices: { $size: { value: size, params: [] } },
        captures: [],
      },
      () => ({
        kind: "binop",
        loc: [10, 15, 10, 50],
        left: {
          kind: "binop",
          loc: [10, 15, 10, 43],
          left: {
            kind: "string",
            loc: [10, 15, 10, 28],
            text: "font-size: ",
          },
          operatorToken: "+",
          right: {
            kind: "()",
            loc: [10, 31, 10, 43],
            expression: {
              kind: ".",
              loc: [10, 31, 10, 41],
              expression: {
                kind: "splice",
                loc: [10, 31, 10, 36],
                key: "$size",
              },
              name: "read",
            },
            arguments: [],
          },
        },
        operatorToken: "+",
        right: {
          kind: "string",
          loc: [10, 46, 10, 50],
          text: "px",
        },
      }),
    ),
    onclick: cs.create(
      [11, 14, 13, 7],
      {
        version: "0.0.0",
        filePath: "local-state-prop.tsx",
        fileHash: "1azh7gya00tyi",
        splices: { $size: { value: size, params: [] } },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [11, 17, 13, 6],
        parameters: [],
        body: {
          kind: "{}",
          loc: [11, 23, 13, 6],
          statements: [
            {
              kind: "()",
              loc: [12, 7, 12, 36],
              expression: {
                kind: ".",
                loc: [12, 7, 12, 18],
                expression: {
                  kind: "splice",
                  loc: [12, 7, 12, 12],
                  key: "$size",
                },
                name: "write",
              },
              arguments: [
                {
                  kind: "binop",
                  loc: [12, 19, 12, 35],
                  left: {
                    kind: "()",
                    loc: [12, 19, 12, 31],
                    expression: {
                      kind: ".",
                      loc: [12, 19, 12, 29],
                      expression: {
                        kind: "splice",
                        loc: [12, 19, 12, 24],
                        key: "$size",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                  operatorToken: "+",
                  right: {
                    kind: "number",
                    loc: [12, 34, 12, 35],
                    value: 1,
                  },
                },
              ],
            },
          ],
        },
      }),
    ),
    children: "press",
  });
async function Panel() {
  return cs.create(
    [20, 10, 28, 5],
    {
      version: "0.0.0",
      filePath: "local-state-prop.tsx",
      fileHash: "1azh7gya00tyi",
      splices: {
        $state: { value: state, params: [] },
        $Counter: { value: Counter, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [20, 13, 28, 4],
      statements: [
        {
          kind: "const",
          loc: [21, 5, 21, 29],
          name: {
            kind: "id",
            loc: [21, 11, 21, 15],
            text: "size",
            bindingKey: "size$1azh7gya00tyi$0",
          },
          initializer: {
            kind: "()",
            loc: [21, 18, 21, 28],
            expression: {
              kind: "splice",
              loc: [21, 18, 21, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [21, 25, 21, 27],
                value: 16,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [22, 5, 27, 7],
          expression: {
            kind: "jsx",
            loc: [23, 7, 26, 13],
            type: {
              kind: "string",
              loc: [23, 8, 23, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [24, 9, 24, 32],
                type: {
                  kind: "splice",
                  loc: [24, 10, 24, 17],
                  key: "$Counter",
                },
                attributes: [
                  {
                    name: "size",
                    initializer: {
                      kind: "id",
                      loc: [24, 24, 24, 28],
                      text: "size",
                      bindingKey: "size$1azh7gya00tyi$0",
                    },
                  },
                ],
                children: [],
              },
              {
                kind: "jsx",
                loc: [25, 9, 25, 32],
                type: {
                  kind: "splice",
                  loc: [25, 10, 25, 17],
                  key: "$Counter",
                },
                attributes: [
                  {
                    name: "size",
                    initializer: {
                      kind: "id",
                      loc: [25, 24, 25, 28],
                      text: "size",
                      bindingKey: "size$1azh7gya00tyi$0",
                    },
                  },
                ],
                children: [],
              },
            ],
          },
        },
      ],
    }),
  );
}
export default _jsx(Panel, {});
