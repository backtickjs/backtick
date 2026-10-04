import type ts from "typescript";
import type { CodeInformation } from "./CodeInformation.js";
import { jsxText } from "./jsxText.js";
import type { ClientScript, Splice } from "./parseFile.js";
import type { BindingResolution } from "./resolveBindings.js";
import type { Segment } from "./segmentsToString.js";
import { mangle } from "./unmangle.js";

// What the editor reads through a wrapper the virtual code adds: nothing.
const WRAPPER: CodeInformation = { semantic: false, navigation: false };
// What it reads through a name the virtual code adds over a span of the
// script: only what is reported there. Hover and navigation stay with the
// script's own names inside it.
const REPORTED: CodeInformation = { semantic: false, navigation: false };
// A host tag's name, written as a value: everything but its color, which stays
// the tag's, as JSX colors it.
const TAG_NAME: CodeInformation = {
  semantic: { shouldHighlight: () => false },
};

/**
 * A script as the typechecker reads it: its own text, as written, wrapped as
 * `cs.lift((() => …)())`, edited only where a name means something else on
 * the client.
 *
 * - its own binding, renamed (`x` to `__cs_x`), so it can't hide a host binding
 *   a splice names; a shorthand keeps its property name (`x: __cs_x`)
 * - a name nothing declares, read as the client's global (`cs.globalThis.x`)
 * - a splice, as the host value the client is handed: `$x` as
 *   `cs.splice((x))`, `${…}` as `cs.splice(…)` around the host code
 * - a splice written as a tag, `<$Card>`, as the call it is checked as:
 *   `(void <cs.tag key={…}>{(Card)}</cs.tag>, cs.splice((Card))({ …props,
 *   children }))`, the closing tag's name the child, the `key` only where
 *   written
 *
 * Everything else, types included, is TypeScript's to read as written. Each
 * piece maps back to the text it came from; what the wrapper adds maps to no
 * editor feature.
 */
export function virtualScript(
  ts: typeof import("typescript"),
  script: ClientScript,
  bindings: BindingResolution,
  awaits: boolean,
  renderSplice: (splice: Splice) => Segment[],
): Segment[] {
  const file = script.fileWithPlaceholders;
  const text = script.textWithPlaceholders;
  const out: Segment[] = [];

  const verbatim = (from: number, to: number): void => {
    if (to > from) {
      out.push([
        text.slice(from, to),
        undefined,
        script.toSourceOffset(from),
        to - from,
      ]);
    }
  };
  const mapped = (
    written: string,
    node: ts.Node,
    data?: CodeInformation,
  ): void => {
    const { start, end } = script.toSourceRange(node);
    out.push(
      data === undefined
        ? [written, undefined, start, end - start]
        : [written, undefined, start, end - start, data],
    );
  };
  // Text the virtual code adds, reported at `at` in the host file if at all.
  const added = (written: string, at?: number, data = WRAPPER): void => {
    out.push(at === undefined ? written : [written, undefined, at, 0, data]);
  };

  const emit = (node: ts.Node, from = node.getStart(file)): void => {
    if (ts.isIdentifier(node)) {
      identifier(node);
      return;
    }
    if (
      (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) &&
      isHostTag(node)
    ) {
      hostTag(node);
      return;
    }
    const children = node.getChildren(file);
    if (children.length === 0) {
      verbatim(from, node.getEnd());
      return;
    }
    let at = from;
    for (const child of children) {
      if (child.getEnd() <= at) {
        continue;
      }
      verbatim(at, child.getStart(file));
      emit(child);
      at = child.getEnd();
    }
    verbatim(at, node.getEnd());
  };

  const identifier = (node: ts.Identifier): void => {
    if (inTypePosition(ts, node)) {
      verbatim(node.getStart(file), node.getEnd());
      return;
    }
    const splice = script.splices[node.text];
    if (splice !== undefined && splice.refs.includes(node)) {
      const range = script.toSourceRange(node);
      if (splice.kind === "braced") {
        added("cs.splice(", splice.expression.getStart(script.sourceFile));
        out.push(...renderSplice(splice));
        added(")", splice.expression.getEnd());
      } else {
        // Parenthesized, as 1-char padding: `(count)` against `$count` starts
        // the name where it follows the sigil, so a completion's replacement
        // span round-trips to the bare name.
        added("cs.splice(", range.start);
        mapped(`(${splice.expression.text})`, node);
        added(")", range.end);
      }
      return;
    }
    const parent = node.parent;
    const shorthand =
      (ts.isShorthandPropertyAssignment(parent) && parent.name === node) ||
      (ts.isBindingElement(parent) &&
        parent.name === node &&
        parent.propertyName === undefined &&
        parent.dotDotDotToken === undefined &&
        ts.isObjectBindingPattern(parent.parent));
    if (bindings.has(node)) {
      if (shorthand) {
        mapped(node.text, node);
        added(": ");
      }
      mapped(mangle(node.text), node);
      return;
    }
    if (node.text !== "undefined" && isReference(ts, node)) {
      if (shorthand) {
        mapped(node.text, node);
        added(": ");
      }
      added("cs.globalThis.");
      mapped(node.text, node);
      return;
    }
    verbatim(node.getStart(file), node.getEnd());
  };

  // A tag that splices a host value, `<$Card>`, which the client is handed
  // as a component.
  const isHostTag = (
    node: ts.JsxElement | ts.JsxSelfClosingElement,
  ): boolean => {
    const tagName = ts.isJsxElement(node)
      ? node.openingElement.tagName
      : node.tagName;
    return (
      ts.isIdentifier(tagName) &&
      script.splices[tagName.text]?.refs.includes(tagName) === true
    );
  };

  // A host tag is the call it is checked as: the host value as the client
  // sees it, given its props as JSX would give them. Each name is mapped to
  // the one written there, the closing tag's through a `void` read of it, so
  // definition, rename and references reach the host binding from either.
  // An attribute's value, as JSX gives it: `true` where none is written.
  const attributeValue = (attribute: ts.JsxAttribute): void => {
    const initializer = attribute.initializer;
    if (initializer === undefined) {
      added("true");
    } else if (ts.isJsxExpression(initializer)) {
      if (initializer.expression === undefined) {
        added("undefined");
      } else {
        emit(initializer.expression);
      }
    } else {
      emit(initializer);
    }
  };

  const hostTag = (node: ts.JsxElement | ts.JsxSelfClosingElement): void => {
    const opening = ts.isJsxElement(node) ? node.openingElement : node;
    const tagName = opening.tagName as ts.Identifier;
    const tag = script.toSourceRange(tagName);
    // The binding's name, parenthesized over its `$` as an unbraced splice is.
    const name = `(${(script.splices[tagName.text]!.expression as ts.Identifier).text})`;
    // Where JSX stands, a call is written in braces: a child of an element
    // or fragment written as JSX, or an attribute of one written as an
    // element. A host tag's own children and props are values already.
    const parent = node.parent;
    const owner = ts.isJsxAttribute(parent)
      ? parent.parent.parent
      : ts.isJsxElement(parent) || ts.isJsxFragment(parent)
        ? parent
        : undefined;
    const braced =
      owner !== undefined &&
      !(
        (ts.isJsxElement(owner) || ts.isJsxSelfClosingElement(owner)) &&
        isHostTag(owner)
      ) &&
      !(ts.isJsxOpeningElement(owner) && isHostTag(owner.parent));
    if (braced) {
      added("{");
    }
    // Beside the call, the tag as JSX on `cs.tag`: its `key`, which is JSX's
    // and not the component's, checked against the file's own
    // `JSX.IntrinsicAttributes` (React's `Key`; Solid takes none); and the
    // closing tag's name, read as the host binding, so definition, rename and
    // references reach it from there too.
    const key = opening.attributes.properties.find(
      (attribute): attribute is ts.JsxAttribute =>
        ts.isJsxAttribute(attribute) && attribute.name.getText(file) === "key",
    );
    added("(void <cs.tag");
    if (key !== undefined) {
      added(" ");
      mapped("key", key.name);
      added("={");
      attributeValue(key);
      added("}");
    }
    if (ts.isJsxElement(node)) {
      added(">{");
      mapped(name, node.closingElement.tagName, TAG_NAME);
      added("}</cs.tag>, ");
    } else {
      added(" />, ");
    }
    // The tag as a value, reported under its name: what isn't a component is
    // refused there, as JSX refuses it; so is a missing prop, the props
    // object's own braces mapped to it.
    added("cs.splice(", tag.start);
    mapped(name, tagName, TAG_NAME);
    added(")", tag.end);
    added("(");
    out.push(["{ ", undefined, tag.start, tag.end - tag.start, REPORTED]);
    for (const attribute of opening.attributes.properties) {
      if (ts.isJsxSpreadAttribute(attribute)) {
        added("...");
        emit(attribute.expression);
        added(", ");
      } else if (attribute !== key) {
        const name = attribute.name.getText(file);
        mapped(
          /^[A-Za-z_$][\w$]*$/.test(name) ? name : JSON.stringify(name),
          attribute.name,
        );
        added(": ");
        attributeValue(attribute);
        added(", ");
      }
    }
    if (ts.isJsxElement(node)) {
      const children = node.children.filter(
        (child) =>
          !(ts.isJsxText(child) && jsxText(child.text) === null) &&
          !(ts.isJsxExpression(child) && child.expression === undefined),
      );
      if (children.length > 0) {
        // Named over what it stands for, so what is said of the prop is said
        // there.
        const content = {
          start: script.toSourceOffset(node.openingElement.getEnd()),
          end: script.toSourceOffset(node.closingElement.getStart(file)),
        };
        out.push([
          "children",
          undefined,
          content.start,
          content.end - content.start,
          REPORTED,
        ]);
        added(": ");
        if (children.length > 1) {
          added("[");
        }
        children.forEach((child, index) => {
          if (index > 0) {
            added(", ");
          }
          if (ts.isJsxText(child)) {
            mapped(JSON.stringify(jsxText(child.text)), child);
          } else if (ts.isJsxExpression(child)) {
            emit(child.expression!);
          } else {
            emit(child);
          }
        });
        if (children.length > 1) {
          added("]");
        }
        added(" ");
      }
    }
    out.push(["}", undefined, tag.end, 0, REPORTED]);
    added("))");
    if (braced) {
      added("}");
    }
  };

  // The wrapper the script is checked in, mapped to what it stands for: its
  // opening to `cs\``, its close to the closing backtick, so where it meets the
  // script is where the script starts and ends. No editor feature reads
  // through it.
  const tag = script.sourceNode.getStart(script.sourceFile);
  const opened = script.sourceNode.template.getStart(script.sourceFile) + 1;
  const closed = script.sourceNode.getEnd() - 1;
  out.push([
    awaits ? "cs.lift(await (async () => " : "cs.lift((() => ",
    undefined,
    tag,
    opened - tag,
    WRAPPER,
  ]);
  emit(file, 0);
  out.push([")())", undefined, closed, 1, WRAPPER]);
  return out;
}

// Whether a name is read as a value where it stands, rather than naming a
// property, an attribute, a label or what a declaration declares.
function isReference(
  ts: typeof import("typescript"),
  node: ts.Identifier,
): boolean {
  const parent = node.parent;
  if (
    (ts.isPropertyAccessExpression(parent) ||
      ts.isPropertyAssignment(parent) ||
      ts.isMethodDeclaration(parent) ||
      ts.isPropertyDeclaration(parent) ||
      ts.isGetAccessorDeclaration(parent) ||
      ts.isSetAccessorDeclaration(parent) ||
      ts.isPropertySignature(parent) ||
      ts.isMethodSignature(parent) ||
      ts.isEnumMember(parent) ||
      ts.isJsxAttribute(parent) ||
      ts.isVariableDeclaration(parent) ||
      ts.isParameter(parent) ||
      ts.isFunctionDeclaration(parent) ||
      ts.isFunctionExpression(parent) ||
      ts.isClassDeclaration(parent) ||
      ts.isClassExpression(parent) ||
      ts.isTypeAliasDeclaration(parent) ||
      ts.isInterfaceDeclaration(parent) ||
      ts.isEnumDeclaration(parent) ||
      ts.isTypeParameterDeclaration(parent)) &&
    parent.name === node
  ) {
    return false;
  }
  if (ts.isBindingElement(parent)) {
    return false; // its name declares, its property name names a property
  }
  if (
    (ts.isLabeledStatement(parent) ||
      ts.isBreakStatement(parent) ||
      ts.isContinueStatement(parent)) &&
    parent.label === node
  ) {
    return false;
  }
  if (
    (ts.isJsxOpeningElement(parent) ||
      ts.isJsxSelfClosingElement(parent) ||
      ts.isJsxClosingElement(parent)) &&
    parent.tagName === node
  ) {
    return false; // an intrinsic element's name, or a host tag's (above)
  }
  return !(
    ts.isQualifiedName(parent) ||
    ts.isMetaProperty(parent) ||
    ts.isJsxNamespacedName(parent)
  );
}

// Whether a name stands in a type, which names types rather than values: all
// but what a `typeof` reads, and a class's `extends`.
function inTypePosition(
  ts: typeof import("typescript"),
  node: ts.Identifier,
): boolean {
  for (let at: ts.Node = node; at.parent !== undefined; at = at.parent) {
    const parent = at.parent;
    if (ts.isTypeQueryNode(parent)) {
      return false;
    }
    if (
      ts.isExpressionWithTypeArguments(parent) &&
      ts.isHeritageClause(parent.parent) &&
      ts.isClassLike(parent.parent.parent)
    ) {
      return false;
    }
    if (ts.isTypeNode(parent)) {
      return true;
    }
  }
  return false;
}
