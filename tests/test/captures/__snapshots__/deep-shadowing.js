import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function outerBase(inner) {
  return cs.create(
    [7, 10, 10, 5],
    {
      version: "0.0.0",
      filePath: "captures/deep-shadowing.test.tsx",
      fileHash: "8up2nb5o0inm",
      splices: { $0splice0: { value: middleBase(inner), params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [7, 13, 10, 4],
      statements: [
        {
          kind: "const",
          loc: [8, 5, 8, 20],
          name: {
            kind: "id",
            loc: [8, 11, 8, 15],
            text: "base",
            bindingKey: "base$8up2nb5o0inm$0",
          },
          initializer: {
            kind: "number",
            loc: [8, 18, 8, 19],
            value: 1,
          },
        },
        {
          kind: "return",
          loc: [9, 5, 9, 40],
          expression: {
            kind: "binop",
            loc: [9, 12, 9, 39],
            left: {
              kind: "id",
              loc: [9, 12, 9, 16],
              text: "base",
              bindingKey: "base$8up2nb5o0inm$0",
            },
            operatorToken: "+",
            right: {
              kind: "splice",
              loc: [9, 19, 9, 39],
              key: "$0splice0",
            },
          },
        },
      ],
    }),
  );
}
function middleBase(inner) {
  return cs.create(
    [14, 10, 17, 5],
    {
      version: "0.0.0",
      filePath: "captures/deep-shadowing.test.tsx",
      fileHash: "8up2nb5o0inm",
      splices: { $inner: { value: inner, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [14, 13, 17, 4],
      statements: [
        {
          kind: "const",
          loc: [15, 5, 15, 20],
          name: {
            kind: "id",
            loc: [15, 11, 15, 15],
            text: "base",
            bindingKey: "base$8up2nb5o0inm$1",
          },
          initializer: {
            kind: "number",
            loc: [15, 18, 15, 19],
            value: 2,
          },
        },
        {
          kind: "return",
          loc: [16, 5, 16, 26],
          expression: {
            kind: "binop",
            loc: [16, 12, 16, 25],
            left: {
              kind: "id",
              loc: [16, 12, 16, 16],
              text: "base",
              bindingKey: "base$8up2nb5o0inm$1",
            },
            operatorToken: "*",
            right: {
              kind: "splice",
              loc: [16, 19, 16, 25],
              key: "$inner",
            },
          },
        },
      ],
    }),
  );
}
// `cs`base`` is written under the outer `base`, but is threaded through two
// host functions that each shadow `base` with their own binding. The captured
// value must reach the leaf untouched, so the threaded channel is renamed
// away from every `base` it passes through.
it("deepShadowing", async (t) => {
  await snapshotCase(
    t,
    "deepShadowing",
    cs.create(
      [28, 5, 31, 7],
      {
        version: "0.0.0",
        filePath: "captures/deep-shadowing.test.tsx",
        fileHash: "8up2nb5o0inm",
        splices: {
          $0splice0: {
            value: outerBase(
              cs.create(
                [30, 26, 30, 34],
                {
                  version: "0.0.0",
                  filePath: "captures/deep-shadowing.test.tsx",
                  fileHash: "8up2nb5o0inm",
                  splices: {},
                  captures: ["base$8up2nb5o0inm$2"],
                },
                () => ({
                  kind: "id",
                  loc: [30, 29, 30, 33],
                  text: "base",
                  bindingKey: "base$8up2nb5o0inm$2",
                }),
              ),
            ),
            params: ["base$8up2nb5o0inm$2"],
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
            loc: [29, 7, 29, 23],
            name: {
              kind: "id",
              loc: [29, 13, 29, 17],
              text: "base",
              bindingKey: "base$8up2nb5o0inm$2",
            },
            initializer: {
              kind: "number",
              loc: [29, 20, 29, 22],
              value: 10,
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
