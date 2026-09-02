import { cs } from "@backtickjs/core";
// `#` stays reserved inside a script body: an object literal serializes as
// the plain object it spells, so it can't carry the discriminant key.
export default cs.create(
  [5, 16, 5, 38],
  {
    version: "0.0.0",
    filePath: "reserved-key-script.ts",
    fileHash: "256dfyntpryac",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 211,
    loc: [5, 20, 5, 36],
    properties: [
      {
        kind: 304,
        loc: [5, 22, 5, 34],
        name: "#",
        initializer: {
          kind: 11,
          loc: [5, 27, 5, 34],
          text: "value",
        },
      },
    ],
  }),
);
