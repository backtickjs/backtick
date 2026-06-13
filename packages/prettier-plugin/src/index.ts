import { parseFile, type ClientScript } from "@backtick/compiler";
import type { Node } from "estree";
import {
  doc as prettierDoc,
  type AstPath,
  type Doc,
  type Options,
  type Printer,
} from "prettier";
import { printers as builtinPrinters } from "prettier/plugins/estree";

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
    const index = getScriptIndex(options);
    const script = index.get(startOf(node));
    if (script) {
      return async (textToDoc, print) => printScript(script, textToDoc, print);
    }
  }

  // Not ours — defer to Prettier's built-in embedding so it can still
  // format css/graphql/styled-components and the like.
  return estree.embed?.call(estree, path, options) ?? null;
};

async function printScript(
  script: ClientScript,
  textToDoc: TextToDoc,
  print: Print,
): Promise<Doc> {
  const parser = parserForFile(script.sourceFile.fileName);
  const docWithPlaceholders = await textToDoc(script.textWithPlaceholders, {
    parser,
  });
  return [
    "cs",
    "`",
    reinjectSplices(stripTrailingSemicolon(docWithPlaceholders), print),
    "`",
  ];
}

// Placeholders are `$0splice<n>` identifiers (see the compiler's
// `placeholderFor`). They survive formatting as their own string leaves, so we
// map over the Doc and splice the host expression back wherever one appears.
const PLACEHOLDER = /\$0splice(\d+)/g;

function reinjectSplices(formatted: Doc, print: Print): Doc {
  return mapDoc(formatted, (current) => {
    if (typeof current !== "string" || !current.includes("$0splice")) {
      return current;
    }

    // Splitting on the capturing group interleaves the literal text (even
    // indices) with each captured splice number (odd indices).
    return current
      .split(PLACEHOLDER)
      .map((part, i) =>
        i % 2 === 0
          ? part
          : ["${", print(["quasi", "expressions", Number(part)]), "}"],
      );
  });
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

let cache: { text: string; scriptIndex: Map<number, ClientScript> } | null =
  null;

function getScriptIndex(options: Options): Map<number, ClientScript> {
  // `originalText`/`filepath` are populated by Prettier at format time but typed
  // loosely on the public `Options`.
  const { originalText, filepath } = options as {
    originalText: string;
    filepath?: string;
  };

  if (cache?.text === originalText) {
    return cache.scriptIndex;
  }

  const { sourceFile, allScripts } = parseFile(originalText, {
    fileName: filepath ?? "input.tsx",
  });

  const scriptIndex = new Map<number, ClientScript>(
    allScripts.map((script) => [script.node.getStart(sourceFile), script]),
  );

  cache = { text: originalText, scriptIndex };
  return scriptIndex;
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
