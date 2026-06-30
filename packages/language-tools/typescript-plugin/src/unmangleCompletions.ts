import type * as ts from "typescript";
import { unmangle } from "./unmangle.js";

export function unmangleCompletionInfo<T extends ts.CompletionInfo>(
  completions: T,
): T {
  return {
    ...completions,
    entries: completions.entries.map((entry) => ({
      ...entry,
      name: unmangle(entry.name),
      insertText: entry.insertText && unmangle(entry.insertText),
    })),
  };
}

export function unmangleCompletionEntryDetails(
  details: ts.CompletionEntryDetails,
): ts.CompletionEntryDetails {
  return {
    ...details,
    name: unmangle(details.name),
    displayParts: details.displayParts.map(unmangleDisplayPart),
    documentation: details.documentation?.map(unmangleDisplayPart),
  };
}

function unmangleDisplayPart(part: ts.SymbolDisplayPart): ts.SymbolDisplayPart {
  return { ...part, text: unmangle(part.text) };
}
