import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace static, reached the way `Math.floor` and `Array.from` are: the
// whole of `Number.parseInt` is one name the client answers, so `Number` is a
// front rather than a value and nothing is read off it.
async function Parsed() {
  return cs.create(
    "28kni4l69t7vb:9:9",
    { params: [] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<span>298.5`);\nexport default () => {\n  const whole = Number.parseInt("42px");\n  const based = Number.parseInt("ff", 16);\n  const fractional = Number.parseFloat("1.5");\n  return _tmpl$();\n};',
      map: '{"version":3,"mappings":";;eAQY;EACR,MAAMA,KAAK,GAAGC,MAAM,CAACC,QAAQ,CAAC,MAAM,CAAC;EACrC,MAAMC,KAAK,GAAGF,MAAM,CAACC,QAAQ,CAAC,IAAI,EAAE,EAAE,CAAC;EACvC,MAAME,UAAU,GAAGH,MAAM,CAACI,UAAU,CAAC,KAAK,CAAC;EAC3C,OAAAC,MAAA;AACF,CAAC","names":["whole","Number","parseInt","based","fractional","parseFloat","_tmpl$"],"ignoreList":[],"sources":["number-parsing.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
      ],
      exportAt: 108,
    },
  );
}
it("Parsed", async (t) => {
  await snapshotCase(t, "Parsed", _jsx(Parsed, {}));
});
