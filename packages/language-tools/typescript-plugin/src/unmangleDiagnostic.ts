import type * as ts from "typescript";
import { unmangle } from "./unmangle.js";

function unmangleChain(
  chain: ts.DiagnosticMessageChain,
): ts.DiagnosticMessageChain {
  return {
    ...chain,
    messageText: unmangle(chain.messageText),
    next: chain.next?.map(unmangleChain),
  };
}

function unmangleMessageText(
  messageText: string | ts.DiagnosticMessageChain,
): string | ts.DiagnosticMessageChain {
  return typeof messageText === "string"
    ? unmangle(messageText)
    : unmangleChain(messageText);
}

function unmangleRelatedInformation(
  info: ts.DiagnosticRelatedInformation,
): ts.DiagnosticRelatedInformation {
  return { ...info, messageText: unmangleMessageText(info.messageText) };
}

// Generic over the diagnostic subtype so callers that hand us
// `DiagnosticWithLocation[]` get the same subtype back.
export default function unmangleDiagnostic<T extends ts.Diagnostic>(
  diagnostic: T,
): T {
  return {
    ...diagnostic,
    messageText: unmangleMessageText(diagnostic.messageText),
    relatedInformation: diagnostic.relatedInformation?.map(
      unmangleRelatedInformation,
    ),
  };
}
