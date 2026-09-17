import { cs } from "@backtickjs/core";
// A computed key is a string: JavaScript would convert a number, and a client
// that isn't JavaScript has no such conversion to agree on.
// @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'string'.
export default cs.create(
  [6, 16, 6, 53],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/computed-key-type.test.tsx",
    fileHash: "zs52vif1gagd",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [6, 19, 6, 52],
    parameters: [
      {
        kind: "param",
        loc: [6, 20, 6, 30],
        name: {
          kind: "id",
          loc: [6, 20, 6, 22],
          text: "at",
          bindingKey: "at$zs52vif1gagd$0",
        },
      },
    ],
    body: {
      kind: "obj",
      loc: [6, 36, 6, 51],
      properties: [
        {
          kind: ":",
          loc: [6, 38, 6, 49],
          name: {
            kind: "id",
            loc: [6, 39, 6, 41],
            text: "at",
            bindingKey: "at$zs52vif1gagd$0",
          },
          initializer: {
            kind: "string",
            loc: [6, 44, 6, 49],
            text: "one",
          },
        },
      ],
    },
  }),
);
