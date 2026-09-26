import type ts from "typescript";
import type { ModuleImport } from "@backtickjs/client-script";

/**
 * What a bundle needs to know about a script's module to wrap it without
 * parsing it: its imports, and where its default export starts. Whatever
 * compiler wrote the module, it exports nothing else.
 */
export function describeModule(
  ts: typeof import("typescript"),
  code: string,
): { imports: ModuleImport[]; exportAt: number } {
  const module = ts.createSourceFile(
    "module.js",
    code,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.JS,
  );
  const imports: ModuleImport[] = [];
  let exportAt: number | undefined;
  for (const statement of module.statements) {
    if (ts.isImportDeclaration(statement)) {
      imports.push({
        from: (statement.moduleSpecifier as ts.StringLiteral).text,
        range: [statement.getStart(module), statement.getEnd()],
        bindings: bound(ts, statement.importClause),
      });
    } else if (ts.isExportAssignment(statement) && exportAt === undefined) {
      exportAt = statement.getStart(module);
    } else if (
      ts.isExportAssignment(statement) ||
      ts.isExportDeclaration(statement) ||
      (ts.canHaveModifiers(statement) &&
        ts
          .getModifiers(statement)
          ?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword))
    ) {
      throw new Error("A script's module exports nothing but its default.");
    }
  }
  if (exportAt === undefined) {
    throw new Error("A script's module has no default export.");
  }
  return { imports, exportAt };
}

function bound(
  ts: typeof import("typescript"),
  clause: ts.ImportClause | undefined,
): ModuleImport["bindings"] {
  if (clause === undefined) {
    return [];
  }
  const bindings: { name: string; local: string }[] = [];
  if (clause.name !== undefined) {
    bindings.push({ name: "default", local: clause.name.text });
  }
  const named = clause.namedBindings;
  if (named !== undefined && ts.isNamespaceImport(named)) {
    bindings.push({ name: "*", local: named.name.text });
  } else if (named !== undefined) {
    for (const element of named.elements) {
      bindings.push({
        name: (element.propertyName ?? element.name).text,
        local: element.name.text,
      });
    }
  }
  return bindings;
}
