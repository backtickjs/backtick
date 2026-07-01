#!/usr/bin/env node

import { createRequire } from "node:module";
import {
  getBacktickDiagnostics,
  getBacktickLanguagePlugin,
  unmangleDiagnostic,
} from "@backtick/language-plugin";

const require = createRequire(import.meta.url);
const { runTsc } = require("@volar/typescript/lib/quickstart/runTsc.js");
const ts = require("typescript");

const decorateProgramModule = require("@volar/typescript/lib/node/decorateProgram.js");
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
          ts,
          language,
          file,
          file.fileName,
        );
        if (diagnostics.length === 0) {
          return [];
        }
        const snapshot = language.scripts.get(file.fileName)?.snapshot;
        if (snapshot == null) {
          return [];
        }
        const sourceText = snapshot.getText(0, snapshot.getLength());
        const sourceFile = ts.createSourceFile(
          file.fileName,
          sourceText,
          ts.ScriptTarget.Latest,
        );
        return diagnostics.map((diagnostic) => ({
          ...diagnostic,
          file: sourceFile,
        }));
      }),
    ];
  };
};

runTsc(
  require.resolve("typescript/lib/tsc.js"),
  // No extra file extensions: Backtick virtualizes standard .ts/.tsx/.js/.jsx
  // in place, matching the editor-plugin (which also passes []).
  [],
  () => ({
    languagePlugins: [getBacktickLanguagePlugin(ts, (fileName) => fileName)],
  }),
);
