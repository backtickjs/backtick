import assert from "node:assert";
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { basename, join } from "node:path";
import { describe, it } from "node:test";
import { isPorted } from "./unported.ts";

const require = createRequire(import.meta.url);
const testsRoot = import.meta.dirname;

// `backtick-tsc` over a project: the diagnostics it reports, as plain text.
function backtickTsc(project: string): string {
  try {
    return execFileSync(
      process.execPath,
      [
        require.resolve("@backtickjs/tsc/bin/backtick-tsc.js"),
        "--project",
        project,
        "--pretty",
        "false",
      ],
      { cwd: join(project, ".."), encoding: "utf8" },
    );
  } catch (error) {
    // tsc exits 2 when it reports diagnostics, and anything else is a crash,
    // which must not read as a report.
    const { status, stdout, stderr } = error as {
      status?: number;
      stdout?: string;
      stderr?: string;
    };
    if (status === 2 && typeof stdout === "string") {
      return stdout;
    }
    throw new Error(
      `backtick-tsc failed (status ${status}): ${stderr || stdout}`,
      { cause: error },
    );
  }
}

// The `.tsx` tests hold their cases as code, which has to typecheck the way a
// user's would: through `backtick-tsc`, with the project `test/tsconfig.json`
// describes. A deliberate type error is written under `@ts-expect-error`, so
// one that stops being an error is reported too.
describe("typecheck the .tsx tests", () => {
  it("reports nothing", () => {
    // Nothing from a directory not yet moved (see `unported.ts`): an error
    // and the indented lines of its message chain.
    const reported = backtickTsc(join(testsRoot, "tsconfig.json"))
      .split(/\n(?=\S)/)
      .filter((report) => report.trim() !== "" && isPorted(report))
      .join("\n");
    assert.equal(reported, "");
  });
});

// A directive only says a line has some error. What `backtick-tsc` reports for
// the type errors — which error, where, and in what words — is recorded from a
// copy whose directives are plain comments of the same length, so every
// position is the source's.
const errorsDir = join(testsRoot, "typecheck-errors");
const copyDir = join(testsRoot, "..", ".cache", "typecheck-errors");
const directive = "// @ts-expect-error";
const files = readdirSync(errorsDir)
  .filter((file) => file.endsWith(".test.tsx"))
  .sort();

rmSync(copyDir, { recursive: true, force: true });
mkdirSync(copyDir, { recursive: true });
const sources = new Map<string, string>();
for (const file of files) {
  const source = readFileSync(join(errorsDir, file), "utf8");
  sources.set(file, source);
  writeFileSync(
    join(copyDir, file),
    source.replaceAll(directive, "//  ts-expect-error"),
  );
}
writeFileSync(
  join(copyDir, "tsconfig.json"),
  JSON.stringify({
    extends: join(testsRoot, "tsconfig.json"),
    include: ["./*.test.tsx"],
    exclude: [],
  }),
);

// `<file>(<line>,<column>): error TS<code>: <message>`, then any indented
// lines of the message chain.
const diagnosticLine = /^(.+?)\((\d+),(\d+)\): (error TS\d+: .*)$/;
const reports = new Map<string, { line: number; text: string }[]>();
const unparsed: string[] = [];
{
  let last: { line: number; text: string } | undefined;
  for (const line of backtickTsc(join(copyDir, "tsconfig.json")).split("\n")) {
    const match = diagnosticLine.exec(line);
    if (match) {
      const [, path, lineNumber, column, text] = match;
      const report = reports.get(basename(path)) ?? [];
      reports.set(basename(path), report);
      last = {
        line: Number(lineNumber),
        text: `${lineNumber}:${column} ${text}`,
      };
      report.push(last);
    } else if (last && /^\s+\S/.test(line)) {
      last.text += `\n${line.trimEnd()}`;
    } else if (line.trim() !== "") {
      unparsed.push(line);
    }
  }
}

// Written as given: each report is text meant to be read in its own file.
const verbatim = [(value: unknown) => value as string];

describe("the type errors", { skip: !isPorted("typecheck-errors") }, () => {
  it("are all reported against a file", () => {
    assert.deepStrictEqual(unparsed, []);
    assert.deepStrictEqual(
      [...reports.keys()].filter((file) => !sources.has(file)),
      [],
    );
  });

  for (const file of files) {
    it(file, (t) => {
      const report = reports.get(file) ?? [];
      // Lines, 1-based, each directive covers: the one below it.
      const covered = sources
        .get(file)!
        .split("\n")
        .flatMap((line, index) =>
          line.trimStart().startsWith(directive) ? [index + 2] : [],
        );
      const reported = new Set(report.map(({ line }) => line));
      assert.deepStrictEqual(
        [...reported].filter((line) => !covered.includes(line)),
        [],
        "an error on a line no directive covers",
      );
      assert.deepStrictEqual(
        covered.filter((line) => !reported.has(line)),
        [],
        "a directive over a line with no error",
      );
      t.assert.fileSnapshot(
        `${report.map(({ text }) => text).join("\n")}\n`,
        join(
          errorsDir,
          "__snapshots__",
          `${basename(file, ".test.tsx")}.typecheck`,
        ),
        { serializers: verbatim },
      );
    });
  }
});
