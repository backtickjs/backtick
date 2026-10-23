// What the phone provides for client imports: the shell's module names
// (\`shell/modules\`), which its module map must match. An app that imports
// anything else would save and fail on the phone, so save_app refuses it.
import type ts from "typescript";
import { modules } from "shell/modules";

export const phoneModules: readonly string[] = modules;

// Each client import (`with { backtick: "client" }`) the phone doesn't
// provide, as an error where it is in the file. TypeScript loads here, not as
// the function starts.
export async function unprovidedImports(
  file: string,
  code: string,
): Promise<string[]> {
  const { default: ts } = await import("typescript");
  const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
  return source.statements.flatMap((statement) => {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      !isClientImport(ts, statement)
    ) {
      return [];
    }
    const specifier = statement.moduleSpecifier.text;
    if (phoneModules.includes(specifier)) {
      return [];
    }
    const { line, character } = source.getLineAndCharacterOfPosition(
      statement.moduleSpecifier.getStart(),
    );
    return [
      `${file}(${line + 1},${character + 1}): error: The phone doesn't provide "${specifier}". Use one it does: ${phoneModules.join(", ")}.`,
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
