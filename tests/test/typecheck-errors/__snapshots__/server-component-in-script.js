import { cs } from "@backtickjs/core";
// A script's tags are client components. A server component is host code, used
// in a splice (`{${<Row label={cs`"a"`} />}}`), and refused as a tag in a
// script whatever its props take: even where they'd take the script's values.
// A host function isn't `Spliceable`, which is what the tag is checked as.
async function Row({ label }) {
  return cs.create(
    "1n2ajn0b34s0g:8:9",
    { params: [{ kind: "splice", value: label, bindings: [] }] },
    "($splice0) => <li>{$splice0()}</li>",
    '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAOY,cAAA,CAAC,EAAE,CAAC,CAAC,UAAM,CAAC,EAAE,EAAE,CAAC"}',
  );
}
function Title({ text }) {
  return cs.create(
    "1n2ajn0b34s0g:12:9",
    { params: [{ kind: "splice", value: text, bindings: [] }] },
    "($splice0) => <h1>{$splice0()}</h1>",
    '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAWY,cAAA,CAAC,EAAE,CAAC,CAAC,UAAK,CAAC,EAAE,EAAE,CAAC"}',
  );
}
function Rule() {
  return cs.create(
    "1n2ajn0b34s0g:16:9",
    { params: [] },
    "() => <hr />",
    '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAeY,MAAA,CAAC,EAAE,CAAC,AAAD,EAAG"}',
  );
}
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const clientOnly = cs.create(
  "1n2ajn0b34s0g:20:26",
  { params: [{ kind: "tag", value: Row }] },
  '($tag0) => <ul><$tag0 label="a"/></ul>',
  '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAmB6B,WAAA,CAAC,EAAE,CAAC,CAAC,KAAG,CAAC,KAAK,CAAC,GAAG,EAAG,EAAE,EAAE,CAAC"}',
);
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const hybrid = cs.create(
  "1n2ajn0b34s0g:23:22",
  { params: [{ kind: "tag", value: Title }] },
  '($tag0) => <$tag0 text="Week"/>',
  '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAsByB,WAAA,CAAC,KAAK,CAAC,IAAI,CAAC,MAAM,EAAG"}',
);
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const noProps = cs.create(
  "1n2ajn0b34s0g:26:23",
  { params: [{ kind: "tag", value: Rule }] },
  "($tag0) => <div><$tag0 /></div>",
  '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAyB0B,WAAA,CAAC,GAAG,CAAC,CAAC,KAAI,CAAC,AAAD,EAAG,EAAE,GAAG,CAAC"}',
);
