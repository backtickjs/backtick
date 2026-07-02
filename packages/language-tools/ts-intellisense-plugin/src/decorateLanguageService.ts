import { mangle } from "@backtick/language-plugin";
import type * as ts from "typescript";
import {
  unmangleCompletionEntryDetails,
  unmangleCompletionInfo,
} from "./unmangleCompletions.js";
import { unmangleQuickInfo } from "./unmangleQuickInfo.js";

export function decorateLanguageService(
  inner: ts.LanguageService,
): ts.LanguageService {
  const overrides: Partial<ts.LanguageService> = {
    getQuickInfoAtPosition: (fileName, position) => {
      const quickInfo = inner.getQuickInfoAtPosition(fileName, position);
      return quickInfo && unmangleQuickInfo(quickInfo);
    },

    getCompletionsAtPosition: (fileName, position, options, settings) => {
      const completions = inner.getCompletionsAtPosition(
        fileName,
        position,
        options,
        settings,
      );
      return completions && unmangleCompletionInfo(completions);
    },

    getCompletionEntryDetails: (fileName, position, name, ...rest) => {
      // The editor echoes back the unmangled `name` we returned above, but the
      // virtual code is keyed by the mangled name; look that up first, falling
      // back to the name as given for genuine (never-mangled) host symbols.
      const details =
        inner.getCompletionEntryDetails(
          fileName,
          position,
          mangle(name),
          ...rest,
        ) ?? inner.getCompletionEntryDetails(fileName, position, name, ...rest);
      return details && unmangleCompletionEntryDetails(details);
    },
  };

  return new Proxy(inner, {
    get(target, property, receiver) {
      return Object.hasOwn(overrides, property)
        ? overrides[property as keyof ts.LanguageService]
        : Reflect.get(target, property, receiver);
    },
  });
}
