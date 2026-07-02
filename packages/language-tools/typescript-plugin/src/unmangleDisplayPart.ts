import { unmangle } from "@backtick/language-plugin";
import type ts from "typescript";

export function unmangleDisplayPart(
  part: ts.SymbolDisplayPart,
): ts.SymbolDisplayPart {
  return { ...part, text: unmangle(part.text) };
}
