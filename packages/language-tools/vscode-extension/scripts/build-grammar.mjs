import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const input = require.resolve("tm-grammars/grammars/tsx.json");
const output = path.join(here, "..", "grammars", "backtick.tsx.json");

function buildGrammar() {
  const grammar = JSON.parse(fs.readFileSync(input, "utf8"));

  grammar.scopeName = "backtick.tsx";
  grammar.repository.template = {
    patterns: [{ include: "backtick.template#template" }],
  };

  const generated = {
    information_for_contributors: [
      "GENERATED — do not edit by hand. Run scripts/build-grammar.mjs to regenerate.",
    ],
    ...grammar,
  };

  fs.writeFileSync(output, JSON.stringify(generated, null, 2) + "\n");
  console.log(`Rebuilt ${path.basename(output)}`);
}

buildGrammar();

if (process.argv.includes("--watch")) {
  fs.watch(input, () => {
    buildGrammar();
    console.log(`Rebuilt ${path.basename(output)}`);
  });
  console.log(`Watching ${path.basename(input)}...`);
}
