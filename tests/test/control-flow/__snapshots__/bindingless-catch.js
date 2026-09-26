import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A `catch` without a binding: the try node's `param` is null and the
// handler runs with no new binding in scope.
it("bindinglessCatch", async (t) => {
  await snapshotCase(
    t,
    "bindinglessCatch",
    cs.create(
      "1lr2275tf95wm:11:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 11, column: 7 }, end: { line: 17, column: 5 } },
        body: [
          {
            type: "TryStatement",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 16, column: 7 },
            },
            block: {
              type: "BlockStatement",
              loc: {
                start: { line: 12, column: 10 },
                end: { line: 14, column: 7 },
              },
              body: [
                {
                  type: "ThrowStatement",
                  loc: {
                    start: { line: 13, column: 8 },
                    end: { line: 13, column: 21 },
                  },
                  argument: {
                    type: "Literal",
                    loc: {
                      start: { line: 13, column: 14 },
                      end: { line: 13, column: 20 },
                    },
                    value: "boom",
                  },
                },
              ],
            },
            handler: {
              type: "CatchClause",
              loc: {
                start: { line: 14, column: 8 },
                end: { line: 16, column: 7 },
              },
              param: null,
              body: {
                type: "BlockStatement",
                loc: {
                  start: { line: 14, column: 14 },
                  end: { line: 16, column: 7 },
                },
                body: [
                  {
                    type: "ReturnStatement",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 15, column: 24 },
                    },
                    argument: {
                      type: "Literal",
                      loc: {
                        start: { line: 15, column: 15 },
                        end: { line: 15, column: 23 },
                      },
                      value: "caught",
                    },
                  },
                ],
              },
            },
            finalizer: null,
          },
        ],
      }),
      {
        code: 'export default () => {\n    try {\n        throw "boom";\n    }\n    catch {\n        return "caught";\n    }\n};',
        map: '{"version":3,"file":"bindingless-catch.test.jsx","sourceRoot":"","sources":["bindingless-catch.test.tsx"],"names":[],"mappings":"eAUO;IACD,IAAI,CAAC;QACH,MAAM,MAAM,CAAC;IACf,CAAC;IAAC,MAAM,CAAC;QACP,OAAO,QAAQ,CAAC;IAClB,CAAC;AACH,CAAC"}',
      },
    ),
  );
});
