import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A whole name rather than a front, so the call crosses as the one name and
// its argument. What a query is built from: a reserved character, a space and a
// character past ASCII each come out percent-encoded, and a number is written
// as a string first. Decoding reads the same bytes back.
async function Encoded() {
  return cs.create(
    "3tch88psikxru:10:9",
    { params: [] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<span>/at?q=a%20b%2Bc%26d%23%C3%A9&amp;page=2.5 a b+c&amp;d#\u00E9`);\nexport default () => {\n  return _tmpl$();\n};',
      map: '{"version":3,"mappings":";;eASY;EACR,OAAAA,MAAA;AAUF,CAAC","names":["_tmpl$"],"ignoreList":[],"sources":["encode-uri-component.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
      ],
      exportAt: 158,
    },
  );
}
it("Encoded", async (t) => {
  await snapshotCase(t, "Encoded", _jsx(Encoded, {}));
});
