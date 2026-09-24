import type ts from "typescript";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution } from "./resolveBindings.js";

/** A script as the client runs it, and where its code came from. */
export interface EmittedScript {
  /**
   * The script as its entry in a bundle: `($0, …) => body`, a parameter per
   * splice and then per capture, in `metadata`'s orders. Types are gone and
   * everything else, JSX included, is as the script wrote it, for the
   * framework's own compiler to read next.
   */
  readonly code: string;
  /**
   * The code's source map, into the host file. It carries no
   * `sourcesContent`: the host file is the server's, and a map is shipped.
   */
  readonly map: string;
}

// A binding key as `resolveBindings` writes it, `<name>$<fileHash>$<n>`, back
// to the name the script wrote.
function sourceName(key: string): string {
  return key.replace(/\$[0-9a-z]+\$\d+$/, "");
}

/**
 * Emits a script's code by compiling its own text with TypeScript.
 *
 * TypeScript is handed the host file with everything but the script blanked
 * and every `${…}` hole replaced by a placeholder of the same length, newlines
 * kept, so a position in what it parses is the same position in the host file.
 * Its source map then points into the host file as it stands, and the
 * compiler's own resolution, made on another parse, is matched by position.
 */
export function emitScript(
  ts: typeof import("typescript"),
  script: ClientScript,
  bindings: BindingResolution,
  spliceKeys: readonly string[],
  captures: readonly string[],
  spliceParams: { readonly [splice: string]: readonly string[] },
  hostTags: ReadonlySet<string>,
): EmittedScript {
  const sourceFile = script.sourceFile;
  const text = sourceFile.text;
  const template = script.sourceNode.template;
  const start = template.getStart(sourceFile) + 1; // past `
  const end = template.getEnd() - 1; // before `

  // Whitespace keeps lines and columns; a hole becomes `0`, which stands
  // wherever an expression does, and is known by where it starts.
  const blank = (from: number, to: number, fill = ""): string =>
    fill +
    text.slice(from + fill.length, to).replace(/[^\r\n]/g, " ");
  const holes = new Map<number, string>();
  let aligned = blank(0, start);
  let at = start;
  if (ts.isTemplateExpression(template)) {
    template.templateSpans.forEach((span, index) => {
      const dollarBrace = span.expression.getFullStart() - 2;
      const afterBrace = span.literal.getStart(sourceFile) + 1;
      aligned += text.slice(at, dollarBrace) + blank(dollarBrace, afterBrace, "0");
      holes.set(dollarBrace, `$0splice${index}`);
      at = afterBrace;
    });
  }
  aligned += text.slice(at, end) + blank(end, text.length);

  // What the compiler resolved, by where it was written.
  const keyAt = new Map<number, string>();
  for (const [identifier, key] of bindings) {
    if (identifier.getSourceFile() === script.fileWithPlaceholders) {
      keyAt.set(script.toSourceRange(identifier).start, key);
    }
  }

  const spliceIndex = new Map(spliceKeys.map((key, index) => [key, index]));
  const captureIndex = new Map(
    captures.map((key, index) => [key, spliceKeys.length + index]),
  );
  // A tag is handed over as the value it names: it has no bindings to hand
  // its hole, and JSX cannot write a call where a tag goes.
  const tagKeys = new Set(Array.from(hostTags, (name) => `$${name}`));

  const transformer: ts.TransformerFactory<ts.SourceFile> =
    (context) => (file) => {
      const f = context.factory;
      const param = (index: number) => f.createIdentifier(`$${index}`);
      const at = <T extends ts.Node>(node: T, from: ts.Node): T =>
        ts.setOriginalNode(ts.setTextRange(node, from), from);
      const read = (key: string): ts.Identifier => {
        const index = captureIndex.get(key);
        return index === undefined
          ? f.createIdentifier(sourceName(key))
          : param(index);
      };
      const splice = (key: string, from: ts.Node): ts.Expression => {
        const index = spliceIndex.get(key);
        if (index === undefined) {
          throw new Error(`This script has no \`${key}\` splice.`);
        }
        if (tagKeys.has(key)) {
          return at(param(index), from);
        }
        const args = [...(spliceParams[key] ?? []), ...captures].map(read);
        return at(f.createCallExpression(param(index), undefined, args), from);
      };
      // What a name written here means to the client, or null where it keeps
      // its own.
      const rewrite = (identifier: ts.Identifier): ts.Expression | null => {
        const key = keyAt.get(identifier.getStart(file));
        if (key !== undefined) {
          return captureIndex.has(key) ? at(read(key), identifier) : null;
        }
        return script.splices[identifier.text]?.kind === "unbraced"
          ? splice(identifier.text, identifier)
          : null;
      };
      const tag = (name: ts.JsxTagNameExpression): ts.JsxTagNameExpression => {
        if (!ts.isIdentifier(name)) {
          return name;
        }
        const key = keyAt.get(name.getStart(file));
        if (key === undefined) {
          return hostTags.has(name.text)
            ? (splice(`$${name.text}`, name) as ts.Identifier)
            : name;
        }
        return captureIndex.has(key) ? at(read(key), name) : name;
      };

      const visit = (node: ts.Node): ts.Node => {
        // Types are TypeScript's to strip, after this.
        if (ts.isTypeNode(node)) {
          return node;
        }
        if (ts.isNumericLiteral(node)) {
          const hole = holes.get(node.getStart(file));
          if (hole !== undefined) {
            return splice(hole, node);
          }
        }
        if (ts.isIdentifier(node)) {
          return rewrite(node) ?? node;
        }
        // A name in these positions is a key, not a reference.
        if (ts.isPropertyAccessExpression(node)) {
          return f.updatePropertyAccessExpression(
            node,
            ts.visitNode(node.expression, visit, ts.isExpression),
            node.name,
          );
        }
        if (ts.isPropertyAssignment(node)) {
          return f.updatePropertyAssignment(
            node,
            ts.isComputedPropertyName(node.name)
              ? ts.visitNode(node.name, visit, ts.isPropertyName)
              : node.name,
            ts.visitNode(node.initializer, visit, ts.isExpression),
          );
        }
        if (ts.isShorthandPropertyAssignment(node)) {
          const value = rewrite(node.name);
          return value === null
            ? node
            : at(f.createPropertyAssignment(node.name.text, value), node);
        }
        if (ts.isJsxAttribute(node)) {
          return f.updateJsxAttribute(
            node,
            node.name,
            node.initializer &&
              (visit(node.initializer) as ts.JsxAttributeValue),
          );
        }
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
          const attributes = ts.visitNode(
            node.attributes,
            visit,
            ts.isJsxAttributes,
          );
          return ts.isJsxOpeningElement(node)
            ? f.updateJsxOpeningElement(
                node,
                tag(node.tagName),
                node.typeArguments,
                attributes,
              )
            : f.updateJsxSelfClosingElement(
                node,
                tag(node.tagName),
                node.typeArguments,
                attributes,
              );
        }
        if (ts.isJsxClosingElement(node)) {
          return f.updateJsxClosingElement(node, tag(node.tagName));
        }
        return ts.visitEachChild(node, visit, context);
      };

      const [statement] = file.statements;
      if (statement === undefined) {
        return file;
      }
      const body = ts.isExpressionStatement(statement)
        ? ts.visitNode(statement.expression, visit, ts.isExpression)
        : ts.visitNode(statement, visit, ts.isBlock);
      const entry = f.createArrowFunction(
        undefined,
        undefined,
        [...spliceKeys, ...captures].map((_, index) =>
          f.createParameterDeclaration(undefined, undefined, `$${index}`),
        ),
        undefined,
        f.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        body,
      );
      return f.updateSourceFile(file, [
        at(f.createExpressionStatement(entry), statement),
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
  // One expression: the statement it was printed as, without its `;` and the
  // comment naming a map file.
  const code = output.outputText
    .replace(/\n\/\/# sourceMappingURL=.*$/, "")
    .trimEnd()
    .replace(/;$/, "");
  return { code, map: output.sourceMapText ?? "" };
}
