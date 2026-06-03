import {
  createConnection,
  createServer,
  createSimpleProject,
} from "@volar/language-server/node";

const connection = createConnection();
const server = createServer(connection);

connection.listen();

connection.onInitialize((params) => {
  // No language plugins or service plugins wired up yet — this is the
  // minimal Volar server that the Backtick extension connects to.
  return server.initialize(params, createSimpleProject([]), []);
});

connection.onInitialized(() => {
  server.initialized();
});

connection.onShutdown(() => {
  server.shutdown();
});
