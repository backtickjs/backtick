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
import type ts from "typescript";

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
        printClientScript(script, textToDoc, print);
    }
  }

  // Not ours — defer to Prettier's built-in embedding so it can still
  // format css/graphql/styled-components and the like.
  return estree.embed?.call(estree, path, options) ?? null;
};

// The compiler hands us each client script's body already reassembled as a
// parseable TypeScript program (`script.parsed`), with every splice swapped for
// a placeholder identifier. We format that as TypeScript, then walk the
// resulting Doc and swap each placeholder back to the host-formatted splice.
async function printClientScript(
  script: ClientScript,
  textToDoc: TextToDoc,
  print: Print,
): Promise<Doc> {
  const formatted = await textToDoc(script.textWithPlaceholders, {
    parser: "typescript",
  });
  return [
    "cs",
    "`",
    reinjectSplices(stripTrailingSemicolon(formatted), print),
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

    const parts: Doc[] = [];
    let last = 0;
    for (const match of current.matchAll(PLACEHOLDER)) {
      const at = match.index;
      if (at > last) {
        parts.push(current.slice(last, at));
      }
      const index = Number(match[1]);
      parts.push("${", print(["quasi", "expressions", index]), "}");
      last = at + match[0].length;
    }
    if (last < current.length) {
      parts.push(current.slice(last));
    }
    return parts;
  });
}

// Formatting the body as a TypeScript program adds a trailing `;` to a bare
// final expression. It reads as noise inside a client script, so drop one if it
// is the very last thing printed. Anything else (internal `;`, multi-statement
// bodies) is left untouched.
function stripTrailingSemicolon(formatted: Doc): Doc {
  if (typeof formatted === "string") {
    return formatted.replace(/;$/, "");
  }
  if (Array.isArray(formatted) && formatted.length > 0) {
    const last = formatted[formatted.length - 1];
    return [...formatted.slice(0, -1), stripTrailingSemicolon(last)];
  }
  return formatted;
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

  const { sourceFile, scripts } = parseFile(originalText, {
    fileName: filepath ?? "input.tsx",
  });

  const byStart = new Map<number, ClientScript>();
  const collect = (
    found: Map<ts.TaggedTemplateExpression, ClientScript>,
  ): void => {
    for (const [taggedTemplate, script] of found) {
      byStart.set(taggedTemplate.getStart(sourceFile), script);
      // Recurse so `cs` templates nested inside splices are recognised too.
      for (const splice of script.splices.values()) {
        collect(splice.scripts);
      }
    }
  };
  collect(scripts);

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
