import type * as ts from "typescript";

// Restore the identifier the user actually wrote by removing the virtualization
// prefix from text the language service produced in terms of the virtual code.
export function unmangle(text: string): string {
  return text.replace(/\$0client_/g, "");
}

// Unmangle the text of a symbol display part, the unit both quick-info hovers and
// completion details are built from.
export function unmangleDisplayPart(
  part: ts.SymbolDisplayPart,
): ts.SymbolDisplayPart {
  return { ...part, text: unmangle(part.text) };
}
