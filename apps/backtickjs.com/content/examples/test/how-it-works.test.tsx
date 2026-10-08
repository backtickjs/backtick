import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { write } from "../how-it-works/server/sourcemap.js";
import { Home } from "../thinking/server/Home.js";
import { assertBundle } from "./drawScreen.js";

// What the page shows the phone receiving is what the server sends: written
// with `UPDATE=1`, checked otherwise.
it("bundled: the bundle shown is the bundle built", async () => {
  await assertBundle(
    new URL("../thinking/server/Home.bundle.js", import.meta.url),
    <Home user={{ id: "u-7", name: "Sam" }} />,
  );
});

it("bundled: a hidden map is answered alone", async () => {
  const bundle = await bundler.build({
    input: <Home user={{ id: "u-7", name: "Sam" }} />,
    packageVersions: { react: "19.2.3", "react-native": "0.86.3" },
  });
  const maps = new Map<string, string>();
  const code = write(bundle, maps, "home");
  assert.doesNotMatch(code, /sourceMappingURL/);
  assert.equal(JSON.parse(maps.get("home")!).version, 3);
});
