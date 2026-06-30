import type * as ts from "typescript";
import { CLIENT_PREFIX, unmangle } from "./mangle.js";

export function decorateLanguageService(
  inner: ts.LanguageService,
): ts.LanguageService {
  const overrides: Partial<ts.LanguageService> = {
    getSemanticDiagnostics: (fileName) =>
      inner.getSemanticDiagnostics(fileName).map(unmangleDiagnostic),

    getSyntacticDiagnostics: (fileName) =>
      inner.getSyntacticDiagnostics(fileName).map(unmangleDiagnostic),

    getSuggestionDiagnostics: (fileName) =>
      inner.getSuggestionDiagnostics(fileName).map(unmangleDiagnostic),

    getCompletionsAtPosition: (
      fileName,
      position,
      options,
      formattingSettings,
    ) => {
      const completions = inner.getCompletionsAtPosition(
        fileName,
        position,
        options,
        formattingSettings,
      );
      if (!completions) {
        return completions;
      }
      return {
        ...completions,
        entries: completions.entries.map((entry) =>
          entry.name.includes(CLIENT_PREFIX)
            ? {
                ...entry,
                name: unmangle(entry.name),
                insertText: unmangle(entry.insertText ?? entry.name),
              }
            : entry,
        ),
      };
    },

    getCompletionEntryDetails: (
      fileName,
      position,
      entryName,
      formatOptions,
      source,
      preferences,
      data,
    ) => {
      // The editor hands back the unmangled `name` we returned above, but the
      // virtual code is keyed by the mangled name; look that up, falling back to
      // the name as given for genuine (never-mangled) host-scope symbols.
      const details =
        inner.getCompletionEntryDetails(
          fileName,
          position,
          CLIENT_PREFIX + entryName,
          formatOptions,
          source,
          preferences,
          data,
        ) ??
        inner.getCompletionEntryDetails(
          fileName,
          position,
          entryName,
          formatOptions,
          source,
          preferences,
          data,
        );
      if (!details) {
        return details;
      }
      return {
        ...details,
        name: unmangle(details.name),
        displayParts: details.displayParts.map(unmangleDisplayPart),
        documentation: details.documentation?.map(unmangleDisplayPart),
      };
    },
  };

  return new Proxy(inner, {
    get(target, property, receiver) {
      return Object.hasOwn(overrides, property)
        ? overrides[property as keyof ts.LanguageService]
        : Reflect.get(target, property, receiver);
    },
  });
}

function unmangleDiagnostic<T extends ts.Diagnostic>(diagnostic: T): T {
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

function unmangleDisplayPart(part: ts.SymbolDisplayPart): ts.SymbolDisplayPart {
  return { ...part, text: unmangle(part.text) };
}
