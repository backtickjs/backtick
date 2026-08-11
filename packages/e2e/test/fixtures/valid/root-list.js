import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state, For } from "@backtickjs/core";
// A list at the root, with nothing wrapping it. What that makes the root is a
// stretch of the target rather than one node of it: emptying the list takes
// children away from the target itself, which is the one shape where what a
// render claims of its target is visible.
//
// `render.test.ts` draws this into a target that is already holding something
// and empties it, which a claim to the whole target would take with it.
async function Rows() {
  const ids = state([1, 2, 3]);
  const clear = cs.create(
    [12, 17, 14, 5],
    {
      version: "0.0.0",
      filePath: "root-list.tsx",
      fileHash: "k11q2cwcm47",
      kind: "value",
      splices: { $ids: ids },
      captures: [],
      spliceParams: { $ids: [] },
    },
    () => ({
      kind: 220,
      loc: [12, 20, 14, 4],
      parameters: [],
      body: {
        kind: 242,
        loc: [12, 26, 14, 4],
        statements: [
          {
            kind: 214,
            loc: [13, 5, 13, 26],
            expression: {
              kind: 212,
              loc: [13, 5, 13, 16],
              expression: {
                kind: 1000,
                loc: [13, 5, 13, 9],
                key: "$ids",
              },
              questionDotToken: false,
              name: "update",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: 220,
                loc: [13, 17, 13, 25],
                parameters: [],
                body: {
                  kind: 210,
                  loc: [13, 23, 13, 25],
                  elements: [],
                },
              },
            ],
          },
        ],
      },
    }),
  );
  return _jsxs(_Fragment, {
    children: [
      _jsx("span", { onclick: clear, children: "clear" }),
      _jsx(For, {
        each: cs.create(
          [18, 18, 18, 33],
          {
            version: "0.0.0",
            filePath: "root-list.tsx",
            fileHash: "k11q2cwcm47",
            kind: "value",
            splices: { $ids: ids },
            captures: [],
            spliceParams: { $ids: [] },
          },
          () => ({
            kind: 214,
            loc: [18, 21, 18, 32],
            expression: {
              kind: 212,
              loc: [18, 21, 18, 30],
              expression: {
                kind: 1000,
                loc: [18, 21, 18, 25],
                key: "$ids",
              },
              questionDotToken: false,
              name: "read",
            },
            questionDotToken: false,
            arguments: [],
          }),
        ),
        children: cs.create(
          [19, 10, 19, 65],
          {
            version: "0.0.0",
            filePath: "root-list.tsx",
            fileHash: "k11q2cwcm47",
            kind: "value",
            splices: {
              $0splice0: _jsx("span", {
                children: cs.create(
                  [19, 39, 19, 54],
                  {
                    version: "0.0.0",
                    filePath: "root-list.tsx",
                    fileHash: "k11q2cwcm47",
                    kind: "value",
                    splices: {},
                    captures: ["id$k11q2cwcm47$0"],
                    spliceParams: {},
                  },
                  () => ({
                    kind: 227,
                    loc: [19, 42, 19, 53],
                    left: {
                      kind: 11,
                      loc: [19, 42, 19, 48],
                      text: "row ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: 80,
                      loc: [19, 51, 19, 53],
                      text: "id",
                      bindingKey: "id$k11q2cwcm47$0",
                    },
                  }),
                ),
              }),
            },
            captures: [],
            spliceParams: { $0splice0: ["id$k11q2cwcm47$0"] },
          },
          () => ({
            kind: 220,
            loc: [19, 13, 19, 64],
            parameters: [
              {
                kind: 170,
                loc: [19, 14, 19, 24],
                name: {
                  kind: 80,
                  loc: [19, 14, 19, 16],
                  text: "id",
                  bindingKey: "id$k11q2cwcm47$0",
                },
              },
            ],
            body: {
              kind: 1000,
              loc: [19, 29, 19, 64],
              key: "$0splice0",
            },
          }),
        ),
      }),
    ],
  });
}
export default _jsx(Rows, {});
