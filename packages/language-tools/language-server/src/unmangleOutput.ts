import type {
  LanguageServicePlugin,
  LanguageServicePluginInstance,
} from "@volar/language-server";
import unmangleCompletionItem from "./unmangleCompletionItem.js";
import unmangleDiagnostic from "./unmangleDiagnostic.js";
import unmangleHover from "./unmangleHover.js";

export default function unmangleOutput(
  plugins: LanguageServicePlugin[],
): LanguageServicePlugin[] {
  return plugins.map((plugin) => ({
    ...plugin,
    create(context) {
      const instance = plugin.create(context);
      const patched: LanguageServicePluginInstance = { ...instance };

      const provideHover = instance.provideHover;
      if (provideHover) {
        patched.provideHover = async (...args) => {
          const hover = await provideHover(...args);
          return hover ? unmangleHover(hover) : hover;
        };
      }

      const provideCompletionItems = instance.provideCompletionItems;
      if (provideCompletionItems) {
        patched.provideCompletionItems = async (...args) => {
          const list = await provideCompletionItems(...args);
          return list
            ? { ...list, items: list.items.map(unmangleCompletionItem) }
            : list;
        };
      }

      const resolveCompletionItem = instance.resolveCompletionItem;
      if (resolveCompletionItem) {
        patched.resolveCompletionItem = async (...args) =>
          unmangleCompletionItem(await resolveCompletionItem(...args));
      }

      const provideDiagnostics = instance.provideDiagnostics;
      if (provideDiagnostics) {
        patched.provideDiagnostics = async (...args) => {
          const diagnostics = await provideDiagnostics(...args);
          return diagnostics
            ? diagnostics.map(unmangleDiagnostic)
            : diagnostics;
        };
      }

      return patched;
    },
  }));
}
