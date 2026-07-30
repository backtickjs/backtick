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
    version: "0.0.0",
    filePath: "action-member.ts",
    fileHash: "k0vejtxhilaj",
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
          bindingKey: "x$k0vejtxhilaj$0",
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
export const stored = cs.create(
  [22, 23, 26, 3],
  {
    version: "0.0.0",
    filePath: "action-member.ts",
    fileHash: "k0vejtxhilaj",
    kind: "value",
    splices: {
      $0splice0: new Button(
        cs.create(
          [23, 31, 23, 39],
          {
            version: "0.0.0",
            filePath: "action-member.ts",
            fileHash: "k0vejtxhilaj",
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
    loc: [22, 26, 26, 2],
    statements: [
      {
        kind: 261,
        loc: [23, 3, 23, 49],
        name: {
          kind: 80,
          loc: [23, 9, 23, 15],
          text: "button",
          bindingKey: "button$k0vejtxhilaj$1",
        },
        initializer: {
          kind: 1000,
          loc: [23, 18, 23, 48],
          key: "$0splice0",
        },
        keyword: "const",
      },
      {
        kind: 261,
        loc: [24, 3, 24, 32],
        name: {
          kind: 80,
          loc: [24, 9, 24, 16],
          text: "handler",
          bindingKey: "handler$k0vejtxhilaj$2",
        },
        initializer: {
          kind: 212,
          loc: [24, 19, 24, 31],
          expression: {
            kind: 80,
            loc: [24, 19, 24, 25],
            text: "button",
            bindingKey: "button$k0vejtxhilaj$1",
          },
          questionDotToken: false,
          name: "press",
        },
        keyword: "const",
      },
      {
        kind: 254,
        loc: [25, 3, 25, 12],
        expression: {
          kind: 9,
          loc: [25, 10, 25, 11],
          value: 1,
        },
      },
    ],
  }),
);
export const performed = cs.create(
  [28, 26, 31, 3],
  {
    version: "0.0.0",
    filePath: "action-member.ts",
    fileHash: "k0vejtxhilaj",
    kind: "action",
    splices: {
      $0splice0: new Button(
        cs.create(
          [29, 31, 29, 39],
          {
            version: "0.0.0",
            filePath: "action-member.ts",
            fileHash: "k0vejtxhilaj",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 11,
            loc: [29, 34, 29, 38],
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
    loc: [28, 29, 31, 2],
    statements: [
      {
        kind: 261,
        loc: [29, 3, 29, 49],
        name: {
          kind: 80,
          loc: [29, 9, 29, 15],
          text: "button",
          bindingKey: "button$k0vejtxhilaj$3",
        },
        initializer: {
          kind: 1000,
          loc: [29, 18, 29, 48],
          key: "$0splice0",
        },
        keyword: "const",
      },
      {
        kind: 214,
        loc: [30, 3, 30, 17],
        expression: {
          kind: 212,
          loc: [30, 3, 30, 15],
          expression: {
            kind: 80,
            loc: [30, 3, 30, 9],
            text: "button",
            bindingKey: "button$k0vejtxhilaj$3",
          },
          questionDotToken: false,
          name: "press",
        },
        questionDotToken: false,
        arguments: [],
      },
    ],
  }),
);
