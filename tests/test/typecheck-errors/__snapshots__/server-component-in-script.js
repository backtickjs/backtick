import { cs } from "@backtickjs/core";
// A script's tags are client components. A server component is host code, used
// in a splice (`{${<Row label={cs`"a"`} />}}`), and refused as a tag in a
// script whatever its props take: even where they'd take the script's values.
async function Row({ label }) {
  return cs.create(
    "oqgdyzna87wy:7:9",
    { params: [{ kind: "splice", value: label, bindings: [] }] },
    "($splice0) => <li>{$splice0()}</li>",
    '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAMY,cAAA,CAAC,EAAE,CAAC,CAAC,UAAM,CAAC,EAAE,EAAE,CAAC"}',
  );
}
function Title({ text }) {
  return cs.create(
    "oqgdyzna87wy:11:9",
    { params: [{ kind: "splice", value: text, bindings: [] }] },
    "($splice0) => <h1>{$splice0()}</h1>",
    '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAUY,cAAA,CAAC,EAAE,CAAC,CAAC,UAAK,CAAC,EAAE,EAAE,CAAC"}',
  );
}
function Rule() {
  return cs.create(
    "oqgdyzna87wy:15:9",
    { params: [] },
    "() => <hr />",
    '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAcY,MAAA,CAAC,EAAE,CAAC,AAAD,EAAG"}',
  );
}
// @ts-expect-error: not assignable to parameter of type 'Client<any>'.
export const clientOnly = cs.create(
  "oqgdyzna87wy:19:26",
  { params: [{ kind: "tag", value: Row }] },
  '($tag0) => <ul><$tag0 label="a"/></ul>',
  '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAkB6B,WAAA,CAAC,EAAE,CAAC,CAAC,KAAG,CAAC,KAAK,CAAC,GAAG,EAAG,EAAE,EAAE,CAAC"}',
);
// @ts-expect-error: not assignable to parameter of type 'Client<any>'.
export const hybrid = cs.create(
  "oqgdyzna87wy:22:22",
  { params: [{ kind: "tag", value: Title }] },
  '($tag0) => <$tag0 text="Week"/>',
  '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAqByB,WAAA,CAAC,KAAK,CAAC,IAAI,CAAC,MAAM,EAAG"}',
);
// @ts-expect-error: not assignable to parameter of type 'Client<any>'.
export const noProps = cs.create(
  "oqgdyzna87wy:25:23",
  { params: [{ kind: "tag", value: Rule }] },
  "($tag0) => <div><$tag0 /></div>",
  '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAwB0B,WAAA,CAAC,GAAG,CAAC,CAAC,KAAI,CAAC,AAAD,EAAG,EAAE,GAAG,CAAC"}',
);
