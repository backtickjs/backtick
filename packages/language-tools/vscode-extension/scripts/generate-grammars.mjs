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
  comment:
    "PATCHED: every template literal (`...`) defers to our backtick.template " +
    "instead of string.template. This makes a backtick open our embedded template " +
    "at ANY depth source.tsx descends to (JSX expressions, blocks, ...), which an " +
    "injection cannot do without self-colliding on the closing backtick.",
  patterns: [{ include: "backtick.template#template" }],
};

const vendored = {
  information_for_contributors: [
    "GENERATED — do not edit by hand. Run scripts/generate-grammars.mjs to regenerate.",
  ],
  ...grammar,
};

fs.writeFileSync(output, JSON.stringify(vendored, null, 2) + "\n");
