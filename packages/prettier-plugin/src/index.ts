import { doc, type Parser, type Printer, type SupportLanguage } from "prettier";

const { hardline } = doc.builders;

/**
 * Placeholder AST until a real Backtick parser is wired in: the whole file is
 * a single root node holding the source text.
 */
interface RootNode {
  type: "root";
  source: string;
}

export const languages: SupportLanguage[] = [
  {
    name: "backtick",
    parsers: ["backtick"],
    extensions: [".bt"],
    vscodeLanguageIds: ["backtick"],
  },
];

export const parsers: Record<string, Parser<RootNode>> = {
  backtick: {
    astFormat: "backtick",
    parse: (text) => ({ type: "root", source: text }),
    locStart: () => 0,
    locEnd: (node) => node.source.length,
  },
};

/**
 * TEST CHANGE: loud banner so it's obvious the plugin ran. Remove once
 * real formatting is in place.
 */
const BANNER = "// 🎀 formatted by @backtick/prettier-plugin 🎀";

export const printers: Record<string, Printer<RootNode>> = {
  backtick: {
    // Identity printer plus a visible banner, normalizing the trailing
    // newline. Real formatting goes here. Stripping an existing banner first
    // keeps formatting idempotent.
    print: (path) => {
      let source = path.node.source.replace(/\n+$/, "");
      if (source.startsWith(BANNER)) {
        source = source.slice(BANNER.length).replace(/^\n+/, "");
      }
      return [BANNER, hardline, hardline, source, hardline];
    },
  },
};

export default { languages, parsers, printers };
