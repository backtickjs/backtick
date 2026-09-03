import type { Value } from "./Value.js";

// What a bundle's root evaluates to. Answers `null` until there is a reader.
export function evaluate(bundle: string): Value {
  const parsed: unknown = JSON.parse(bundle);
  if (parsed === null || typeof parsed !== "object" || !("root" in parsed)) {
    throw new Error("a bundle has a root");
  }
  return null;
}
