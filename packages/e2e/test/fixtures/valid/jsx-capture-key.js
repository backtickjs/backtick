import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs, Text } from "@backtickjs/core";
// A key is a value like a prop, so it captures like one. This element hoists
// into its own entry and its key is a script reading `x` from the enclosing
// script, so `x` has to appear in the entry's slot signature — the key is
// scanned for needs alongside the props, not just rendered.
const script = cs.create(
  [7, 43, 10, 3],
  {
    version: "0.0.0",
    filePath: "jsx-capture-key.tsx",
    fileHash: "opm9pkkvziiq",
    kind: "value",
    splices: {
      $0splice0: _jsx(
        Text,
        {},
        cs.create(
          [9, 24, 9, 29],
          {
            version: "0.0.0",
            filePath: "jsx-capture-key.tsx",
            fileHash: "opm9pkkvziiq",
            kind: "value",
            splices: {},
            captures: ["x$opm9pkkvziiq$0"],
            spliceParams: {},
          },
          () => ({
            kind: 80,
            loc: [9, 27, 9, 28],
            text: "x",
            bindingKey: "x$opm9pkkvziiq$0",
          }),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: ["x$opm9pkkvziiq$0"] },
  },
  () => ({
    kind: 220,
    loc: [7, 46, 10, 2],
    parameters: [],
    body: {
      kind: 242,
      loc: [7, 52, 10, 2],
      statements: [
        {
          kind: 261,
          loc: [8, 3, 8, 15],
          name: {
            kind: 80,
            loc: [8, 9, 8, 10],
            text: "x",
            bindingKey: "x$opm9pkkvziiq$0",
          },
          initializer: {
            kind: 9,
            loc: [8, 13, 8, 14],
            value: 1,
          },
          keyword: "const",
        },
        {
          kind: 254,
          loc: [9, 3, 9, 36],
          expression: {
            kind: 1000,
            loc: [9, 10, 9, 35],
            key: "$0splice0",
          },
        },
      ],
    },
  }),
);
export default script;
