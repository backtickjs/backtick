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
  [16, 16, 19, 3],
  {
    version: "0.0.0",
    filePath: "state-holds-host-object.ts",
    fileHash: "2bsdl419q8da8",
    kind: "action",
    splices: { $state: state, $host: host },
    captures: [],
    spliceParams: { $state: [], $host: [] },
  },
  () => ({
    kind: 242,
    loc: [16, 19, 19, 2],
    statements: [
      {
        kind: 244,
        loc: [17, 3, 17, 30],
        declarationList: {
          kind: 262,
          loc: [17, 3, 17, 29],
          declarations: [
            {
              kind: 261,
              loc: [17, 9, 17, 29],
              name: {
                kind: 80,
                loc: [17, 9, 17, 13],
                text: "held",
                bindingKey: "held$2bsdl419q8da8$0",
              },
              initializer: {
                kind: 214,
                loc: [17, 16, 17, 29],
                expression: {
                  kind: 1000,
                  loc: [17, 16, 17, 22],
                  key: "$state",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 1000,
                    loc: [17, 23, 17, 28],
                    key: "$host",
                  },
                ],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 214,
        loc: [18, 3, 18, 20],
        expression: {
          kind: 212,
          loc: [18, 3, 18, 13],
          expression: {
            kind: 80,
            loc: [18, 3, 18, 7],
            text: "held",
            bindingKey: "held$2bsdl419q8da8$0",
          },
          questionDotToken: false,
          name: "write",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 1000,
            loc: [18, 14, 18, 19],
            key: "$host",
          },
        ],
      },
    ],
  }),
);
