import ts from "typescript";
import type { Edit } from "./Edit.js";

/**
 * Rewrites a case's `var` declarations as `let`.
 *
 * Why: client script has no `var`, and most of Test262 uses it only because
 * it was written before `let` — `var x = 1` in a case about addition. Left as
 * written, those cases never run.
 *
 * Reading `var` as `let` changes a case's answer only where `let` is refused,
 * or where a loop's closures would each see their own binding:
 *
 * - used before its declaration, or read outside its block: the compiler or
 *   the type checker refuses it, so the case is refused rather than changed;
 * - read by a function inside the loop that declares it: each closure would
 *   see its own binding where `var` shares one, so the case is left as written.
 *
 * A `var` declaring a name again, where the first declaration would still be
 * in scope as `let`, is the assignment it amounts to: `var x = 0` a second
 * time is `x = 0`. Where the first wouldn't be in scope — two loops that each
 * declare `i` — it is a `let` of its own: reading the variable across the two
 * would happen where only `var` has it, and that is refused.
 *
 * A `var` without a value is left as written too: `let` needs one here, and
 * `undefined` would type the variable as nothing else.
 *
 * Not for a case ECMAScript rejects before running: what `var` allows is often
 * the point of one. `null` where the case is left as written; no edits where it
 * has no `var`.
 */
export function varAsLet(source: string): Edit[] | null {
  const file = ts.createSourceFile(
    "case.js",
    source,
    ts.ScriptTarget.ESNext,
    true,
  );
  const edits: Edit[] = [];
  let left = false;
  // Each name declared so far, and the scope its declaration has as `let`.
  const declared: { name: string; scope: ts.Node }[] = [];
  const scopeOf = (list: ts.VariableDeclarationList): ts.Node =>
    ts.isVariableStatement(list.parent) ? list.parent.parent : list.parent;
  const within = (scope: ts.Node, node: ts.Node): boolean => {
    for (let at: ts.Node | undefined = node; at !== undefined; at = at.parent) {
      if (at === scope) return true;
    }
    return false;
  };
  const isLoop = (node: ts.Node) =>
    ts.isForStatement(node) ||
    ts.isForInStatement(node) ||
    ts.isForOfStatement(node) ||
    ts.isWhileStatement(node) ||
    ts.isDoStatement(node);
  const isFunction = (node: ts.Node) =>
    ts.isArrowFunction(node) ||
    ts.isFunctionExpression(node) ||
    ts.isFunctionDeclaration(node);
  // Whether a function inside `node` reads `name`.
  const closesOver = (node: ts.Node, name: string, inside: boolean): boolean =>
    (inside && ts.isIdentifier(node) && node.text === name) ||
    ts.forEachChild(node, (child) =>
      closesOver(child, name, inside || isFunction(node)),
    ) === true;
  const visit = (node: ts.Node): void => {
    if (
      ts.isVariableDeclarationList(node) &&
      (node.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) === 0
    ) {
      for (const declaration of node.declarations) {
        if (declaration.initializer === undefined) {
          left = true;
        }
        let loop: ts.Node | undefined = node.parent;
        while (loop !== undefined && !isLoop(loop)) {
          loop = loop.parent;
        }
        if (
          loop !== undefined &&
          ts.isIdentifier(declaration.name) &&
          closesOver(loop, declaration.name.text, false)
        ) {
          left = true;
        }
      }
      const names = node.declarations.map((declaration) =>
        ts.isIdentifier(declaration.name) ? declaration.name.text : null,
      );
      const again = names.map((name) =>
        declared.some(
          (earlier) => earlier.name === name && within(earlier.scope, node),
        ),
      );
      const start = node.getStart(file);
      if (
        names.includes(null) ||
        (again.includes(true) && again.includes(false))
      ) {
        left = true;
      } else if (again.includes(true)) {
        edits.push({ start, end: start + "var ".length, text: "" });
      } else {
        edits.push({ start, end: start + "var".length, text: "let" });
        for (const name of names) {
          declared.push({ name: name!, scope: scopeOf(node) });
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return left ? null : edits;
}
