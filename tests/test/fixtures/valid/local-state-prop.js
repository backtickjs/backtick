import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
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
        kind: 227,
        loc: [10, 15, 10, 50],
        left: {
          kind: 227,
          loc: [10, 15, 10, 43],
          left: {
            kind: 11,
            loc: [10, 15, 10, 28],
            text: "font-size: ",
          },
          operatorToken: "+",
          right: {
            kind: 214,
            loc: [10, 31, 10, 43],
            expression: {
              kind: 212,
              loc: [10, 31, 10, 41],
              expression: {
                kind: 1000,
                loc: [10, 31, 10, 36],
                key: "$size",
              },
              questionDotToken: false,
              name: "read",
            },
            questionDotToken: false,
            arguments: [],
          },
        },
        operatorToken: "+",
        right: {
          kind: 11,
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
        kind: 220,
        loc: [11, 17, 13, 6],
        parameters: [],
        body: {
          kind: 242,
          loc: [11, 23, 13, 6],
          statements: [
            {
              kind: 214,
              loc: [12, 7, 12, 36],
              expression: {
                kind: 212,
                loc: [12, 7, 12, 18],
                expression: {
                  kind: 1000,
                  loc: [12, 7, 12, 12],
                  key: "$size",
                },
                questionDotToken: false,
                name: "write",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 227,
                  loc: [12, 19, 12, 35],
                  left: {
                    kind: 214,
                    loc: [12, 19, 12, 31],
                    expression: {
                      kind: 212,
                      loc: [12, 19, 12, 29],
                      expression: {
                        kind: 1000,
                        loc: [12, 19, 12, 24],
                        key: "$size",
                      },
                      questionDotToken: false,
                      name: "read",
                    },
                    questionDotToken: false,
                    arguments: [],
                  },
                  operatorToken: "+",
                  right: {
                    kind: 9,
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
      kind: 242,
      loc: [20, 13, 28, 4],
      statements: [
        {
          kind: 244,
          loc: [21, 5, 21, 29],
          declarationList: {
            kind: 262,
            loc: [21, 5, 21, 28],
            declarations: [
              {
                kind: 261,
                loc: [21, 11, 21, 28],
                name: {
                  kind: 80,
                  loc: [21, 11, 21, 15],
                  text: "size",
                  bindingKey: "size$1azh7gya00tyi$0",
                },
                initializer: {
                  kind: 214,
                  loc: [21, 18, 21, 28],
                  expression: {
                    kind: 1000,
                    loc: [21, 18, 21, 24],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [21, 25, 21, 27],
                      value: 16,
                    },
                  ],
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [22, 5, 27, 7],
          expression: {
            kind: 285,
            loc: [23, 7, 26, 13],
            type: {
              kind: 11,
              loc: [23, 8, 23, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: 285,
                loc: [24, 9, 24, 32],
                type: {
                  kind: 1000,
                  loc: [24, 10, 24, 17],
                  key: "$Counter",
                },
                attributes: [
                  {
                    name: "size",
                    initializer: {
                      kind: 80,
                      loc: [24, 24, 24, 28],
                      text: "size",
                      bindingKey: "size$1azh7gya00tyi$0",
                    },
                  },
                ],
                children: [],
              },
              {
                kind: 285,
                loc: [25, 9, 25, 32],
                type: {
                  kind: 1000,
                  loc: [25, 10, 25, 17],
                  key: "$Counter",
                },
                attributes: [
                  {
                    name: "size",
                    initializer: {
                      kind: 80,
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
