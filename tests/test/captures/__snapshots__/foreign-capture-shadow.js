import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Two distinct captures of one entry that want the same name.
//
// An entry's own free variables can never collide — within one script `base`
// resolves outward to exactly one binding. But an entry also receives whatever
// the arguments it inlines capture, and a fragment written under the outer
// `base` can be carried by host code into a script written under the inner one.
// Both then land in the same environment, under the same source name.
//
// Everything stays nested so both bindings are actually in scope where they are
// threaded to — carrying the fragment somewhere the outer `base` does not
// enclose is a different error.
function innerBase(carried) {
  return cs.create(
    [18, 10, 21, 5],
    {
      version: "0.0.0",
      filePath: "captures/foreign-capture-shadow.test.tsx",
      fileHash: "bphb1svo1jv3",
      splices: {
        $0splice0: {
          value: cs.create(
            [20, 14, 20, 33],
            {
              version: "0.0.0",
              filePath: "captures/foreign-capture-shadow.test.tsx",
              fileHash: "bphb1svo1jv3",
              splices: { $carried: { value: carried, params: [] } },
              captures: ["base$bphb1svo1jv3$0"],
            },
            () => ({
              kind: "binop",
              loc: [20, 17, 20, 32],
              left: {
                kind: "id",
                loc: [20, 17, 20, 21],
                text: "base",
                bindingKey: "base$bphb1svo1jv3$0",
              },
              operatorToken: "+",
              right: {
                kind: "splice",
                loc: [20, 24, 20, 32],
                key: "$carried",
              },
            }),
          ),
          params: ["base$bphb1svo1jv3$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [18, 13, 21, 4],
      statements: [
        {
          kind: "const",
          loc: [19, 5, 19, 22],
          name: {
            kind: "id",
            loc: [19, 11, 19, 15],
            text: "base",
            bindingKey: "base$bphb1svo1jv3$0",
          },
          initializer: {
            kind: "number",
            loc: [19, 18, 19, 21],
            value: 100,
          },
        },
        {
          kind: "return",
          loc: [20, 5, 20, 35],
          expression: {
            kind: "splice",
            loc: [20, 12, 20, 34],
            key: "$0splice0",
          },
        },
      ],
    }),
  );
}
it("foreignCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "foreignCaptureShadow",
    cs.create(
      [28, 5, 31, 7],
      {
        version: "0.0.0",
        filePath: "captures/foreign-capture-shadow.test.tsx",
        fileHash: "bphb1svo1jv3",
        splices: {
          $0splice0: {
            value: innerBase(
              cs.create(
                [30, 26, 30, 34],
                {
                  version: "0.0.0",
                  filePath: "captures/foreign-capture-shadow.test.tsx",
                  fileHash: "bphb1svo1jv3",
                  splices: {},
                  captures: ["base$bphb1svo1jv3$1"],
                },
                () => ({
                  kind: "id",
                  loc: [30, 29, 30, 33],
                  text: "base",
                  bindingKey: "base$bphb1svo1jv3$1",
                }),
              ),
            ),
            params: ["base$bphb1svo1jv3$1"],
          },
        },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [28, 8, 31, 6],
        statements: [
          {
            kind: "const",
            loc: [29, 7, 29, 22],
            name: {
              kind: "id",
              loc: [29, 13, 29, 17],
              text: "base",
              bindingKey: "base$bphb1svo1jv3$1",
            },
            initializer: {
              kind: "number",
              loc: [29, 20, 29, 21],
              value: 1,
            },
          },
          {
            kind: "return",
            loc: [30, 7, 30, 37],
            expression: {
              kind: "splice",
              loc: [30, 14, 30, 36],
              key: "$0splice0",
            },
          },
        ],
      }),
    ),
  );
});
