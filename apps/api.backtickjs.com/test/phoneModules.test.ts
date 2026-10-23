import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  phoneModules,
  unprovidedImports,
} from "../src/function/phoneModules.ts";

describe("the phone's modules", () => {
  it("are the shell's module map, in its order", () => {
    const moduleMap = readFileSync(
      join(import.meta.dirname, "../../shell/client/moduleMap.ts"),
      "utf8",
    );
    const mapped = [...moduleMap.matchAll(/require\("([^"]+)"\)/g)].map(
      ([, specifier]) => specifier,
    );
    assert.deepEqual(phoneModules, mapped);
  });

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
