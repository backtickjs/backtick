import type { AstNode } from "../ast/nodes/AstNode.js";
import { RuntimeArray } from "../ast/nodes/RuntimeArray.js";
import { RuntimeBoolean } from "../ast/nodes/RuntimeBoolean.js";
import { RuntimeNull } from "../ast/nodes/RuntimeNull.js";
import { RuntimeNumber } from "../ast/nodes/RuntimeNumber.js";
import { RuntimeObject } from "../ast/nodes/RuntimeObject.js";
import { RuntimeString } from "../ast/nodes/RuntimeString.js";
import { SourceClientScript } from "../ast/nodes/SourceClientScript.js";
import { locKey } from "../locKey.js";
import type { Bundle } from "./Bundle.js";
import type { Argument } from "./nodes/Argument.js";
import { BundledScript } from "./nodes/BundledScript.js";
import { ConstArray } from "./nodes/ConstArray.js";
import { ConstBoolean } from "./nodes/ConstBoolean.js";
import { ConstNull } from "./nodes/ConstNull.js";
import { ConstNumber } from "./nodes/ConstNumber.js";
import { ConstObject } from "./nodes/ConstObject.js";
import { ConstString } from "./nodes/ConstString.js";
import { ScriptRef } from "./nodes/ScriptRef.js";

// Lowers an AST into a flat script table: one `BundledScript` per distinct
// client script (deduplicated by source location), where a nested script
// becomes a `ScriptRef` into the table. The builder owns the table and the dedup
// index so the entrypoint and every nested reference are produced by the same
// `reference()` path.
class BundleBuilder {
  readonly scripts: BundledScript[] = [];
  private readonly indexByLoc = new Map<string, number>();
  private readonly refByScript = new Map<SourceClientScript, ScriptRef>();

  // Lowers a client script to a reference that targets its table entry,
  // interning the entry and lowering its splices into positional arguments. A
  // script shared across several splice paths is one node (see `buildAst`), so
  // memoizing by that node lowers each shared subtree once — without this, a
  // diamond composition re-lowers its shared arm on every path, fanning out into
  // an exponentially large reference tree.
  reference(script: SourceClientScript): ScriptRef {
    const shared = this.refByScript.get(script);
    if (shared) {
      return shared;
    }
    const ref = new ScriptRef(
      this.intern(script),
      script.splices.map((n) => this.lower(n)),
    );
    this.refByScript.set(script, ref);
    return ref;
  }

  // Returns the table index of a script's entry, adding it on first sight.
  private intern(script: SourceClientScript): number {
    const key = locKey(script.loc);
    const existing = this.indexByLoc.get(key);
    if (existing !== undefined) {
      return existing;
    }
    // Reserve the slot before lowering splices so a script that (transitively)
    // references itself resolves to a stable index rather than recursing.
    const index = this.scripts.length;
    this.indexByLoc.set(key, index);
    this.scripts.push(
      new BundledScript(
        script.loc,
        script.captures,
        script.declarations,
        script.expression,
      ),
    );
    return index;
  }

  // Lowers a spliced-in value: nested scripts become references, everything else
  // is a runtime constant carried through as data.
  private lower(node: AstNode): Argument {
    if (node instanceof SourceClientScript) {
      return this.reference(node);
    }
    if (node instanceof RuntimeArray) {
      return new ConstArray(node.elements.map((n) => this.lower(n)));
    }
    if (node instanceof RuntimeObject) {
      const entries: Record<string, Argument> = {};
      for (const [key, value] of Object.entries(node.entries)) {
        entries[key] = this.lower(value);
      }
      return new ConstObject(entries);
    }
    if (node instanceof RuntimeNumber) {
      return new ConstNumber(node.value);
    }
    if (node instanceof RuntimeString) {
      return new ConstString(node.value);
    }
    if (node instanceof RuntimeBoolean) {
      return new ConstBoolean(node.value);
    }
    if (node instanceof RuntimeNull) {
      return new ConstNull();
    }
    throw new Error(
      `Cannot lower ${node.constructor.name} into a bundle; only client ` +
        "scripts and runtime values may be spliced into a bundle.",
    );
  }
}

// Builds the bundle from a client script's AST: a flat script table with one
// entry per distinct client script (deduplicated by source location) plus a
// reference naming the entrypoint. Nested scripts, wherever they appear in the
// splice values, are hoisted into the table and replaced by `ScriptRef`s.
export function buildBundle(node: AstNode): Bundle {
  if (!(node instanceof SourceClientScript)) {
    throw new Error("A bundle's entrypoint must be a client script.");
  }
  const builder = new BundleBuilder();
  const root = builder.reference(node);
  return { scripts: builder.scripts, root };
}
