import type { LanguageServicePlugin } from "@volar/language-server";

const MANGLE_RE = /\$0var_/g;

const sanitize = (value: string): string => value.replace(MANGLE_RE, "");

function sanitizeContents(contents: unknown): unknown {
  if (typeof contents === "string") {
    return sanitize(contents);
  }
  if (Array.isArray(contents)) {
    return contents.map(sanitizeContents);
  }
  if (
    contents &&
    typeof contents === "object" &&
    "value" in contents &&
    typeof (contents as { value: unknown }).value === "string"
  ) {
    return {
      ...contents,
      value: sanitize((contents as { value: string }).value),
    };
  }
  return contents;
}

// Wraps the TypeScript language service plugins so every hover they produce has
// the compiler's synthetic `$0var_` marker stripped before it reaches the
// editor.
export default function sanitizeHovers(
  plugins: LanguageServicePlugin[],
): LanguageServicePlugin[] {
  return plugins.map((plugin) => ({
    ...plugin,
    create(context) {
      const instance = plugin.create(context);
      const provideHover = instance.provideHover;
      if (!provideHover) {
        return instance;
      }
      return {
        ...instance,
        async provideHover(document, position, token) {
          const hover = await provideHover.call(
            instance,
            document,
            position,
            token,
          );
          if (hover?.contents != null) {
            hover.contents = sanitizeContents(hover.contents) as never;
          }
          return hover;
        },
      };
    },
  }));
}
