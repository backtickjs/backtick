import { cs } from "@backtickjs/core";
// A hole inside a block that shadows an outer name. Two call sites make the
// script polymorphic, so the splice arrives as a thunk rather than inlined.
//
// Both `total` bindings are the entry's own, and both render under their source
// name — the inner one shadows the outer exactly as it does in the source, and a
// block frames its declarations, so nothing has to tell them apart. What an
// entry captures cannot collide with either: a capture is a parameter, numbered
// `$0` upward, and `$` starts no name a script can write.
function wrapShadowed(fragment) {
  return cs.create(
    [13, 10, 19, 5],
    {
      version: "0.0.0",
      filePath: "shadowedHole.tsx",
      fileHash: "ktuoba60w0nh",
      splices: { $fragment: { value: fragment, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [13, 13, 19, 4],
      statements: [
        {
          kind: "const",
          loc: [14, 5, 14, 21],
          name: {
            kind: "id",
            loc: [14, 11, 14, 16],
            text: "total",
            bindingKey: "total$ktuoba60w0nh$0",
          },
          initializer: {
            kind: "number",
            loc: [14, 19, 14, 20],
            value: 1,
          },
        },
        {
          kind: "{}",
          loc: [15, 5, 18, 6],
          statements: [
            {
              kind: "const",
              loc: [16, 7, 16, 23],
              name: {
                kind: "id",
                loc: [16, 13, 16, 18],
                text: "total",
                bindingKey: "total$ktuoba60w0nh$1",
              },
              initializer: {
                kind: "number",
                loc: [16, 21, 16, 22],
                value: 2,
              },
            },
            {
              kind: "return",
              loc: [17, 7, 17, 32],
              expression: {
                kind: "binop",
                loc: [17, 14, 17, 31],
                left: {
                  kind: "id",
                  loc: [17, 14, 17, 19],
                  text: "total",
                  bindingKey: "total$ktuoba60w0nh$1",
                },
                operatorToken: "+",
                right: {
                  kind: "splice",
                  loc: [17, 22, 17, 31],
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
const shadowedHole = cs.create(
  [22, 22, 22, 75],
  {
    version: "0.0.0",
    filePath: "shadowedHole.tsx",
    fileHash: "ktuoba60w0nh",
    splices: {
      $0splice0: {
        value: wrapShadowed(
          cs.create(
            [22, 40, 22, 46],
            {
              version: "0.0.0",
              filePath: "shadowedHole.tsx",
              fileHash: "ktuoba60w0nh",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [22, 43, 22, 45],
              value: 10,
            }),
          ),
        ),
        params: [],
      },
      $0splice1: {
        value: wrapShadowed(
          cs.create(
            [22, 66, 22, 72],
            {
              version: "0.0.0",
              filePath: "shadowedHole.tsx",
              fileHash: "ktuoba60w0nh",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [22, 69, 22, 71],
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
    loc: [22, 25, 22, 74],
    left: {
      kind: "splice",
      loc: [22, 25, 22, 48],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: "splice",
      loc: [22, 51, 22, 74],
      key: "$0splice1",
    },
  }),
);
