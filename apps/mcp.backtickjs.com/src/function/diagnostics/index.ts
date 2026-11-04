// What save_app refuses before the sandbox checks the rest, each rule in a
// file of its own named after it, from one parse of the app's file.
import type ts from "typescript";
import { unavailableModule } from "./unavailable-module.ts";
import { unsupportedReanimatedApi } from "./unsupported-reanimated-api.ts";

const rules = [unavailableModule, unsupportedReanimatedApi];

// Every rule's errors for `source`, as tsc prints them.
export function diagnose(
  ts: typeof import("typescript"),
  source: ts.SourceFile,
): string[] {
  return rules.flatMap((rule) => rule(ts, source));
}
