import type { LanguageServicePlugin } from "@volar/language-server";
import { URI } from "vscode-uri";
import { BacktickVirtualCode } from "./getBacktickLanguagePlugin.js";

// Surfaces Backtick's own compiler diagnostics (e.g. unsupported syntax inside
// a `cs` client script) to the editor. TypeScript diagnostics already flow
// through the compiled embedded code; this service handles the errors Backtick
// itself produces, which TypeScript knows nothing about.
//
// The diagnostics are stored on the root virtual code in source coordinates, so
// they're reported against the root document (whose text mirrors the source
// 1:1). Volar maps them back to the user's file through the root's identity
// mapping, which has `verification` enabled.
export default function getBacktickDiagnosticService(): LanguageServicePlugin {
  return {
    name: "backtick-diagnostics",
    capabilities: {
      diagnosticProvider: {
        interFileDependencies: false,
        workspaceDiagnostics: false,
      },
    },
    create(context) {
      return {
        provideDiagnostics(document) {
          const decoded = context.decodeEmbeddedDocumentUri(
            URI.parse(document.uri),
          );
          if (!decoded) {
            return [];
          }

          const [sourceUri, embeddedId] = decoded;
          const sourceScript = context.language.scripts.get(sourceUri);
          const root = sourceScript?.generated?.root;
          if (!(root instanceof BacktickVirtualCode)) {
            return [];
          }

          // Only report on the root document. The compiled embedded code also
          // has verification enabled, but these offsets are in source space and
          // would map incorrectly through the compiled mappings.
          if (embeddedId !== root.id) {
            return [];
          }

          return root.diagnostics.map((diagnostic) => ({
            range: {
              start: document.positionAt(diagnostic.range.start),
              end: document.positionAt(diagnostic.range.end),
            },
            message: diagnostic.message,
            severity: diagnostic.severity,
            source: "backtick",
          }));
        },
      };
    },
  };
}
