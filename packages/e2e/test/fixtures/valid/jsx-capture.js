import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs } from "@backtickjs/core";
const Button = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Button",
  props,
});
// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script = cs.create(
  [14, 43, 17, 3],
  {
    version: "0.0.0",
    filePath: "jsx-capture.tsx",
    fileHash: "3o5c9tn365vhj",
    kind: "value",
    splices: {
      $0splice0: _jsx(Button, {
        onClick: cs.create(
          [16, 30, 16, 41],
          {
            version: "0.0.0",
            filePath: "jsx-capture.tsx",
            fileHash: "3o5c9tn365vhj",
            kind: "value",
            splices: {},
            captures: ["x$3o5c9tn365vhj$0"],
            declarations: [],
          },
          (v) =>
            v.arrow(
              [16, 33, 16, 40],
              [],
              v.identifier([16, 39, 16, 40], "x", "x$3o5c9tn365vhj$0"),
            ),
        ),
      }),
    },
    captures: [],
    declarations: ["x$3o5c9tn365vhj$0"],
  },
  (v) =>
    v.arrow(
      [14, 46, 17, 2],
      [],
      v.block(
        [14, 52, 17, 2],
        [
          v.variableDeclaration(
            [15, 3, 15, 15],
            "const",
            v.identifier([15, 9, 15, 10], "x", "x$3o5c9tn365vhj$0"),
            v.number([15, 13, 15, 14], 1),
          ),
          v.return([16, 3, 16, 48], v.splice([16, 10, 16, 47], "$0splice0")),
        ],
      ),
    ),
);
export default script;
