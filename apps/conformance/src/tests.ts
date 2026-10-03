import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";
import { parse } from "yaml";

export const TEST262 = join(import.meta.dirname, "../test262");

// ECMA-262's own tests: not `intl402`, which is ECMA-402; not `staging`, which
// is proposals; not `harness`, which tests test262's harness.
const SUITES = ["annexB", "built-ins", "language"];

export interface Test {
  // under `test/`, as test262 names it: `built-ins/Array/length.js`
  path: string;
  source: string;
  includes: string[];
  flags: string[];
  negative?: { phase: string; type: string };
}

// Every test, in order, under `filter` where one is given.
export function tests(filter = ""): Test[] {
  const root = join(TEST262, "test");
  return SUITES.flatMap((suite) =>
    readdirSync(join(root, suite), { recursive: true, withFileTypes: true })
      // A fixture is imported by the test beside it, not run on its own.
      .filter(
        (entry) =>
          entry.isFile() &&
          entry.name.endsWith(".js") &&
          !entry.name.endsWith("_FIXTURE.js"),
      )
      .map((entry) => relative(root, join(entry.parentPath, entry.name))),
  )
    .filter((path) => path.startsWith(filter))
    .sort()
    .map((path) => {
      const source = readFileSync(join(root, path), "utf8");
      // Line ends as YAML reads them: a test of line terminators may end its
      // lines with a bare CR.
      const frontMatter = /\/\*---([\s\S]*?)---\*\//.exec(source)?.[1] ?? "";
      const metadata = (parse(frontMatter.replace(/\r\n?/g, "\n")) ??
        {}) as Partial<Test>;
      return {
        path,
        source,
        includes: metadata.includes ?? [],
        flags: metadata.flags ?? [],
        ...(metadata.negative && { negative: metadata.negative }),
      };
    });
}

// Why a test can't run as a client script, or null where it can.
export function notApplicable(test: Test): string | null {
  if (test.flags.includes("noStrict")) {
    return "sloppy mode: a script is strict-mode code";
  }
  if (test.flags.includes("module")) {
    return "a module: a script is no ES module";
  }
  if (test.source.includes("`") || test.source.includes("${")) {
    return "a template literal: a script holds none";
  }
  if (test.source.includes("$262.agent")) {
    return "$262.agent: no agents in this runner";
  }
  // `$262`, `$0`: a script splices every `$` name, and no host binding is
  // named `262`.
  const unbindable = dollarNames(test.source).find((name) =>
    /^\$[0-9]/.test(name),
  );
  if (unbindable !== undefined) {
    return `${unbindable}: a splice no host binding can answer`;
  }
  return null;
}

// The `$` names a test reads, each a splice in a script. Read with
// TypeScript's scanner, so a `$` in a string or a comment is no name.
export function dollarNames(source: string): string[] {
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, true);
  scanner.setText(source);
  const names = new Set<string>();
  for (
    let kind = scanner.scan();
    kind !== ts.SyntaxKind.EndOfFileToken;
    kind = scanner.scan()
  ) {
    const text = scanner.getTokenText();
    if (kind === ts.SyntaxKind.Identifier && /^\$./.test(text)) {
      names.add(text);
    }
  }
  return [...names].sort();
}
