import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
// A host object with behaviour reaching a cell, refused where it is written.
//
// A cell is the one place a splice lands with nothing waiting for it: every
// other position has a bound — the binding, the receiver a member is read off,
// the operator it stands beside — and `$createSignal` takes its initial
// unbound, so that the width the host gave the value survives. The binding it
// lands in would take it, and the bundle would be the first to say no.
//
// What says no here is the splice itself: what it answers with is checked
// against `Spliceable`, which a `Date` is not.
const host = new Date();
export default cs.create(
  "10cqsff4bmc90:16:15",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "splice", value: host, bindings: [] },
    ],
  },
  "($splice0, $splice1) => {\n    const held = $splice0()($splice1());\n    held[1]($splice1());\n}",
  '{"version":3,"file":"state-holds-host-object.test.jsx","sourceRoot":"","sources":["typecheck-errors/state-holds-host-object.test.tsx"],"names":[],"mappings":"AAekB;IAEhB,MAAM,IAAI,GAAG,UAAa,CAAC,UAAK,CAAC,CAAC;IAElC,IAAI,CAAC,CAAC,CAAC,CAAC,UAAK,CAAC,CAAC;AACjB,CAAC"}',
);
