import {
  createConnection,
  createServer,
  createTypeScriptProject,
  loadTsdkByPath,
} from "@volar/language-server/node";
import getBacktickLanguagePlugin from "./getBacktickLanguagePlugin.js";
import getBacktickPrettierService from "./getBacktickPrettierService.js";
import { create as createTypeScriptServices } from "volar-service-typescript";

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
      ...createTypeScriptServices(tsdk.typescript),
      getBacktickPrettierService(connection),
    ],
  );
});

connection.onInitialized(() => {
  server.initialized();
});

connection.onShutdown(() => {
  server.shutdown();
});
