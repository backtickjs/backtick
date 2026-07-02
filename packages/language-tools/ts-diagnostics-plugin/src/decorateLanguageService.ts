import type { Language } from "@volar/language-core";
import type * as ts from "typescript";
import { getBacktickDiagnostics } from "./getBacktickDiagnostics.js";
import { unmangleDiagnostic } from "./unmangleDiagnostics.js";

export function decorateLanguageService(
  ts: typeof import("typescript"),
  inner: ts.LanguageService,
  languageHolder: { current?: Language<string> },
): ts.LanguageService {
  const overrides: Partial<ts.LanguageService> = {
    getSemanticDiagnostics: (fileName) => [
      ...inner.getSemanticDiagnostics(fileName).map(unmangleDiagnostic),
      ...getBacktickDiagnostics(
        ts,
        languageHolder.current,
        inner.getProgram()?.getSourceFile(fileName),
        fileName,
      ),
    ],

    getSyntacticDiagnostics: (fileName) =>
      inner.getSyntacticDiagnostics(fileName).map(unmangleDiagnostic),

    getSuggestionDiagnostics: (fileName) =>
      inner.getSuggestionDiagnostics(fileName).map(unmangleDiagnostic),
  };

  return new Proxy(inner, {
    get(target, property, receiver) {
      return Object.hasOwn(overrides, property)
        ? overrides[property as keyof ts.LanguageService]
        : Reflect.get(target, property, receiver);
    },
  });
}
