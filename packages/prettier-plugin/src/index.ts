import type { AstPath, Doc, Options, Printer } from "prettier";
import { printers as builtinPrinters } from "prettier/plugins/estree";

/**
 * Backtick code lives as c`...` tagged templates embedded inside ordinary
 * JS/TS files, so this plugin doesn't contribute a language of its own.
 * Instead it wraps Prettier's built-in `estree` printer (used by the
 * `typescript`/`babel` parsers) and hooks `embed` to take over printing of
 * those tagged templates.
 */
const estree: Printer = builtinPrinters.estree;
const baseEmbed = estree.embed;

function isBacktickTemplate(node: unknown): boolean {
  return (
    typeof node === "object" &&
    node !== null &&
    (node as { type?: unknown }).type === "TaggedTemplateExpression" &&
    (node as { tag?: { type?: unknown; name?: unknown } }).tag?.type ===
      "Identifier" &&
    (node as { tag?: { name?: unknown } }).tag?.name === "c"
  );
}

const embed: NonNullable<Printer["embed"]> = (
  path: AstPath,
  options: Options,
) => {
  if (!isBacktickTemplate(path.node)) {
    // Not ours — defer to Prettier's built-in embedding so it can still
    // format css/graphql/styled-components and the like.
    return baseEmbed ? baseEmbed.call(estree, path, options) : null;
  }

  return (_textToDoc, print) => printBacktickTemplate(print);
};

/**
 * Print the `c` tag followed by its template literal. Prettier already formats
 * the `${…}` splice expressions inside the literal; the surrounding Backtick
 * source is preserved verbatim because Backtick is its own language (it splices
 * with `${…}` directly inside JSX, so it isn't valid JS/TSX to reformat).
 *
 * This is the seam where a real Backtick formatter will plug in: format the
 * static quasis here once a Backtick parser/printer exists.
 */
function printBacktickTemplate(print: (selector: string) => Doc): Doc {
  return ["c", print("quasi")];
}

export const printers: Record<string, Printer> = {
  estree: {
    ...estree,
    embed,
  },
};

export default { printers };
