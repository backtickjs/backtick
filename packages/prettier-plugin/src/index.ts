import type { Parser, Printer, SupportLanguage } from "prettier";

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
    name: "Backtick",
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

export const printers: Record<string, Printer<RootNode>> = {
  backtick: {
    // Identity printer: emits the source unchanged (modulo a trailing
    // newline, which prettier adds). Real formatting goes here.
    print: (path) => path.node.source.replace(/\n$/, ""),
  },
};

export default { languages, parsers, printers };
