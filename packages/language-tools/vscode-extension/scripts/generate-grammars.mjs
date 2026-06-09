// tsx.json is a verbatim copy of:
// https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-grammars/grammars/tsx.json

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(here, "tsx.json");
const output = path.join(here, "..", "grammars", "backtick.tsx.json");

const grammar = JSON.parse(fs.readFileSync(input, "utf8"));

grammar.scopeName = "backtick.tsx";
grammar.repository.template = {
  patterns: [{ include: "backtick.template#template" }],
};

const generated = {
  information_for_contributors: [
    "GENERATED — do not edit by hand. Run scripts/generate-grammars.mjs to regenerate.",
  ],
  ...grammar,
};

fs.writeFileSync(output, JSON.stringify(generated, null, 2) + "\n");
