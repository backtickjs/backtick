import type ts from "typescript";
import type { Diagnostic } from "./diagnostics.js";
import type { ClientScript, ParsedFile } from "./parseFile.js";
import { programOf } from "./programOf.js";

// TypeScript's codes for a `const`, `let`, class or enum used before its
// declaration.
const USED_BEFORE_DECLARATION = new Set([2448, 2449, 2450]);

/**
 * Splices that read a host binding before its declaration, as TypeScript
 * reports it. A splice is read when its `cs` line runs, as a template's spans
 * are, so in the host file as written TypeScript already reads each `${…}`
 * where it runs. Only `$name` is template text: it's checked as `${name}`.
 *
 * The virtual code checks a splice where the script reads it, which is right
 * outside the script's functions, where TypeScript reports it already. In
 * one, TypeScript takes the read as made when the function is called: only
 * those are reported here.
 */
export function splicesReadEarly(
  ts: typeof import("typescript"),
  { sourceFile, scripts }: ParsedFile,
): Diagnostic[] {
  // Each splice's host code, and whether a script reads it in a function of
  // its own, the splice's script or one it's nested in.
  const splices: { start: number; end: number; inFunction: boolean }[] = [];
  // Each `$name`, and the name.
  const unbraced: { start: number; end: number; name: string }[] = [];
  const visit = (script: ClientScript, inFunction: boolean): void => {
    for (const splice of Object.values(script.splices)) {
      const read =
        inFunction ||
        splice.refs.some((ref) => ts.findAncestor(ref, ts.isFunctionLike));
      if (splice.kind === "braced") {
        const start = splice.expression.getStart(sourceFile);
        splices.push({
          start,
          end: splice.expression.getEnd(),
          inFunction: read,
        });
        splice.scripts.forEach((nested) => visit(nested, read));
      } else {
        const { start, end } = script.toSourceRange(splice.refs[0]!);
        splices.push({ start, end, inFunction: read });
        unbraced.push({ start, end, name: splice.expression.text });
      }
    }
  };
  scripts.forEach((script) => visit(script, false));
  unbraced.sort((a, b) => a.start - b.start);

  let text = "";
  let at = 0;
  for (const { start, end, name } of unbraced) {
    text += `${sourceFile.text.slice(at, start)}\${${name}}`;
    at = end;
  }
  text += sourceFile.text.slice(at);

  // Where a range of the text is in the host file: each `${name}` is two
  // longer than its `$name`, and a range in one is the `$name`.
  const toSource = (from: number, to: number) => {
    let shift = 0;
    for (const { start, end } of unbraced) {
      if (from < start + shift) {
        break;
      }
      if (from < end + shift + 2) {
        return { start, end };
      }
      shift += 2;
    }
    return { start: from - shift, end: to - shift };
  };

  const file = ts.createSourceFile(
    sourceFile.fileName,
    text,
    ts.ScriptTarget.Latest,
    true,
  );
  return programOf(ts, file)
    .getSemanticDiagnostics(file)
    .flatMap((diagnostic) => {
      if (!USED_BEFORE_DECLARATION.has(diagnostic.code)) {
        return [];
      }
      const range = toSource(
        diagnostic.start!,
        diagnostic.start! + diagnostic.length!,
      );
      // The innermost splice it's in.
      const splice = splices
        .filter((each) => range.start >= each.start && range.start < each.end)
        .sort((a, b) => a.end - a.start - (b.end - b.start))[0];
      if (splice === undefined || !splice.inFunction) {
        return [];
      }
      return [
        {
          range,
          message:
            ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n") +
            " A splice is read when the `cs` line runs, even in a function " +
            "of the script.",
          category: ts.DiagnosticCategory.Error,
          code: diagnostic.code,
        },
      ];
    });
}
