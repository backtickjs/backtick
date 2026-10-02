import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
// A client component is client code, a tag in a script. On the host it isn't
// callable, so TypeScript refuses it as a tag: a client import, and a script
// answering a component alike.
const Badge = cs.create(
  "j2gfou1pgla3:7:14",
  { params: [] },
  "() => (props) => <b>{props.n}</b>",
  '{"version":3,"file":"client-component-on-host.test.jsx","sourceRoot":"","sources":["typecheck-errors/client-component-on-host.test.tsx"],"names":[],"mappings":"AAMiB,MAAA,CAAC,KAAoB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC"}',
);
// @ts-expect-error: JSX element type 'For' does not have any construct or call signatures.
export const forOnHost = _jsx(For, { each: [1, 2], children: (n) => n });
// @ts-expect-error: JSX element type 'Badge' does not have any construct or call signatures.
export const badgeOnHost = _jsx(Badge, { n: 1 });
// In a script, both are what they are on the client.
export const inScript = cs.create(
  "j2gfou1pgla3:16:24",
  {
    params: [
      { kind: "tag", value: For },
      { kind: "tag", value: Badge },
    ],
  },
  "($tag0, $tag1) => <$tag0 each={[1, 2]}>{(n) => <$tag1 n={n}/>}</$tag0>",
  '{"version":3,"file":"client-component-on-host.test.jsx","sourceRoot":"","sources":["typecheck-errors/client-component-on-host.test.tsx"],"names":[],"mappings":"AAe2B,kBAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG,CAAC,EAAE,KAAG,CAAC"}',
);
