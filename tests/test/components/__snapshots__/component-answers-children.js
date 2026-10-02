import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A component stands exactly where its tag did, so what it may answer with is
// what may stand there: one drawing, or nothing at all. Text and a list are
// neither — a component with several children to give, or a bare string, wraps
// them in a fragment, which is the one drawing that holds them and draws no
// node of its own.
async function Label() {
  return cs.create(
    "25fkbgn23t8ej:11:9",
    { params: [] },
    "() => <>counted</>",
    '{"version":3,"file":"component-answers-children.test.jsx","sourceRoot":"","sources":["components/component-answers-children.test.tsx"],"names":[],"mappings":"AAUY,MAAA,EAAE,OAAO,GAAG"}',
  );
}
async function Pair() {
  return cs.create(
    "25fkbgn23t8ej:15:9",
    { params: [] },
    "() => <>\n    <em>one</em>\n    <em>two</em>\n  </>",
    '{"version":3,"file":"component-answers-children.test.jsx","sourceRoot":"","sources":["components/component-answers-children.test.tsx"],"names":[],"mappings":"AAcY,MAAA,EACR;IAAA,CAAC,EAAE,CAAC,GAAG,EAAE,EAAE,CACX;IAAA,CAAC,EAAE,CAAC,GAAG,EAAE,EAAE,CACb;EAAA,GAAG"}',
  );
}
it("componentAnswersChildren", async (t) => {
  await snapshotCase(
    t,
    "componentAnswersChildren",
    cs.create(
      "25fkbgn23t8ej:25:4",
      {
        params: [
          { kind: "splice", value: _jsx(Label, {}), bindings: [] },
          { kind: "splice", value: _jsx(Pair, {}), bindings: [] },
        ],
      },
      "($splice0, $splice1) => <div>\n      {$splice0()}\n      {$splice1()}\n    </div>",
      '{"version":3,"file":"component-answers-children.test.jsx","sourceRoot":"","sources":["components/component-answers-children.test.tsx"],"names":[],"mappings":"AAwBO,wBAAA,CAAC,GAAG,CACL;MAAA,CAAC,UAAc,CACf;MAAA,CAAC,UAAa,CAChB;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
