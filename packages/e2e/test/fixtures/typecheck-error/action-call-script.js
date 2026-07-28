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
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["x$17wdcvct95tpn$0"],
    spliceScopes: {},
  },
  (v) =>
    v.arrow(
      [6, 17, 8, 2],
      [],
      v.block(
        [6, 23, 8, 2],
        [
          v.variableDeclaration(
            [7, 3, 7, 15],
            "const",
            v.identifier([7, 9, 7, 10], "x", "x$17wdcvct95tpn$0"),
            v.number([7, 13, 7, 14], 1),
          ),
        ],
      ),
    ),
);
export const called = cs.create(
  [10, 23, 10, 34],
  {
    version: "0.0.0",
    filePath: "action-call-script.ts",
    fileHash: "17wdcvct95tpn",
    kind: "value",
    splices: { $ping: ping },
    captures: [],
    declarations: [],
    spliceScopes: { $ping: [] },
  },
  (v) => v.call([10, 26, 10, 33], v.splice([10, 26, 10, 31], "$ping"), []),
);
const action = cs.create(
  [12, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "action-call-script.ts",
    fileHash: "17wdcvct95tpn",
    kind: "action",
    splices: {},
    captures: [],
    declarations: ["x$17wdcvct95tpn$1"],
    spliceScopes: {},
  },
  (v) =>
    v.block(
      [12, 19, 14, 2],
      [
        v.variableDeclaration(
          [13, 3, 13, 15],
          "const",
          v.identifier([13, 9, 13, 10], "x", "x$17wdcvct95tpn$1"),
          v.number([13, 13, 13, 14], 1),
        ),
      ],
    ),
);
export const spliced = cs.create(
  [16, 24, 16, 35],
  {
    version: "0.0.0",
    filePath: "action-call-script.ts",
    fileHash: "17wdcvct95tpn",
    kind: "value",
    splices: { $action: action },
    captures: [],
    declarations: [],
    spliceScopes: { $action: [] },
  },
  (v) => v.splice([16, 27, 16, 34], "$action"),
);
