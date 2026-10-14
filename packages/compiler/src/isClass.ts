import type ts from "typescript";

// `class Foo {}`, a script that is a class, written as a declaration: its class
// as an expression. Modifiers such as `export` or `abstract` have no
// expression form.
export function isClass(
  ts: typeof import("typescript"),
  statement: ts.Statement,
): statement is ts.ClassDeclaration {
  return ts.isClassDeclaration(statement) && statement.modifiers === undefined;
}
