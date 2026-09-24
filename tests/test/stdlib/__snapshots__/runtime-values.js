import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("runtimeValues", async (t) => {
  await snapshotCase(
    t,
    "runtimeValues",
    cs.create(
      { start: { line: 9, column: 4 }, end: { line: 12, column: 7 } },
      {
        version: "0.0.0",
        filePath: "stdlib/runtime-values.test.tsx",
        fileHash: "1eany0mypxz6m",
        splices: {
          $0splice0: { value: [1, "two", true, null], params: [] },
          $0splice1: { value: { k: 3 }, params: [] },
        },
        captures: [],
      },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 9, column: 8 }, end: { line: 12, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 10, column: 6 },
              end: { line: 10, column: 37 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 10, column: 6 },
                end: { line: 10, column: 10 },
              },
              name: "list",
            },
            value: {
              type: "Splice",
              loc: {
                start: { line: 10, column: 12 },
                end: { line: 10, column: 37 },
              },
              key: "$0splice0",
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 11, column: 22 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 11, column: 6 },
                end: { line: 11, column: 9 },
              },
              name: "obj",
            },
            value: {
              type: "Splice",
              loc: {
                start: { line: 11, column: 11 },
                end: { line: 11, column: 22 },
              },
              key: "$0splice1",
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
    ),
  );
});
