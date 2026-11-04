// unsupported-reanimated-api: what the phone provides but an app's scripts
// can't use yet, Reanimated's APIs whose callback is always a worklet, as the
// worklets plugin finds them (react-native-worklets 0.13.0, `plugin/index.js`,
// its tables of functions whose arguments it workletizes). The plugin finds a
// worklet by its callee's name, and a script reads each splice through a
// thunk, so the callback stays a plain function, and the phone throws when the
// UI thread calls it.
import type ts from "typescript";
import { errorAt, importsOf, isClientImport } from "./imports.ts";

const modules = ["react-native-reanimated", "react-native-worklets"];

const workletApis = [
  "useAnimatedStyle",
  "useAnimatedProps",
  "useDerivedValue",
  "useAnimatedReaction",
  "useAnimatedScrollHandler",
  "useAnimatedGestureHandler",
  "useFrameCallback",
  "createAnimatedPropAdapter",
  "runOnUI",
  "runOnUIAsync",
  "runOnUISync",
  "executeOnUIRuntimeSync",
  "runOnRuntime",
  "runOnRuntimeAsync",
  "runOnRuntimeSync",
  "runOnRuntimeSyncWithId",
  "scheduleOnUI",
  "scheduleOnRuntime",
  "scheduleOnRuntimeWithId",
];

const instead =
  "Animate with Reanimated's CSS animations and transitions (`transitionProperty`, `animationName` in an `Animated.View`'s style), its layout animations (`entering`, `exiting`, `layout`), or a shared value set from JavaScript and passed in a style.";

// Each worklet API a client import of Reanimated or Worklets names, as an
// error where it's named, and a namespace import of either, which would reach
// them by name.
export function unsupportedReanimatedApi(
  ts: typeof import("typescript"),
  source: ts.SourceFile,
): string[] {
  return importsOf(ts, source).flatMap((statement) => {
    const bindings = statement.importClause?.namedBindings;
    if (
      !modules.includes(statement.moduleSpecifier.text) ||
      !isClientImport(ts, statement) ||
      bindings === undefined
    ) {
      return [];
    }
    if (ts.isNamespaceImport(bindings)) {
      return [
        `${errorAt(source, bindings)} Import the names you use from "${statement.moduleSpecifier.text}": ${workletApis.join(", ")} need a worklet, which an app's scripts can't have yet. ${instead}`,
      ];
    }
    return bindings.elements.flatMap((element) => {
      const name = (element.propertyName ?? element.name).text;
      return element.isTypeOnly || !workletApis.includes(name)
        ? []
        : [
            `${errorAt(source, element)} \`${name}\` needs a worklet, which an app's scripts can't have yet. ${instead}`,
          ];
    });
  });
}
