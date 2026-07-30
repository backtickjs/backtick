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
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [18, 18, 20, 2],
    statements: [
      {
        kind: 261,
        loc: [19, 3, 19, 15],
        name: {
          kind: 80,
          loc: [19, 9, 19, 10],
          text: "x",
          bindingKey: "x$1w48eutzbucnb$0",
        },
        initializer: {
          kind: 9,
          loc: [19, 13, 19, 14],
          value: 1,
        },
        keyword: "const",
      },
    ],
  }),
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
            spliceParams: {},
          },
          () => ({
            kind: 11,
            loc: [23, 34, 23, 38],
            text: "OK",
          }),
        ),
        press,
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: 242,
    loc: [22, 19, 25, 2],
    statements: [
      {
        kind: 261,
        loc: [23, 3, 23, 49],
        name: {
          kind: 80,
          loc: [23, 9, 23, 15],
          text: "button",
          bindingKey: "button$1w48eutzbucnb$1",
        },
        initializer: {
          kind: 1000,
          loc: [23, 18, 23, 48],
          key: "$0splice0",
        },
        keyword: "const",
      },
      {
        kind: 254,
        loc: [24, 3, 24, 23],
        expression: {
          kind: 212,
          loc: [24, 10, 24, 22],
          expression: {
            kind: 80,
            loc: [24, 10, 24, 16],
            text: "button",
            bindingKey: "button$1w48eutzbucnb$1",
          },
          questionDotToken: false,
          name: "label",
        },
      },
    ],
  }),
);
