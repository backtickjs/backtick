import assert from "node:assert/strict";
import { it } from "node:test";
import { app } from "./app.js";
import { webModules } from "./test/drawScreen.js";

const landing = (modules: Record<string, string>) =>
  app.request("/", {
    headers: { "x-backtick-modules": JSON.stringify(modules) },
  });

it("draws the screen for an app that can run it", async () => {
  assert.equal((await landing(webModules)).status, 200);
});

it("answers 426 to an app that can't run its screens, which asks to update", async () => {
  // a React Native older than the one the screens are typed against
  const old = await landing({ ...webModules, "react-native": "0.70.0" });
  assert.equal(old.status, 426);
  // one without a module the screens import
  const { "expo-font": _, ...lacking } = webModules;
  assert.equal((await landing(lacking)).status, 426);
});
