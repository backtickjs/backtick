import { getBacktickLanguagePlugin } from "@backtickjs-internal/language-plugin";
import { decorateLanguageService } from "@backtickjs-internal/language-service";
import { createLanguageServicePlugin } from "@volar/typescript/lib/quickstart/createLanguageServicePlugin.js";
import type ts from "typescript";

const plugin: ts.server.PluginModuleFactory = createLanguageServicePlugin(
  (ts, info) => ({
    languagePlugins: [
      getBacktickLanguagePlugin<string>(ts, (fileName) => fileName),
    ],
    setup: (language) => {
      info.languageService = decorateLanguageService(
        info.languageService,
        language,
      );
    },
  }),
);

export = plugin;
