import ts from "typescript";

/**
 * Binds the harness's names at the top of a case: `const assert = $assert;`.
 *
 * Why: Test262 prepends its harness, `assert.js` and `sta.js`, to every case
 * as JavaScript source, and a client may not run JavaScript. The harness is
 * written in client script instead (`src/test262/harness.ts`), and a `$` name
 * splices a host value in, so each name the case uses is bound to the harness's
 * own. A `raw` case gets no harness, as Test262 says.
 */
export function harnessNames(raw: boolean, includes: readonly string[]) {
  return raw
    ? []
    : [
        "assert",
        "Test262Error",
        ...(includes.includes("compareArray.js") ? ["compareArray"] : []),
      ];
}

/** The declarations binding `names`, written before the case. */
export function harnessPrefix(names: readonly string[]): string {
  return names.map((name) => `const ${name} = $${name};\n`).join("");
}

/**
 * The first of the harness's `names` a case declares where it would clash with
 * the binding: a `var` anywhere, since one would replace the harness's name, or
 * any declaration at the case's top level. Such a case can't be bound, so it
 * isn't run.
 */
export function harnessClash(
  source: string,
  names: readonly string[],
): string | undefined {
  const file = ts.createSourceFile(
    "case.js",
    source,
    ts.ScriptTarget.ESNext,
    true,
  );
  let found: string | undefined;
  const visit = (node: ts.Node): void => {
    if (found !== undefined) return;
    const named =
      (ts.isVariableDeclaration(node) || ts.isFunctionDeclaration(node)) &&
      node.name !== undefined &&
      ts.isIdentifier(node.name) &&
      names.includes(node.name.text)
        ? node.name.text
        : undefined;
    if (named !== undefined) {
      const list = ts.isVariableDeclaration(node) ? node.parent : undefined;
      const isVar =
        list !== undefined &&
        ts.isVariableDeclarationList(list) &&
        (list.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) === 0;
      const statement = ts.isVariableDeclaration(node)
        ? node.parent.parent
        : node;
      if (isVar || ts.isSourceFile(statement.parent)) {
        found = named;
        return;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}
