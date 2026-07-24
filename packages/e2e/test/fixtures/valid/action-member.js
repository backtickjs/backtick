import { cs } from "@backtickjs/core";
// A holder can carry an action, but the action doesn't ship — curated
// reflection skips it, so only the value members reach the client.
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
    version: "0.0.0",
    filePath: "action-member.ts",
    fileHash: "1w48eutzbucnb",
    kind: "action",
    splices: {},
    captures: [],
    declarations: ["x$1w48eutzbucnb$0"],
  },
  (v) =>
    v.block(
      [18, 18, 20, 2],
      [
        v.variableDeclaration(
          [19, 3, 19, 15],
          "const",
          v.identifier([19, 9, 19, 10], "x", "x$1w48eutzbucnb$0"),
          v.number([19, 13, 19, 14], 1),
        ),
      ],
    ),
);
export default cs.create(
  [22, 16, 25, 3],
  {
    version: "0.0.0",
    filePath: "action-member.ts",
    fileHash: "1w48eutzbucnb",
    kind: "value",
    splices: {
      $0splice0: new Button(
        cs.create(
          [23, 31, 23, 39],
          {
            version: "0.0.0",
            filePath: "action-member.ts",
            fileHash: "1w48eutzbucnb",
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
    declarations: ["button$1w48eutzbucnb$1"],
  },
  (v) =>
    v.block(
      [22, 19, 25, 2],
      [
        v.variableDeclaration(
          [23, 3, 23, 49],
          "const",
          v.identifier([23, 9, 23, 15], "button", "button$1w48eutzbucnb$1"),
          v.splice([23, 18, 23, 48], "$0splice0"),
        ),
        v.return(
          [24, 3, 24, 23],
          v.propertyAccess(
            [24, 10, 24, 22],
            v.identifier([24, 10, 24, 16], "button", "button$1w48eutzbucnb$1"),
            "label",
          ),
        ),
      ],
    ),
);
