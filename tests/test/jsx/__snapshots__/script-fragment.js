import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A fragment a script writes: its children where it stands, and no node of its
// own — the same `Fragment` element the tree path writes for `<>`.
//
// And text as JSX reads it, which is not `trim()`. Across lines it is one
// sentence; on one line its spaces are its own; and the space between two
// expressions survives, where trimming would take it.
const listed = cs.create(
  "3pjkiwnta5gua:11:15",
  { params: [] },
  {
    code: "export default () => (name) => (<>\n    <span>a sentence across lines</span>\n    <span>\n      {name} {name}\n    </span>\n  </>);",
    map: '{"version":3,"file":"script-fragment.test.jsx","sourceRoot":"","sources":["script-fragment.test.tsx"],"names":[],"mappings":"eAUkB,MAAA,CAAC,IAAY,EAAE,EAAE,CAAC,CAClC,EACE;IAAA,CAAC,IAAI,CAAC,uBAAuB,EAAE,IAAI,CACnC;IAAA,CAAC,IAAI,CACH;MAAA,CAAC,IAAI,CAAE,CAAA,CAAC,IAAI,CACd;IAAA,EAAE,IAAI,CACR;EAAA,GAAG,CACJ"}',
    imports: [],
    exportAt: 0,
  },
);
it("scriptFragment", async (t) => {
  await snapshotCase(
    t,
    "scriptFragment",
    _jsx("div", {
      children: cs.create(
        "3pjkiwnta5gua:21:48",
        { params: [{ kind: "splice", value: listed, bindings: [] }] },
        {
          code: 'export default ($0) => $0()("x");',
          map: '{"version":3,"file":"script-fragment.test.jsx","sourceRoot":"","sources":["script-fragment.test.tsx"],"names":[],"mappings":"eAoBmD,QAAA,IAAO,CAAC,GAAG,CAAC"}',
          imports: [],
          exportAt: 0,
        },
      ),
    }),
  );
});
