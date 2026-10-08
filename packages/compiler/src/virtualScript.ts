import type ts from "typescript";
import type { CodeInformation } from "./CodeInformation.js";
import type { ClientScript, Splice } from "./parseFile.js";
import type { BindingResolution } from "./resolveBindings.js";
import type { Segment } from "./segmentsToString.js";
import { tagRoot } from "./tagRoot.js";
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
 * - a splice written as a tag, `<$Card>`, as JSX on a name the host value is
 *   handed to: `(($Card) => <$Card …>…</$Card>)(cs.splice((Card)))`, and
 *   `(void (Card), …)` where it closes, for the closing tag's name
 *
 * Everything else, types included, is TypeScript's to read as written. Each
 * piece maps back to the text it came from; what the wrapper adds maps to no
 * editor feature.
 */
export function virtualScript(
  ts: typeof import("typescript"),
  script: ClientScript,
  bindings: BindingResolution,
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

  // The splice an identifier is, if it's one.
  const spliceAt = (node: ts.Identifier): Splice | undefined =>
    Object.values(script.splices).find((splice) => splice.refs.includes(node));

  const identifier = (node: ts.Identifier): void => {
    if (inTypePosition(ts, node)) {
      verbatim(node.getStart(file), node.getEnd());
      return;
    }
    const splice = spliceAt(node);
    if (splice !== undefined) {
      // Parenthesized whole, so what it stands in reads it as one value: in
      // `new $Animated.Value(0)`, `new` takes `$Animated.Value`, not the call.
      const range = script.toSourceRange(node);
      if (splice.kind === "braced") {
        added("(cs.splice(", splice.expression.getStart(script.sourceFile));
        out.push(...renderSplice(splice));
        added("))", splice.expression.getEnd());
      } else {
        // The name parenthesized too, as 1-char padding: `(count)` against
        // `$count` starts the name where it follows the sigil, so a
        // completion's replacement span round-trips to the bare name.
        added("(cs.splice(", range.start);
        mapped(`(${splice.expression.text})`, node);
        added("))", range.end);
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
    const root = tagRoot(
      ts,
      ts.isJsxElement(node) ? node.openingElement.tagName : node.tagName,
    );
    return root !== undefined && spliceAt(root) !== undefined;
  };

  // A host tag is checked as JSX, as a tag is anywhere: on a parameter the
  // host value is handed to, `(($Card) => <$Card …>…</$Card>)(cs.splice((Card)))`.
  // JSX then checks it however the component is declared (a class, generic,
  // overloaded) and allows what the framework allows on any tag (React's
  // `key`). Its props and children are written as they were. The parameter
  // takes the tag's written name, which a script can't otherwise bind, so an
  // error about the tag names it as written, and is reported there; the name
  // itself is read through `(Card)`, mapped to it, so definition, rename and
  // references reach the host binding. Where the tag closes, `void (Card)`
  // beside it does the same for the closing tag's name.
  const hostTag = (node: ts.JsxElement | ts.JsxSelfClosingElement): void => {
    const opening = ts.isJsxElement(node) ? node.openingElement : node;
    const tagName = opening.tagName;
    // What the tag starts with, `$Card`, or `$Animated` in `<$Animated.View>`:
    // the splice. The rest, `.View`, is written as it was.
    const root = tagRoot(ts, tagName)!;
    const tag = script.toSourceRange(root);
    // The binding's name, parenthesized over its `$` as an unbraced splice is.
    const name = `(${(spliceAt(root)!.expression as ts.Identifier).text})`;
    // Where JSX stands, an expression is written in braces: a child of an
    // element or fragment, or an attribute's value.
    const parent = node.parent;
    const braced =
      ts.isJsxAttribute(parent) ||
      ts.isJsxElement(parent) ||
      ts.isJsxFragment(parent);
    if (braced) {
      added("{");
    }
    const closing = ts.isJsxElement(node)
      ? tagRoot(ts, node.closingElement.tagName)!
      : undefined;
    if (closing !== undefined) {
      added("(void ");
      mapped(name, closing, TAG_NAME);
      added(", ");
    }
    added(`((${root.text}) => <`);
    mapped(root.text, root, REPORTED);
    verbatim(root.getEnd(), tagName.getEnd());
    // Its attributes and the opening's end, as written. What stands between
    // the name and the first attribute maps to nothing: the end of the name is
    // the name's, not the attribute's.
    let at = tagName.getEnd();
    for (const [index, attribute] of opening.attributes.properties.entries()) {
      if (index === 0) {
        added(text.slice(at, attribute.getStart(file)));
      } else {
        verbatim(at, attribute.getStart(file));
      }
      emit(attribute);
      at = attribute.getEnd();
    }
    if (opening.attributes.properties.length === 0) {
      added(text.slice(at, opening.getEnd()));
    } else {
      verbatim(at, opening.getEnd());
    }
    if (ts.isJsxElement(node)) {
      at = opening.getEnd();
      for (const child of node.children) {
        verbatim(at, child.getStart(file));
        emit(child);
        at = child.getEnd();
      }
      verbatim(at, node.closingElement.getStart(file));
      added("</");
      mapped(root.text, closing!, REPORTED);
      verbatim(closing!.getEnd(), node.closingElement.tagName.getEnd());
      added(">");
    }
    added(")(cs.splice(", tag.start);
    mapped(name, tagName, TAG_NAME);
    added("))", tag.end);
    if (ts.isJsxElement(node)) {
      added(")");
    }
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
  out.push(["cs.lift((() => ", undefined, tag, opened - tag, WRAPPER]);
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
