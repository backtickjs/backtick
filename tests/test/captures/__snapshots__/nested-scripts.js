import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("nestedScripts", async (t) => {
  await snapshotCase(
    t,
    "nestedScripts",
    cs.create(
      "2jjdjdr7m395y:9:4",
      {
        params: [
          {
            kind: "splice",
            value: cs.create(
              "2jjdjdr7m395y:11:15",
              { params: [{ kind: "capture", key: "x$2jjdjdr7m395y$0" }] },
              () => ({
                type: "Identifier",
                loc: {
                  start: { line: 11, column: 18 },
                  end: { line: 11, column: 19 },
                },
                name: "x",
                key: "x$2jjdjdr7m395y$0",
              }),
              {
                code: "export default ($0) => $0;",
                map: '{"version":3,"file":"nested-scripts.test.jsx","sourceRoot":"","sources":["nested-scripts.test.tsx"],"names":[],"mappings":"eAUkB,QAAA,EAAC"}',
                imports: [],
                exportAt: 0,
              },
            ),
            bindings: ["x$2jjdjdr7m395y$0"],
          },
        ],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 9, column: 7 }, end: { line: 12, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 10, column: 6 },
              end: { line: 10, column: 18 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 10, column: 12 },
                  end: { line: 10, column: 17 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 10, column: 12 },
                    end: { line: 10, column: 13 },
                  },
                  name: "x",
                  key: "x$2jjdjdr7m395y$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 10, column: 16 },
                    end: { line: 10, column: 17 },
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 11, column: 22 },
            },
            argument: {
              type: "Splice",
              loc: {
                start: { line: 11, column: 13 },
                end: { line: 11, column: 21 },
              },
              param: 0,
            },
          },
        ],
      }),
      {
        code: "export default ($0) => {\n    const x = 0;\n    return $0(x);\n};",
        map: '{"version":3,"file":"nested-scripts.test.jsx","sourceRoot":"","sources":["nested-scripts.test.tsx"],"names":[],"mappings":"eAQO;IACD,MAAM,CAAC,GAAG,CAAC,CAAC;IACZ,OAAO,KAAC,CAAQ;AAClB,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
