import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, Pressable, state, Text } from "@backtickjs/core";
// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  const count = state(0);
  return _jsxs(Pressable, {
    testID: "row",
    style: { flexDirection: "row", gap: 8 },
    onPress: cs.create(
      [12, 16, 12, 57],
      {
        version: "0.0.0",
        filePath: "pressable.tsx",
        fileHash: "1ro4qk3wjtadf",
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
      _jsx(Text, {
        style: { fontWeight: "700" },
        children: cs.create(
          [15, 10, 15, 43],
          {
            version: "0.0.0",
            filePath: "pressable.tsx",
            fileHash: "1ro4qk3wjtadf",
            kind: "value",
            splices: { $count: count },
            captures: [],
            spliceParams: { $count: [] },
          },
          () => ({
            kind: 228,
            loc: [15, 13, 15, 42],
            condition: {
              kind: 227,
              loc: [15, 13, 15, 30],
              left: {
                kind: 214,
                loc: [15, 13, 15, 26],
                expression: {
                  kind: 212,
                  loc: [15, 13, 15, 24],
                  expression: {
                    kind: 1000,
                    loc: [15, 13, 15, 19],
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
                loc: [15, 29, 15, 30],
                value: 0,
              },
            },
            whenTrue: {
              kind: 11,
              loc: [15, 33, 15, 36],
              text: "\u2611",
            },
            whenFalse: {
              kind: 11,
              loc: [15, 39, 15, 42],
              text: "\u2610",
            },
          }),
        ),
      }),
      _jsx(Text, {
        children: cs.create(
          [17, 14, 17, 55],
          {
            version: "0.0.0",
            filePath: "pressable.tsx",
            fileHash: "1ro4qk3wjtadf",
            kind: "value",
            splices: { $count: count },
            captures: [],
            spliceParams: { $count: [] },
          },
          () => ({
            kind: 227,
            loc: [17, 17, 17, 54],
            left: {
              kind: 227,
              loc: [17, 17, 17, 43],
              left: {
                kind: 11,
                loc: [17, 17, 17, 27],
                text: "pressed ",
              },
              operatorToken: "+",
              right: {
                kind: 214,
                loc: [17, 30, 17, 43],
                expression: {
                  kind: 212,
                  loc: [17, 30, 17, 41],
                  expression: {
                    kind: 1000,
                    loc: [17, 30, 17, 36],
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
              loc: [17, 46, 17, 54],
              text: " times",
            },
          }),
        ),
      }),
    ],
  });
}
export default _jsx(Row, {});
