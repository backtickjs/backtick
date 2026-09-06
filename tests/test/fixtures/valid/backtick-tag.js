import { cs } from "@backtickjs/core";
// The tag written directly, without the component.
const held = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "from another bundle"]] },
  root: ["()", ["fn", "0"], []],
});
export default cs.create(
  [9, 16, 9, 47],
  {
    version: "0.0.0",
    filePath: "backtick-tag.tsx",
    fileHash: "1e5ujha1ju7fu",
    splices: { $held: { value: held, params: [] } },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [9, 19, 9, 46],
    type: {
      kind: "string",
      loc: [9, 20, 9, 28],
      text: "backtick",
    },
    attributes: [
      {
        name: "bundle",
        initializer: {
          kind: "splice",
          loc: [9, 37, 9, 42],
          key: "$held",
        },
      },
    ],
    children: [],
  }),
);
