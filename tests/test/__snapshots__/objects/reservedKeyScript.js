import { cs } from "@backtickjs/core";
// `#` stays reserved inside a script body: an object literal serializes as
// the plain object it spells, so it can't carry the discriminant key.
const reservedKeyScript = cs.create(
  [5, 27, 5, 49],
  {
    version: "0.0.0",
    filePath: "reservedKeyScript.tsx",
    fileHash: "2k6tdc9009kdb",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [5, 31, 5, 47],
    properties: [
      {
        kind: ":",
        loc: [5, 33, 5, 45],
        name: "#",
        initializer: {
          kind: "string",
          loc: [5, 38, 5, 45],
          text: "value",
        },
      },
    ],
  }),
);
