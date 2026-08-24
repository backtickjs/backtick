import type { Ast, AstElement, AstExpansion, AstScript } from "../ast/Ast.js";
import { locKey } from "../locKey.js";
import type {
  Ir,
  IrArgument,
  IrElement,
  IrExpansion,
  IrScriptEntry,
  IrScriptRef,
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
  private readonly entryByLoc = new Map<string, IrScriptEntry>();
  private readonly refByScript = new Map<AstScript, IrScriptRef>();
  // A class's expansion shared across script instances (`lowerSpliceable`
  // caches per class) is one node, so it lowers to one `IrExpansion` — the
  // identity `buildBundle` interns entries by.
  private readonly expansionByNode = new Map<AstExpansion, IrExpansion>();
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

  // Returns a script's entry, adding it to the table on first sight. Two
  // scripts written at one source location are one entry, so this is what makes
  // a reference to a shared script a reference to the same object.
  private intern(script: AstScript): IrScriptEntry {
    const key = locKey(script.fileHash, script.loc);
    const existing = this.entryByLoc.get(key);
    if (existing !== undefined) {
      return existing;
    }
    // Recorded before lowering splices so a script that (transitively)
    // references itself resolves to this entry rather than recursing.
    const entry: IrScriptEntry = {
      kind: "IrScriptEntry",
      loc: script.loc,
      fileHash: script.fileHash,
      splices: Object.keys(script.splices),
      captures: script.captures,
      spliceParams: script.spliceParams,
      body: script.expression,
    };
    this.entryByLoc.set(key, entry);
    this.scripts.push(entry);
    return entry;
  }

  // Lowers an element's props into an IR element, keeping structure as
  // data: only a script or a shared subtree interrupts it.
  private lowerElement(element: AstElement): IrElement {
    const props: Record<string, IrArgument> = {};
    for (const [key, entry] of Object.entries(element.props)) {
      props[key] = this.lower(entry);
    }
    return {
      kind: "IrElement",
      id: element.id,
      props,
    };
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
        return this.lowerElement(node);
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
      default: {
        const unhandled: never = node;
        throw new Error(`Cannot lower: ${JSON.stringify(unhandled)}`);
      }
    }
  }
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
  const builder = new IrBuilder();
  const root = builder.lower(ast);
  return {
    scripts: builder.scripts,
    root,
  };
}
