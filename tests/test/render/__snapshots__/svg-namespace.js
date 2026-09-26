import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { render } from "@backtickjs/solid-js/testing";
import { snapshotCase } from "../snapshotCase.ts";
import { namespaced } from "./dom.ts";
// SVG written the way it is pasted: no tag says which language it is from.
// Where an element is drawn does — inside an `svg` it is SVG's, and a
// `foreignObject` holds HTML again — so a circle a host component or a function
// the script holds draws is SVG's once it stands inside the `svg`, and a
// `title` or an `a`, whose names both languages use, is whichever one encloses
// it.
async function Ring() {
  return cs.create(
    "39fssymdjfnze:16:9",
    { params: [] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<svg><circle cx=5 cy=5 r=4 fill=none stroke=currentColor></svg>`, false, true, false);\nexport default () => _tmpl$();',
      map: '{"version":3,"mappings":";;eAeY,MAAAA,MAAA,EAAgE","names":["_tmpl$"],"ignoreList":[],"sources":["svg-namespace.test.tsx"]}',
      imports: [
        {
          from: "solid-js/web",
          range: [0, 54],
          bindings: [{ name: "template", local: "_$template" }],
        },
      ],
      exportAt: 180,
    },
  );
}
const svgNamespace = cs.create(
  "39fssymdjfnze:19:21",
  {
    params: [
      { kind: "tag", value: Ring },
      { kind: "tag", value: For },
    ],
  },
  {
    code: 'import { template as _$template } from "solid-js/web";\nimport { createComponent as _$createComponent } from "solid-js/web";\nimport { setAttribute as _$setAttribute } from "solid-js/web";\nimport { effect as _$effect } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<svg><circle cy=5 r=2><title></svg>`, false, true, false),\n  _tmpl$2 = /*#__PURE__*/_$template(`<div><a href=/shapes>shapes</a><svg viewBox="0 0 30 10"width=120><foreignObject x=0 y=0 width=10 height=10><p>html again`);\nexport default ($0, $1) => {\n  const Dot = props => (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild;\n    _$insert(_el$2, () => "dot " + props.x);\n    _$effect(() => _$setAttribute(_el$, "cx", props.x));\n    return _el$;\n  })();\n  return (() => {\n    var _el$3 = _tmpl$2(),\n      _el$4 = _el$3.firstChild,\n      _el$5 = _el$4.nextSibling,\n      _el$6 = _el$5.firstChild;\n    _$insert(_el$5, _$createComponent($0, {}), _el$6);\n    _$insert(_el$5, _$createComponent($1, {\n      each: [10, 20],\n      children: x => _$createComponent(Dot, {\n        x: x\n      })\n    }), _el$6);\n    return _el$3;\n  })();\n};',
    map: '{"version":3,"mappings":";;;;;;;eAkBwB,CAAAA,EAAA,EAAAC,EAAA;EACtB,MAAMC,GAAG,GAAIC,KAAoB;IAAA,IAAAC,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,QAAA,CAAAF,KAAA,QAErB,MAAM,GAAGH,KAAK,CAACM,CAAC;IAAAC,QAAA,OAAAC,cAAA,CAAAP,IAAA,QADdD,KAAK,CAACM,CAAC;IAAA,OAAAL,IAAA;EAAA,IAGpB;EAED;IAAA,IAAAQ,KAAA,GAAAC,OAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAL,UAAA;MAAAQ,KAAA,GAAAD,KAAA,CAAAE,WAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAR,UAAA;IAAAC,QAAA,CAAAO,KAAA,EAAAG,iBAAA,CAIOlB,EAAI,OAAAiB,KAAA;IAAAT,QAAA,CAAAO,KAAA,EAAAG,iBAAA,CACJjB,EAAG;MAACkB,IAAI,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC;MAAAC,QAAA,EAAIX,CAAS,IAAAS,iBAAA,CAAMhB,GAAG;QAACO,CAAC,EAAEA;MAAC;IAAI,IAAAQ,KAAA;IAAA,OAAAL,KAAA;EAAA;AAO1D,CAAC","names":["$0","$1","Dot","props","_el$","_tmpl$","_el$2","firstChild","_$insert","x","_$effect","_$setAttribute","_el$3","_tmpl$2","_el$4","_el$5","nextSibling","_el$6","_$createComponent","each","children"],"ignoreList":[],"sources":["svg-namespace.test.tsx"]}',
    imports: [
      {
        from: "solid-js/web",
        range: [0, 54],
        bindings: [{ name: "template", local: "_$template" }],
      },
      {
        from: "solid-js/web",
        range: [55, 123],
        bindings: [{ name: "createComponent", local: "_$createComponent" }],
      },
      {
        from: "solid-js/web",
        range: [124, 186],
        bindings: [{ name: "setAttribute", local: "_$setAttribute" }],
      },
      {
        from: "solid-js/web",
        range: [187, 237],
        bindings: [{ name: "effect", local: "_$effect" }],
      },
      {
        from: "solid-js/web",
        range: [238, 288],
        bindings: [{ name: "insert", local: "_$insert" }],
      },
    ],
    exportAt: 547,
  },
);
it("svgNamespace", async (t) => {
  await snapshotCase(t, "svgNamespace", svgNamespace);
});
describe("an element's namespace", () => {
  it("is where the element is drawn", async () => {
    const { container } = await render(svgNamespace);
    // Sorted: a list builds its rows after the elements beside it, and the
    // order they are made in is not the claim.
    assert.deepEqual(namespaced(container).sort(), [
      "a",
      "div",
      "p",
      "svg:circle",
      "svg:circle",
      "svg:circle",
      "svg:foreignObject",
      "svg:svg",
      "svg:title",
      "svg:title",
    ]);
  });
});
