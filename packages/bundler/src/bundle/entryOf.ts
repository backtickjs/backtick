import type { ModuleImport, ScriptModule } from "@backtickjs/client-script";

/**
 * A script's module as its bundle entry: one expression answering with what the
 * module exports by default, having run whatever else it holds, in order. Its
 * imports read the modules the client registered under `$modules`, and its
 * export is held rather than returned, since a framework's compiler may write
 * more after it.
 */
export function entryOf(module: ScriptModule): string {
  const edits: [start: number, end: number, text: string][] = [
    ...module.imports.map(
      (declaration) =>
        [...declaration.range, bound(declaration)] as [number, number, string],
    ),
    [
      module.exportAt,
      module.exportAt + "export default ".length,
      "const $entry = ",
    ],
  ];
  let code = module.code;
  for (const [start, end, text] of edits.sort((a, b) => b[0] - a[0])) {
    code = code.slice(0, start) + text + code.slice(end);
  }
  return `(() => {\n${code.trimEnd()}\nreturn $entry;\n})()`;
}

// An import as reads of the module the client registered under its specifier.
function bound(declaration: ModuleImport): string {
  const module = `$modules[${JSON.stringify(declaration.from)}]`;
  const namespace = declaration.bindings.find(({ name }) => name === "*");
  const named = declaration.bindings.filter(({ name }) => name !== "*");
  const reads: string[] = [];
  if (namespace !== undefined) {
    reads.push(`const ${namespace.local} = ${module};`);
  }
  if (named.length > 0 || namespace === undefined) {
    const members = named.map(({ name, local }) =>
      name === local ? name : `${JSON.stringify(name)}: ${local}`,
    );
    reads.push(`const { ${members.join(", ")} } = ${module};`);
  }
  return reads.join(" ");
}
