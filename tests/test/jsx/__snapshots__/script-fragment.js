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
  "() => (name) => (<>\n    <span>a sentence across lines</span>\n    <span>\n      {name} {name}\n    </span>\n  </>)",
  '{"version":3,"file":"script-fragment.test.jsx","sourceRoot":"","sources":["jsx/script-fragment.test.tsx"],"names":[],"mappings":"AAUkB,MAAA,CAAC,IAAY,EAAE,EAAE,CAAC,CAClC,EACE;IAAA,CAAC,IAAI,CAAC,uBAAuB,EAAE,IAAI,CACnC;IAAA,CAAC,IAAI,CACH;MAAA,CAAC,IAAI,CAAE,CAAA,CAAC,IAAI,CACd;IAAA,EAAE,IAAI,CACR;EAAA,GAAG,CACJ"}',
);
it("scriptFragment", async (t) => {
  await snapshotCase(
    t,
    "scriptFragment",
    _jsx("div", {
      children: cs.create(
        "3pjkiwnta5gua:21:48",
        { params: [{ kind: "splice", value: listed, bindings: [] }] },
        '($splice0) => $splice0()("x")',
        '{"version":3,"file":"script-fragment.test.jsx","sourceRoot":"","sources":["jsx/script-fragment.test.tsx"],"names":[],"mappings":"AAoBmD,cAAA,UAAO,CAAC,GAAG,CAAC"}',
      ),
    }),
  );
});
