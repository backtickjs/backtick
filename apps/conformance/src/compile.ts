import vm from "node:vm";
import { bundler } from "@backtickjs/bundler";
import { transpile } from "@backtickjs/compiler";
import * as core from "@backtickjs/core";
import ts from "typescript";
import { dollarNames, type Test } from "./tests.ts";

// A test's text as the body of one client script, `cs\`{ … }\``, in a host
// module of its own; compiled by Backtick, bundled for the client.
//
// Each `$` name the test reads (`$DONE`, `$DONOTEVALUATE`) is, in a script, a
// host binding spliced: the host module declares it a client import from
// `test262`, a module the client provides with the harness's globals.
export type Compiled =
  | { bundle: string; imports: string[] }
  | { refused: string[] };

export async function compile(test: Test): Promise<Compiled> {
  const imports = dollarNames(test.source);
  const host = [
    `import { cs, createImport } from "@backtickjs/core";`,
    ...imports.map(
      (name) =>
        `const ${name.slice(1)} = createImport({ name: ${JSON.stringify(name)}, from: "test262", version: "^1.0.0" });`,
    ),
    `export default cs\`{\n${test.source}\n}\`;`,
  ].join("\n");

  const refused: string[] = [];
  const code = transpile(
    ts,
    `${test.path}.ts`,
    host,
    "@backtickjs/core",
    (diagnostic) => {
      if (diagnostic.category === ts.DiagnosticCategory.Error) {
        refused.push(
          ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
        );
      }
    },
  );
  if (refused.length > 0) {
    return { refused };
  }

  // The host module, run here as the server runs it: its default export is
  // the script.
  const module = new vm.SourceTextModule(code, { identifier: test.path });
  await module.link(
    () =>
      new vm.SyntheticModule(Object.keys(core), function () {
        for (const [name, value] of Object.entries(core)) {
          this.setExport(name, value);
        }
      }),
  );
  await module.evaluate();
  const script = (module.namespace as { default: core.Spliceable }).default;

  const built = await bundler.build({
    input: script,
    external: { test262: "1.0.0" },
  });
  return { bundle: built.generate({ format: "es" }).code, imports };
}
