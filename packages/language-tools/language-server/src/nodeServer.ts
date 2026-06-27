import {
  createConnection,
  createServer,
  createTypeScriptProject,
  loadTsdkByPath,
} from "@volar/language-server/node";
import { create as createTypeScriptServices } from "volar-service-typescript";
import getBacktickDiagnosticService from "./getBacktickDiagnosticService.js";
import getBacktickLanguagePlugin from "./getBacktickLanguagePlugin.js";
import getBacktickPrettierService from "./getBacktickPrettierService.js";

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
      languagePlugins: [getBacktickLanguagePlugin(tsdk.typescript)],
    })),
    [
      // Prettier and TypeScript both want to format files, but Volar only
      // lets one win: it uses whichever service is listed first here
      getBacktickPrettierService(connection),
      getBacktickDiagnosticService(),
      ...createTypeScriptServices(tsdk.typescript),
    ],
  );
});

connection.onInitialized(() => {
  server.initialized();
});

connection.onShutdown(() => {
  server.shutdown();
});
