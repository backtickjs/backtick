import {
  MessageType,
  ShowMessageNotification,
  type Connection,
  type LanguageServicePlugin,
} from "@volar/language-server";
import { create as createPrettierService } from "volar-service-prettier";
import { URI } from "vscode-uri";
import { getPrettierPluginPath, importPrettier } from "./importPackage";

export default function getBacktickPrettierService(
  connection: Connection,
): LanguageServicePlugin {
  let prettier: ReturnType<typeof importPrettier>;
  let prettierPluginPath: ReturnType<typeof getPrettierPluginPath>;
  let hasShownNotification = false;

  return createPrettierService(
    (context) => {
      for (const workspaceFolder of context.env.workspaceFolders) {
        if (workspaceFolder.scheme === "file") {
          prettier = importPrettier(workspaceFolder.fsPath);
          prettierPluginPath = getPrettierPluginPath(workspaceFolder.fsPath);
          if ((!prettier || !prettierPluginPath) && !hasShownNotification) {
            connection.sendNotification(ShowMessageNotification.type, {
              message:
                "Couldn't load `prettier` or `@backtick/prettier-plugin`. Formatting will not work. Please make sure those two packages are installed into your project and restart the language server.",
              type: MessageType.Warning,
            });
            hasShownNotification = true;
          }
          return prettier;
        }
      }
    },
    {
      documentSelector: [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
      ],
      async getFormattingOptions(prettier, document, formatOptions, context) {
        const uri = URI.parse(document.uri);
        const documentURI = context.decodeEmbeddedDocumentUri(uri)?.[0] ?? uri;
        const filePath = documentURI.fsPath;

        if (!filePath) {
          return {};
        }

        let configOptions = null;
        try {
          configOptions = await prettier.resolveConfig(filePath, {
            useCache: false,
            editorconfig: true,
          });
        } catch (e) {
          connection.sendNotification(ShowMessageNotification.type, {
            message: `Failed to load Backtick config.\n\nError:\n${e}`,
            type: MessageType.Warning,
          });
          console.error("Failed to load Prettier config.", e);
        }

        const editorOptions = await context.env.getConfiguration?.<object>(
          "prettier",
          document.uri,
        );

        // Return a config with the following cascade:
        // - Prettier config file should always win if it exists, if it doesn't:
        // - Prettier config from the VS Code extension is used, if it doesn't exist:
        // - Use the editor's basic configuration settings
        const resolvedConfig = {
          filepath: filePath,
          tabWidth: formatOptions.tabSize,
          useTabs: !formatOptions.insertSpaces,
          ...editorOptions,
          ...configOptions,
        };

        const parser =
          document.languageId === "javascript" ||
          document.languageId === "javascriptreact"
            ? "babel"
            : "typescript";

        return {
          ...resolvedConfig,
          plugins: [
            ...(await getBacktickPrettierPlugin()),
            ...(resolvedConfig.plugins ?? []),
          ],
          parser,
        };

        async function getBacktickPrettierPlugin() {
          if (!prettier || !prettierPluginPath) {
            return [];
          }

          const isPluginAlreadyLoaded = resolvedConfig.plugins?.includes(
            "@backtick/prettier-plugin",
          );

          return isPluginAlreadyLoaded ? [] : [prettierPluginPath];
        }
      },
    },
  );
}
