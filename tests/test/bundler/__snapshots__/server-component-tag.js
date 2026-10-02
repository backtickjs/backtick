import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
// A server component written as a tag in a script, past the typechecker:
// refused when bundling, pointing at the splice it belongs in.
function Rule() {
  return cs.create(
    "3u9zzporc7nes:9:9",
    { params: [] },
    "() => <hr />",
    '{"version":3,"file":"server-component-tag.test.jsx","sourceRoot":"","sources":["bundler/server-component-tag.test.tsx"],"names":[],"mappings":"AAQY,MAAA,CAAC,EAAE,CAAC,AAAD,EAAG"}',
  );
}
it("refuses a server component as a tag in a script", async () => {
  await assert.rejects(
    bundler.build({
      // @ts-expect-error: not assignable to parameter of type 'Client<any>'.
      input: cs.create(
        "3u9zzporc7nes:16:13",
        { params: [{ kind: "tag", value: Rule }] },
        "($tag0) => <div><$tag0 /></div>",
        '{"version":3,"file":"server-component-tag.test.jsx","sourceRoot":"","sources":["bundler/server-component-tag.test.tsx"],"names":[],"mappings":"AAegB,WAAA,CAAC,GAAG,CAAC,CAAC,KAAI,CAAC,AAAD,EAAG,EAAE,GAAG,CAAC"}',
      ),
      external: {},
    }),
    {
      message:
        "`<Rule>` is a server component, so it can't be a tag in a script, whose tags are client components. Use it in a splice: `{${<Rule />}}`.",
    },
  );
});
