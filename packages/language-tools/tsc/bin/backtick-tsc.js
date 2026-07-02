#!/usr/bin/env node

import { createRequire } from "node:module";
import { getBacktickLanguagePlugin } from "@backtick/language-plugin";

const require = createRequire(import.meta.url);
const {
  getBacktickDiagnostics,
  unmangleDiagnostic,
} = require("@backtick/language-service");
const { runTsc } = require("@volar/typescript/lib/quickstart/runTsc.js");
const ts = require("typescript");

const decorateProgramModule = require("@volar/typescript/lib/node/decorateProgram.js");
const {
  fillSourceFileText,
} = require("@volar/typescript/lib/node/transform.js");
const volarDecorateProgram = decorateProgramModule.decorateProgram;
decorateProgramModule.decorateProgram = (language, program) => {
  volarDecorateProgram(language, program);
  const getSemanticDiagnostics = program.getSemanticDiagnostics.bind(program);
  program.getSemanticDiagnostics = (sourceFile, cancellationToken) => {
    const files = sourceFile ? [sourceFile] : program.getSourceFiles();
    return [
      ...getSemanticDiagnostics(sourceFile, cancellationToken).map(
        unmangleDiagnostic,
      ),
      ...files.flatMap((file) => {
        const diagnostics = getBacktickDiagnostics(
          language,
          file,
          file.fileName,
        );
        if (diagnostics.length > 0) {
          fillSourceFileText(language, file);
        }
        return diagnostics;
      }),
    ];
  };
};

runTsc(
  require.resolve("typescript/lib/tsc.js"),
  // No extra file extensions: Backtick virtualizes standard .ts/.tsx/.js/.jsx
  // in place, matching the TS server plugins (which also pass []).
  [],
  () => ({
    languagePlugins: [getBacktickLanguagePlugin(ts, (fileName) => fileName)],
  }),
);
