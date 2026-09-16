import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// What a splice hands over keeps the width the host gave it.
//
// `const five = 5` has the literal type `5`, and an enum member has its own, so
// a cell built from either would take no other value if the splice retyped what
// it crossed. It does not: `cs.splice` reads its argument unbound, leaving the
// binding to decide the width — `number` for the one, `Color` for the other.
//
// The writes are the assertion, each an error the moment a bound comes back to
// `cs.splice`. An action, so a write is what the script is for: in one that
// returns a value they would be side effects as well, and that error would
// stand beside the one under test.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
const five = 5;
it("splicedLiteralWidens", async (t) => {
  await snapshotCase(
    t,
    "splicedLiteralWidens",
    cs.create(
      [27, 5, 32, 7],
      {
        version: "0.0.0",
        filePath: "splices/spliced-literal-widens.test.tsx",
        fileHash: "v9pwfk0rq8l0",
        splices: {
          $state: { value: state, params: [] },
          $five: { value: five, params: [] },
          $0splice0: { value: Color.Red, params: [] },
          $0splice1: { value: Color.Blue, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [27, 8, 32, 6],
        statements: [
          {
            kind: "const",
            loc: [28, 7, 28, 31],
            name: {
              kind: "id",
              loc: [28, 13, 28, 14],
              text: "n",
              bindingKey: "n$v9pwfk0rq8l0$0",
            },
            initializer: {
              kind: "()",
              loc: [28, 17, 28, 30],
              expression: {
                kind: "splice",
                loc: [28, 17, 28, 23],
                key: "$state",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [28, 24, 28, 29],
                  key: "$five",
                },
              ],
            },
          },
          {
            kind: "()",
            loc: [29, 7, 29, 17],
            expression: {
              kind: ".",
              loc: [29, 7, 29, 14],
              expression: {
                kind: "id",
                loc: [29, 7, 29, 8],
                text: "n",
                bindingKey: "n$v9pwfk0rq8l0$0",
              },
              name: "write",
            },
            arguments: [
              {
                kind: "number",
                loc: [29, 15, 29, 16],
                value: 6,
              },
            ],
          },
          {
            kind: "const",
            loc: [30, 7, 30, 38],
            name: {
              kind: "id",
              loc: [30, 13, 30, 14],
              text: "c",
              bindingKey: "c$v9pwfk0rq8l0$1",
            },
            initializer: {
              kind: "()",
              loc: [30, 17, 30, 37],
              expression: {
                kind: "splice",
                loc: [30, 17, 30, 23],
                key: "$state",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [30, 24, 30, 36],
                  key: "$0splice0",
                },
              ],
            },
          },
          {
            kind: "()",
            loc: [31, 7, 31, 29],
            expression: {
              kind: ".",
              loc: [31, 7, 31, 14],
              expression: {
                kind: "id",
                loc: [31, 7, 31, 8],
                text: "c",
                bindingKey: "c$v9pwfk0rq8l0$1",
              },
              name: "write",
            },
            arguments: [
              {
                kind: "splice",
                loc: [31, 15, 31, 28],
                key: "$0splice1",
              },
            ],
          },
        ],
      }),
    ),
  );
});
