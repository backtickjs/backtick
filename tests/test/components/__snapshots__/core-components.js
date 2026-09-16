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
            [10, 46, 10, 58],
            {
              version: "0.0.0",
              filePath: "components/core-components.test.tsx",
              fileHash: "1dqg1yg283gkk",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "=>",
              loc: [10, 49, 10, 57],
              parameters: [],
              body: {
                kind: "{}",
                loc: [10, 55, 10, 57],
                statements: [],
              },
            }),
          ),
          children: "hi",
        }),
        _jsx("img", { src: "https://example.com/a.png" }),
      ],
    }),
  );
});
