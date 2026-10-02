import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
// A client component written as a tag on the host, past the typechecker:
// refused when bundling, as it is a tag in a script.
const Badge = cs.create(
  "8gzm5u5ugo4r:9:14",
  { params: [] },
  "() => (props) => <b>{props.n}</b>",
  '{"version":3,"file":"client-component-on-host.test.jsx","sourceRoot":"","sources":["bundler/client-component-on-host.test.tsx"],"names":[],"mappings":"AAQiB,MAAA,CAAC,KAAoB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC"}',
);
it("refuses a client import as a tag on the host", async () => {
  await assert.rejects(
    bundler.build({
      // @ts-expect-error: JSX element type 'For' does not have any construct or call signatures.
      input: _jsx(For, { each: [1], children: (n) => n }),
      external: {},
    }),
    {
      message:
        "`<For>` is a client component, so it can't be a tag on the host. Use it as a tag in a script.",
    },
  );
});
it("refuses a script as a tag on the host", async () => {
  await assert.rejects(
    bundler.build({
      // @ts-expect-error: JSX element type 'Badge' does not have any construct or call signatures.
      input: _jsx(Badge, { n: 1 }),
      external: {},
    }),
    {
      message:
        "A script is a client component, so it can't be a tag on the host. Use it as a tag in a script.",
    },
  );
});
