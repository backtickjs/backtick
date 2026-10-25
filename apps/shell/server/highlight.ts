import clientScript from "@backtickjs/vscode-extension/syntaxes/client-script.injection.json" with { type: "json" };
import splice from "@backtickjs/vscode-extension/syntaxes/splice.injection.json" with { type: "json" };
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import {
  createHighlighter,
  type LanguageRegistration,
  type ThemedToken,
} from "shiki";

// Code coloured as in VS Code, as backtickjs.com colours it
// (apps/backtickjs.com/src/highlight.ts): its default dark theme, its bracket
// pair colours, and the editor extension's grammars, so a `cs` template reads
// as TSX and its splices as splices.
export const theme = "dark-plus";

// Made on the first source shown, not on every cold start of the home.
let highlighter: ReturnType<typeof createHighlighter> | undefined;

// Each line as its tokens, each a colour's index in `colors` and its text:
// a colour named once, not once per token, keeps a big app's source small.
export async function highlight(source: string): Promise<{
  colors: string[];
  background: string;
  lines: [number, string][][];
}> {
  highlighter ??= createHighlighter({
    themes: [theme],
    langs: [
      "tsx",
      {
        ...clientScript,
        name: "client-script",
        injectTo: ["source.tsx"],
      } as unknown as LanguageRegistration,
      {
        ...splice,
        name: "splice",
        injectTo: ["source.tsx"],
      } as unknown as LanguageRegistration,
    ],
  });
  const ready = await highlighter;
  // Transformers run only on the way to HTML, so the last one keeps the
  // tokens the bracket colouring leaves behind.
  let tokens: ThemedToken[][] = [];
  ready.codeToHast(source, {
    lang: "tsx",
    theme,
    transformers: [
      transformerColorizedBrackets(),
      {
        tokens(colored) {
          tokens = colored;
        },
      },
    ],
  });
  const { fg, bg } = ready.getTheme(theme);
  const colors: string[] = [];
  const indexOf = (color: string) => {
    const index = colors.indexOf(color);
    return index === -1 ? colors.push(color) - 1 : index;
  };
  return {
    colors,
    background: bg,
    lines: tokens.map((line) =>
      line.map((token): [number, string] => [
        indexOf(token.color ?? fg),
        token.content,
      ]),
    ),
  };
}
