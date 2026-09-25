import type ts from "typescript";

// Makes a file's one expression statement its default export, which maps to
// nothing: no source wrote it. Run after TypeScript's own transforms, which
// drop an export they have no binding for as a type's.
export function addExportDefault(
  ts: typeof import("typescript"),
): ts.TransformerFactory<ts.SourceFile> {
  return (context) => (file) => {
    const [statement] = file.statements;
    if (
      file.statements.length !== 1 ||
      statement === undefined ||
      !ts.isExpressionStatement(statement)
    ) {
      throw new Error("Expected a file of one expression statement.");
    }
    return context.factory.updateSourceFile(file, [
      context.factory.createExportAssignment(
        undefined,
        false,
        statement.expression,
      ),
    ]);
  };
}
