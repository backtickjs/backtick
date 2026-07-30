import { cs } from "@backtickjs/core";
// `&&`/`||` operate on booleans and always yield one: the guard and default
// idioms that lean on truthiness (`count && flag`, `value || fallback`) are
// type errors on each non-boolean operand. Defaulting is `??`.
export default cs.create(
  [6, 16, 8, 3],
  {
    version: "0.0.0",
    filePath: "non-boolean-operand.ts",
    fileHash: "3kpojr67liy8x",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [6, 19, 8, 2],
      [
        v.identifier([6, 20, 6, 25], "count", "count$3kpojr67liy8x$0"),
        v.identifier([6, 35, 6, 39], "flag", "flag$3kpojr67liy8x$1"),
      ],
      v.block(
        [6, 53, 8, 2],
        [
          v.returnStatement(
            [7, 3, 7, 36],
            v.binaryExpression(
              [7, 10, 7, 35],
              v.binaryExpression(
                [7, 11, 7, 24],
                v.identifier([7, 11, 7, 16], "count", "count$3kpojr67liy8x$0"),
                "&&",
                v.identifier([7, 20, 7, 24], "flag", "flag$3kpojr67liy8x$1"),
              ),
              "||",
              v.stringLiteral([7, 29, 7, 35], "none"),
            ),
          ),
        ],
      ),
    ),
);
