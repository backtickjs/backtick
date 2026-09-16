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
function sandwich(fragment) {
  return cs.create(
    [14, 10, 19, 5],
    {
      version: "0.0.0",
      filePath: "spliceBeforeDeclaration.tsx",
      fileHash: "22ex1vjydlcbr",
      splices: { $fragment: { value: fragment, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [14, 13, 19, 4],
      statements: [
        {
          kind: "const",
          loc: [15, 5, 15, 22],
          name: {
            kind: "id",
            loc: [15, 11, 15, 17],
            text: "before",
            bindingKey: "before$22ex1vjydlcbr$0",
          },
          initializer: {
            kind: "number",
            loc: [15, 20, 15, 21],
            value: 1,
          },
        },
        {
          kind: "const",
          loc: [16, 5, 16, 31],
          name: {
            kind: "id",
            loc: [16, 11, 16, 18],
            text: "spliced",
            bindingKey: "spliced$22ex1vjydlcbr$1",
          },
          initializer: {
            kind: "splice",
            loc: [16, 21, 16, 30],
            key: "$fragment",
          },
        },
        {
          kind: "const",
          loc: [17, 5, 17, 21],
          name: {
            kind: "id",
            loc: [17, 11, 17, 16],
            text: "after",
            bindingKey: "after$22ex1vjydlcbr$2",
          },
          initializer: {
            kind: "number",
            loc: [17, 19, 17, 20],
            value: 2,
          },
        },
        {
          kind: "return",
          loc: [18, 5, 18, 37],
          expression: {
            kind: "binop",
            loc: [18, 12, 18, 36],
            left: {
              kind: "binop",
              loc: [18, 12, 18, 28],
              left: {
                kind: "id",
                loc: [18, 12, 18, 18],
                text: "before",
                bindingKey: "before$22ex1vjydlcbr$0",
              },
              operatorToken: "+",
              right: {
                kind: "id",
                loc: [18, 21, 18, 28],
                text: "spliced",
                bindingKey: "spliced$22ex1vjydlcbr$1",
              },
            },
            operatorToken: "+",
            right: {
              kind: "id",
              loc: [18, 31, 18, 36],
              text: "after",
              bindingKey: "after$22ex1vjydlcbr$2",
            },
          },
        },
      ],
    }),
  );
}
const spliceBeforeDeclaration = cs.create(
  [22, 33, 22, 78],
  {
    version: "0.0.0",
    filePath: "spliceBeforeDeclaration.tsx",
    fileHash: "22ex1vjydlcbr",
    splices: {
      $0splice0: {
        value: sandwich(
          cs.create(
            [22, 47, 22, 53],
            {
              version: "0.0.0",
              filePath: "spliceBeforeDeclaration.tsx",
              fileHash: "22ex1vjydlcbr",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [22, 50, 22, 52],
              value: 10,
            }),
          ),
        ),
        params: [],
      },
      $0splice1: {
        value: sandwich(
          cs.create(
            [22, 69, 22, 75],
            {
              version: "0.0.0",
              filePath: "spliceBeforeDeclaration.tsx",
              fileHash: "22ex1vjydlcbr",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [22, 72, 22, 74],
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
    loc: [22, 36, 22, 77],
    left: {
      kind: "splice",
      loc: [22, 36, 22, 55],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: "splice",
      loc: [22, 58, 22, 77],
      key: "$0splice1",
    },
  }),
);
