// What an app may import, on each side. On the phone, what it provides for
// client imports: the shell's module names (`shell/modules`), which its module
// map must match. On the server, the packages a release bundles. An app that
// imports anything else would save and fail on the phone, or not bundle, so
// save_app refuses it before checking the rest.
import type ts from "typescript";
import { modules } from "shell/modules";

export const phoneModules: readonly string[] = modules;

export const serverModules: readonly string[] = [
  "hono",
  "@backtickjs/core",
  "@backtickjs/bundler",
  "@backtickjs/hono",
];

// Each import neither side provides, as an error where it is in the file: a
// client import (`with { backtick: "client" }`) the phone doesn't provide, or
// a server import outside the server's packages. Type-only imports are erased,
// so any is fine. TypeScript loads here, not as the function starts.
export async function unavailableImports(
  file: string,
  code: string,
): Promise<string[]> {
  const { default: ts } = await import("typescript");
  const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
  return source.statements.flatMap((statement) => {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      statement.importClause?.isTypeOnly
    ) {
      return [];
    }
    const specifier = statement.moduleSpecifier.text;
    const client = isClientImport(ts, statement);
    if ((client ? phoneModules : serverModules).includes(specifier)) {
      return [];
    }
    const { line, character } = source.getLineAndCharacterOfPosition(
      statement.moduleSpecifier.getStart(),
    );
    const at = `${file}(${line + 1},${character + 1}): error:`;
    return [
      client
        ? `${at} The phone doesn't provide "${specifier}". Use one it does: ${phoneModules.join(", ")}.`
        : `${at} The server doesn't have "${specifier}": it has ${serverModules.join(", ")}. A module the phone provides is imported \`with { backtick: "client" }\`.`,
    ];
  });
}

function isClientImport(
  ts: typeof import("typescript"),
  statement: ts.ImportDeclaration,
): boolean {
  return (
    statement.attributes?.elements.some(
      (attribute) =>
        attribute.name.text === "backtick" &&
        ts.isStringLiteral(attribute.value) &&
        attribute.value.text === "client",
    ) ?? false
  );
}
