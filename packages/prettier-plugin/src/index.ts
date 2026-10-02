import {
  type ClientScript,
  flattenScripts,
  parseSourceText,
} from "@backtickjs/compiler";
import type { Expression, Node } from "estree";
import {
  type AstPath,
  type Doc,
  type Options,
  type Printer,
  doc as prettierDoc,
} from "prettier";
import { printers as builtinPrinters } from "prettier/plugins/estree";
import ts from "typescript";

const estree: Printer = builtinPrinters.estree;
const { mapDoc } = prettierDoc.utils;

type Print = (selector: Array<string | number>) => Doc;
type TextToDoc = (text: string, options: Options) => Promise<Doc>;

const embed: NonNullable<Printer["embed"]> = (
  path: AstPath<Node>,
  options: Options,
) => {
  const node = path.node;
  if (node?.type === "TaggedTemplateExpression") {
    const script = scriptsByStart(options).get(startOf(node));
    if (script) {
      const fileName = filepathOf(options) ?? "input.tsx";
      const expressions = node.quasi.expressions;
      return async (textToDoc, print) =>
        printScript(script, fileName, expressions, textToDoc, print);
    }
  }

  // Not ours — defer to Prettier's built-in embedding so it can still
  // format css/graphql/styled-components and the like.
  return estree.embed?.call(estree, path, options) ?? null;
};

async function printScript(
  script: ClientScript,
  fileName: string,
  expressions: readonly Expression[],
  textToDoc: TextToDoc,
  print: Print,
): Promise<Doc> {
  const parser = parserForFile(fileName);
  const docWithPlaceholders = await textToDoc(script.textWithPlaceholders, {
    parser,
  });
  return [
    "cs",
    "`",
    reinjectSplices(
      stripTrailingSemicolon(docWithPlaceholders),
      script,
      expressions,
      print,
    ),
    "`",
  ];
}

function reinjectSplices(
  formatted: Doc,
  script: ClientScript,
  expressions: readonly Expression[],
  print: Print,
): Doc {
  return mapDoc(formatted, (current) => {
    if (typeof current !== "string" || !current.includes("$0splice")) {
      return current;
    }
    return replacePlaceholders(current, script, expressions, print);
  });
}

// Rebuild one formatted string leaf, swapping each `$0splice<n>` placeholder for
// the real host expression `${...}` printed from the original AST. We walk the
// matches in order, emitting the literal text before each placeholder and then
// the spliced-in expression, finishing with whatever text trails the last one.
function replacePlaceholders(
  text: string,
  script: ClientScript,
  expressions: readonly Expression[],
  print: Print,
): Doc {
  const parts: Doc[] = [];
  let textStart = 0;

  for (const match of text.matchAll(/\$0splice(\d+)/g)) {
    const spliceIndex = Number(match[1]);
    parts.push(text.slice(textStart, match.index));
    const expression = expressions[spliceIndex];
    // A braced splice holding a bare identifier prints as its unbraced
    // shorthand: `${x}` reads as `$x`. A `$`-led name keeps its braces, and so
    // does a `${…}` in text (a string, a comment, JSX text), which isn't a
    // splice: there `$x` would be the text itself.
    if (
      script.splices[match[0]] !== undefined &&
      expression?.type === "Identifier" &&
      !expression.name.startsWith("$")
    ) {
      parts.push(`$${expression.name}`);
    } else {
      parts.push(["${", print(["quasi", "expressions", spliceIndex]), "}"]);
    }
    textStart = match.index + match[0].length;
  }

  parts.push(text.slice(textStart));
  return parts;
}

// Formatting the body as a TypeScript program adds a trailing `;` to a bare
// final expression. It reads as noise inside a client script, so drop one if it
// is the very last thing printed. Anything else (internal `;`, multi-statement
// bodies) is left untouched.
function stripTrailingSemicolon(doc: Doc): Doc {
  if (typeof doc === "string") {
    return doc.replace(/;$/, "");
  }
  if (Array.isArray(doc) && doc.length > 0) {
    const last = doc[doc.length - 1];
    return [...doc.slice(0, -1), stripTrailingSemicolon(last)];
  }
  return doc;
}

let cache: { text: string; byStart: Map<number, ClientScript> } | null = null;

function scriptsByStart(options: Options): Map<number, ClientScript> {
  const { originalText } = options as { originalText: string };

  if (cache?.text === originalText) {
    return cache.byStart;
  }

  const { sourceFile, scripts } = parseSourceText(
    ts,
    filepathOf(options) ?? "input.tsx",
    originalText,
  );

  const byStart = new Map<number, ClientScript>();
  for (const script of flattenScripts(scripts)) {
    const start = script.sourceNode.getStart(sourceFile);
    byStart.set(start, script);
  }

  cache = { text: originalText, byStart };
  return byStart;
}

function filepathOf(options: Options): string | undefined {
  return (options as { filepath?: string }).filepath;
}

function parserForFile(fileName: string): "babel" | "typescript" {
  if (fileName?.endsWith(".js") || fileName?.endsWith(".jsx")) {
    return "babel";
  }
  return "typescript";
}

function startOf(node: Node): number {
  // Prettier attaches `range` for the typescript/babel parsers; fall back to the
  // babel-style `start` field just in case.
  const withLoc = node as { range?: [number, number]; start?: number };
  return withLoc.range?.[0] ?? withLoc.start ?? 0;
}

export const printers: Record<string, Printer> = {
  estree: {
    ...estree,
    embed,
  },
};

export default { printers };
