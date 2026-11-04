// What the rules read of an app's file: its imports, and where an error is.
import type ts from "typescript";

// The file's imports that aren't erased: not `import type`.
export function importsOf(
  ts: typeof import("typescript"),
  source: ts.SourceFile,
): (ts.ImportDeclaration & { moduleSpecifier: ts.StringLiteral })[] {
  return source.statements.filter(
    (
      statement,
    ): statement is ts.ImportDeclaration & {
      moduleSpecifier: ts.StringLiteral;
    } =>
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.importClause?.phaseModifier !== ts.SyntaxKind.TypeKeyword,
  );
}

// Whether an import is one the phone provides: `with { backtick: "client" }`.
export function isClientImport(
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

// An error's start, as tsc prints it: `App.tsx(2,25): error:`.
export function errorAt(source: ts.SourceFile, node: ts.Node): string {
  const { line, character } = source.getLineAndCharacterOfPosition(
    node.getStart(source),
  );
  return `${source.fileName}(${line + 1},${character + 1}): error:`;
}
