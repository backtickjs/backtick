import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { bundle } from "../evaluate.ts";
// A bundle is a function of what was spliced alone: bundling it again, or after
// other bundles, writes the same code. Scripts are where most of the bundler's
// bookkeeping is — their numbers, the names captures print under, the thunks a
// hole feeds — so this is the bundler's own repeatability test with them in.
const doubled = cs.create(
  "1tzuy29gxe32w:13:16",
  { params: [] },
  "() => (n) => n * 2",
  '{"version":3,"file":"repeatable.test.jsx","sourceRoot":"","sources":["bundler/repeatable.test.tsx"],"names":[],"mappings":"AAYmB,MAAA,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC"}',
);
const pair = cs.create(
  "1tzuy29gxe32w:14:13",
  { params: [] },
  "() => (n) => (m) => n + m",
  '{"version":3,"file":"repeatable.test.jsx","sourceRoot":"","sources":["bundler/repeatable.test.tsx"],"names":[],"mappings":"AAagB,MAAA,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC"}',
);
function Card(props) {
  return _jsx("h2", { children: props.title });
}
const shared = cs.create(
  "1tzuy29gxe32w:20:15",
  { params: [] },
  '() => "shared"',
  '{"version":3,"file":"repeatable.test.jsx","sourceRoot":"","sources":["bundler/repeatable.test.tsx"],"names":[],"mappings":"AAmBkB,MAAA,QAAQ"}',
);
const page = () =>
  cs.create(
    "1tzuy29gxe32w:22:19",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        {
          kind: "splice",
          value: cs.create(
            "1tzuy29gxe32w:25:31",
            { params: [{ kind: "capture", key: "rows$1tzuy29gxe32w$4" }] },
            "($capture0) => $capture0.length",
            '{"version":3,"file":"repeatable.test.jsx","sourceRoot":"","sources":["bundler/repeatable.test.tsx"],"names":[],"mappings":"AAwBkC,eAAA,SAAI,CAAC,MAAM"}',
          ),
          bindings: ["rows$1tzuy29gxe32w$4"],
        },
        {
          kind: "splice",
          value: _jsx(Card, { title: "element" }),
          bindings: ["rows$1tzuy29gxe32w$4"],
        },
        {
          kind: "splice",
          value: _jsx(Card, { title: shared }),
          bindings: ["rows$1tzuy29gxe32w$4"],
        },
        { kind: "splice", value: doubled, bindings: ["rows$1tzuy29gxe32w$4"] },
        { kind: "splice", value: pair, bindings: ["rows$1tzuy29gxe32w$4"] },
        { kind: "splice", value: shared, bindings: ["rows$1tzuy29gxe32w$4"] },
        { kind: "tag", value: For },
      ],
    },
    "($splice0, $splice1, $splice2, $splice3, $splice4, $splice5, $splice6, $tag7) => {\n    const count = $splice0()(1);\n    const rows = [1, 2, 3];\n    const total = count[0]() + $splice1(rows);\n    return (<section>\n      {$splice2(rows)}\n      {$splice3(rows)}\n      <p>{$splice4(rows)(count[0]())}</p>\n      <p>{$splice5(rows)(1)(2)}</p>\n      <p>{$splice6(rows)}</p>\n      <p>{total}</p>\n      <ul>\n        <$tag7 each={rows}>{(row) => <li>{row + count[0]()}</li>}</$tag7>\n      </ul>\n    </section>);\n}",
    '{"version":3,"file":"repeatable.test.jsx","sourceRoot":"","sources":["bundler/repeatable.test.tsx"],"names":[],"mappings":"AAqBsB;IACpB,MAAM,KAAK,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,MAAM,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IACvB,MAAM,KAAK,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,cAAC,CAAkB;IAC9C,OAAO,CACL,CAAC,OAAO,CACN;MAAA,CAAC,cAA6B,CAC9B;MAAA,CAAC,cAA4B,CAC7B;MAAA,CAAC,CAAC,CAAC,CAAC,cAAQ,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAC5B;MAAA,CAAC,CAAC,CAAC,CAAC,cAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CACnB;MAAA,CAAC,CAAC,CAAC,CAAC,cAAO,CAAC,EAAE,CAAC,CACf;MAAA,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,EAAE,CAAC,CACb;MAAA,CAAC,EAAE,CACD;QAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,GAAW,EAAE,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,EAAE,CAAC,CAAC,EAAE,KAAG,CACtE;MAAA,EAAE,EAAE,CACN;IAAA,EAAE,OAAO,CAAC,CACX,CAAC;AACJ,CAAC"}',
  );
const code = async (value) => (await bundle(value)).code;
it("bundles the same every time, with scripts in it", async () => {
  const first = await code(page());
  assert.equal(await code(page()), first);
  // Other bundles in between, sharing its scripts and components.
  await code(
    cs.create(
      "1tzuy29gxe32w:47:13",
      { params: [{ kind: "splice", value: doubled, bindings: [] }] },
      "($splice0) => $splice0()(1)",
      '{"version":3,"file":"repeatable.test.jsx","sourceRoot":"","sources":["bundler/repeatable.test.tsx"],"names":[],"mappings":"AA8CgB,cAAA,UAAQ,CAAC,CAAC,CAAC"}',
    ),
  );
  await code(
    cs.create(
      "1tzuy29gxe32w:48:13",
      {
        params: [
          { kind: "splice", value: pair, bindings: [] },
          { kind: "splice", value: shared, bindings: [] },
        ],
      },
      "($splice0, $splice1) => $splice0()(1)(2) + $splice1().length",
      '{"version":3,"file":"repeatable.test.jsx","sourceRoot":"","sources":["bundler/repeatable.test.tsx"],"names":[],"mappings":"AA+CgB,wBAAA,UAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,UAAO,CAAC,MAAM"}',
    ),
  );
  await code(
    cs.create(
      "1tzuy29gxe32w:49:13",
      {
        params: [
          {
            kind: "splice",
            value: _jsx(Card, { title: "other" }),
            bindings: [],
          },
        ],
      },
      "($splice0) => $splice0()",
      '{"version":3,"file":"repeatable.test.jsx","sourceRoot":"","sources":["bundler/repeatable.test.tsx"],"names":[],"mappings":"AAgDgB,cAAA,UAAC"}',
    ),
  );
  assert.equal(await code(page()), first);
});
