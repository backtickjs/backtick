import assert from "node:assert/strict";
import { mkdirSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import type { TestContext } from "node:test";
import { bundler } from "@backtickjs/bundler";
import type { BacktickElement, Spliceable } from "@backtickjs/core";
import { virtualize } from "@backtickjs/compiler";
import { evaluate, render } from "@backtickjs/web-testing";
import ts from "typescript";
import { isNode } from "./node.ts";
import { renderBundleDebug } from "./renderBundleDebug.ts";
import { renderDiagnostics } from "./renderDiagnostics.ts";
import { renderMappings } from "./renderMappings.ts";
import { renderDrawing } from "./renderMarkup.ts";
import { renderValue } from "./renderValue.ts";
import { transpileFixture } from "./transpileFixture.ts";

// Written as given: each artifact is text meant to be read in its own file.
const verbatim = [(value: unknown) => value as string];

/**
 * Records what one case of a test file compiles and bundles to, next to the
 * test: `__snapshots__/<file>/<name>.<artifact>`.
 *
 * The compiler artifacts come from the case alone — the file's imports it
 * uses, the declaration `name`, and the declarations that one reaches — so
 * they read as a fixture's did, and editing the rest of the file leaves them
 * be. The bundle artifacts come from `value`, which is what the case draws or
 * evaluates to.
 */
export async function snapshotCase(
  t: TestContext,
  name: string,
  value: Spliceable,
): Promise<void> {
  const file = t.filePath!;
  const dir = join(
    dirname(file),
    "__snapshots__",
    basename(file).replace(/\.test\.tsx$/, ""),
  );
  mkdirSync(dir, { recursive: true });
  const record = (text: string, artifact: string) =>
    t.assert.fileSnapshot(text, join(dir, `${name}.${artifact}`), {
      serializers: verbatim,
    });

  const fileName = `${name}.tsx`;
  const sourceText = caseSource(readFileSync(file, "utf8"), name);
  const { virtualCode, mappings, diagnostics } = virtualize(
    ts,
    fileName,
    sourceText,
  );
  assert.equal(
    diagnostics.length,
    0,
    renderDiagnostics(fileName, sourceText, diagnostics),
  );
  record(virtualCode, "virtual.tsx");
  record(
    renderMappings(fileName, virtualCode, sourceText, mappings),
    "sourcemap",
  );
  record(await transpileFixture(fileName, sourceText), "js");

  const bundle = await bundler.run(value);
  record(JSON.stringify(bundle, null, 2), "bundle");
  record(renderBundleDebug(bundle), "bundle-debug");
  const evaluated = await evaluate(value);
  const drawn =
    isNode(evaluated) || (Array.isArray(evaluated) && evaluated.some(isNode));
  // Rendered only once evaluating it showed it draws.
  record(
    `${drawn ? renderDrawing((await render(value as BacktickElement)).container) : renderValue(evaluated)}\n`,
    "value",
  );
}

// The source of one case: the declaration `name`, every top-level declaration
// it reaches by name — in its code or in a script's, where `$row` reaches
// `row` — and the imports those use, in file order.
function caseSource(sourceText: string, name: string): string {
  const file = ts.createSourceFile(
    "case.tsx",
    sourceText,
    ts.ScriptTarget.ESNext,
    true,
  );
  const declared = new Map<string, ts.Statement>();
  for (const statement of file.statements) {
    if (ts.isImportDeclaration(statement)) {
      continue;
    }
    for (const declaredName of namesOf(statement)) {
      declared.set(declaredName, statement);
    }
  }
  const root = declared.get(name);
  assert.ok(root, `no top-level declaration named \`${name}\``);

  const reached = new Set<ts.Statement>();
  const reach = (statement: ts.Statement): void => {
    if (reached.has(statement)) {
      return;
    }
    reached.add(statement);
    const text = statement.getText(file);
    for (const [other, declaration] of declared) {
      if (mentions(text, other)) {
        reach(declaration);
      }
    }
  };
  reach(root);

  const reachedText = [...reached].map((each) => each.getText(file)).join("\n");
  const imports = file.statements.flatMap((statement) =>
    ts.isImportDeclaration(statement)
      ? importOf(statement, file, (name) => mentions(reachedText, name))
      : [],
  );
  const declarations = file.statements
    .filter((statement) => reached.has(statement))
    .map((statement) => attached(statement, file));
  return `${[imports.join("\n"), ...declarations].join("\n\n")}\n`;
}

// An import cut down to the names a case uses, or nothing where it uses none.
function importOf(
  statement: ts.ImportDeclaration,
  file: ts.SourceFile,
  used: (name: string) => boolean,
): string[] {
  const clause = statement.importClause;
  const bindings = clause?.namedBindings;
  if (!clause || !bindings || !ts.isNamedImports(bindings) || clause.name) {
    return namesOf(statement).some(used) ? [statement.getText(file)] : [];
  }
  const kept = bindings.elements.filter((element) => used(element.name.text));
  if (kept.length === 0) {
    return [];
  }
  const names = kept.map((element) => element.getText(file)).join(", ");
  const kind = clause.isTypeOnly ? "import type" : "import";
  return [
    `${kind} { ${names} } from ${statement.moduleSpecifier.getText(file)};`,
  ];
}

// A declaration with the comment written directly above it — the last block
// of its leading comments, where no blank line parts it from the code.
function attached(statement: ts.Statement, file: ts.SourceFile): string {
  const leading = file.text.slice(
    statement.getFullStart(),
    statement.getStart(file),
  );
  const blocks = leading.split(/\n[ \t]*\n/);
  const last = blocks.at(-1)!.trim();
  return last === ""
    ? statement.getText(file)
    : `${last}\n${statement.getText(file)}`;
}

function mentions(text: string, name: string): boolean {
  return new RegExp(`(?<![\\w$])\\$?${name}(?![\\w$])`).test(text);
}

function namesOf(statement: ts.Statement): string[] {
  if (ts.isImportDeclaration(statement)) {
    const clause = statement.importClause;
    const bindings = clause?.namedBindings;
    return [
      ...(clause?.name ? [clause.name.text] : []),
      ...(bindings && ts.isNamedImports(bindings)
        ? bindings.elements.map((element) => element.name.text)
        : []),
      ...(bindings && ts.isNamespaceImport(bindings)
        ? [bindings.name.text]
        : []),
    ];
  }
  if (ts.isVariableStatement(statement)) {
    return statement.declarationList.declarations.flatMap((declaration) =>
      ts.isIdentifier(declaration.name) ? [declaration.name.text] : [],
    );
  }
  if (
    (ts.isFunctionDeclaration(statement) ||
      ts.isClassDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement)) &&
    statement.name
  ) {
    return [statement.name.text];
  }
  return [];
}
