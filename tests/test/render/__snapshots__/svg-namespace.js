import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
import { namespaced } from "./dom.ts";
import { draw } from "@backtickjs/solid-js/testing";
import { render } from "@solidjs/testing-library";
// SVG written the way it is pasted: no tag says which language it is from.
// Where an element is drawn does — inside an `svg` it is SVG's, and a
// `foreignObject` holds HTML again — so a circle a host component or a function
// the script holds draws is SVG's once it stands inside the `svg`, and a
// `title` or an `a`, whose names both languages use, is whichever one encloses
// it.
async function Ring() {
  return cs.create(
    "1yk8a5rma0zxk:17:9",
    { params: [] },
    '() => <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor"/>',
    '{"version":3,"file":"svg-namespace.test.jsx","sourceRoot":"","sources":["render/svg-namespace.test.tsx"],"names":[],"mappings":"AAgBY,MAAA,CAAC,MAAM,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,MAAM,CAAC,MAAM,CAAC,cAAc,EAAG"}',
  );
}
const svgNamespace = cs.create(
  "1yk8a5rma0zxk:20:21",
  {
    params: [
      { kind: "tag", value: Ring },
      { kind: "tag", value: For },
    ],
  },
  '($tag0, $tag1) => {\n    const Dot = (props) => (<circle cx={props.x} cy="5" r="2">\n      <title>{"dot " + props.x}</title>\n    </circle>);\n    return (<div>\n      <a href="/shapes">{"shapes"}</a>\n      <svg viewBox="0 0 30 10" width="120">\n        <$tag0 />\n        <$tag1 each={[10, 20]}>{(x) => <Dot x={x}/>}</$tag1>\n        <foreignObject x="0" y="0" width="10" height="10">\n          <p>{"html again"}</p>\n        </foreignObject>\n      </svg>\n    </div>);\n}',
  '{"version":3,"file":"svg-namespace.test.jsx","sourceRoot":"","sources":["render/svg-namespace.test.tsx"],"names":[],"mappings":"AAmBwB;IACtB,MAAM,GAAG,GAAG,CAAC,KAAoB,EAAE,EAAE,CAAC,CACpC,CAAC,MAAM,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAC/B;MAAA,CAAC,KAAK,CAAC,CAAC,MAAM,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,KAAK,CAClC;IAAA,EAAE,MAAM,CAAC,CACV,CAAC;IAEF,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,CAAC,CAAC,IAAI,CAAC,SAAS,CAAC,CAAC,QAAQ,CAAC,EAAE,CAAC,CAC/B;MAAA,CAAC,GAAG,CAAC,OAAO,CAAC,WAAW,CAAC,KAAK,CAAC,KAAK,CAClC;QAAA,CAAC,KAAI,CAAC,AAAD,EACL;QAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG,CAAC,EAAE,KAAG,CACxD;QAAA,CAAC,aAAa,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,IAAI,CAAC,MAAM,CAAC,IAAI,CAC/C;UAAA,CAAC,CAAC,CAAC,CAAC,YAAY,CAAC,EAAE,CAAC,CACtB;QAAA,EAAE,aAAa,CACjB;MAAA,EAAE,GAAG,CACP;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
);
it("svgNamespace", async (t) => {
  await snapshotCase(t, "svgNamespace", svgNamespace);
});
describe("an element's namespace", () => {
  it("is where the element is drawn", async () => {
    const { container } = render(await draw(() => svgNamespace));
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
