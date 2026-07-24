import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join } from "node:path";
import { describe, it } from "node:test";
import { matchFileSnapshot } from "./matchFileSnapshot.ts";

// Typechecks the fixtures with `backtick-tsc` — the language tooling itself —
// and snapshots each fixture's diagnostics to a sibling `*.typecheck` file,
// for the `valid` fixtures (whose snapshots stay clean) and the
// `typecheck-error` ones (which pin deliberate type errors). The diagnostics
// are the user-facing report: mapped to fixture source coordinates, mangled
// script names restored, and diagnostics from suppressed mappings (a
// condition's bare duplicate) dropped.
//
// One invocation covers every fixture, mirroring `fixtures/tsconfig.json` on
// the command line (`--ignoreConfig` skips the file itself, which exists for
// the editor). There are no intrinsic
// elements: fixtures that use JSX declare their own components.
const fixturesRoot = join(import.meta.dirname, "fixtures");
const dirNames = ["valid", "typecheck-error"];

const fixturesByDir = new Map(
  dirNames.map((dirName) => [
    dirName,
    readdirSync(join(fixturesRoot, dirName))
      .filter(
        (file) =>
          [".ts", ".tsx"].includes(extname(file)) &&
          !file.includes(".virtual.tsx"),
      )
      .sort(),
  ]),
);

const require = createRequire(import.meta.url);

function runBacktickTsc(): string {
  const args = [
    require.resolve("@backtickjs/tsc/bin/backtick-tsc.js"),
    "--noEmit",
    "--ignoreConfig",
    // Plain output always: under an interactive turbo run (a TTY, or the
    // FORCE_COLOR it sets), tsc auto-enables pretty colored diagnostics,
    // which parse as nothing below.
    "--pretty",
    "false",
    "--target",
    "esnext",
    "--module",
    "esnext",
    "--moduleResolution",
    "bundler",
    "--jsx",
    "react-jsx",
    "--jsxImportSource",
    "@backtickjs/core",
    "--strict",
    "--skipLibCheck",
    ...[...fixturesByDir].flatMap(([dirName, files]) =>
      files.map((file) => `${dirName}/${file}`),
    ),
  ];
  try {
    return execFileSync(process.execPath, args, {
      cwd: fixturesRoot,
      encoding: "utf8",
    });
  } catch (error) {
    // tsc exits 2 when it reports diagnostics; the output still carries
    // them. Any other failure — a crash exits 1 with an empty stdout —
    // must not read as "no diagnostics" (an UPDATE_SNAPSHOTS run would
    // silently blank every snapshot).
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

// Parse tsc's plain output back into per-fixture reports: a diagnostic line
// is `<path>(<line>,<col>): <category> TS<code>: <message>`, followed by
// indented message-chain continuations. Anything else is unexpected and
// asserted against below.
const diagnosticLine = /^(.+?)\((\d+),(\d+)\): (error|warning) (TS\d+): (.*)$/;

const reports = new Map<string, string[]>();
const unexpected: string[] = [];
{
  let current: string[] | null = null;
  for (const line of runBacktickTsc().split("\n")) {
    const match = diagnosticLine.exec(line);
    if (match) {
      const [, path, lineNumber, column, category, code, message] = match;
      const report = reports.get(path) ?? [];
      reports.set(path, report);
      report.push(`${lineNumber}:${column} ${category} ${code}: ${message}`);
      current = report;
    } else if (current && /^\s+\S/.test(line)) {
      current[current.length - 1] += `\n${line.trimEnd()}`;
    } else if (line.trim() !== "") {
      unexpected.push(line);
      current = null;
    } else {
      current = null;
    }
  }
  // Output that doesn't parse must abort an update run before any snapshot
  // is written: unparsed diagnostics would blank every snapshot to
  // "No diagnostics.".
  if (process.env.UPDATE_SNAPSHOTS && unexpected.length > 0) {
    throw new Error(
      `backtick-tsc output didn't parse; refusing to update snapshots:\n` +
        unexpected.slice(0, 5).join("\n"),
    );
  }
}

function renderTypecheck(dirName: string, file: string): string {
  const report = reports.get(`${dirName}/${file}`);
  if (!report) {
    return "No diagnostics.\n";
  }
  return `${report.join("\n")}\n`;
}

describe("typecheck", () => {
  for (const [dirName, files] of fixturesByDir) {
    describe(dirName, () => {
      for (const file of files) {
        it(file, () => {
          const base = file.slice(0, -extname(file).length);
          matchFileSnapshot(
            renderTypecheck(dirName, file),
            join(fixturesRoot, dirName, `${base}.typecheck`),
          );
        });
      }
    });
  }

  // Every reported diagnostic must belong to a fixture: a stray line is a
  // program-level error (bad option, unresolved import) or a format drift
  // the parser missed.
  it("attributes every diagnostic to a fixture", () => {
    assert.deepStrictEqual(unexpected, []);
    const known = new Set(
      [...fixturesByDir].flatMap(([dirName, files]) =>
        files.map((file) => `${dirName}/${file}`),
      ),
    );
    assert.deepStrictEqual(
      [...reports.keys()].filter((path) => !known.has(path)),
      [],
    );
  });
});
