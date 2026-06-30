import type * as ts from "typescript";
import { unmangle } from "./unmangle.js";

// Shared helpers for the structured `SymbolDisplayPart`/`JSDocTagInfo` arrays
// that quick info and completion details are built from.
export function unmangleParts(
  parts: ts.SymbolDisplayPart[] | undefined,
): ts.SymbolDisplayPart[] | undefined {
  return parts?.map((part) => ({ ...part, text: unmangle(part.text) }));
}

export function unmangleTags(
  tags: ts.JSDocTagInfo[] | undefined,
): ts.JSDocTagInfo[] | undefined {
  return tags?.map((tag) => ({ ...tag, text: unmangleParts(tag.text) }));
}
