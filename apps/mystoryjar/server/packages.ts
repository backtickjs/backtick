import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";

/** Package names and the versions of them a build of the app carries. */
export type Packages = Readonly<Record<string, string>>;

/** The platforms the app is built for, each with its own module map. */
export const platforms = ["ios", "android", "web"] as const;
export type Platform = (typeof platforms)[number];

/**
 * The specifiers a module map offers, read from its source without running
 * it: `export const moduleMap = { … }`, each entry `() => require("…")`, and
 * nothing else but type imports. Anything more, as a check of the platform,
 * would make what a build offers something only the phone knows, so it
 * throws.
 */
export function readModuleMap(file: string): string[] {
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
  );
  const wrong = (node: ts.Node, what: string) =>
    new Error(
      `${file}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}: ${what}`,
    );
  let map: ts.ObjectLiteralExpression | undefined;
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

// The module map Metro picks for `platform`, as it picks any file:
// `moduleMap.web.ts`, then `moduleMap.native.ts` off the web, then
// `moduleMap.ts`.
function moduleMapFile(projectRoot: string, platform: Platform): string {
  const extensions = [platform, platform === "web" ? [] : "native", []].flat();
  for (const extension of [...extensions.map((each) => `.${each}`), ""]) {
    const file = join(projectRoot, `moduleMap${extension}.ts`);
    if (existsSync(file)) return file;
  }
  throw new Error(`${projectRoot}: no moduleMap.ts`);
}

// The package a specifier is in: `react` for `react/jsx-runtime`.
function packageOf(specifier: string): string {
  const parts = specifier.split("/");
  return parts.slice(0, specifier.startsWith("@") ? 2 : 1).join("/");
}

/**
 * The versions of the packages the app's module map for `platform` offers,
 * as installed in the app at `projectRoot`: what a build made from it now
 * carries.
 */
export function installedPackages(
  projectRoot: string,
  platform: Platform,
): Packages {
  const specifiers = readModuleMap(moduleMapFile(projectRoot, platform));
  const names = [...new Set(specifiers.map(packageOf))].sort();
  return Object.fromEntries(
    names.map((name) => {
      const file = join(projectRoot, "node_modules", name, "package.json");
      const { version } = JSON.parse(readFileSync(file, "utf8")) as {
        version: string;
      };
      return [name, version];
    }),
  );
}

/**
 * A short name for a set of packages, which is a build's id: the same for the
 * same versions, so two builds that carry the same share it.
 */
export function packagesHash(packages: Packages): string {
  const sorted = Object.keys(packages)
    .sort()
    .map((name) => [name, packages[name]]);
  return createHash("sha256")
    .update(JSON.stringify(sorted))
    .digest("hex")
    .slice(0, 16);
}
