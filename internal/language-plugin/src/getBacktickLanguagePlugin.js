import { BacktickVirtualCode } from "./BacktickVirtualCode.js";
export function getBacktickLanguagePlugin(ts, getFileName) {
  return {
    getLanguageId() {
      // Keep as-is
    },
    createVirtualCode(uri, languageId, snapshot) {
      switch (languageId) {
        case "javascript":
        case "javascriptreact":
        case "typescript":
        case "typescriptreact": {
          const fileName = getFileName(uri);
          if (fileName.endsWith(".d.ts")) {
            return;
          }
          return new BacktickVirtualCode(ts, fileName, languageId, snapshot);
        }
        default:
          return;
      }
    },
    typescript: {
      extraFileExtensions: [],
      getServiceScript(root) {
        // TypeScript reads the compiled embedded code, not the source root.
        const code = root.embeddedCodes?.[0];
        if (!code) {
          return;
        }
        switch (root.languageId) {
          case "javascript":
            return {
              code,
              extension: ".js",
              scriptKind: 1,
            };
          case "javascriptreact":
            return {
              code,
              extension: ".jsx",
              scriptKind: 2,
            };
          case "typescript":
            return {
              code,
              extension: ".ts",
              scriptKind: 3,
            };
          case "typescriptreact":
            return {
              code,
              extension: ".tsx",
              scriptKind: 4,
            };
          default:
            return;
        }
      },
    },
  };
}
//# sourceMappingURL=getBacktickLanguagePlugin.js.map
