import { cs, state } from "@backtickjs/core";
// A host object with behaviour reaching a cell, refused where it is written.
//
// A cell is the one place a splice lands with nothing waiting for it: every
// other position has a bound — the binding, the receiver a member is read off,
// the operator it stands beside — and `$state` takes its initial unbound, so
// that the width the host gave the value survives. `State<Date>` is a
// `ClientHandle` and a `ClientHandle` is a client value, so the binding it
// lands in would take it and the bundle would be the first to say no.
//
// What says no here is the splice itself: what it answers with is checked
// against `ClientUnknown`, which a `Date` is not.
const host = new Date();
export default cs.create(
  [16, 16, 21, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/state-holds-host-object.test.tsx",
    fileHash: "1x4hgyu7lmb12",
    splices: {
      $state: { value: state, params: [] },
      $host: { value: host, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [16, 19, 21, 2],
    statements: [
      {
        kind: "const",
        loc: [18, 3, 18, 30],
        name: {
          kind: "id",
          loc: [18, 9, 18, 13],
          text: "held",
          bindingKey: "held$1x4hgyu7lmb12$0",
        },
        initializer: {
          kind: "()",
          loc: [18, 16, 18, 29],
          expression: {
            kind: "splice",
            loc: [18, 16, 18, 22],
            key: "$state",
          },
          arguments: [
            {
              kind: "splice",
              loc: [18, 23, 18, 28],
              key: "$host",
            },
          ],
        },
      },
      {
        kind: "()",
        loc: [20, 3, 20, 20],
        expression: {
          kind: ".",
          loc: [20, 3, 20, 13],
          expression: {
            kind: "id",
            loc: [20, 3, 20, 7],
            text: "held",
            bindingKey: "held$1x4hgyu7lmb12$0",
          },
          name: "write",
        },
        arguments: [
          {
            kind: "splice",
            loc: [20, 14, 20, 19],
            key: "$host",
          },
        ],
      },
    ],
  }),
);
