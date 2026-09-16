import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `#` stays reserved inside a script body: an object literal serializes as
// the plain object it spells, so it can't carry the discriminant key.
it("reservedKeyScript", async (t) => {
  await snapshotCase(
    t,
    "reservedKeyScript",
    cs.create(
      [8, 46, 8, 68],
      {
        version: "0.0.0",
        filePath: "objects/reserved-key-script.test.tsx",
        fileHash: "28g09xvp2p10c",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [8, 50, 8, 66],
        properties: [
          {
            kind: ":",
            loc: [8, 52, 8, 64],
            name: "#",
            initializer: {
              kind: "string",
              loc: [8, 57, 8, 64],
              text: "value",
            },
          },
        ],
      }),
    ),
  );
});
