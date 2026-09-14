import { transpile } from "@backtickjs/compiler";
// Prettier by the path rather than the name. This suite runs under
// `--conditions=browser`, which is what makes Solid resolve to its reactive
// build rather than the inert server one (see `js-interpreter/view.ts`), and
// under that condition `prettier` resolves to the standalone bundle — which
// carries no parsers and can't format TypeScript. The condition is the
// interpreter's, so the name it breaks names its build instead.
import prettier from "prettier/index.mjs";
import ts from "typescript";

export async function transpileFixture(
  fileName: string,
  sourceText: string,
): Promise<string> {
  // The options live in the compiler, so what the bundle suite executes is what
  // a playground example compiles to rather than merely what it looks like.
  // Which target, though, is this suite's: the fixtures draw with the web one.
  const outputText = transpile(
    ts,
    fileName,
    sourceText,
    "@backtickjs/web-client",
  );
  // Every script's metadata carries the toolchain version, which would rewrite
  // all of these snapshots on each release. Pinned to one value so a version
  // bump doesn't bury the diff that release actually made. Matched on a semver
  // shape so a fixture of its own with a `version` property is left alone.
  const pinned = outputText.replace(
    /version: "\d+\.\d+\.\d+[^"]*"/g,
    'version: "0.0.0"',
  );
  // The emitted runtime tree prints as one long line per script; formatted,
  // the snapshot reads like code.
  return prettier.format(pinned, { parser: "typescript" });
}
