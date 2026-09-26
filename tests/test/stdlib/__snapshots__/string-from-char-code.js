import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// UTF-16 code units rather than code points: a surrogate pair is two
// arguments, where `String.fromCodePoint` takes the one code point.
async function Written() {
  return cs.create(
    "rfc8jtzlhm6q:8:9",
    { params: [] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<span>Hi\uD83D\uDE00`);\nexport default () => {\n  return _tmpl$();\n};',
      map: '{"version":3,"mappings":";;eAOY;EACR,OAAAA,MAAA;AAKF,CAAC","names":["_tmpl$"],"ignoreList":[],"sources":["string-from-char-code.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
      ],
      exportAt: 107,
    },
  );
}
it("Written", async (t) => {
  await snapshotCase(t, "Written", _jsx(Written, {}));
});
