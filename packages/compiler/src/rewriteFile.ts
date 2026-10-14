import type ts from "typescript";
import type { Diagnostic } from "./diagnostics.js";
import { flattenScripts } from "./flattenScripts.js";
import { hashText } from "./hashText.js";
import { hostElementDiagnostics } from "./hostElements.js";
import type { ParsedFile } from "./parseFile.js";
import { type BindingResolution, resolveBindings } from "./resolveBindings.js";
import { type RewrittenScript, rewriteScript } from "./rewriteScript.js";

export interface RewrittenFile {
  sourceFile: ts.SourceFile;
  scripts: Map<ts.TaggedTemplateExpression, RewrittenScript>;
  // every script's own bindings, by identifier (see `resolveBindings`)
  bindings: BindingResolution;
  // the scripts' identifiers that read a host binding (see `resolveBindings`)
  hostReferences: Set<ts.Identifier>;
  diagnostics: Diagnostic[];
}

export function rewriteFile(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
): RewrittenFile {
  const sourceFile = parsedFile.sourceFile;

  const scripts = new Map<ts.TaggedTemplateExpression, RewrittenScript>();
  const diagnostics: Diagnostic[] = [];

  // One hash per file, shared by binding keys and script locations: both need
  // to distinguish this file from a same-named file in another codebase.
  const fileHash = hashText(sourceFile.text);

  const { bindings, hostReferences, params } = resolveBindings(
    ts,
    parsedFile,
    fileHash,
  );

  for (const script of flattenScripts(parsedFile.scripts)) {
    const rewritten = rewriteScript(
      ts,
      script,
      fileHash,
      bindings,
      params.get(script),
    );
    scripts.set(script.sourceNode, rewritten);
    diagnostics.push(...rewritten.diagnostics);
  }

  diagnostics.push(...hostElementDiagnostics(ts, sourceFile));

  return { sourceFile, scripts, bindings, hostReferences, diagnostics };
}
