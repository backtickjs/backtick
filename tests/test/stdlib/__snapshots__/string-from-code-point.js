import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace static taking a rest parameter, so the whole of the call crosses
// as one name and a list of arguments — `String` is the front of the name and
// never a value read off. Called with none, which the schema says answers with
// the empty string rather than refusing the way an empty `Math.min` does.
async function Written() {
  return cs.create(
    "7lcft72v2y3x:10:9",
    { params: [] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<span>Hi`);\nexport default () => {\n  return _tmpl$();\n};',
      map: '{"version":3,"mappings":";;eASY;EACR,OAAAA,MAAA;AAGF,CAAC","names":["_tmpl$"],"ignoreList":[],"sources":["string-from-code-point.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
      ],
      exportAt: 105,
    },
  );
}
it("Written", async (t) => {
  await snapshotCase(t, "Written", _jsx(Written, {}));
});
