import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A whole name rather than a front, so the call crosses as the one name and
// its argument. What a query is built from: a reserved character, a space and a
// character past ASCII each come out percent-encoded, and a number is written
// as a string first. Decoding reads the same bytes back.
async function Encoded() {
  return cs.create(
    [10, 10, 21, 5],
    {
      version: "0.0.0",
      filePath: "stdlib/encode-uri-component.test.tsx",
      fileHash: "3tch88psikxru",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [10, 13, 21, 4],
      statements: [
        {
          kind: "return",
          loc: [11, 5, 20, 7],
          expression: {
            kind: "jsx",
            loc: [12, 7, 19, 14],
            type: {
              kind: "string",
              loc: [12, 8, 12, 12],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [13, 10, 18, 55],
                left: {
                  kind: "binop",
                  loc: [13, 10, 17, 14],
                  left: {
                    kind: "binop",
                    loc: [13, 10, 16, 34],
                    left: {
                      kind: "binop",
                      loc: [13, 10, 15, 19],
                      left: {
                        kind: "binop",
                        loc: [13, 10, 14, 42],
                        left: {
                          kind: "string",
                          loc: [13, 10, 13, 18],
                          text: "/at?q=",
                        },
                        operatorToken: "+",
                        right: {
                          kind: "()",
                          loc: [14, 11, 14, 42],
                          expression: {
                            kind: "bltn",
                            loc: [14, 11, 14, 29],
                            name: "encodeURIComponent",
                          },
                          arguments: [
                            {
                              kind: "string",
                              loc: [14, 30, 14, 41],
                              text: "a b+c&d#\u00E9",
                            },
                          ],
                        },
                      },
                      operatorToken: "+",
                      right: {
                        kind: "string",
                        loc: [15, 11, 15, 19],
                        text: "&page=",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [16, 11, 16, 34],
                      expression: {
                        kind: "bltn",
                        loc: [16, 11, 16, 29],
                        name: "encodeURIComponent",
                      },
                      arguments: [
                        {
                          kind: "number",
                          loc: [16, 30, 16, 33],
                          value: 2.5,
                        },
                      ],
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [17, 11, 17, 14],
                    text: " ",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "()",
                  loc: [18, 11, 18, 55],
                  expression: {
                    kind: "bltn",
                    loc: [18, 11, 18, 29],
                    name: "decodeURIComponent",
                  },
                  arguments: [
                    {
                      kind: "string",
                      loc: [18, 30, 18, 54],
                      text: "a%20b%2Bc%26d%23%C3%A9",
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
it("Encoded", async (t) => {
  await snapshotCase(t, "Encoded", _jsx(Encoded, {}));
});
