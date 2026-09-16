import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace static taking a rest parameter, so the whole of the call crosses
// as one name and a list of arguments — `String` is the front of the name and
// never a value read off. Called with none, which the schema says answers with
// the empty string rather than refusing the way an empty `Math.min` does.
async function Written() {
  return cs.create(
    [10, 10, 14, 5],
    {
      version: "0.0.0",
      filePath: "stdlib/string-from-code-point.test.tsx",
      fileHash: "7lcft72v2y3x",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [10, 13, 14, 4],
      statements: [
        {
          kind: "return",
          loc: [11, 5, 13, 7],
          expression: {
            kind: "jsx",
            loc: [12, 7, 12, 76],
            type: {
              kind: "string",
              loc: [12, 8, 12, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [12, 14, 12, 68],
                left: {
                  kind: "()",
                  loc: [12, 14, 12, 43],
                  expression: {
                    kind: "bltn",
                    loc: [12, 14, 12, 34],
                    name: "String.fromCodePoint",
                  },
                  arguments: [
                    {
                      kind: "number",
                      loc: [12, 35, 12, 37],
                      value: 72,
                    },
                    {
                      kind: "number",
                      loc: [12, 39, 12, 42],
                      value: 105,
                    },
                  ],
                },
                operatorToken: "+",
                right: {
                  kind: "()",
                  loc: [12, 46, 12, 68],
                  expression: {
                    kind: "bltn",
                    loc: [12, 46, 12, 66],
                    name: "String.fromCodePoint",
                  },
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
it("Written", async (t) => {
  await snapshotCase(t, "Written", _jsx(Written, {}));
});
