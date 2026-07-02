import * as serverProtocol from "@volar/language-server/protocol";
import { activateAutoInsertion, createLabsInfo, getTsdk } from "@volar/vscode";
import {
  type BaseLanguageClient,
  LanguageClient,
  type LanguageClientOptions,
  type ServerOptions,
  TransportKind,
} from "@volar/vscode/node";
import * as vscode from "vscode";

let client: BaseLanguageClient | undefined;

export async function activate(context: vscode.ExtensionContext) {
  const serverModule = vscode.Uri.joinPath(
    context.extensionUri,
    "dist",
    "node",
    "server.js",
  );
  const runOptions = { execArgv: <string[]>[] };
  const debugOptions = { execArgv: ["--nolazy", `--inspect=${6009}`] };
  const serverOptions: ServerOptions = {
    run: {
      module: serverModule.fsPath,
      transport: TransportKind.ipc,
      options: runOptions,
    },
    debug: {
      module: serverModule.fsPath,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };
  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { language: "javascript" },
      { language: "javascriptreact" },
      { language: "typescript" },
      { language: "typescriptreact" },
    ],
    initializationOptions: {
      typescript: {
        tsdk: (await getTsdk(context))?.tsdk,
      },
    },
  };
  client = new LanguageClient(
    "backtick-language-server",
    "Backtick Language Server",
    serverOptions,
    clientOptions,
  );
  await client.start();

  activateAutoInsertion(
    ["javascript", "javascriptreact", "typescript", "typescriptreact"],
    client,
  );

  // support for https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volarjs-labs
  // ref: https://twitter.com/johnsoncodehk/status/1656126976774791168
  const labsInfo = createLabsInfo(serverProtocol);
  labsInfo.addLanguageClient(client);
  return labsInfo.extensionExports;
}

export function deactivate() {
  return client?.stop();
}
