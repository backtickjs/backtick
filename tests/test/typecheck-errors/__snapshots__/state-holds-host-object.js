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
  "3ar4dvnw04184:16:15",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "splice", value: host, bindings: [] },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    const [held, setHeld] = $splice0()($splice1());\n    setHeld($splice1());\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAekB,CAAAA,QAAA,EAAAC,QAAA;IAEhB,MAAM,CAACC,IAAI,EAAEC,OAAO,CAAC,GAAGH,QAAA,EAAa,CAACC,QAAA,EAAK,CAAC;IAE5CE,OAAO,CAACF,QAAA,EAAK,CAAC;AAChB,CAAC","names":["$splice0","$splice1","held","setHeld"],"ignoreList":[],"sources":["typecheck-errors/state-holds-host-object.test.tsx"]}',
  [],
);
