import { unmangle, unmangleDisplayPart } from "@backtick/language-plugin";
import type * as ts from "typescript";

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
