// unavailable-module: an import neither side provides, where it is in the
// file. A client import (`with { backtick: "client" }`) the phone doesn't
// provide would save and fail on the phone; a server import outside the
// server's packages wouldn't bundle. Type-only imports are erased, so any is
// fine.
import type ts from "typescript";
import { phoneModules, serverModules } from "../modules.ts";
import { errorAt, importsOf, isClientImport } from "./imports.ts";

export function unavailableModule(
  ts: typeof import("typescript"),
  source: ts.SourceFile,
): string[] {
  return importsOf(ts, source).flatMap((statement) => {
    const specifier = statement.moduleSpecifier.text;
    const client = isClientImport(ts, statement);
    if ((client ? phoneModules : serverModules).includes(specifier)) {
      return [];
    }
    const at = errorAt(source, statement.moduleSpecifier);
    return [
      client
        ? `${at} The phone doesn't provide "${specifier}". Use one it does: ${phoneModules.join(", ")}.`
        : `${at} The server doesn't have "${specifier}": it has ${serverModules.join(", ")}. A module the phone provides is imported \`with { backtick: "client" }\`.`,
    ];
  });
}
