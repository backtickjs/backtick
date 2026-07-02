import type * as ts from "typescript";
import { unmangleDisplayPart } from "./unmangleDisplayPart";

export function unmangleQuickInfo(quickInfo: ts.QuickInfo): ts.QuickInfo {
  return {
    ...quickInfo,
    displayParts: quickInfo.displayParts?.map(unmangleDisplayPart),
    documentation: quickInfo.documentation?.map(unmangleDisplayPart),
  };
}
