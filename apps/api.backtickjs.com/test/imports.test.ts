import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { unavailableImports } from "../src/function/imports.ts";

describe("an app's imports", () => {
  it("refuse a client import the phone doesn't provide, where it is", async () => {
    const errors = await unavailableImports(
      "App.tsx",
      [
        'import { cs } from "@backtickjs/core";',
        'import Animated from "react-native-reanimated" with { backtick: "client" };',
      ].join("\n"),
    );
    assert.equal(errors.length, 1);
    assert.match(
      errors[0]!,
      /^App\.tsx\(2,22\): error: The phone doesn't provide "react-native-reanimated"\./,
    );
  });

  it("refuse a server import the server doesn't have, the phone's packages included", async () => {
    const errors = await unavailableImports(
      "App.tsx",
      [
        'import { z } from "zod";',
        'import { Platform } from "react-native";',
      ].join("\n"),
    );
    assert.equal(errors.length, 2);
    assert.match(
      errors[1]!,
      /^App\.tsx\(2,26\): error: The server doesn't have "react-native"/,
    );
  });

  it("accept what each side has, subpaths and type-only imports included", async () => {
    const errors = await unavailableImports(
      "App.tsx",
      [
        'import { Hono } from "hono";',
        'import { backtick } from "@backtickjs/hono";',
        'import type { Mesh } from "three";',
        'import { View } from "react-native" with { backtick: "client" };',
        'import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable" with { backtick: "client" };',
      ].join("\n"),
    );
    assert.deepEqual(errors, []);
  });
});
