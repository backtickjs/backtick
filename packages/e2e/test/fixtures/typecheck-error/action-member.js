import { cs } from "@backtickjs/core";
// An action member never ships, so a script can't read it — stored or
// performed, the member doesn't exist on the client.
class Button {
  "@backtickjs" = "ClientObject";
  label;
  press;
  constructor(label, press) {
    this.label = label;
    this.press = press;
  }
}
const press = cs.create(
  [18, 15, 20, 3],
  {
    filePath: "action-member.ts",
    fileHash: "k0vejtxhilaj",
    kind: "action",
    splices: {},
    captures: [],
    declarations: ["x$k0vejtxhilaj$0"],
  },
  (v) =>
    v.block(
      [18, 18, 20, 2],
      [
        v.variableDeclaration(
          [19, 3, 19, 15],
          "const",
          v.identifier([19, 9, 19, 10], "x", "x$k0vejtxhilaj$0"),
          v.number([19, 13, 19, 14], 1),
        ),
      ],
    ),
);
export const stored = cs.create(
  [22, 23, 26, 3],
  {
    filePath: "action-member.ts",
    fileHash: "k0vejtxhilaj",
    kind: "value",
    splices: {
      $0splice0: new Button(
        cs.create(
          [23, 31, 23, 39],
          {
            filePath: "action-member.ts",
            fileHash: "k0vejtxhilaj",
            kind: "value",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.string([23, 34, 23, 38], "OK"),
        ),
        press,
      ),
    },
    captures: [],
    declarations: ["button$k0vejtxhilaj$1", "handler$k0vejtxhilaj$2"],
  },
  (v) =>
    v.block(
      [22, 26, 26, 2],
      [
        v.variableDeclaration(
          [23, 3, 23, 49],
          "const",
          v.identifier([23, 9, 23, 15], "button", "button$k0vejtxhilaj$1"),
          v.splice([23, 18, 23, 48], "$0splice0"),
        ),
        v.variableDeclaration(
          [24, 3, 24, 32],
          "const",
          v.identifier([24, 9, 24, 16], "handler", "handler$k0vejtxhilaj$2"),
          v.propertyAccess(
            [24, 19, 24, 31],
            v.identifier([24, 19, 24, 25], "button", "button$k0vejtxhilaj$1"),
            "press",
          ),
        ),
        v.return([25, 3, 25, 12], v.number([25, 10, 25, 11], 1)),
      ],
    ),
);
export const performed = cs.create(
  [28, 26, 31, 3],
  {
    filePath: "action-member.ts",
    fileHash: "k0vejtxhilaj",
    kind: "action",
    splices: {
      $0splice0: new Button(
        cs.create(
          [29, 31, 29, 39],
          {
            filePath: "action-member.ts",
            fileHash: "k0vejtxhilaj",
            kind: "value",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.string([29, 34, 29, 38], "OK"),
        ),
        press,
      ),
    },
    captures: [],
    declarations: ["button$k0vejtxhilaj$3"],
  },
  (v) =>
    v.block(
      [28, 29, 31, 2],
      [
        v.variableDeclaration(
          [29, 3, 29, 49],
          "const",
          v.identifier([29, 9, 29, 15], "button", "button$k0vejtxhilaj$3"),
          v.splice([29, 18, 29, 48], "$0splice0"),
        ),
        v.call(
          [30, 3, 30, 17],
          v.propertyAccess(
            [30, 3, 30, 15],
            v.identifier([30, 3, 30, 9], "button", "button$k0vejtxhilaj$3"),
            "press",
          ),
          [],
        ),
      ],
    ),
);
