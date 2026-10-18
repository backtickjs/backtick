import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

/** The platforms an app is built for, each with its own module map. */
export const platforms = ["ios", "android", "web"] as const;
export type Platform = (typeof platforms)[number];

// TypeScript, loaded only to read a module map: a server reading the
// modules a build sent never needs it.
const require = createRequire(import.meta.url);

/**
 * The specifiers a module map offers, read from its source without running
 * it: imports, and `export const moduleMap = { … }`, each entry
 * `"specifier": Name` with `Name` bound by an import. Anything more, as a
 * check of the platform, would make what a build offers something only the
 * device knows, so it throws, naming the line.
 */
export function readModuleMap(file: string): string[] {
  const ts = require("typescript") as typeof import("typescript");
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
  );
  const wrong = (node: import("typescript").Node, what: string) => {
    const { line } = source.getLineAndCharacterOfPosition(
      node.getStart(source),
    );
    return new Error(`${file}:${line + 1}: ${what}`);
  };
  const imported = new Set<string>();
  let map: import("typescript").ObjectLiteralExpression | undefined;
  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement)) {
      const clause = statement.importClause;
      if (clause !== undefined && !clause.isTypeOnly) {
        if (clause.name !== undefined) imported.add(clause.name.text);
        const bindings = clause.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) {
          imported.add(bindings.name.text);
        } else if (bindings !== undefined) {
          for (const element of bindings.elements) {
            if (!element.isTypeOnly) imported.add(element.name.text);
          }
        }
      }
      continue;
    }
    const declaration = ts.isVariableStatement(statement)
      ? statement.declarationList.declarations[0]
      : undefined;
    let value = declaration?.initializer;
    if (value !== undefined && ts.isSatisfiesExpression(value)) {
      value = value.expression;
    }
    if (
      map === undefined &&
      declaration?.name.getText(source) === "moduleMap" &&
      value !== undefined &&
      ts.isObjectLiteralExpression(value)
    ) {
      map = value;
      continue;
    }
    throw wrong(
      statement,
      "a module map holds imports and `export const moduleMap = { … }` only",
    );
  }
  if (map === undefined) {
    throw new Error(file + ": no `export const moduleMap = { … }`");
  }
  return map.properties.map((property) => {
    const entry =
      ts.isPropertyAssignment(property) &&
      (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
      ts.isIdentifier(property.initializer) &&
      imported.has(property.initializer.text)
        ? property.name
        : undefined;
    if (entry === undefined) {
      throw wrong(
        property,
        'each entry is `"specifier": Name`, with `Name` imported above',
      );
    }
    return entry.text;
  });
}

/**
 * Where the app at `projectRoot` keeps its own code, and so its module maps:
 * the folder `package.json` names, as `"backtick": { "clientRoot": "client" }`,
 * or the project root.
 */
export function clientRootOf(projectRoot: string): string {
  const file = join(projectRoot, "package.json");
  const { backtick } = existsSync(file)
    ? (JSON.parse(readFileSync(file, "utf8")) as {
        backtick?: { clientRoot?: string };
      })
    : {};
  return join(projectRoot, backtick?.clientRoot ?? ".");
}

/**
 * The module map Metro picks for `platform` in the app at `projectRoot`, as
 * it picks any file: `moduleMap.ios.ts` (or `.android`, `.web`), then
 * `moduleMap.native.ts` off the web, then `moduleMap.ts`, in its client root.
 */
export function moduleMapFile(projectRoot: string, platform: Platform): string {
  const clientRoot = clientRootOf(projectRoot);
  const extensions = [platform, ...(platform === "web" ? [] : ["native"])];
  for (const extension of [...extensions.map((each) => `.${each}`), ""]) {
    const file = join(clientRoot, `moduleMap${extension}.ts`);
    if (existsSync(file)) return file;
  }
  throw new Error(`${clientRoot}: no moduleMap.ts`);
}
