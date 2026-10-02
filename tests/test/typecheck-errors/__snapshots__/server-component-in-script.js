import { cs } from "@backtickjs/core";
// A script's tags are client components. A server component is host code, used
// in a splice (`{${<Row label={cs`"a"`} />}}`), and refused as a tag in a
// script whatever its props take: even where they'd take the script's values.
// A host function isn't `Spliceable`, which is what the tag is checked as.
async function Row({ label }) {
  return cs.create(
    "2eawpdn2kx1is:8:9",
    { params: [{ kind: "splice", value: label, bindings: [] }] },
    "($splice0) => <li>{$splice0()}</li>",
    '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAOY,cAAA,CAAC,EAAE,CAAC,CAAC,UAAM,CAAC,EAAE,EAAE,CAAC"}',
  );
}
function Title({ text }) {
  return cs.create(
    "2eawpdn2kx1is:12:9",
    { params: [{ kind: "splice", value: text, bindings: [] }] },
    "($splice0) => <h1>{$splice0()}</h1>",
    '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAWY,cAAA,CAAC,EAAE,CAAC,CAAC,UAAK,CAAC,EAAE,EAAE,CAAC"}',
  );
}
function Rule() {
  return cs.create(
    "2eawpdn2kx1is:16:9",
    { params: [] },
    "() => <hr />",
    '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAeY,MAAA,CAAC,EAAE,CAAC,AAAD,EAAG"}',
  );
}
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const clientOnly = cs.create(
  "2eawpdn2kx1is:20:26",
  { params: [{ kind: "tag", value: Row }] },
  '($tag0) => <ul>\n  <$tag0 label="a"/>\n</ul>',
  '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAmB6B,WAAA,CAAC,EAAE,CAC9B;EAAA,CAAC,KAAG,CAAC,KAAK,CAAC,GAAG,EAChB;AAAA,EAAE,EAAE,CAAC"}',
);
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const hybrid = cs.create(
  "2eawpdn2kx1is:25:22",
  { params: [{ kind: "tag", value: Title }] },
  '($tag0) => <$tag0 text="Week"/>',
  '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AAwByB,WAAA,CAAC,KAAK,CAAC,IAAI,CAAC,MAAM,EAAG"}',
);
// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const noProps = cs.create(
  "2eawpdn2kx1is:28:23",
  { params: [{ kind: "tag", value: Rule }] },
  "($tag0) => <div>\n  <$tag0 />\n</div>",
  '{"version":3,"file":"server-component-in-script.test.jsx","sourceRoot":"","sources":["typecheck-errors/server-component-in-script.test.tsx"],"names":[],"mappings":"AA2B0B,WAAA,CAAC,GAAG,CAC5B;EAAA,CAAC,KAAI,CAAC,AAAD,EACP;AAAA,EAAE,GAAG,CAAC"}',
);
