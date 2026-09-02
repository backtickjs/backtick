import { cs } from "@backtickjs/core";
// A hole with declarations after it. Two call sites make the script
// polymorphic, so each splice arrives as a thunk and the entry passes the
// bindings it declares at the hole (see `passKeys`).
//
// It passes all of them, including ones the hole sits above: at the hole
// `spliced` is still being initialized and `after` has not been reached. Both
// hoist to the block bound to `null`, so naming them early is inert — which is
// what makes passing every declaration safe, rather than working out which are
// in scope. A fragment cannot reference them anyway; it is written out here,
// where they do not exist.
function wrap(fragment) {
  return cs.create(
    [14, 10, 19, 5],
    {
      version: "0.0.0",
      filePath: "splice-before-declaration.ts",
      fileHash: "2r40h7jqt1118",
      splices: { $fragment: fragment },
      captures: [],
      spliceParams: { $fragment: [] },
    },
    () => ({
      kind: 242,
      loc: [14, 13, 19, 4],
      statements: [
        {
          kind: 244,
          loc: [15, 5, 15, 22],
          declarationList: {
            kind: 262,
            loc: [15, 5, 15, 21],
            declarations: [
              {
                kind: 261,
                loc: [15, 11, 15, 21],
                name: {
                  kind: 80,
                  loc: [15, 11, 15, 17],
                  text: "before",
                  bindingKey: "before$2r40h7jqt1118$0",
                },
                initializer: {
                  kind: 9,
                  loc: [15, 20, 15, 21],
                  value: 1,
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 244,
          loc: [16, 5, 16, 31],
          declarationList: {
            kind: 262,
            loc: [16, 5, 16, 30],
            declarations: [
              {
                kind: 261,
                loc: [16, 11, 16, 30],
                name: {
                  kind: 80,
                  loc: [16, 11, 16, 18],
                  text: "spliced",
                  bindingKey: "spliced$2r40h7jqt1118$1",
                },
                initializer: {
                  kind: 1000,
                  loc: [16, 21, 16, 30],
                  key: "$fragment",
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 244,
          loc: [17, 5, 17, 21],
          declarationList: {
            kind: 262,
            loc: [17, 5, 17, 20],
            declarations: [
              {
                kind: 261,
                loc: [17, 11, 17, 20],
                name: {
                  kind: 80,
                  loc: [17, 11, 17, 16],
                  text: "after",
                  bindingKey: "after$2r40h7jqt1118$2",
                },
                initializer: {
                  kind: 9,
                  loc: [17, 19, 17, 20],
                  value: 2,
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [18, 5, 18, 37],
          expression: {
            kind: 227,
            loc: [18, 12, 18, 36],
            left: {
              kind: 227,
              loc: [18, 12, 18, 28],
              left: {
                kind: 80,
                loc: [18, 12, 18, 18],
                text: "before",
                bindingKey: "before$2r40h7jqt1118$0",
              },
              operatorToken: "+",
              right: {
                kind: 80,
                loc: [18, 21, 18, 28],
                text: "spliced",
                bindingKey: "spliced$2r40h7jqt1118$1",
              },
            },
            operatorToken: "+",
            right: {
              kind: 80,
              loc: [18, 31, 18, 36],
              text: "after",
              bindingKey: "after$2r40h7jqt1118$2",
            },
          },
        },
      ],
    }),
  );
}
export default cs.create(
  [22, 16, 22, 53],
  {
    version: "0.0.0",
    filePath: "splice-before-declaration.ts",
    fileHash: "2r40h7jqt1118",
    splices: {
      $0splice0: wrap(
        cs.create(
          [22, 26, 22, 32],
          {
            version: "0.0.0",
            filePath: "splice-before-declaration.ts",
            fileHash: "2r40h7jqt1118",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [22, 29, 22, 31],
            value: 10,
          }),
        ),
      ),
      $0splice1: wrap(
        cs.create(
          [22, 44, 22, 50],
          {
            version: "0.0.0",
            filePath: "splice-before-declaration.ts",
            fileHash: "2r40h7jqt1118",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [22, 47, 22, 49],
            value: 20,
          }),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  () => ({
    kind: 227,
    loc: [22, 19, 22, 52],
    left: {
      kind: 1000,
      loc: [22, 19, 22, 34],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: 1000,
      loc: [22, 37, 22, 52],
      key: "$0splice1",
    },
  }),
);
