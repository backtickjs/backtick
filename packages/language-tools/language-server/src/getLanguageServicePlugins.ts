import { LanguageServicePlugin } from "@volar/language-server/node";
import { create as createTypeScriptServices } from "volar-service-typescript";

export default function getLanguageServicePlugins(
  ts: typeof import("typescript"),
): LanguageServicePlugin<any>[] {
  return [...createTypeScriptServices(ts)];
}
