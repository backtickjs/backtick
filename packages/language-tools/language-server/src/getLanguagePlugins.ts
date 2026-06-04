import type { LanguagePlugin } from "@volar/language-server/node";
import { URI } from "vscode-uri";
import getBacktickLanguagePlugin from "./core/getBacktickLanguagePlugin";

export default function getLanguagePlugins(
  ts: typeof import("typescript"),
): LanguagePlugin<URI>[] {
  return [getBacktickLanguagePlugin(ts)];
}
