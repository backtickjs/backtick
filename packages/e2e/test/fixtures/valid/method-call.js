import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    version: "0.0.0",
    filePath: "method-call.ts",
    fileHash: "190iczdl07b3h",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [3, 19, 6, 2],
      [
        v.variableDeclaration(
          [4, 3, 4, 28],
          v.identifier([4, 9, 4, 17], "greeting", "greeting$190iczdl07b3h$0"),
          v.stringLiteral([4, 20, 4, 27], "Hello"),
          "const",
        ),
        v.returnStatement(
          [5, 3, 5, 55],
          v.callExpression(
            [5, 10, 5, 54],
            v.propertyAccessExpression(
              [5, 10, 5, 52],
              v.callExpression(
                [5, 10, 5, 40],
                v.propertyAccessExpression(
                  [5, 10, 5, 25],
                  v.identifier(
                    [5, 10, 5, 18],
                    "greeting",
                    "greeting$190iczdl07b3h$0",
                  ),
                  false,
                  "concat",
                ),
                false,
                [
                  v.stringLiteral([5, 26, 5, 30], ", "),
                  v.stringLiteral([5, 32, 5, 39], "World"),
                ],
              ),
              false,
              "toUpperCase",
            ),
            false,
            [],
          ),
        ),
      ],
    ),
);
