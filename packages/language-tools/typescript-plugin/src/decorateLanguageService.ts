import type * as ts from "typescript";
import unmangleCompletionEntryDetails from "./unmangleCompletionEntryDetails.js";
import unmangleDiagnostic from "./unmangleDiagnostic.js";
import unmangleQuickInfo from "./unmangleQuickInfo.js";

type DiagnosticGetter = (fileName: string) => ts.Diagnostic[];

const DIAGNOSTIC_METHODS = new Set<PropertyKey>([
  "getSemanticDiagnostics",
  "getSyntacticDiagnostics",
  "getSuggestionDiagnostics",
]);

// Wrap the `ts.LanguageService` that Volar hands back so the `$0client_` prefix
// the backtick compiler adds to virtual identifiers never leaks into editor UI.
//
// Only the user-facing *reads* are patched. We deliberately do NOT unmangle the
// `name` of completion-list entries: tsserver round-trips that exact string back
// through `getCompletionEntryDetails`, so rewriting it there would break the
// detail lookup. (Mangled names only appear strictly inside `cs` code, which is
// not yet reachable through the source mapping, so this is latent correctness.)
export function decorateWithUnmangle(
  languageService: ts.LanguageService,
): ts.LanguageService {
  return new Proxy(languageService, {
    get(target, key, receiver) {
      if (key === "getQuickInfoAtPosition") {
        const original = target.getQuickInfoAtPosition.bind(target);
        return (
          ...args: Parameters<ts.LanguageService["getQuickInfoAtPosition"]>
        ) => {
          const info = original(...args);
          return info && unmangleQuickInfo(info);
        };
      }
      if (key === "getCompletionEntryDetails") {
        const original = target.getCompletionEntryDetails.bind(target);
        return (
          ...args: Parameters<ts.LanguageService["getCompletionEntryDetails"]>
        ) => {
          const details = original(...args);
          return details && unmangleCompletionEntryDetails(details);
        };
      }
      if (DIAGNOSTIC_METHODS.has(key)) {
        const original = (
          target[key as keyof ts.LanguageService] as unknown as DiagnosticGetter
        ).bind(target);
        return (fileName: string) => original(fileName).map(unmangleDiagnostic);
      }
      return Reflect.get(target, key, receiver);
    },
  });
}
