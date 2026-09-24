import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("coreComponents", async (t) => {
  await snapshotCase(
    t,
    "coreComponents",
    _jsxs("div", {
      style: "padding: 8px",
      children: [
        _jsx("span", {
          style: "font-size: 12px",
          onclick: cs.create(
            { start: { line: 10, column: 45 }, end: { line: 10, column: 57 } },
            { fileHash: "1dqg1yg283gkk", splices: {}, captures: [] },
            () => ({
              type: "ArrowFunctionExpression",
              loc: {
                start: { line: 10, column: 48 },
                end: { line: 10, column: 56 },
              },
              params: [],
              body: {
                type: "BlockStatement",
                loc: {
                  start: { line: 10, column: 54 },
                  end: { line: 10, column: 56 },
                },
                body: [],
              },
              expression: false,
            }),
            "() => () => { }",
            '{"version":3,"file":"core-components.test.jsx","sourceRoot":"","sources":["core-components.test.tsx"],"names":[],"mappings":"AASgD,MAAA,GAAG,EAAE,GAAE,CAAC,CAAA"}',
          ),
          children: "hi",
        }),
        _jsx("img", { src: "https://example.com/a.png" }),
      ],
    }),
  );
});
