import type * as ts from "typescript";
import { unmangleParts, unmangleTags } from "./displayParts.js";

// Hover ("quick info") for an identifier inside virtualized code.
export default function unmangleQuickInfo(info: ts.QuickInfo): ts.QuickInfo {
  return {
    ...info,
    displayParts: unmangleParts(info.displayParts),
    documentation: unmangleParts(info.documentation),
    tags: unmangleTags(info.tags),
  };
}
