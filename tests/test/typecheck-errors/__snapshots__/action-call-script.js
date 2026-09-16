import { cs } from "@backtickjs/core";
// An expression-form script is a value script — a bare splice included: an
// effectful call belongs in an action block, cs`{ $ping(); }`, and an
// action composes as cs`{ $action; }`, never as the expression itself.
const ping = cs.create(
  [6, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-call-script.test.tsx",
    fileHash: "3513dvlaj30qa",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [6, 17, 8, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [6, 23, 8, 2],
      statements: [
        {
          kind: "const",
          loc: [7, 3, 7, 15],
          name: {
            kind: "id",
            loc: [7, 9, 7, 10],
            text: "x",
            bindingKey: "x$3513dvlaj30qa$0",
          },
          initializer: {
            kind: "number",
            loc: [7, 13, 7, 14],
            value: 1,
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
    filePath: "typecheck-errors/action-call-script.test.tsx",
    fileHash: "3513dvlaj30qa",
    splices: { $ping: { value: ping, params: [] } },
    captures: [],
  },
  () => ({
    kind: "()",
    loc: [10, 26, 10, 33],
    expression: {
      kind: "splice",
      loc: [10, 26, 10, 31],
      key: "$ping",
    },
    arguments: [],
  }),
);
const action = cs.create(
  [12, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-call-script.test.tsx",
    fileHash: "3513dvlaj30qa",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [12, 19, 14, 2],
    statements: [
      {
        kind: "const",
        loc: [13, 3, 13, 15],
        name: {
          kind: "id",
          loc: [13, 9, 13, 10],
          text: "x",
          bindingKey: "x$3513dvlaj30qa$1",
        },
        initializer: {
          kind: "number",
          loc: [13, 13, 13, 14],
          value: 1,
        },
      },
    ],
  }),
);
// @ts-expect-error: Argument of type 'void' is not assignable to parameter of type 'ClientValue'.
export const spliced = cs.create(
  [17, 24, 17, 35],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-call-script.test.tsx",
    fileHash: "3513dvlaj30qa",
    splices: { $action: { value: action, params: [] } },
    captures: [],
  },
  () => ({
    kind: "splice",
    loc: [17, 27, 17, 34],
    key: "$action",
  }),
);
