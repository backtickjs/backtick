import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `x += y` assigns what `x + y` answers and answers it: a string concatenates
// as `+` does. The variable is read before the value is evaluated, so an
// assignment inside the value doesn't change what it adds to.
it("compoundAssignment", async (t) => {
  await snapshotCase(
    t,
    "compoundAssignment",
    cs.create(
      [12, 5, 26, 7],
      {
        version: "0.0.0",
        filePath: "expressions/compound-assignment.test.tsx",
        fileHash: "23v4b48bi2lxc",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 26, 6],
        statements: [
          {
            kind: "let",
            loc: [13, 7, 13, 18],
            name: {
              kind: "id",
              loc: [13, 11, 13, 12],
              text: "n",
              bindingKey: "n$23v4b48bi2lxc$0",
            },
            initializer: {
              kind: "number",
              loc: [13, 15, 13, 17],
              value: 10,
            },
          },
          {
            kind: "binop",
            loc: [14, 7, 14, 13],
            left: {
              kind: "id",
              loc: [14, 7, 14, 8],
              text: "n",
              bindingKey: "n$23v4b48bi2lxc$0",
            },
            operatorToken: "+=",
            right: {
              kind: "number",
              loc: [14, 12, 14, 13],
              value: 5,
            },
          },
          {
            kind: "binop",
            loc: [15, 7, 15, 13],
            left: {
              kind: "id",
              loc: [15, 7, 15, 8],
              text: "n",
              bindingKey: "n$23v4b48bi2lxc$0",
            },
            operatorToken: "-=",
            right: {
              kind: "number",
              loc: [15, 12, 15, 13],
              value: 3,
            },
          },
          {
            kind: "binop",
            loc: [16, 7, 16, 13],
            left: {
              kind: "id",
              loc: [16, 7, 16, 8],
              text: "n",
              bindingKey: "n$23v4b48bi2lxc$0",
            },
            operatorToken: "*=",
            right: {
              kind: "number",
              loc: [16, 12, 16, 13],
              value: 2,
            },
          },
          {
            kind: "binop",
            loc: [17, 7, 17, 13],
            left: {
              kind: "id",
              loc: [17, 7, 17, 8],
              text: "n",
              bindingKey: "n$23v4b48bi2lxc$0",
            },
            operatorToken: "/=",
            right: {
              kind: "number",
              loc: [17, 12, 17, 13],
              value: 4,
            },
          },
          {
            kind: "binop",
            loc: [18, 7, 18, 13],
            left: {
              kind: "id",
              loc: [18, 7, 18, 8],
              text: "n",
              bindingKey: "n$23v4b48bi2lxc$0",
            },
            operatorToken: "%=",
            right: {
              kind: "number",
              loc: [18, 12, 18, 13],
              value: 4,
            },
          },
          {
            kind: "let",
            loc: [19, 7, 19, 22],
            name: {
              kind: "id",
              loc: [19, 11, 19, 15],
              text: "text",
              bindingKey: "text$23v4b48bi2lxc$1",
            },
            initializer: {
              kind: "string",
              loc: [19, 18, 19, 21],
              text: "a",
            },
          },
          {
            kind: "binop",
            loc: [20, 7, 20, 18],
            left: {
              kind: "id",
              loc: [20, 7, 20, 11],
              text: "text",
              bindingKey: "text$23v4b48bi2lxc$1",
            },
            operatorToken: "+=",
            right: {
              kind: "string",
              loc: [20, 15, 20, 18],
              text: "b",
            },
          },
          {
            kind: "let",
            loc: [21, 7, 21, 21],
            name: {
              kind: "id",
              loc: [21, 11, 21, 16],
              text: "total",
              bindingKey: "total$23v4b48bi2lxc$2",
            },
            initializer: {
              kind: "number",
              loc: [21, 19, 21, 20],
              value: 1,
            },
          },
          {
            kind: "const",
            loc: [22, 7, 22, 37],
            name: {
              kind: "id",
              loc: [22, 13, 22, 21],
              text: "answered",
              bindingKey: "answered$23v4b48bi2lxc$3",
            },
            initializer: {
              kind: "binop",
              loc: [22, 25, 22, 35],
              left: {
                kind: "id",
                loc: [22, 25, 22, 30],
                text: "total",
                bindingKey: "total$23v4b48bi2lxc$2",
              },
              operatorToken: "+=",
              right: {
                kind: "number",
                loc: [22, 34, 22, 35],
                value: 2,
              },
            },
          },
          {
            kind: "let",
            loc: [23, 7, 23, 17],
            name: {
              kind: "id",
              loc: [23, 11, 23, 12],
              text: "x",
              bindingKey: "x$23v4b48bi2lxc$4",
            },
            initializer: {
              kind: "number",
              loc: [23, 15, 23, 16],
              value: 1,
            },
          },
          {
            kind: "binop",
            loc: [24, 7, 24, 17],
            left: {
              kind: "id",
              loc: [24, 7, 24, 8],
              text: "x",
              bindingKey: "x$23v4b48bi2lxc$4",
            },
            operatorToken: "+=",
            right: {
              kind: "binop",
              loc: [24, 12, 24, 17],
              left: {
                kind: "id",
                loc: [24, 12, 24, 13],
                text: "x",
                bindingKey: "x$23v4b48bi2lxc$4",
              },
              operatorToken: "=",
              right: {
                kind: "number",
                loc: [24, 16, 24, 17],
                value: 5,
              },
            },
          },
          {
            kind: "return",
            loc: [25, 7, 25, 44],
            expression: {
              kind: "arr",
              loc: [25, 14, 25, 43],
              elements: [
                {
                  kind: "id",
                  loc: [25, 15, 25, 16],
                  text: "n",
                  bindingKey: "n$23v4b48bi2lxc$0",
                },
                {
                  kind: "id",
                  loc: [25, 18, 25, 22],
                  text: "text",
                  bindingKey: "text$23v4b48bi2lxc$1",
                },
                {
                  kind: "id",
                  loc: [25, 24, 25, 32],
                  text: "answered",
                  bindingKey: "answered$23v4b48bi2lxc$3",
                },
                {
                  kind: "id",
                  loc: [25, 34, 25, 39],
                  text: "total",
                  bindingKey: "total$23v4b48bi2lxc$2",
                },
                {
                  kind: "id",
                  loc: [25, 41, 25, 42],
                  text: "x",
                  bindingKey: "x$23v4b48bi2lxc$4",
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
