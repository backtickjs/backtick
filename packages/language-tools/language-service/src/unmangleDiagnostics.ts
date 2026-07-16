import { unmangle } from "@backtickjs/compiler";
import type ts from "typescript";

export function unmangleDiagnostic<T extends ts.Diagnostic>(diagnostic: T): T {
  return {
    ...diagnostic,
    messageText: unmangleMessageText(diagnostic.messageText),
    relatedInformation: diagnostic.relatedInformation?.map((info) => ({
      ...info,
      messageText: unmangleMessageText(info.messageText),
    })),
  };
}

function unmangleMessageText(
  messageText: string | ts.DiagnosticMessageChain,
): string | ts.DiagnosticMessageChain {
  if (typeof messageText === "string") {
    return unmangle(messageText);
  }
  return {
    ...messageText,
    messageText: unmangle(messageText.messageText),
    next: messageText.next?.map(
      (chain) => unmangleMessageText(chain) as ts.DiagnosticMessageChain,
    ),
  };
}
