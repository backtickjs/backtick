import { cs } from "@backtickjs/core";
// An expression-form script is a value script — a bare splice included: an
// effectful call belongs in an action block, cs`{ $ping(); }`, and an
// action composes as cs`{ $action; }`, never as the expression itself.
const ping = cs.create(
  [6, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "action-call-script.ts",
    fileHash: "17wdcvct95tpn",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [6, 17, 8, 2],
    parameters: [],
    body: {
      kind: 242,
      loc: [6, 23, 8, 2],
      statements: [
        {
          kind: 244,
          loc: [7, 3, 7, 15],
          declarationList: {
            kind: 262,
            loc: [7, 3, 7, 14],
            declarations: [
              {
                kind: 261,
                loc: [7, 9, 7, 14],
                name: {
                  kind: 80,
                  loc: [7, 9, 7, 10],
                  text: "x",
                  bindingKey: "x$17wdcvct95tpn$0",
                },
                initializer: {
                  kind: 9,
                  loc: [7, 13, 7, 14],
                  value: 1,
                },
              },
            ],
            keyword: "const",
          },
        },
      ],
    },
  }),
);
export const called = cs.create(
  [10, 23, 10, 34],
  {
    version: "0.0.0",
    filePath: "action-call-script.ts",
    fileHash: "17wdcvct95tpn",
    splices: { $ping: ping },
    captures: [],
    spliceParams: { $ping: [] },
  },
  () => ({
    kind: 214,
    loc: [10, 26, 10, 33],
    expression: {
      kind: 1000,
      loc: [10, 26, 10, 31],
      key: "$ping",
    },
    questionDotToken: false,
    arguments: [],
  }),
);
const action = cs.create(
  [12, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "action-call-script.ts",
    fileHash: "17wdcvct95tpn",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [12, 19, 14, 2],
    statements: [
      {
        kind: 244,
        loc: [13, 3, 13, 15],
        declarationList: {
          kind: 262,
          loc: [13, 3, 13, 14],
          declarations: [
            {
              kind: 261,
              loc: [13, 9, 13, 14],
              name: {
                kind: 80,
                loc: [13, 9, 13, 10],
                text: "x",
                bindingKey: "x$17wdcvct95tpn$1",
              },
              initializer: {
                kind: 9,
                loc: [13, 13, 13, 14],
                value: 1,
              },
            },
          ],
          keyword: "const",
        },
      },
    ],
  }),
);
export const spliced = cs.create(
  [16, 24, 16, 35],
  {
    version: "0.0.0",
    filePath: "action-call-script.ts",
    fileHash: "17wdcvct95tpn",
    splices: { $action: action },
    captures: [],
    spliceParams: { $action: [] },
  },
  () => ({
    kind: 1000,
    loc: [16, 27, 16, 34],
    key: "$action",
  }),
);
