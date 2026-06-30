import { getBacktickLanguagePlugin } from "@backtick/language-plugin";
import {
  createConnection,
  createServer,
  createTypeScriptProject,
  loadTsdkByPath,
} from "@volar/language-server/node";
import type { URI } from "vscode-uri";
import getBacktickDiagnosticService from "./getBacktickDiagnosticService.js";

const connection = createConnection();
const server = createServer(connection);

connection.listen();

connection.onInitialize((params) => {
  const tsdk = loadTsdkByPath(
    params.initializationOptions.typescript.tsdk,
    params.locale,
  );
  return server.initialize(
    params,
    createTypeScriptProject(tsdk.typescript, tsdk.diagnosticMessages, () => ({
      languagePlugins: [
        getBacktickLanguagePlugin<URI>(tsdk.typescript, (uri) => uri.fsPath),
      ],
    })),
    [getBacktickDiagnosticService()],
  );
});

connection.onInitialized(() => {
  server.initialized();
});

connection.onShutdown(() => {
  server.shutdown();
});
