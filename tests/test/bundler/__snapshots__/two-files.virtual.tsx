import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { Badge } from "./parts/badge.tsx";
import { snapshotCase } from "../snapshotCase.ts";

// Scripts written in two host files, in one bundle: its map leads into each
// file by its own path.
it("twoFiles", async (t) => {
  await snapshotCase(
    t,
    "twoFiles",
    cs.lift((() => <p>
      {"in "}
      {cs.splice((<Badge />))}
    </p>)()),
  );
});
