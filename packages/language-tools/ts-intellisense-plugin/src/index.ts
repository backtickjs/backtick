import { createAsyncLanguageServicePlugin } from "@volar/typescript/lib/quickstart/createAsyncLanguageServicePlugin.js";
import type ts from "typescript";
import { decorateLanguageService } from "./decorateLanguageService.js";

const plugin: ts.server.PluginModuleFactory = (mod) => {
  const init = createAsyncLanguageServicePlugin(
    // No extra file extensions: backtick virtualizes standard .ts/.tsx/.js/.jsx
    // in place, so Volar's `resolveFileLanguageId` already supplies the
    // languageId.
    [],
    // ts.ScriptKind.Deferred — let the language plugin own the script kind.
    7,
    async (ts) => {
      const { getBacktickLanguagePlugin } = await import(
        "@backtick/volar-plugins"
      );
      return {
        languagePlugins: [
          getBacktickLanguagePlugin<string>(ts, (fileName) => fileName),
        ],
      };
    },
  );

  const pluginModule = init(mod);
  return {
    ...pluginModule,
    create(info) {
      return decorateLanguageService(pluginModule.create(info));
    },
  };
};

export = plugin;
