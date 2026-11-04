import assert from "node:assert/strict";
import { describe, it } from "node:test";
import ts from "typescript";
import { unsupportedReanimatedApi } from "../../src/function/diagnostics/unsupported-reanimated-api.ts";

// What the check refuses in `code`, as save_app parses it.
function refusals(file: string, code: string): string[] {
  return unsupportedReanimatedApi(
    ts,
    ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true),
  );
}

describe("unsupported-reanimated-api", () => {
  it("refuse Reanimated's worklet APIs where they're named, and accept the rest", async () => {
    const errors = refusals(
      "App.tsx",
      [
        "import Animated, { FadeIn, useSharedValue, withSpring, useAnimatedStyle, useDerivedValue as derived } from " +
          '"react-native-reanimated" with { backtick: "client" };',
        'import { runOnUI } from "react-native-worklets" with { backtick: "client" };',
      ].join("\n"),
    );
    assert.equal(errors.length, 3);
    assert.match(
      errors[0]!,
      /^App\.tsx\(1,56\): error: `useAnimatedStyle` needs a worklet, which an app's scripts can't have yet\. Animate with Reanimated's CSS animations/,
    );
    assert.match(
      errors[1]!,
      /^App\.tsx\(1,74\): error: `useDerivedValue` needs a worklet/,
    );
    assert.match(
      errors[2]!,
      /^App\.tsx\(2,10\): error: `runOnUI` needs a worklet/,
    );
  });

  it("refuse a namespace import of Reanimated, which would reach its worklet APIs", async () => {
    const errors = refusals(
      "App.tsx",
      'import * as Reanimated from "react-native-reanimated" with { backtick: "client" };',
    );
    assert.equal(errors.length, 1);
    assert.match(
      errors[0]!,
      /^App\.tsx\(1,8\): error: Import the names you use from "react-native-reanimated": useAnimatedStyle, /,
    );
  });
});
