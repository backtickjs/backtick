import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/solid-js/jsx-runtime";
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
            "1dqg1yg283gkk:10:45",
            { params: [] },
            {
              code: "export default () => () => { };",
              map: '{"version":3,"file":"core-components.test.jsx","sourceRoot":"","sources":["core-components.test.tsx"],"names":[],"mappings":"eASgD,MAAA,GAAG,EAAE,GAAE,CAAC"}',
            },
          ),
          children: "hi",
        }),
        _jsx("img", { src: "https://example.com/a.png" }),
      ],
    }),
  );
});
