import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { render, screen } from "@testing-library/react";
import { Home } from "../reference-bundler/server/Home.js";
import { write } from "../reference-bundler/server/sourcemap.js";
import { total } from "../reference-core/server/formatted.js";
import { type MenuOnPhone, names } from "../reference-core/server/menu.js";
import { double, greeting, meal } from "../reference-core/server/shapes.js";
import { drawScreen } from "./drawScreen.js";

it("core: each shape is what it computes", async () => {
  assert.match(
    String(await drawScreen(greeting)),
    /^Good (morning|afternoon)$/,
  );
  assert.match(String(await drawScreen(meal)), /^(Breakfast|Lunch)$/);
  const doubled = (await drawScreen(double)) as unknown as (
    n: number,
  ) => number;
  assert.equal(doubled(21), 42);
});

it("core: a script built from another", async () => {
  assert.equal(await drawScreen(total), "$8.50");
});

it("core: a script in data arrives as what it computes", async () => {
  const onPhone: MenuOnPhone = [{ name: "Tea", price: 2, available: true }];
  assert.equal(onPhone[0]!.available, true);
  assert.ok(
    ((await drawScreen(names)) as unknown as string[]).includes("Flat white"),
  );
});

it("bundler: the screen it builds draws", async () => {
  render(await drawScreen(<Home />));
  assert.ok(screen.getByText("Hello"));
});

it("bundler: a hidden map is answered alone", async () => {
  const bundle = await bundler.build({
    input: <Home />,
    packageVersions: { react: "19.2.3", "react-native": "0.86.3" },
  });
  const maps = new Map<string, string>();
  const code = write(bundle, maps, "home");
  assert.doesNotMatch(code, /sourceMappingURL/);
  assert.equal(JSON.parse(maps.get("home")!).version, 3);
});
