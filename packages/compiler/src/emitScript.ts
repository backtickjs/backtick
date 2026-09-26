import type ts from "typescript";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution, ResolvedParam } from "./resolveBindings.js";

/** A script as the client runs it, and where its code came from. */
export interface EmittedScript {
  /**
   * The script as an expression, `($0, …) => body`, a parameter per entry of
   * `metadata.params`. Types are gone and everything else, JSX included, is
   * as the script wrote it, for the framework's own compiler to read when a
   * bundle is built. How it is delivered is the bundle's to write.
   */
  readonly code: string;
  /**
   * The code's source map, into the host file. It carries no
   * `sourcesContent`: the host file is the server's, and a map is shipped.
   */
  readonly map: string;
}

/**
 * What a name the script wrote becomes: one of its entry's parameters, called
 * with the bindings a hole hands over where it has `args`, read as it is where
 * not.
 */
export interface Edit {
  readonly param: number;
  readonly args?: readonly string[];
}

// A binding key as `resolveBindings` writes it, `<name>$<fileHash>$<n>`, back
// to the name the script wrote.
function sourceName(key: string): string {
  return key.replace(/\$[0-9a-z]+\$\d+$/, "");
}

/**
 * The edits a script's text needs, by the host-file offset of what each
 * replaces: every splice it reads, host tags among them, and every binding it
 * captures. What is a reference, and each parameter's number, was decided by
 * `resolveBindings`.
 */
export function scriptEdits(
  script: ClientScript,
  bindings: BindingResolution,
  params: readonly ResolvedParam[],
): Map<number, Edit> {
  const captureParam = new Map(
    params.flatMap((param, index) =>
      param.kind === "capture" ? [[param.key, index] as const] : [],
    ),
  );
  const captures = [...captureParam.keys()];
  const read = (key: string): string => {
    const index = captureParam.get(key);
    return index === undefined ? sourceName(key) : `$${index}`;
  };

  const edits = new Map<number, Edit>();
  const at = (identifier: ts.Identifier) =>
    script.toSourceRange(identifier).start;
  params.forEach((param, index) => {
    if (param.kind === "capture") {
      return;
    }
    // A tag is handed over as the value it names: it has no bindings to hand
    // its hole, and JSX cannot write a call where a tag goes.
    const edit: Edit =
      param.kind === "tag"
        ? { param: index }
        : { param: index, args: [...param.bindings, ...captures].map(read) };
    for (const ref of param.refs) {
      edits.set(at(ref), edit);
    }
  });
  for (const [identifier, key] of bindings) {
    const index = captureParam.get(key);
    if (
      index !== undefined &&
      identifier.getSourceFile() === script.fileWithPlaceholders
    ) {
      edits.set(at(identifier), { param: index });
    }
  }
  return edits;
}

/**
 * Emits a script's code by compiling its own text with TypeScript, with
 * `edits` applied.
 *
 * TypeScript is handed the host file with everything but the script blanked
 * and every `${…}` hole replaced by `0` padded to the same length, newlines
 * kept, so a position in what it parses is the same position in the host file:
 * its source map points into the host file as it stands, and an edit is found
 * by where it starts.
 */
export function emitScript(
  ts: typeof import("typescript"),
  script: ClientScript,
  params: number,
  edits: ReadonlyMap<number, Edit>,
): EmittedScript {
  const sourceFile = script.sourceFile;
  const text = sourceFile.text;
  const template = script.sourceNode.template;
  const start = template.getStart(sourceFile) + 1; // past `
  const end = template.getEnd() - 1; // before `
  const blank = (from: number, to: number, fill = ""): string =>
    fill + text.slice(from + fill.length, to).replace(/[^\r\n]/g, " ");
  let aligned = blank(0, start);
  let at = start;
  if (ts.isTemplateExpression(template)) {
    for (const span of template.templateSpans) {
      const dollarBrace = span.expression.getFullStart() - 2;
      const afterBrace = span.literal.getStart(sourceFile) + 1;
      aligned +=
        text.slice(at, dollarBrace) + blank(dollarBrace, afterBrace, "0");
      at = afterBrace;
    }
  }
  aligned += text.slice(at, end) + blank(end, text.length);

  const transformer: ts.TransformerFactory<ts.SourceFile> =
    (context) => (file) => {
      const f = context.factory;
      const edited = (edit: Edit, from: ts.Node): ts.Expression => {
        const param = f.createIdentifier(`$${edit.param}`);
        const node =
          edit.args === undefined
            ? param
            : f.createCallExpression(
                param,
                undefined,
                edit.args.map((arg) => f.createIdentifier(arg)),
              );
        return ts.setOriginalNode(ts.setTextRange(node, from), from);
      };
      const visit = (node: ts.Node): ts.Node => {
        // Types are TypeScript's to strip, after this.
        if (ts.isTypeNode(node)) {
          return node;
        }
        if (ts.isIdentifier(node) || ts.isNumericLiteral(node)) {
          const edit = edits.get(node.getStart(file));
          return edit === undefined ? node : edited(edit, node);
        }
        // `{ count }` names a key as well as a value.
        if (ts.isShorthandPropertyAssignment(node)) {
          const edit = edits.get(node.name.getStart(file));
          if (edit !== undefined) {
            return f.createPropertyAssignment(
              node.name.text,
              edited(edit, node.name),
            );
          }
        }
        return ts.visitEachChild(node, visit, context);
      };

      const [statement] = file.statements;
      if (statement === undefined) {
        return file;
      }
      // Where the script stands, so the entry maps to it.
      const entry = ts.setTextRange(
        f.createArrowFunction(
          undefined,
          undefined,
          Array.from({ length: params }, (_, index) =>
            f.createParameterDeclaration(undefined, undefined, `$${index}`),
          ),
          undefined,
          f.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          ts.isExpressionStatement(statement)
            ? ts.visitNode(statement.expression, visit, ts.isExpression)
            : ts.visitNode(statement, visit, ts.isBlock),
        ),
        statement,
      );
      return f.updateSourceFile(file, [
        ts.setOriginalNode(f.createExpressionStatement(entry), statement),
      ]);
    };

  const output = ts.transpileModule(aligned, {
    fileName: sourceFile.fileName,
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
      sourceMap: true,
      alwaysStrict: false,
      removeComments: true,
    },
    transformers: { before: [transformer] },
  });
  // The file's one expression statement, without its `;` or the comment
  // naming a map file.
  const code = output.outputText
    .replace(/\n\/\/# sourceMappingURL=.*$/, "")
    .replace(/;\s*$/, "");
  // Named as the host file was, not relative to an output file there is none
  // of, so maps from files in different directories can be combined.
  const map = JSON.parse(output.sourceMapText!) as { sources: string[] };
  map.sources = [sourceFile.fileName];
  return { code, map: JSON.stringify(map) };
}
