import { unmangleDisplayPart } from "@backtick/language-plugin";
import type * as ts from "typescript";

export function unmangleQuickInfo(quickInfo: ts.QuickInfo): ts.QuickInfo {
  return {
    ...quickInfo,
    displayParts: quickInfo.displayParts?.map(unmangleDisplayPart),
    documentation: quickInfo.documentation?.map(unmangleDisplayPart),
  };
}
