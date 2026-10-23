import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { unprovidedImports } from "../src/function/phoneModules.ts";

describe("the phone's modules", () => {
  it("refuse a client import the phone doesn't provide, where it is", async () => {
    const errors = await unprovidedImports(
      "App.tsx",
      [
        'import { cs } from "@backtickjs/core";',
        'import { z } from "zod";',
        'import Animated from "react-native-reanimated" with { backtick: "client" };',
      ].join("\n"),
    );
    assert.equal(errors.length, 1);
    assert.match(
      errors[0]!,
      /^App\.tsx\(3,22\): error: The phone doesn't provide "react-native-reanimated"\./,
    );
  });

  it("accept the client imports it does provide, subpaths included", async () => {
    const errors = await unprovidedImports(
      "App.tsx",
      [
        'import { View } from "react-native" with { backtick: "client" };',
        'import AsyncStorage from "@react-native-async-storage/async-storage" with { backtick: "client" };',
        'import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable" with { backtick: "client" };',
      ].join("\n"),
    );
    assert.deepEqual(errors, []);
  });
});
