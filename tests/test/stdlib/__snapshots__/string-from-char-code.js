import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// UTF-16 code units rather than code points: a surrogate pair is two
// arguments, where `String.fromCodePoint` takes the one code point.
async function Written() {
  return cs.create(
    [8, 10, 14, 5],
    {
      version: "0.0.0",
      filePath: "stdlib/string-from-char-code.test.tsx",
      fileHash: "rfc8jtzlhm6q",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [8, 13, 14, 4],
      statements: [
        {
          kind: "return",
          loc: [9, 5, 13, 7],
          expression: {
            kind: "jsx",
            loc: [10, 7, 12, 14],
            type: {
              kind: "string",
              loc: [10, 8, 10, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [11, 10, 11, 76],
                left: {
                  kind: "()",
                  loc: [11, 10, 11, 38],
                  expression: {
                    kind: "bltn",
                    loc: [11, 10, 11, 29],
                    name: "String.fromCharCode",
                  },
                  arguments: [
                    {
                      kind: "number",
                      loc: [11, 30, 11, 32],
                      value: 72,
                    },
                    {
                      kind: "number",
                      loc: [11, 34, 11, 37],
                      value: 105,
                    },
                  ],
                },
                operatorToken: "+",
                right: {
                  kind: "()",
                  loc: [11, 41, 11, 76],
                  expression: {
                    kind: "bltn",
                    loc: [11, 41, 11, 60],
                    name: "String.fromCharCode",
                  },
                  arguments: [
                    {
                      kind: "number",
                      loc: [11, 61, 11, 67],
                      value: 55357,
                    },
                    {
                      kind: "number",
                      loc: [11, 69, 11, 75],
                      value: 56832,
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    }),
  );
}
it("Written", async (t) => {
  await snapshotCase(t, "Written", _jsx(Written, {}));
});
