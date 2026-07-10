import type { AstNode, AstRoot } from "../ast/nodes/AstNode.js";
import { RuntimeArray } from "../ast/nodes/RuntimeArray.js";
import { RuntimeBoolean } from "../ast/nodes/RuntimeBoolean.js";
import { RuntimeJSXElement } from "../ast/nodes/RuntimeJSXElement.js";
import { RuntimeNull } from "../ast/nodes/RuntimeNull.js";
import { RuntimeNumber } from "../ast/nodes/RuntimeNumber.js";
import { RuntimeObject } from "../ast/nodes/RuntimeObject.js";
import { RuntimeString } from "../ast/nodes/RuntimeString.js";
import { SourceClientScript } from "../ast/nodes/SourceClientScript.js";
import { locKey } from "../locKey.js";
import type { Bundle } from "./nodes/Bundle.js";
import type { BundledArgument } from "./nodes/BundledArgument.js";
import { BundledElement } from "./nodes/BundledElement.js";
import { BundledScriptEntry } from "./nodes/BundledScriptEntry.js";
import { BundledScriptRef } from "./nodes/BundledScriptRef.js";
import { BundledTreeEntry } from "./nodes/BundledTreeEntry.js";
import { BundledTreeRef } from "./nodes/BundledTreeRef.js";

// Lowers an AST into flat tables: one `BundledScriptEntry` per distinct client
// script (deduplicated by source location) and one `BundledTreeEntry` per hoisted
// JSX element (deduplicated by node identity), where a nested script becomes a
// `BundledScriptRef` and a hoisted element a `BundledTreeRef` into the respective table. The
// builder owns the tables and the dedup indices so the entrypoint and every
// nested reference are produced by the same `reference()`/`referenceTree()`
// path.
class BundleBuilder {
  readonly scripts: BundledScriptEntry[] = [];
  readonly trees: BundledTreeEntry[] = [];
  private readonly indexByLoc = new Map<string, number>();
  private readonly refByScript = new Map<
    SourceClientScript,
    BundledScriptRef
  >();
  private readonly refByElement = new Map<RuntimeJSXElement, BundledTreeRef>();
  // How many places reference each element node, counted up front so lowering
  // can decide locally whether a nested element inlines into its parent's
  // entry (one reference) or hoists into its own (shared).
  private readonly elementRefs: Map<RuntimeJSXElement, number>;

  constructor(elementRefs: Map<RuntimeJSXElement, number>) {
    this.elementRefs = elementRefs;
  }

  // Lowers a client script to a reference that targets its table entry,
  // interning the entry and lowering its splices into positional arguments. A
  // script shared across several splice paths is one node (see `buildAst`), so
  // memoizing by that node lowers each shared subtree once — without this, a
  // diamond composition re-lowers its shared arm on every path, fanning out into
  // an exponentially large reference tree.
  reference(script: SourceClientScript): BundledScriptRef {
    const shared = this.refByScript.get(script);
    if (shared) {
      return shared;
    }
    const ref = new BundledScriptRef(
      this.intern(script),
      script.splices.map((n) => this.lower(n)),
    );
    this.refByScript.set(script, ref);
    return ref;
  }

  // Returns the table index of a script's entry, adding it on first sight.
  private intern(script: SourceClientScript): number {
    const key = locKey(script.fileHash, script.loc);
    const existing = this.indexByLoc.get(key);
    if (existing !== undefined) {
      return existing;
    }
    // Reserve the slot before lowering splices so a script that (transitively)
    // references itself resolves to a stable index rather than recursing.
    const index = this.scripts.length;
    this.indexByLoc.set(key, index);
    this.scripts.push(
      new BundledScriptEntry(
        script.loc,
        script.captures,
        script.declarations,
        script.expression,
      ),
    );
    return index;
  }

  // Lowers a JSX element to a reference into the tree table, adding its entry
  // on first sight. Elements are interned by node identity — `buildJSXElement`
  // returns one node per runtime element, the analogue of a script's source
  // location. The element graph is acyclic (children exist before their
  // parent), so lowering the entry before caching the reference can't recurse
  // back into this element; subtrees hoisted along the way take lower indices.
  referenceTree(element: RuntimeJSXElement): BundledTreeRef {
    const shared = this.refByElement.get(element);
    if (shared) {
      return shared;
    }
    const tree = new BundledTreeEntry(this.lowerElement(element));
    const ref = new BundledTreeRef(this.trees.length);
    this.trees.push(tree);
    this.refByElement.set(element, ref);
    return ref;
  }

  // Lowers an element's props into a bundled element, keeping structure as
  // data: only a script or a shared subtree interrupts it.
  private lowerElement(element: RuntimeJSXElement): BundledElement {
    const props: Record<string, BundledArgument> = {};
    for (const [key, entry] of Object.entries(element.props)) {
      props[key] = this.lowerInTree(entry);
    }
    return new BundledElement(element.type, element.key, props);
  }

  // Lowers a value in tree position — inside an element's props — where an
  // element referenced only here inlines as data instead of hoisting. In value
  // position (`lower`) an element always hoists: a script body or the bundle
  // root embeds a tree by reference, never structurally.
  private lowerInTree(node: AstRoot): BundledArgument {
    if (node instanceof RuntimeJSXElement) {
      return this.elementRefs.get(node) === 1
        ? this.lowerElement(node)
        : this.referenceTree(node);
    }
    if (node instanceof RuntimeArray) {
      return node.elements.map((n) => this.lowerInTree(n));
    }
    if (node instanceof RuntimeObject) {
      const entries: Record<string, BundledArgument> = {};
      for (const [key, value] of Object.entries(node.entries)) {
        entries[key] = this.lowerInTree(value);
      }
      return entries;
    }
    return this.lower(node);
  }

  // Lowers a value into a bundle argument: nested scripts become references,
  // hoisted elements tree references, everything else a runtime constant
  // carried through as data. Also lowers the bundle's entrypoint, which may be
  // any of the three.
  lower(node: AstRoot): BundledArgument {
    if (node instanceof SourceClientScript) {
      return this.reference(node);
    }
    if (node instanceof RuntimeJSXElement) {
      return this.referenceTree(node);
    }
    if (node instanceof RuntimeArray) {
      return node.elements.map((n) => this.lower(n));
    }
    if (node instanceof RuntimeObject) {
      const entries: Record<string, BundledArgument> = {};
      for (const [key, value] of Object.entries(node.entries)) {
        entries[key] = this.lower(value);
      }
      return entries;
    }
    if (node instanceof RuntimeNumber) {
      return node.value;
    }
    if (node instanceof RuntimeString) {
      return node.value;
    }
    if (node instanceof RuntimeBoolean) {
      return node.value;
    }
    if (node instanceof RuntimeNull) {
      return null;
    }
    const unhandled: never = node;
    throw new Error(`Cannot lower: ${JSON.stringify(unhandled)}`);
  }
}

// Counts how many places reference each element node: another element's
// props, a script's splice arguments, or the bundle root. A shared script (one
// node, many paths) is walked once — the bundle holds one entry for it — and a
// shared element's contents likewise count once.
function countElementReferences(root: AstRoot): Map<RuntimeJSXElement, number> {
  const counts = new Map<RuntimeJSXElement, number>();
  const seenScripts = new Set<SourceClientScript>();
  const visit = (node: AstNode): void => {
    if (node instanceof SourceClientScript) {
      if (seenScripts.has(node)) {
        return;
      }
      seenScripts.add(node);
      node.splices.forEach(visit);
      return;
    }
    if (node instanceof RuntimeJSXElement) {
      const count = counts.get(node) ?? 0;
      counts.set(node, count + 1);
      if (count === 0) {
        Object.values(node.props).forEach(visit);
      }
      return;
    }
    if (node instanceof RuntimeArray) {
      node.elements.forEach(visit);
      return;
    }
    if (node instanceof RuntimeObject) {
      Object.values(node.entries).forEach(visit);
    }
  };
  visit(root);
  return counts;
}

// Builds the bundle from a client's AST: a flat script table with one entry
// per distinct client script (deduplicated by source location), a flat tree
// table with one entry per hoisted JSX element (deduplicated by node
// identity), plus the lowered entrypoint. The entrypoint is usually a
// `BundledScriptRef` or `BundledTreeRef`, but a data client (an object of fields) lowers to
// a runtime constant instead. Nested scripts, wherever they appear, are
// hoisted into the script table; an element hoists when it is the entrypoint,
// spliced into a script, or shared, and inlines into its parent's entry
// otherwise.
export function buildBundle(ast: AstRoot): Bundle {
  const builder = new BundleBuilder(countElementReferences(ast));
  const root = builder.lower(ast);
  return { scripts: builder.scripts, trees: builder.trees, root };
}
