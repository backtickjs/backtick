import { parseFile, type ClientScript } from "@backtick/compiler";
import type { Node, TaggedTemplateExpression } from "estree";
import type { AstPath, Doc, Options, Printer } from "prettier";
import { printers as builtinPrinters } from "prettier/plugins/estree";
import type ts from "typescript";

const estree: Printer = builtinPrinters.estree;

// `print` is the node-relative printer Prettier hands to `embed`. Walking it over
// `quasi.expressions` keeps splice expressions formatted as host code — and any
// nested `cs` template inside them re-enters `embed` on its own.
type Print = (selector: Array<string | number>) => Doc;

const embed: NonNullable<Printer["embed"]> = (
  path: AstPath,
  options: Options,
) => {
  const node = path.node;
  if (
    node?.type === "TaggedTemplateExpression" &&
    isClientScript(node, options)
  ) {
    return (_textToDoc, print: Print) => printClientScript(node, print);
  }

  // Not ours — defer to Prettier's built-in embedding so it can still
  // format css/graphql/styled-components and the like.
  return estree.embed?.call(estree, path, options) ?? null;
};

// The compiler is the source of truth for what counts as a client script. We run
// it over the whole document once, key the templates it found by their start
// offset, then ask whether the node Prettier is currently printing is one of
// them. Offsets line up because Prettier and TypeScript both index the same
// original source by character.
function isClientScript(
  node: TaggedTemplateExpression,
  options: Options,
): boolean {
  return clientScriptStarts(options).has(startOf(node));
}

let cache: { text: string; starts: Set<number> } | null = null;

function clientScriptStarts(options: Options): Set<number> {
  // `originalText`/`filepath` are populated by Prettier at format time but typed
  // loosely on the public `Options`.
  const { originalText, filepath } = options as {
    originalText: string;
    filepath?: string;
  };

  if (cache?.text === originalText) {
    return cache.starts;
  }

  const { sourceFile, scripts } = parseFile(originalText, {
    fileName: filepath ?? "input.tsx",
  });

  const starts = new Set<number>();
  const collect = (
    found: Map<ts.TaggedTemplateExpression, ClientScript>,
  ): void => {
    for (const [taggedTemplate, script] of found) {
      starts.add(taggedTemplate.getStart(sourceFile));
      // Recurse so `cs` templates nested inside splices are recognised too.
      for (const splice of script.splices.values()) {
        collect(splice.scripts);
      }
    }
  };
  collect(scripts);

  cache = { text: originalText, starts };
  return starts;
}

function printClientScript(
  node: TaggedTemplateExpression,
  print: Print,
): Doc {
  const quasi = node.quasi;

  const parts: Doc[] = ["cs", "`"];
  quasi.quasis.forEach((element, index) => {
    parts.push(element.value.raw);
    if (index < quasi.expressions.length) {
      parts.push("${", print(["quasi", "expressions", index]), "}");
    }
  });
  parts.push("`");

  return parts;
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
