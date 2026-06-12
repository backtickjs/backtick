import type { Node, TaggedTemplateExpression } from "estree";
import type { AstPath, Doc, Options, Printer } from "prettier";
import { printers as builtinPrinters } from "prettier/plugins/estree";

const estree: Printer = builtinPrinters.estree;

function isBacktick(node: Node | null): node is TaggedTemplateExpression {
  return (
    node !== null &&
    node.type === "TaggedTemplateExpression" &&
    node.tag.type === "Identifier" &&
    node.tag.name === "c"
  );
}

const embed: NonNullable<Printer["embed"]> = (
  path: AstPath,
  options: Options,
) => {
  if (!isBacktick(path.node)) {
    // Not ours — defer to Prettier's built-in embedding so it can still
    // format css/graphql/styled-components and the like.
    return estree.embed?.call(estree, path, options) ?? null;
  }

  return (_textToDoc, print) => printBacktick(print);
};

function printBacktick(print: (selector: string) => Doc): Doc {
  return ["c", print("quasi")];
}

export const printers: Record<string, Printer> = {
  estree: {
    ...estree,
    embed,
  },
};

export default { printers };
