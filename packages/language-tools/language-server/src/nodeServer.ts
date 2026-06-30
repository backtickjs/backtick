import { getBacktickLanguagePlugin } from "@backtick/language-plugin";
import {
  createConnection,
  createServer,
  createTypeScriptProject,
  loadTsdkByPath,
} from "@volar/language-server/node";
import { create as createTypeScriptServices } from "volar-service-typescript";
import type { URI } from "vscode-uri";
import getBacktickDiagnosticService from "./getBacktickDiagnosticService.js";
import unmanglePluginResponses from "./unmanglePluginResponses.js";

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
    [
      getBacktickDiagnosticService(),
      ...unmanglePluginResponses(createTypeScriptServices(tsdk.typescript)),
    ],
  );
});

connection.onInitialized(() => {
  server.initialized();
});

connection.onShutdown(() => {
  server.shutdown();
});
