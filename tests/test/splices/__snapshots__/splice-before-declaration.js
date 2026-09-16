import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
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
    [16, 10, 21, 5],
    {
      version: "0.0.0",
      filePath: "splices/splice-before-declaration.test.tsx",
      fileHash: "1xi8jyc89buh5",
      splices: { $fragment: { value: fragment, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [16, 13, 21, 4],
      statements: [
        {
          kind: "const",
          loc: [17, 5, 17, 22],
          name: {
            kind: "id",
            loc: [17, 11, 17, 17],
            text: "before",
            bindingKey: "before$1xi8jyc89buh5$0",
          },
          initializer: {
            kind: "number",
            loc: [17, 20, 17, 21],
            value: 1,
          },
        },
        {
          kind: "const",
          loc: [18, 5, 18, 31],
          name: {
            kind: "id",
            loc: [18, 11, 18, 18],
            text: "spliced",
            bindingKey: "spliced$1xi8jyc89buh5$1",
          },
          initializer: {
            kind: "splice",
            loc: [18, 21, 18, 30],
            key: "$fragment",
          },
        },
        {
          kind: "const",
          loc: [19, 5, 19, 21],
          name: {
            kind: "id",
            loc: [19, 11, 19, 16],
            text: "after",
            bindingKey: "after$1xi8jyc89buh5$2",
          },
          initializer: {
            kind: "number",
            loc: [19, 19, 19, 20],
            value: 2,
          },
        },
        {
          kind: "return",
          loc: [20, 5, 20, 37],
          expression: {
            kind: "binop",
            loc: [20, 12, 20, 36],
            left: {
              kind: "binop",
              loc: [20, 12, 20, 28],
              left: {
                kind: "id",
                loc: [20, 12, 20, 18],
                text: "before",
                bindingKey: "before$1xi8jyc89buh5$0",
              },
              operatorToken: "+",
              right: {
                kind: "id",
                loc: [20, 21, 20, 28],
                text: "spliced",
                bindingKey: "spliced$1xi8jyc89buh5$1",
              },
            },
            operatorToken: "+",
            right: {
              kind: "id",
              loc: [20, 31, 20, 36],
              text: "after",
              bindingKey: "after$1xi8jyc89buh5$2",
            },
          },
        },
      ],
    }),
  );
}
it("spliceBeforeDeclaration", async (t) => {
  await snapshotCase(
    t,
    "spliceBeforeDeclaration",
    cs.create(
      [28, 5, 28, 50],
      {
        version: "0.0.0",
        filePath: "splices/splice-before-declaration.test.tsx",
        fileHash: "1xi8jyc89buh5",
        splices: {
          $0splice0: {
            value: sandwich(
              cs.create(
                [28, 19, 28, 25],
                {
                  version: "0.0.0",
                  filePath: "splices/splice-before-declaration.test.tsx",
                  fileHash: "1xi8jyc89buh5",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [28, 22, 28, 24],
                  value: 10,
                }),
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: sandwich(
              cs.create(
                [28, 41, 28, 47],
                {
                  version: "0.0.0",
                  filePath: "splices/splice-before-declaration.test.tsx",
                  fileHash: "1xi8jyc89buh5",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [28, 44, 28, 46],
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
        loc: [28, 8, 28, 49],
        left: {
          kind: "splice",
          loc: [28, 8, 28, 27],
          key: "$0splice0",
        },
        operatorToken: "+",
        right: {
          kind: "splice",
          loc: [28, 30, 28, 49],
          key: "$0splice1",
        },
      }),
    ),
  );
});
