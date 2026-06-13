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

// `print` is the node-relative printer Prettier hands to `embed`. We use it to
// render each splice expression as host code, so a `${…}` hole keeps its
// surrounding-file formatting (and any nested `cs` re-enters `embed` on its own).
type Print = (selector: Array<string | number>) => Doc;
type TextToDoc = (text: string, options: Options) => Promise<Doc>;

const embed: NonNullable<Printer["embed"]> = (
  path: AstPath,
  options: Options,
) => {
  const node = path.node;
  if (node?.type === "TaggedTemplateExpression") {
    const script = clientScripts(options).get(startOf(node));
    if (script) {
      return (textToDoc: TextToDoc, print: Print) =>
        printScript(script, textToDoc, print);
    }
  }

  // Not ours — defer to Prettier's built-in embedding so it can still
  // format css/graphql/styled-components and the like.
  return estree.embed?.call(estree, path, options) ?? null;
};

// The compiler hands us each client script's body already reassembled as a
// parseable TypeScript program (`script.textWithPlaceholders`), with every
// splice swapped for a placeholder identifier. We format that as TypeScript,
// then walk the resulting Doc and swap each placeholder back to the splice.
async function printScript(
  script: ClientScript,
  textToDoc: TextToDoc,
  print: Print,
): Promise<Doc> {
  const docWithPlaceholders = await textToDoc(script.textWithPlaceholders, {
    parser: "typescript",
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

let cache: { text: string; scripts: Map<number, ClientScript> } | null = null;

// Run the compiler over the whole document once and key every client script it
// finds (nested ones included) by its start offset. Offsets line up because
// Prettier and TypeScript both index the same original source by character.
function clientScripts(options: Options): Map<number, ClientScript> {
  // `originalText`/`filepath` are populated by Prettier at format time but typed
  // loosely on the public `Options`.
  const { originalText, filepath } = options as {
    originalText: string;
    filepath?: string;
  };

  if (cache?.text === originalText) {
    return cache.scripts;
  }

  const { sourceFile, allScripts } = parseFile(originalText, {
    fileName: filepath ?? "input.tsx",
  });

  const byStart = new Map<number, ClientScript>(
    allScripts.map((script) => [script.node.getStart(sourceFile), script]),
  );

  cache = { text: originalText, scripts: byStart };
  return byStart;
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
