#!/usr/bin/env node

import { createRequire } from "node:module";
import { getBacktickLanguagePlugin } from "@backtick/language-plugin";

const require = createRequire(import.meta.url);
const { runTsc } = require("@volar/typescript/lib/quickstart/runTsc.js");
const ts = require("typescript");

runTsc(
  require.resolve("typescript/lib/tsc.js"),
  // No extra file extensions: Backtick virtualizes standard .ts/.tsx/.js/.jsx
  // in place, matching the editor-plugin (which also passes []).
  [],
  () => ({
    languagePlugins: [getBacktickLanguagePlugin(ts, (fileName) => fileName)],
  }),
);
