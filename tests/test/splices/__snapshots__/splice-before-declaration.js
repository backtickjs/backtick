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
    "1xi8jyc89buh5:16:9",
    { params: [{ kind: "splice", value: fragment, bindings: [] }] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 16, column: 12 }, end: { line: 21, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 17, column: 4 },
            end: { line: 17, column: 21 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 17, column: 10 },
                end: { line: 17, column: 20 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 17, column: 10 },
                  end: { line: 17, column: 16 },
                },
                name: "before",
                key: "before$1xi8jyc89buh5$0",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 17, column: 19 },
                  end: { line: 17, column: 20 },
                },
                value: 1,
              },
            },
          ],
        },
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 18, column: 4 },
            end: { line: 18, column: 30 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 18, column: 10 },
                end: { line: 18, column: 29 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 18, column: 10 },
                  end: { line: 18, column: 17 },
                },
                name: "spliced",
                key: "spliced$1xi8jyc89buh5$1",
              },
              init: {
                type: "Splice",
                loc: {
                  start: { line: 18, column: 20 },
                  end: { line: 18, column: 29 },
                },
                param: 0,
              },
            },
          ],
        },
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 19, column: 4 },
            end: { line: 19, column: 20 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 19, column: 10 },
                end: { line: 19, column: 19 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 19, column: 10 },
                  end: { line: 19, column: 15 },
                },
                name: "after",
                key: "after$1xi8jyc89buh5$2",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 19, column: 18 },
                  end: { line: 19, column: 19 },
                },
                value: 2,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 20, column: 4 },
            end: { line: 20, column: 36 },
          },
          argument: {
            type: "BinaryExpression",
            loc: {
              start: { line: 20, column: 11 },
              end: { line: 20, column: 35 },
            },
            operator: "+",
            left: {
              type: "BinaryExpression",
              loc: {
                start: { line: 20, column: 11 },
                end: { line: 20, column: 27 },
              },
              operator: "+",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 20, column: 11 },
                  end: { line: 20, column: 17 },
                },
                name: "before",
                key: "before$1xi8jyc89buh5$0",
              },
              right: {
                type: "Identifier",
                loc: {
                  start: { line: 20, column: 20 },
                  end: { line: 20, column: 27 },
                },
                name: "spliced",
                key: "spliced$1xi8jyc89buh5$1",
              },
            },
            right: {
              type: "Identifier",
              loc: {
                start: { line: 20, column: 30 },
                end: { line: 20, column: 35 },
              },
              name: "after",
              key: "after$1xi8jyc89buh5$2",
            },
          },
        },
      ],
    }),
    "export default ($0) => {\n    const before = 1;\n    const spliced = $0();\n    const after = 2;\n    return before + spliced + after;\n};",
    '{"version":3,"file":"splice-before-declaration.test.jsx","sourceRoot":"","sources":["splice-before-declaration.test.tsx"],"names":[],"mappings":"eAeY;IACR,MAAM,MAAM,GAAG,CAAC,CAAC;IACjB,MAAM,OAAO,GAAG,IAAS,CAAC;IAC1B,MAAM,KAAK,GAAG,CAAC,CAAC;IAChB,OAAO,MAAM,GAAG,OAAO,GAAG,KAAK,CAAC;AAClC,CAAC"}',
  );
}
it("spliceBeforeDeclaration", async (t) => {
  await snapshotCase(
    t,
    "spliceBeforeDeclaration",
    cs.create(
      "1xi8jyc89buh5:28:4",
      {
        params: [
          {
            kind: "splice",
            value: sandwich(
              cs.create(
                "1xi8jyc89buh5:28:18",
                { params: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 21 },
                    end: { line: 28, column: 23 },
                  },
                  value: 10,
                }),
                "export default () => 10;",
                '{"version":3,"file":"splice-before-declaration.test.jsx","sourceRoot":"","sources":["splice-before-declaration.test.tsx"],"names":[],"mappings":"eA2BqB,MAAA,EAAE"}',
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: sandwich(
              cs.create(
                "1xi8jyc89buh5:28:40",
                { params: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 43 },
                    end: { line: 28, column: 45 },
                  },
                  value: 20,
                }),
                "export default () => 20;",
                '{"version":3,"file":"splice-before-declaration.test.jsx","sourceRoot":"","sources":["splice-before-declaration.test.tsx"],"names":[],"mappings":"eA2B2C,MAAA,EAAE"}',
              ),
            ),
            bindings: [],
          },
        ],
      },
      () => ({
        type: "BinaryExpression",
        loc: { start: { line: 28, column: 7 }, end: { line: 28, column: 48 } },
        operator: "+",
        left: {
          type: "Splice",
          loc: {
            start: { line: 28, column: 7 },
            end: { line: 28, column: 26 },
          },
          param: 0,
        },
        right: {
          type: "Splice",
          loc: {
            start: { line: 28, column: 29 },
            end: { line: 28, column: 48 },
          },
          param: 1,
        },
      }),
      "export default ($0, $1) => $0() + $1();",
      '{"version":3,"file":"splice-before-declaration.test.jsx","sourceRoot":"","sources":["splice-before-declaration.test.tsx"],"names":[],"mappings":"eA2BO,YAAA,IAAC,GAAqB,IAAC"}',
    ),
  );
});
