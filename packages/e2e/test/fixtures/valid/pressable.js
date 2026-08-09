import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  const count = state(0);
  return _jsxs("button", {
    id: "row",
    style: "display: flex; gap: 8px",
    onclick: cs.create(
      [12, 16, 12, 57],
      {
        version: "0.0.0",
        filePath: "pressable.tsx",
        fileHash: "2dcmkw8revorp",
        kind: "value",
        splices: { $count: count },
        captures: [],
        spliceParams: { $count: [] },
      },
      () => ({
        kind: 220,
        loc: [12, 19, 12, 56],
        parameters: [],
        body: {
          kind: 214,
          loc: [12, 25, 12, 56],
          expression: {
            kind: 212,
            loc: [12, 25, 12, 37],
            expression: {
              kind: 1000,
              loc: [12, 25, 12, 31],
              key: "$count",
            },
            questionDotToken: false,
            name: "write",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 227,
              loc: [12, 38, 12, 55],
              left: {
                kind: 214,
                loc: [12, 38, 12, 51],
                expression: {
                  kind: 212,
                  loc: [12, 38, 12, 49],
                  expression: {
                    kind: 1000,
                    loc: [12, 38, 12, 44],
                    key: "$count",
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
                loc: [12, 54, 12, 55],
                value: 1,
              },
            },
          ],
        },
      }),
    ),
    children: [
      _jsx("span", {
        style: "font-weight: 700",
        children: cs.create(
          [14, 39, 14, 72],
          {
            version: "0.0.0",
            filePath: "pressable.tsx",
            fileHash: "2dcmkw8revorp",
            kind: "value",
            splices: { $count: count },
            captures: [],
            spliceParams: { $count: [] },
          },
          () => ({
            kind: 228,
            loc: [14, 42, 14, 71],
            condition: {
              kind: 227,
              loc: [14, 42, 14, 59],
              left: {
                kind: 214,
                loc: [14, 42, 14, 55],
                expression: {
                  kind: 212,
                  loc: [14, 42, 14, 53],
                  expression: {
                    kind: 1000,
                    loc: [14, 42, 14, 48],
                    key: "$count",
                  },
                  questionDotToken: false,
                  name: "read",
                },
                questionDotToken: false,
                arguments: [],
              },
              operatorToken: ">",
              right: {
                kind: 9,
                loc: [14, 58, 14, 59],
                value: 0,
              },
            },
            whenTrue: {
              kind: 11,
              loc: [14, 62, 14, 65],
              text: "\u2611",
            },
            whenFalse: {
              kind: 11,
              loc: [14, 68, 14, 71],
              text: "\u2610",
            },
          }),
        ),
      }),
      _jsx("span", {
        children: cs.create(
          [15, 14, 15, 55],
          {
            version: "0.0.0",
            filePath: "pressable.tsx",
            fileHash: "2dcmkw8revorp",
            kind: "value",
            splices: { $count: count },
            captures: [],
            spliceParams: { $count: [] },
          },
          () => ({
            kind: 227,
            loc: [15, 17, 15, 54],
            left: {
              kind: 227,
              loc: [15, 17, 15, 43],
              left: {
                kind: 11,
                loc: [15, 17, 15, 27],
                text: "pressed ",
              },
              operatorToken: "+",
              right: {
                kind: 214,
                loc: [15, 30, 15, 43],
                expression: {
                  kind: 212,
                  loc: [15, 30, 15, 41],
                  expression: {
                    kind: 1000,
                    loc: [15, 30, 15, 36],
                    key: "$count",
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
              loc: [15, 46, 15, 54],
              text: " times",
            },
          }),
        ),
      }),
    ],
  });
}
export default _jsx(Row, {});
