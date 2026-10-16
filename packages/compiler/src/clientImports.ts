import type ts from "typescript";
import type { Segment } from "./segmentsToString.js";

// `import { View } from "react-native" with { backtick: "client" }`, an import
// of what the client provides. The server never loads the module: each name
// is a client import of it, typed `Client<…>` by the module's own declarations.
// A type-only one is left to TypeScript, which refuses attributes on it.

export function isClientImportDeclaration(
  ts: typeof import("typescript"),
  node: ts.Node,
): node is ts.ImportDeclaration & { moduleSpecifier: ts.StringLiteral } {
  return (
    ts.isImportDeclaration(node) &&
    node.importClause?.isTypeOnly !== true &&
    (node.attributes?.elements.some(
      (attribute) =>
        attribute.name.text === "backtick" &&
        ts.isStringLiteral(attribute.value) &&
        attribute.value.text === "client",
    ) ??
      false)
  );
}

// One name a client import binds, by the module's name for it: `default` for
// a default import, `*` for a namespace.
interface Binding {
  name: string;
  // where the module's name is written, if it is
  written: ts.ModuleExportName | undefined;
  local: ts.Identifier;
  isType: boolean;
}

function bindingsOf(
  ts: typeof import("typescript"),
  declaration: ts.ImportDeclaration,
): Binding[] {
  const clause = declaration.importClause;
  const named = clause?.namedBindings;
  const bindings: Binding[] = [];
  if (clause?.name !== undefined) {
    const local = clause.name;
    bindings.push({
      name: "default",
      written: undefined,
      local,
      isType: false,
    });
  }
  if (named !== undefined && ts.isNamespaceImport(named)) {
    const local = named.name;
    bindings.push({ name: "*", written: undefined, local, isType: false });
  }
  if (named !== undefined && ts.isNamedImports(named)) {
    for (const element of named.elements) {
      const written = element.propertyName ?? element.name;
      bindings.push({
        name: written.text,
        written,
        local: element.name,
        isType: element.isTypeOnly,
      });
    }
  }
  return bindings;
}

// For the typechecker, each name mapped back to where it's written: the
// values destructured from the module's exports as client imports, so the
// editor goes from a name to where the module declares it; a namespace a
// client import of the whole module; a type imported from the module.
export function virtualClientImport(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  declaration: ts.ImportDeclaration,
): Segment[] {
  const at = (node: ts.Node): Segment => [
    node.getText(sourceFile),
    undefined,
    node.getStart(sourceFile),
    node.getEnd() - node.getStart(sourceFile),
  ];
  const from = at(declaration.moduleSpecifier);
  const bindings = bindingsOf(ts, declaration);
  const values = bindings.filter(({ name, isType }) => !isType && name !== "*");
  const statements: Segment[][] = [];
  if (values.length > 0) {
    statements.push([
      "declare const { ",
      ...values.flatMap(({ written, local }, index): Segment[] => [
        ...(index > 0 ? [", "] : []),
        ...(written === undefined
          ? ["default: "]
          : written.getText(sourceFile) === local.text
            ? []
            : [at(written), ": "]),
        at(local),
      ]),
      ' }: import("@backtickjs/core").ClientModule<typeof import(',
      from,
      ")>;",
    ]);
  }
  for (const { name, written, local, isType } of bindings) {
    if (name === "*") {
      statements.push([
        "declare const ",
        at(local),
        ': import("@backtickjs/core").Client<typeof import(',
        from,
        ")>;",
      ]);
    } else if (isType) {
      statements.push([
        "import type { ",
        at(written!),
        " as ",
        at(local),
        " } from ",
        from,
        ";",
      ]);
    }
  }
  return statements.flatMap((statement, index) =>
    index === 0 ? statement : [" ", ...statement],
  );
}

// The package a module specifier is in: `react` for `react/jsx-runtime`.
export function packageOf(specifier: string): string {
  const segments = specifier.split("/");
  return segments.slice(0, specifier.startsWith("@") ? 2 : 1).join("/");
}

// The version of its package a client import is typed against: as installed
// where the importing file finds it, up its directories as `tsc` finds a config.
export function installedVersion(
  ts: typeof import("typescript"),
  specifier: string,
  fileName: string,
): string | undefined {
  const manifest = ts.findConfigFile(
    ts.sys.resolvePath(fileName),
    ts.sys.fileExists,
    `node_modules/${packageOf(specifier)}/package.json`,
  );
  if (manifest === undefined) return undefined;
  const { version } = JSON.parse(ts.sys.readFile(manifest)!) as {
    version: string;
  };
  return version;
}

// For the runtime, a constant per value it names, in the declaration's place:
// `const View = { "@backtickjs": "ClientImport", name: "View", from:
// "react-native", version: "0.86.3" }`, core's `ClientImport`.
export function runtimeClientImport(
  ts: typeof import("typescript"),
  declaration: ts.ImportDeclaration & { moduleSpecifier: ts.StringLiteral },
  version: string,
): ts.Statement[] {
  const f = ts.factory;
  const property = (key: string | ts.PropertyName, value: string) =>
    f.createPropertyAssignment(key, f.createStringLiteral(value));
  return bindingsOf(ts, declaration)
    .filter(({ isType }) => !isType)
    .map(({ name, local }) =>
      // Still the import it replaces, which `transform` places scripts after.
      ts.setOriginalNode(
        f.createVariableStatement(
          undefined,
          f.createVariableDeclarationList(
            [
              f.createVariableDeclaration(
                local.text,
                undefined,
                undefined,
                f.createObjectLiteralExpression([
                  property(
                    f.createStringLiteral("@backtickjs"),
                    "ClientImport",
                  ),
                  property("name", name),
                  property("from", declaration.moduleSpecifier.text),
                  property("version", version),
                ]),
              ),
            ],
            ts.NodeFlags.Const,
          ),
        ),
        declaration,
      ),
    );
}
