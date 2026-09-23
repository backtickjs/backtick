import { transpile } from "@backtickjs/compiler";
import ts from "typescript";
import YAML from "yaml";
import { applyEdits } from "./transforms/Edit.js";
import { assertToAssertOk } from "./transforms/assertToAssertOk.js";
import {
  harnessClash,
  harnessNames,
  harnessPrefix,
} from "./transforms/bindHarness.js";
import { dropBacktickComments } from "./transforms/dropBacktickComments.js";
import { dropNewOnTest262Error } from "./transforms/dropNewOnTest262Error.js";
import { varAsLet } from "./transforms/varAsLet.js";

type Outcome = "pass" | "fail" | "unsupported";

/**
 * What the host makes of a case: a verdict it reached itself, or the client
 * script it compiled to. A script is the client's to run once the type checker
 * accepts it; `early` names the error ECMAScript rejects it with before
 * running, so a script that has one is refused rather than run.
 */
export type Judgement =
  | { verdict: { outcome: Outcome; detail: string } }
  | {
      script: string;
      negative: boolean;
      early: string | null;
    };

/** The frontmatter keys a host has to act on. The rest is prose. */
interface Meta {
  flags?: string[];
  includes?: string[];
  negative?: { phase: "parse" | "resolution" | "runtime"; type: string };
}

// The includes the harness answers for; a case needing another is unsupported.
const HARNESS = ["compareArray.js"];

/**
 * A Test262 case, judged as the client script it is written as: a refusal is
 * the host's answer, and a script is the client's to run.
 *
 * Nothing about the case is changed but what `transforms/` changes, each
 * transform saying why it has to.
 */
export function judgeCase(name: string, source: string): Judgement {
  const meta = frontmatter(source);
  const flags = meta.flags ?? [];
  const unsupported = (detail: string): Judgement => ({
    verdict: { outcome: "unsupported", detail },
  });

  if (flags.includes("module")) {
    return unsupported("is a module, and a client script is not one");
  }
  if (flags.includes("async")) {
    return unsupported("finishes through `$DONE`, which needs promises");
  }
  const missing = (meta.includes ?? []).find((i) => !HARNESS.includes(i));
  if (missing !== undefined) {
    return unsupported(`needs the harness's ${missing}`);
  }
  const raw = flags.includes("raw");
  const bound = harnessNames(raw, meta.includes ?? []);
  const clash = harnessClash(source, bound);
  if (clash !== undefined) {
    return unsupported(
      `declares \`${clash}\`, which the harness binds for every case`,
    );
  }
  // A case ECMAScript rejects before running passes by being refused.
  const early =
    meta.negative?.phase === "parse" || meta.negative?.phase === "resolution";
  const script = applyEdits(source, [
    ...dropBacktickComments(source),
    ...(raw ? [] : assertToAssertOk(source)),
    ...(raw ? [] : dropNewOnTest262Error(source)),
    // Not in a case ECMAScript rejects before running: see `varAsLet`.
    ...(early ? [] : (varAsLet(source) ?? [])),
  ]);
  // Not a refusal of the case: a `cs` template ends at its first backtick.
  if (script.includes("`") || script.includes("${")) {
    return unsupported("holds a backtick, which a `cs` template cannot");
  }

  const block = `{\n${harnessPrefix(bound)}${script}\n}`;
  // Compiled as a module of its own only to hear what the compiler refuses.
  const module =
    'import { cs } from "@backtickjs/core";\n' +
    `export default cs\`${block}\`;\n`;

  const syntax = syntaxError(name, block);
  let refusal: string | null = null;
  if (syntax !== null) {
    refusal = describe(syntax, block);
  } else {
    const errors: ts.Diagnostic[] = [];
    try {
      transpile(
        ts,
        `${name}.ts`,
        module,
        "@backtickjs/ui-platform-sdk",
        (diagnostic) => {
          if (diagnostic.category === ts.DiagnosticCategory.Error) {
            errors.push(diagnostic);
          }
        },
      );
    } catch (error) {
      // The compiler's fault, not the case's: it should have said why instead.
      return unsupported(`crashed the compiler: ${(error as Error).message}`);
    }
    // Every kind of refusal, since the first is not always the one that
    // explains it: each once, at its first line.
    const first = new Map<string, ts.Diagnostic>();
    for (const error of errors) {
      const message = ts.flattenDiagnosticMessageText(error.messageText, " ");
      if (!first.has(message)) first.set(message, error);
    }
    refusal = first.size
      ? [...first.values()].map((error) => describe(error, module)).join("; ")
      : null;
  }

  if (refusal !== null) {
    return early
      ? { verdict: { outcome: "pass", detail: "" } }
      : unsupported(refusal);
  }
  return {
    script: block,
    negative: meta.negative?.phase === "runtime",
    early: early ? meta.negative!.type : null,
  };
}

function frontmatter(source: string): Meta {
  const block = /\/\*---([\s\S]*?)---\*\//.exec(source);
  // `yaml`, not `Bun.YAML`: Bun refuses a `[` inside a plain scalar. Line
  // breaks made `\n`, since `yaml` misses a lone `\r`, and a case about line
  // terminators writes its frontmatter in the one it is about.
  return block ? (YAML.parse(block[1]!.replace(/\r\n?/g, "\n")) as Meta) : {};
}

/**
 * What the parser refuses, which the transform does not report and
 * `backtick-tsc` does: checked on the script alone, where offsets are its own.
 */
function syntaxError(name: string, script: string): ts.Diagnostic | null {
  // A program of one file, asked only for syntax: nothing is emitted, since
  // TypeScript's emitter crashes on some of what Test262 writes.
  const fileName = `${name}.js`;
  const file = ts.createSourceFile(fileName, script, ts.ScriptTarget.ESNext);
  const program = ts.createProgram({
    rootNames: [fileName],
    options: { allowJs: true, noLib: true, noResolve: true },
    host: {
      ...ts.createCompilerHost({}),
      getSourceFile: (asked) => (asked === fileName ? file : undefined),
      fileExists: (asked) => asked === fileName,
    },
  });
  const [first] = program.getSyntacticDiagnostics(file);
  return first ?? null;
}

// The compiler's message, and the line of the case it is about. ASCII only:
// `@backtickjs/bun-plugin` garbles anything else in a file it rewrites.
function describe(error: ts.Diagnostic, module: string): string {
  const message = ts.flattenDiagnosticMessageText(error.messageText, " ");
  if (error.start === undefined) return message;
  const lineStart = module.lastIndexOf("\n", error.start) + 1;
  const lineEnd = module.indexOf("\n", error.start);
  return `${message}: ${module.slice(lineStart, lineEnd).trim()}`;
}
