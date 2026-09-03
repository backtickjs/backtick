import { cs } from "@backtickjs/core";
// A hole inside a block that shadows an outer name. Two call sites make the
// script polymorphic, so the splice arrives as a thunk rather than inlined.
//
// Both `total` bindings are the entry's own, and both render under their source
// name — the inner one shadows the outer exactly as it does in the source, and a
// block frames its declarations, so nothing has to tell them apart. What an
// entry captures cannot collide with either: a capture is a parameter, numbered
// `$0` upward, and `$` starts no name a script can write.
function wrap(fragment) {
  return cs.create(
    [12, 10, 18, 5],
    {
      version: "0.0.0",
      filePath: "shadowed-hole.ts",
      fileHash: "3h9ra1625ja2t",
      splices: { $fragment: { value: fragment, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [12, 13, 18, 4],
      statements: [
        {
          kind: "const",
          loc: [13, 5, 13, 21],
          name: {
            kind: "id",
            loc: [13, 11, 13, 16],
            text: "total",
            bindingKey: "total$3h9ra1625ja2t$0",
          },
          initializer: {
            kind: "number",
            loc: [13, 19, 13, 20],
            value: 1,
          },
        },
        {
          kind: "{}",
          loc: [14, 5, 17, 6],
          statements: [
            {
              kind: "const",
              loc: [15, 7, 15, 23],
              name: {
                kind: "id",
                loc: [15, 13, 15, 18],
                text: "total",
                bindingKey: "total$3h9ra1625ja2t$1",
              },
              initializer: {
                kind: "number",
                loc: [15, 21, 15, 22],
                value: 2,
              },
            },
            {
              kind: "return",
              loc: [16, 7, 16, 32],
              expression: {
                kind: "binop",
                loc: [16, 14, 16, 31],
                left: {
                  kind: "id",
                  loc: [16, 14, 16, 19],
                  text: "total",
                  bindingKey: "total$3h9ra1625ja2t$1",
                },
                operatorToken: "+",
                right: {
                  kind: "splice",
                  loc: [16, 22, 16, 31],
                  key: "$fragment",
                },
              },
            },
          ],
        },
      ],
    }),
  );
}
export default cs.create(
  [21, 16, 21, 53],
  {
    version: "0.0.0",
    filePath: "shadowed-hole.ts",
    fileHash: "3h9ra1625ja2t",
    splices: {
      $0splice0: {
        value: wrap(
          cs.create(
            [21, 26, 21, 32],
            {
              version: "0.0.0",
              filePath: "shadowed-hole.ts",
              fileHash: "3h9ra1625ja2t",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [21, 29, 21, 31],
              value: 10,
            }),
          ),
        ),
        params: [],
      },
      $0splice1: {
        value: wrap(
          cs.create(
            [21, 44, 21, 50],
            {
              version: "0.0.0",
              filePath: "shadowed-hole.ts",
              fileHash: "3h9ra1625ja2t",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [21, 47, 21, 49],
              value: 20,
            }),
          ),
        ),
        params: [],
      },
    },
    captures: [],
  },
  () => ({
    kind: "binop",
    loc: [21, 19, 21, 52],
    left: {
      kind: "splice",
      loc: [21, 19, 21, 34],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: "splice",
      loc: [21, 37, 21, 52],
      key: "$0splice1",
    },
  }),
);
