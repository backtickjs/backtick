// Replaces the welcome screen with a blank one, so you start fresh.
import { rmSync, writeFileSync } from "node:fs";

writeFileSync(
  "server/Home.tsx",
  `import { cs } from "@backtickjs/core";
import { Text, View } from "@backtickjs/react-native";

export async function Home() {
  return cs\`(
    <$View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <$Text>Edit server/Home.tsx to edit this screen.</$Text>
    </$View>
  )\`;
}
`,
);
writeFileSync(
  "server/Home.test.tsx",
  `import assert from "node:assert/strict";
import { it } from "node:test";
import { render, screen } from "@testing-library/react";
import { Home } from "./Home.js";
import { drawScreen } from "./test/drawScreen.js";

it("asks to be edited", async () => {
  render(await drawScreen(<Home />));
  assert.ok(screen.getByText("Edit server/Home.tsx to edit this screen."));
});
`,
);
rmSync("server/HelloWave.tsx", { force: true });

console.log(
  "✅ Project reset. server/Home.tsx is now a blank screen, and the welcome example is gone.",
);
