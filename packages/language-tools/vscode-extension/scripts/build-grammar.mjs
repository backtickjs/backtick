import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(here, "tsx.json");
const output = path.join(here, "..", "syntaxes", "backtick.json");

function buildGrammar() {
  // https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-grammars/grammars/tsx.json
  const tsxGrammar = JSON.parse(fs.readFileSync(input, "utf8"));

  const backtickGrammar = {
    ...tsxGrammar,
    name: "Backtick",
    displayName: "Backtick",
    scopeName: "source.backtick",
    fileTypes: ["bt"],
    repository: {
      ...tsxGrammar.repository,
      splice: {
        name: "meta.template.expression.tsx",
        contentName: "meta.embedded.splice.tsx",
        begin: "\\$\\{",
        beginCaptures: {
          0: {
            name: "punctuation.definition.template-expression.begin.tsx",
          },
        },
        end: "\\}",
        endCaptures: {
          0: {
            name: "punctuation.definition.template-expression.end.tsx",
          },
        },
        patterns: [
          {
            include: "#expression",
          },
        ],
      },
      template: {
        patterns: [
          {
            // For tagged templates, do not open the backtick language.
            begin: "(?<=[$_[:alnum:]\\)\\]>])`",
            beginCaptures: {
              0: {
                name: "string.template.tsx punctuation.definition.string.template.begin.tsx",
              },
            },
            end: "`",
            endCaptures: {
              0: {
                name: "string.template.tsx punctuation.definition.string.template.end.tsx",
              },
            },
            contentName: "string.template.tsx",
            patterns: [
              {
                include: "#template-substitution-element",
              },
              {
                include: "#string-character-escape",
              },
            ],
          },
          {
            // For untagged templates, open the backtick language.
            begin: "`",
            beginCaptures: {
              0: {
                name: "string.template.tsx punctuation.definition.string.template.begin.tsx",
              },
            },
            end: "`",
            endCaptures: {
              0: {
                name: "string.template.tsx punctuation.definition.string.template.end.tsx",
              },
            },
            contentName: "meta.embedded.backtick.tsx",
            patterns: [
              {
                include: "#decl-block",
              },
              {
                include: "#expression",
              },
            ],
          },
        ],
      },
      // A `${...}` splice is an expression, so it must only be recognized in expression positions:
      // (call args, array elements, object values, ternary branches, return values, arrow bodies, etc.)
      expressionWithoutIdentifiers: {
        ...tsxGrammar.repository.expressionWithoutIdentifiers,
        patterns: [
          {
            include: "#splice",
          },
          ...tsxGrammar.repository.expressionWithoutIdentifiers.patterns,
        ],
      },
    },
  };

  fs.writeFileSync(output, JSON.stringify(backtickGrammar, null, 2) + "\n");
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
