import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs } from "@backtickjs/core";
// A namespace static taking a rest parameter, so the whole of the call crosses
// as one name and a list of arguments — `String` is the front of the name and
// never a value read off. Called with none, which the schema says answers with
// the empty string rather than refusing the way an empty `Math.min` does.
async function Written() {
  return cs.create(
    [8, 10, 12, 5],
    {
      version: "0.0.0",
      filePath: "string-from-code-point.tsx",
      fileHash: "3d857e9xlnmut",
      kind: "value",
      splices: {},
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: 242,
      loc: [8, 13, 12, 4],
      statements: [
        {
          kind: 254,
          loc: [9, 5, 11, 7],
          expression: {
            kind: 285,
            loc: [10, 7, 10, 76],
            type: {
              kind: 11,
              loc: [10, 8, 10, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: 227,
                loc: [10, 14, 10, 68],
                left: {
                  kind: 214,
                  loc: [10, 14, 10, 43],
                  expression: {
                    kind: 1001,
                    loc: [10, 14, 10, 34],
                    name: "String.fromCodePoint",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 9,
                      loc: [10, 35, 10, 37],
                      value: 72,
                    },
                    {
                      kind: 9,
                      loc: [10, 39, 10, 42],
                      value: 105,
                    },
                  ],
                },
                operatorToken: "+",
                right: {
                  kind: 214,
                  loc: [10, 46, 10, 68],
                  expression: {
                    kind: 1001,
                    loc: [10, 46, 10, 66],
                    name: "String.fromCodePoint",
                  },
                  questionDotToken: false,
                  arguments: [],
                },
              },
            ],
          },
        },
      ],
    }),
  );
}
export default _jsx(Written, {});
