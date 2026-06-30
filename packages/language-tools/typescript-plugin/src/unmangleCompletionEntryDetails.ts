import type * as ts from "typescript";
import { unmangleParts, unmangleTags } from "./displayParts.js";
import { unmangle } from "./unmangle.js";

// The detail popup shown when a completion entry is highlighted. Every
// user-facing field can carry a mangled name.
export default function unmangleCompletionEntryDetails(
  details: ts.CompletionEntryDetails,
): ts.CompletionEntryDetails {
  return {
    ...details,
    name: unmangle(details.name),
    displayParts: unmangleParts(details.displayParts) ?? details.displayParts,
    documentation: unmangleParts(details.documentation),
    tags: unmangleTags(details.tags),
    source: unmangleParts(details.source),
    sourceDisplay: unmangleParts(details.sourceDisplay),
  };
}
