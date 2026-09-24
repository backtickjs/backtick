import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const answered = '{"rows":["one","two"],"count":2}';
// An assertion is the checker's alone. It is erased on the way to a bundle —
// the runtime here is the expression and nothing else — so a host reading one
// never learns an assertion was written.
//
// `JSON.parse` is why the language has one at all. It answers with
// `ClientValue`, the union of everything a client can hold, and a script that
// means to read `.rows` off what came back has no other way to say what it is
// looking at.
it("typeAssertion", async (t) => {
  await snapshotCase(
    t,
    "typeAssertion",
    cs.create(
      { start: { line: 19, column: 4 }, end: { line: 23, column: 6 } },
      {
        version: "0.0.0",
        filePath: "expressions/type-assertion.test.tsx",
        fileHash: "3amzui83z49rq",
        splices: { $answered: { value: answered, params: [] } },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 19, column: 7 }, end: { line: 23, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 20, column: 78 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 20, column: 12 },
                  end: { line: 20, column: 77 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 20, column: 12 },
                    end: { line: 20, column: 16 },
                  },
                  name: "page",
                  bindingKey: "page$3amzui83z49rq$0",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 20, column: 19 },
                    end: { line: 20, column: 40 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 20, column: 19 },
                      end: { line: 20, column: 29 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 20, column: 19 },
                        end: { line: 20, column: 23 },
                      },
                      name: "JSON",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 20, column: 24 },
                        end: { line: 20, column: 29 },
                      },
                      name: "parse",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Splice",
                      loc: {
                        start: { line: 20, column: 30 },
                        end: { line: 20, column: 39 },
                      },
                      key: "$answered",
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 22, column: 6 },
              end: { line: 22, column: 48 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 22, column: 13 },
                end: { line: 22, column: 47 },
              },
              operator: "+",
              left: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 22, column: 13 },
                  end: { line: 22, column: 34 },
                },
                operator: "+",
                left: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 22, column: 13 },
                    end: { line: 22, column: 25 },
                  },
                  object: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 22, column: 13 },
                      end: { line: 22, column: 22 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 22, column: 13 },
                        end: { line: 22, column: 17 },
                      },
                      name: "page",
                      bindingKey: "page$3amzui83z49rq$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 22, column: 18 },
                        end: { line: 22, column: 22 },
                      },
                      name: "rows",
                    },
                    computed: false,
                    optional: false,
                  },
                  property: {
                    type: "Literal",
                    loc: {
                      start: { line: 22, column: 23 },
                      end: { line: 22, column: 24 },
                    },
                    value: 0,
                  },
                  computed: true,
                  optional: false,
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 22, column: 28 },
                    end: { line: 22, column: 34 },
                  },
                  value: " of ",
                },
              },
              right: {
                type: "MemberExpression",
                loc: {
                  start: { line: 22, column: 37 },
                  end: { line: 22, column: 47 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 22, column: 37 },
                    end: { line: 22, column: 41 },
                  },
                  name: "page",
                  bindingKey: "page$3amzui83z49rq$0",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 22, column: 42 },
                    end: { line: 22, column: 47 },
                  },
                  name: "count",
                },
                computed: false,
                optional: false,
              },
            },
          },
        ],
      }),
    ),
  );
});
