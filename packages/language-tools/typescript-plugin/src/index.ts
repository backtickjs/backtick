import { decorateLanguageService } from "@backtick/language-service";
import type { Language } from "@volar/language-core";
import { createAsyncLanguageServicePlugin } from "@volar/typescript/lib/quickstart/createAsyncLanguageServicePlugin.js";
import type ts from "typescript";

const plugin: ts.server.PluginModuleFactory = (mod) => {
  // Captured during async init so the decorated language service can reach the
  // root virtual code (for Backtick's own diagnostics). Each project gets its
  // own holder.
  const languageHolder: { current?: Language<string> } = {};

  const init = createAsyncLanguageServicePlugin(
    // No extra file extensions: backtick virtualizes standard .ts/.tsx/.js/.jsx
    // in place, so Volar's `resolveFileLanguageId` already supplies the
    // languageId.
    [],
    // ts.ScriptKind.Deferred — let the language plugin own the script kind.
    7,
    async (ts) => {
      const { getBacktickLanguagePlugin } = await import(
        "@backtick/language-plugin"
      );
      return {
        languagePlugins: [
          getBacktickLanguagePlugin<string>(ts, (fileName) => fileName),
        ],
        setup: (language) => {
          languageHolder.current = language;
        },
      };
    },
  );

  const pluginModule = init(mod);
  return {
    ...pluginModule,
    create(info) {
      return decorateLanguageService(pluginModule.create(info), languageHolder);
    },
  };
};

export = plugin;
