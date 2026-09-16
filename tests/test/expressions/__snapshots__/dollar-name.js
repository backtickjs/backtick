import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A `$` inside a name is ordinary JavaScript — only the leading sigil is
// reserved for splices — so a `$`-bearing binding survives mangling, its
// `<name>$<fileHash>$<n>` binding key still parses from the right, and the
// threaded capture's display name recovers `foo$` intact.
function add(lhs) {
  return cs.create(
    [10, 10, 10, 22],
    {
      version: "0.0.0",
      filePath: "expressions/dollar-name.test.tsx",
      fileHash: "sl458m2swc6c",
      splices: { $lhs: { value: lhs, params: [] } },
      captures: [],
    },
    () => ({
      kind: "binop",
      loc: [10, 13, 10, 21],
      left: {
        kind: "splice",
        loc: [10, 13, 10, 17],
        key: "$lhs",
      },
      operatorToken: "+",
      right: {
        kind: "number",
        loc: [10, 20, 10, 21],
        value: 2,
      },
    }),
  );
}
it("dollarName", async (t) => {
  await snapshotCase(
    t,
    "dollarName",
    cs.create(
      [17, 5, 20, 7],
      {
        version: "0.0.0",
        filePath: "expressions/dollar-name.test.tsx",
        fileHash: "sl458m2swc6c",
        splices: {
          $0splice0: {
            value: add(
              cs.create(
                [19, 20, 19, 28],
                {
                  version: "0.0.0",
                  filePath: "expressions/dollar-name.test.tsx",
                  fileHash: "sl458m2swc6c",
                  splices: {},
                  captures: ["foo$$sl458m2swc6c$0"],
                },
                () => ({
                  kind: "id",
                  loc: [19, 23, 19, 27],
                  text: "foo$",
                  bindingKey: "foo$$sl458m2swc6c$0",
                }),
              ),
            ),
            params: ["foo$$sl458m2swc6c$0"],
          },
        },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [17, 8, 20, 6],
        statements: [
          {
            kind: "const",
            loc: [18, 7, 18, 22],
            name: {
              kind: "id",
              loc: [18, 13, 18, 17],
              text: "foo$",
              bindingKey: "foo$$sl458m2swc6c$0",
            },
            initializer: {
              kind: "number",
              loc: [18, 20, 18, 21],
              value: 1,
            },
          },
          {
            kind: "return",
            loc: [19, 7, 19, 31],
            expression: {
              kind: "splice",
              loc: [19, 14, 19, 30],
              key: "$0splice0",
            },
          },
        ],
      }),
    ),
  );
});
