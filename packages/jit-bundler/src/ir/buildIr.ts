import type {
  Ast,
  AstElement,
  AstExpansion,
  AstInstance,
  AstScript,
  AstState,
} from "../ast/Ast.js";
import { locKey } from "../locKey.js";
import type {
  Ir,
  IrArgument,
  IrElement,
  IrExpansion,
  IrScriptEntry,
  IrScriptRef,
  IrStateEntry,
  IrStateRef,
  IrTreeEntry,
  IrTreeRef,
} from "./Ir.js";

// Lowers an AST into flat tables: one `IrScriptEntry` per distinct client
// script (deduplicated by source location) and one `IrTreeEntry` per hoisted
// JSX element (deduplicated by node identity), where a nested script becomes
// an `IrScriptRef` and a hoisted element an `IrTreeRef` into the respective
// table. The builder owns the tables and the dedup indices so the entrypoint
// and every nested reference are produced by the same `referenceScript()`/
// `referenceTree()` path.
class IrBuilder {
  readonly scripts: IrScriptEntry[] = [];
  readonly trees: IrTreeEntry[] = [];
  private readonly indexByLoc = new Map<string, number>();
  private readonly refByScript = new Map<AstScript, IrScriptRef>();
  private readonly refByElement = new Map<AstElement, IrTreeRef>();
  // One entry per invocation, interned by node identity so an instance reached
  // twice is one entry instantiated twice.
  private readonly refByInstance = new Map<AstInstance, IrTreeRef>();
  // One entry per cell, interned by node identity — `lowerClientState` shares
  // one node per cell — so every splice of a cell is the same reference. The
  // initial and the declaring instance are held apart until `buildIr` can
  // resolve that instance to the entry it became.
  private readonly refByState = new Map<AstState, IrStateRef>();
  private readonly initialByState: IrArgument[] = [];
  private readonly declaredByState: AstInstance[] = [];
  // Which entry each invocation became, so a cell's declaring instance resolves
  // to the entry that owns its storage.
  private readonly entryByInstance = new Map<AstInstance, number>();
  // A class's expansion shared across script instances (`lowerSpliceable`
  // caches per class) is one node, so it lowers to one `IrExpansion` — the
  // identity `buildBundle` interns entries by.
  private readonly expansionByNode = new Map<AstExpansion, IrExpansion>();
  // How many places reference each element node, counted up front so lowering
  // can decide locally whether a nested element inlines into its parent's
  // entry (one reference) or hoists into its own (shared).
  private readonly elementRefs: Map<AstElement, number>;

  constructor(elementRefs: Map<AstElement, number>) {
    this.elementRefs = elementRefs;
  }

  // Lowers a client script to a reference that targets its table entry,
  // interning the entry and lowering its splices into positional arguments. A
  // script shared across several splice paths is one node (see `lowerSpliceable`), so
  // memoizing by that node lowers each shared subtree once — without this, a
  // diamond composition re-lowers its shared arm on every path, fanning out into
  // an exponentially large reference tree.
  referenceScript(script: AstScript): IrScriptRef {
    const shared = this.refByScript.get(script);
    if (shared) {
      return shared;
    }
    const ref: IrScriptRef = {
      kind: "IrScriptRef",
      target: this.intern(script),
      args: Object.values(script.splices).map((n) => this.lower(n)),
    };
    this.refByScript.set(script, ref);
    return ref;
  }

  // Returns the table index of a script's entry, adding it on first sight.
  private intern(script: AstScript): number {
    const key = locKey(script.fileHash, script.loc);
    const existing = this.indexByLoc.get(key);
    if (existing !== undefined) {
      return existing;
    }
    // Reserve the slot before lowering splices so a script that (transitively)
    // references itself resolves to a stable index rather than recursing.
    const index = this.scripts.length;
    this.indexByLoc.set(key, index);
    this.scripts.push({
      kind: "IrScriptEntry",
      loc: script.loc,
      splices: Object.keys(script.splices),
      captures: script.captures,
      declarations: script.declarations,
      body: script.expression,
    });
    return index;
  }

  // Lowers a JSX element to a reference into the tree table, adding its entry
  // on first sight. Elements are interned by node identity — `buildJSXElement`
  // returns one node per runtime element, the analogue of a script's source
  // location. The element graph is acyclic (children exist before their
  // parent), so lowering the entry before caching the reference can't recurse
  // back into this element; subtrees hoisted along the way take lower indices.
  referenceTree(element: AstElement): IrTreeRef {
    const shared = this.refByElement.get(element);
    if (shared) {
      return shared;
    }
    const tree: IrTreeEntry = {
      kind: "IrTreeEntry",
      content: this.lowerElement(element),
    };
    const ref: IrTreeRef = { kind: "IrTreeRef", target: this.trees.length };
    this.trees.push(tree);
    this.refByElement.set(element, ref);
    return ref;
  }

  // Lowers an invocation to a reference into the tree table. Unlike an element
  // this happens however many places reference it: the entry is the instance,
  // so what it owns can't depend on how often it is mentioned.
  referenceInstance(instance: AstInstance): IrTreeRef {
    const shared = this.refByInstance.get(instance);
    if (shared) {
      return shared;
    }
    const child = instance.child;
    // A component that rendered nothing still gets its entry — the entry is the
    // instance, and it owns state whether or not it has content.
    const tree: IrTreeEntry = {
      kind: "IrTreeEntry",
      content:
        child === null
          ? null
          : child.kind === "AstInstance"
            ? this.referenceInstance(child)
            : this.lowerElement(child),
    };
    const ref: IrTreeRef = { kind: "IrTreeRef", target: this.trees.length };
    this.trees.push(tree);
    this.entryByInstance.set(instance, ref.target);
    this.refByInstance.set(instance, ref);
    return ref;
  }

  // Lowers a state cell to a reference into the state table, adding its entry
  // on first sight. The initial lowers in value position — it is data the
  // owning entry carries, not a tree prop.
  referenceState(node: AstState): IrStateRef {
    const shared = this.refByState.get(node);
    if (shared) {
      return shared;
    }
    const ref: IrStateRef = {
      kind: "IrStateRef",
      target: this.initialByState.length,
    };
    // Reserved before lowering the initial so a cell whose initial somehow
    // reaches itself resolves to a stable index rather than recursing.
    this.initialByState.push({ kind: "IrValue", value: null });
    this.declaredByState.push(node.declaredIn);
    this.refByState.set(node, ref);
    this.initialByState[ref.target] = this.lower(node.initial);
    return ref;
  }

  // The state table, once every invocation has an entry to own its cells.
  // Resolved at the end because an invocation's entry index is only final after
  // its subtree has been pushed, and its cells are interned during that subtree.
  states(): IrStateEntry[] {
    return this.initialByState.map((initial, index) => {
      const declaredIn = this.declaredByState[index];
      const owner = this.entryByInstance.get(declaredIn);
      if (owner === undefined) {
        // `state()` records the invocation it ran inside, and every invocation
        // reached by lowering became an entry — so this is a cell whose
        // component isn't in the tree its readers are.
        throw new Error(
          "Can't own this state cell: the component that declared it isn't " +
            "part of the tree being bundled.",
        );
      }
      return { kind: "IrStateEntry", initial, owner };
    });
  }

  // Lowers an element's props into an IR element, keeping structure as
  // data: only a script or a shared subtree interrupts it.
  private lowerElement(element: AstElement): IrElement {
    const key = this.lowerInTree(element.key);
    const props: Record<string, IrArgument> = {};
    for (const [key, entry] of Object.entries(element.props)) {
      props[key] = this.lowerInTree(entry);
    }
    return {
      kind: "IrElement",
      id: element.id,
      key,
      props,
    };
  }

  // Lowers a value in tree position — inside an element's props — where an
  // element referenced only here inlines as data instead of hoisting. In value
  // position (`lower`) an element always hoists: a script body or the IR
  // root embeds a tree by reference, never structurally.
  private lowerInTree(node: Ast): IrArgument {
    if (node.kind === "AstInstance") {
      return this.referenceInstance(node);
    }
    if (node.kind === "AstElement") {
      return this.elementRefs.get(node) === 1
        ? this.lowerElement(node)
        : this.referenceTree(node);
    }
    if (node.kind === "AstArray") {
      return {
        kind: "IrArray",
        elements: node.elements.map((n) => this.lowerInTree(n)),
      };
    }
    if (node.kind === "AstObject") {
      const entries: Record<string, IrArgument> = {};
      for (const [key, value] of Object.entries(node.entries)) {
        entries[key] = this.lowerInTree(value);
      }
      return { kind: "IrObject", entries };
    }
    return this.lower(node);
  }

  // Lowers a value into an IR argument: nested scripts become references,
  // hoisted elements tree references, everything else a runtime constant
  // carried through as data. Also lowers the IR's entrypoint, which may be
  // any of the three.
  lower(node: Ast): IrArgument {
    switch (node.kind) {
      case "AstScript":
        return this.referenceScript(node);
      case "AstElement":
        return this.referenceTree(node);
      case "AstInstance":
        return this.referenceInstance(node);
      case "AstArray":
        return {
          kind: "IrArray",
          elements: node.elements.map((n) => this.lower(n)),
        };
      case "AstObject": {
        const entries: Record<string, IrArgument> = {};
        for (const [key, value] of Object.entries(node.entries)) {
          entries[key] = this.lower(value);
        }
        return { kind: "IrObject", entries };
      }
      case "AstNumber":
      case "AstString":
      case "AstBoolean":
        return { kind: "IrValue", value: node.value };
      case "AstNull":
        return { kind: "IrValue", value: null };
      case "AstExpansion": {
        const shared = this.expansionByNode.get(node);
        if (shared) {
          return shared;
        }
        const expansion: IrExpansion = {
          kind: "IrExpansion",
          params: node.params,
          body: this.lower(node.body),
        };
        this.expansionByNode.set(node, expansion);
        return expansion;
      }
      case "AstHole":
        return { kind: "IrHole", name: node.name };
      // A cell lowers to the AST but has no IR entry yet: the state table and
      // the tree that declares the cell come with the IR step.
      case "AstState":
        return this.referenceState(node);
      default: {
        const unhandled: never = node;
        throw new Error(`Cannot lower: ${JSON.stringify(unhandled)}`);
      }
    }
  }
}

// Counts how many places reference each element node: another element's
// props, a script's splice arguments, or the IR root. A shared script (one
// node, many paths) is walked once — the IR holds one entry for it — and a
// shared element's contents likewise count once.
function countElementReferences(root: Ast): Map<AstElement, number> {
  const counts = new Map<AstElement, number>();
  const seenScripts = new Set<AstScript>();
  // A per-class expansion shared across script instances lowers once, so its
  // contents count once too.
  const seenExpansions = new Set<AstExpansion>();
  // A cell is one node however many splices reach it, so its initial's contents
  // count once.
  const seenCells = new Set<AstState>();
  const visit = (node: Ast): void => {
    if (node.kind === "AstScript") {
      if (seenScripts.has(node)) {
        return;
      }
      seenScripts.add(node);
      Object.values(node.splices).forEach(visit);
      return;
    }
    if (node.kind === "AstInstance") {
      if (node.child !== null) {
        visit(node.child);
      }
      return;
    }
    if (node.kind === "AstElement") {
      const count = counts.get(node) ?? 0;
      counts.set(node, count + 1);
      if (count === 0) {
        Object.values(node.props).forEach(visit);
      }
      return;
    }
    if (node.kind === "AstState") {
      if (!seenCells.has(node)) {
        seenCells.add(node);
        visit(node.initial);
      }
      return;
    }
    if (node.kind === "AstArray") {
      node.elements.forEach(visit);
      return;
    }
    if (node.kind === "AstObject") {
      Object.values(node.entries).forEach(visit);
      return;
    }
    if (node.kind === "AstExpansion" && !seenExpansions.has(node)) {
      seenExpansions.add(node);
      visit(node.body);
    }
  };
  visit(root);
  return counts;
}

// Builds the IR from a client's AST: a flat script table with one entry
// per distinct client script (deduplicated by source location), a flat tree
// table with one entry per hoisted JSX element (deduplicated by node
// identity), plus the lowered entrypoint. The entrypoint is usually a
// `IrScriptRef` or `IrTreeRef`, but a data client (an object of fields) lowers to
// a runtime constant instead. Nested scripts, wherever they appear, are
// hoisted into the script table; an element hoists when it is the entrypoint,
// spliced into a script, or shared, and inlines into its parent's entry
// otherwise.
export function buildIr(ast: Ast): Ir {
  const builder = new IrBuilder(countElementReferences(ast));
  const root = builder.lower(ast);
  return {
    scripts: builder.scripts,
    trees: builder.trees,
    states: builder.states(),
    root,
  };
}
