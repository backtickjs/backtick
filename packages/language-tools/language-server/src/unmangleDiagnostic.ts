import type { Diagnostic } from "@volar/language-server";
import { unmangle } from "./unmangle.js";

export default function unmangleDiagnostic(diagnostic: Diagnostic): Diagnostic {
  // Only the human-readable messages can carry mangled names. `code` and the
  // various `uri` fields (codeDescription, relatedInformation locations) are
  // identifiers/paths and are left untouched.
  const next: Diagnostic = {
    ...diagnostic,
    message: unmangle(diagnostic.message),
  };
  if (diagnostic.relatedInformation) {
    next.relatedInformation = diagnostic.relatedInformation.map((info) => ({
      ...info,
      message: unmangle(info.message),
    }));
  }
  return next;
}
