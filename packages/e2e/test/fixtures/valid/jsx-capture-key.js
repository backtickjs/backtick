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
            kind: "AstScriptIdentifier",
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
    kind: "AstScriptArrowFunction",
    loc: [7, 46, 10, 2],
    parameters: [],
    body: {
      kind: "AstScriptBlock",
      loc: [7, 52, 10, 2],
      statements: [
        {
          kind: "AstScriptVariableDeclaration",
          loc: [8, 3, 8, 15],
          name: {
            kind: "AstScriptIdentifier",
            loc: [8, 9, 8, 10],
            text: "x",
            bindingKey: "x$opm9pkkvziiq$0",
          },
          initializer: {
            kind: "AstScriptNumericLiteral",
            loc: [8, 13, 8, 14],
            value: 1,
          },
          keyword: "const",
        },
        {
          kind: "AstScriptReturnStatement",
          loc: [9, 3, 9, 36],
          expression: {
            kind: "AstScriptSplice",
            loc: [9, 10, 9, 35],
            key: "$0splice0",
          },
        },
      ],
    },
  }),
);
export default script;
