import { cs } from "@backtickjs/core";
// A function is never spliceable — it can't cross the host/client boundary
// as data — but an annotation can still name a function type: the parameter
// receives a client-born function (here, a spliced script), already client
// currency, and passes through the annotation untouched.
export default cs.create(
  [7, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "spliced-function-param.ts",
    fileHash: "22dvza3e0b85b",
    kind: "value",
    splices: {
      $0splice0: cs.create(
        [9, 18, 9, 29],
        {
          version: "0.0.0",
          filePath: "spliced-function-param.ts",
          fileHash: "22dvza3e0b85b",
          kind: "value",
          splices: {},
          captures: [],
          declarations: [],
        },
        (v) => v.arrow([9, 21, 9, 28], [], v.number([9, 27, 9, 28], 2)),
      ),
    },
    captures: [],
    declarations: ["apply$22dvza3e0b85b$0", "f$22dvza3e0b85b$1"],
  },
  (v) =>
    v.block(
      [7, 19, 10, 2],
      [
        v.variableDeclaration(
          [8, 3, 8, 46],
          "const",
          v.identifier([8, 9, 8, 14], "apply", "apply$22dvza3e0b85b$0"),
          v.arrow(
            [8, 17, 8, 45],
            [v.identifier([8, 18, 8, 19], "f", "f$22dvza3e0b85b$1")],
            v.binop(
              [8, 38, 8, 45],
              v.call(
                [8, 38, 8, 41],
                v.identifier([8, 38, 8, 39], "f", "f$22dvza3e0b85b$1"),
                [],
              ),
              "+",
              v.number([8, 44, 8, 45], 1),
            ),
          ),
        ),
        v.return(
          [9, 3, 9, 32],
          v.call(
            [9, 10, 9, 31],
            v.identifier([9, 10, 9, 15], "apply", "apply$22dvza3e0b85b$0"),
            [v.splice([9, 16, 9, 30], "$0splice0")],
          ),
        ),
      ],
    ),
);
