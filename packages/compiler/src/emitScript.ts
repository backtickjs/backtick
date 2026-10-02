import { addMapping, GenMapping, toEncodedMap } from "@jridgewell/gen-mapping";
import { eachMapping, TraceMap } from "@jridgewell/trace-mapping";
import type ts from "typescript";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution, ResolvedParam } from "./resolveBindings.js";

/** A script as the client runs it, and where its code came from. */
export interface EmittedScript {
  /**
   * The script as an expression, `($splice0, …) => body`, a parameter per
   * entry of `metadata.params` (see `paramName`). Types are gone and everything else, JSX included, is
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
  readonly param: string;
  readonly args?: readonly string[];
}

/**
 * A script parameter's name: its kind and its index in `metadata.params`,
 * `$splice0`, `$tag1`, `$capture2`. A script cannot bind a name starting with
 * `$`, so none meets one of its own.
 */
export function paramName(param: ResolvedParam, index: number): string {
  return `$${param.kind}${index}`;
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
    return index === undefined ? sourceName(key) : `$capture${index}`;
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
    const name = paramName(param, index);
    const edit: Edit =
      param.kind === "tag"
        ? { param: name }
        : { param: name, args: [...param.bindings, ...captures].map(read) };
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
      edits.set(at(identifier), { param: `$capture${index}` });
    }
  }
  return edits;
}

/**
 * Emits a script's code by compiling its own text with TypeScript, with
 * `edits` applied.
 *
 * TypeScript is handed the script's text alone, every `${…}` hole replaced by
 * `0` padded to the same length, so a position in what it parses is the host
 * file's less where the script starts: an edit is found by where it starts,
 * and the source map is moved to where the script stands in the host file.
 * The script alone, not the host file blanked around it: that would make each
 * script cost what the whole file does.
 */
export function emitScript(
  ts: typeof import("typescript"),
  script: ClientScript,
  sourceName: string,
  params: readonly string[],
  edits: ReadonlyMap<number, Edit>,
): EmittedScript {
  const sourceFile = script.sourceFile;
  const text = sourceFile.text;
  const template = script.sourceNode.template;
  const start = template.getStart(sourceFile) + 1; // past `
  const end = template.getEnd() - 1; // before `
  const blank = (from: number, to: number, fill = ""): string =>
    fill + text.slice(from + fill.length, to).replace(/[^\r\n]/g, " ");
  let aligned = "";
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
  aligned += text.slice(at, end);

  const transformer: ts.TransformerFactory<ts.SourceFile> =
    (context) => (file) => {
      const f = context.factory;
      const edited = (edit: Edit, from: ts.Node): ts.Expression => {
        const param = f.createIdentifier(edit.param);
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
          const edit = edits.get(start + node.getStart(file));
          return edit === undefined ? node : edited(edit, node);
        }
        // `{ count }` names a key as well as a value.
        if (ts.isShorthandPropertyAssignment(node)) {
          const edit = edits.get(start + node.name.getStart(file));
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
          params.map((name) =>
            f.createParameterDeclaration(undefined, undefined, name),
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
  return {
    code,
    map: moved(output.sourceMapText!, sourceFile, sourceName, start),
  };
}

// A map into the script's text, moved to where the script starts in the host
// file: every line down by the script's line, and the script's first line
// across by its column. Named by `sourceName`, not relative to an output file
// there is none of, so maps from files in different directories can be
// combined.
function moved(
  map: string,
  sourceFile: ts.SourceFile,
  sourceName: string,
  start: number,
): string {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(start);
  const into = new GenMapping({ file: sourceName });
  eachMapping(new TraceMap(map), (mapping) => {
    if (mapping.originalLine === null) {
      addMapping(into, {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn,
        },
      });
      return;
    }
    // TypeScript writes no names, so there are none to carry.
    addMapping(into, {
      generated: {
        line: mapping.generatedLine,
        column: mapping.generatedColumn,
      },
      source: sourceName,
      // Lines are 1-based here, columns 0-based.
      original: {
        line: mapping.originalLine + line,
        column:
          mapping.originalLine === 1
            ? mapping.originalColumn + character
            : mapping.originalColumn,
      },
    });
  });
  // TypeScript's own map, with only where it points changed.
  return JSON.stringify({
    ...(JSON.parse(map) as object),
    sources: [sourceName],
    mappings: toEncodedMap(into).mappings,
  });
}
