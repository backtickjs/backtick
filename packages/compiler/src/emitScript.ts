import { addMapping, GenMapping, toEncodedMap } from "@jridgewell/gen-mapping";
import { eachMapping, TraceMap } from "@jridgewell/trace-mapping";
import type ts from "typescript";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution, ResolvedParam } from "./resolveBindings.js";
import { tagRoot } from "./tagRoot.js";

/** A script as the client runs it, and where its code came from. */
export interface EmittedScript {
  /**
   * The script as an expression, `($splice0, …) => body`, a parameter per
   * entry of a script's `params` (see `paramName`). Types are gone and
   * everything else, JSX included, is as the script wrote it, for the
   * framework's own compiler to read when a bundle is built. How it is
   * delivered is the bundle's to write.
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
 * A script parameter's name: its kind and its index in a script's `params`,
 * `$splice0`, `$capture1`. A script cannot bind a name starting with
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
    const edit: Edit = {
      param: paramName(param, index),
      args: [...param.bindings, ...captures].map(read),
    };
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
 * TypeScript is handed the script's text alone, as `parseFile` read it: its
 * template's escapes decoded, every `${…}` hole its placeholder. An edit is
 * found where its name stands in the host file, and the source map is moved
 * there, through the script's own offsets. The script alone, not the host file
 * blanked around it: that would make each script cost what the whole file
 * does.
 */
export function emitScript(
  ts: typeof import("typescript"),
  script: ClientScript,
  params: readonly string[],
  edits: ReadonlyMap<number, Edit>,
): EmittedScript {
  const sourceFile = script.sourceFile;

  const transformer: ts.TransformerFactory<ts.SourceFile> =
    (context) => (file) => {
      const f = context.factory;
      const editAt = (node: ts.Node) =>
        edits.get(script.toSourceOffset(node.getStart(file)));
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
      // A tag's names where the tag reads a splice: they stay as written, the
      // parameter of the arrow below.
      const asWritten = new Set<ts.Node>();
      // A tag that names a splice, `<$Card>`: JSX can't call where a tag goes,
      // so the element is the body of an arrow its tag is a parameter of, called
      // with the splice where the element stands, as any splice is read:
      // `(($Card) => <$Card …/>)($splice0())`. A capture is its value, read as
      // a tag as it is anywhere.
      const hostTag = (
        node: ts.JsxElement | ts.JsxSelfClosingElement,
      ): ts.Node | undefined => {
        const opening = ts.isJsxElement(node) ? node.openingElement : node;
        const root = tagRoot(ts, opening.tagName);
        const edit = root && editAt(root);
        if (root === undefined || edit?.args === undefined) {
          return undefined;
        }
        asWritten.add(opening.tagName);
        if (ts.isJsxElement(node)) {
          asWritten.add(node.closingElement.tagName);
        }
        const call = ts.setTextRange(
          f.createCallExpression(
            f.createParenthesizedExpression(
              f.createArrowFunction(
                undefined,
                undefined,
                [f.createParameterDeclaration(undefined, undefined, root.text)],
                undefined,
                f.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                ts.visitEachChild(node, visit, context),
              ),
            ),
            undefined,
            [edited(edit, root)],
          ),
          node,
        );
        // Among an element's children, an expression is written in braces.
        return ts.isJsxElement(node.parent) || ts.isJsxFragment(node.parent)
          ? f.createJsxExpression(undefined, call)
          : call;
      };
      const visit = (node: ts.Node): ts.Node => {
        // Types are TypeScript's to strip, after this.
        if (ts.isTypeNode(node) || asWritten.has(node)) {
          return node;
        }
        if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
          const tagged = hostTag(node);
          if (tagged !== undefined) {
            return tagged;
          }
        }
        if (ts.isIdentifier(node)) {
          const edit = editAt(node);
          return edit === undefined ? node : edited(edit, node);
        }
        // `{ count }` names a key as well as a value.
        if (ts.isShorthandPropertyAssignment(node)) {
          const edit = editAt(node.name);
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

  const output = ts.transpileModule(script.textWithPlaceholders, {
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
    map: moved(output.sourceMapText!, script),
  };
}

// A map into the script's text, moved to where each position stands in the
// host file. Named as the host file was, not relative to an output file there
// is none of, so maps from files in different directories can be combined.
function moved(map: string, script: ClientScript): string {
  const sourceFile = script.sourceFile;
  const lineStarts = [0];
  for (const line of script.textWithPlaceholders.matchAll(/\r\n|\n|\r/g)) {
    lineStarts.push(line.index + line[0].length);
  }
  // Lines are 1-based here, columns 0-based.
  const original = (line: number, column: number) => {
    const at = sourceFile.getLineAndCharacterOfPosition(
      script.toSourceOffset(lineStarts[line - 1]! + column),
    );
    return { line: at.line + 1, column: at.character };
  };
  const into = new GenMapping({ file: sourceFile.fileName });
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
      source: sourceFile.fileName,
      original: original(mapping.originalLine, mapping.originalColumn),
    });
  });
  // TypeScript's own map, with only where it points changed.
  return JSON.stringify({
    ...(JSON.parse(map) as object),
    sources: [sourceFile.fileName],
    mappings: toEncodedMap(into).mappings,
  });
}
