import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

/** The platforms an app is built for, each with its own module map. */
export const platforms = ["ios", "android", "web"] as const;
export type Platform = (typeof platforms)[number];

// TypeScript, loaded only to read a module map: a server reading registered
// builds never needs it.
const require = createRequire(import.meta.url);

/**
 * The specifiers a module map offers, read from its source without running
 * it: `export const moduleMap = { … }`, each entry `() => require("…")`, and
 * nothing else but type imports. Anything more, as a check of the platform,
 * would make what a build offers something only the device knows, so it
 * throws, naming the line.
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
  let map: import("typescript").ObjectLiteralExpression | undefined;
  for (const statement of source.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      statement.importClause?.isTypeOnly
    ) {
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
      "a module map holds `export const moduleMap = { … }` and type imports only",
    );
  }
  if (map === undefined) {
    throw new Error(`${file}: no \`export const moduleMap = { … }\``);
  }
  return map.properties.map((property) => {
    const entry =
      ts.isPropertyAssignment(property) &&
      (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
      ts.isArrowFunction(property.initializer) &&
      property.initializer.parameters.length === 0 &&
      ts.isCallExpression(property.initializer.body) &&
      property.initializer.body.expression.getText(source) === "require" &&
      property.initializer.body.arguments.length === 1 &&
      ts.isStringLiteral(property.initializer.body.arguments[0]!)
        ? property.name
        : undefined;
    if (entry === undefined) {
      throw wrong(property, 'each entry is `"specifier": () => require("…")`');
    }
    return entry.text;
  });
}

/**
 * The module map Metro picks for `platform` in the app at `projectRoot`, as
 * it picks any file: `moduleMap.ios.ts` (or `.android`, `.web`), then
 * `moduleMap.native.ts` off the web, then `moduleMap.ts`.
 */
export function moduleMapFile(projectRoot: string, platform: Platform): string {
  const extensions = [platform, ...(platform === "web" ? [] : ["native"])];
  for (const extension of [...extensions.map((each) => `.${each}`), ""]) {
    const file = join(projectRoot, `moduleMap${extension}.ts`);
    if (existsSync(file)) return file;
  }
  throw new Error(`${projectRoot}: no moduleMap.ts`);
}
