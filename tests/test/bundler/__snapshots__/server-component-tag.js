import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
// A server component written as a tag in a script, past the typechecker:
// refused when bundling, pointing at the splice it belongs in.
function Rule() {
  return cs.create(
    "3pcm93ncujvif:9:9",
    { params: [] },
    "() => <hr />",
    '{"version":3,"file":"server-component-tag.test.jsx","sourceRoot":"","sources":["bundler/server-component-tag.test.tsx"],"names":[],"mappings":"AAQY,MAAA,CAAC,EAAE,CAAC,AAAD,EAAG"}',
  );
}
it("refuses a server component as a tag in a script", async () => {
  await assert.rejects(
    bundler.build({
      // @ts-expect-error: not assignable to parameter of type 'Spliceable'.
      input: cs.create(
        "3pcm93ncujvif:16:13",
        { params: [{ kind: "tag", value: Rule }] },
        "($tag0) => <div>\n        <$tag0 />\n      </div>",
        '{"version":3,"file":"server-component-tag.test.jsx","sourceRoot":"","sources":["bundler/server-component-tag.test.tsx"],"names":[],"mappings":"AAegB,WAAA,CAAC,GAAG,CACZ;QAAA,CAAC,KAAI,CAAC,AAAD,EACP;MAAA,EAAE,GAAG,CAAC"}',
      ),
      external: {},
    }),
    {
      message:
        "`<Rule>` is a server component, so it can't be a tag in a script, whose tags are client components. Use it in a splice: `{${<Rule />}}`.",
    },
  );
});
