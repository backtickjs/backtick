import {
  createConnection,
  createServer,
  createTypeScriptProject,
  loadTsdkByPath,
} from "@volar/language-server/node";
import getLanguagePlugins from "./getLanguagePlugins.js";
import getLanguageServicePlugins from "./getLanguageServicePlugins.js";

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
      languagePlugins: getLanguagePlugins(),
    })),
    getLanguageServicePlugins(tsdk.typescript),
  );
});

connection.onInitialized(() => {
  server.initialized();
});

connection.onShutdown(() => {
  server.shutdown();
});
