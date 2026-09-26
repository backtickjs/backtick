import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { Badge } from "./parts/badge.tsx";
import { snapshotCase } from "../snapshotCase.ts";
// Scripts written in two host files, in one bundle: its map leads into each
// file by its own path.
it("twoFiles", async (t) => {
  await snapshotCase(
    t,
    "twoFiles",
    cs.create(
      "2q1jq3rupgdvu:9:36",
      { params: [{ kind: "splice", value: _jsx(Badge, {}), bindings: [] }] },
      '($splice0) => <p>{"in "}{$splice0()}</p>',
      '{"version":3,"file":"two-files.test.jsx","sourceRoot":"","sources":["bundler/two-files.test.tsx"],"names":[],"mappings":"AAQuC,cAAA,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,UAAc,CAAC,EAAE,CAAC,CAAC"}',
    ),
  );
});
