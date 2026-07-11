import type {
  Ir,
  IrArgument,
  IrElement,
  IrScriptRef,
  IrTreeEntry,
} from "../ir/Ir.js";
import type {
  Bundle,
  BundleArrowNode,
  BundleElement,
  BundleExpr,
  BundleExpressionNode,
  BundleGlobal,
  BundleSlot,
  BundleTree,
  FunctionLabel,
  TreeLabel,
} from "./Bundle.js";
import { buildScriptNode, type RenderSplice } from "./buildScriptNode.js";

// Recovers the source name from a binding key `<name>$<fileHash>$<n>` by
// dropping the hash/counter suffix the compiler appends for global uniqueness.
// A free host reference carries no such suffix and is returned unchanged.
function sourceName(key: string): string {
  return key.replace(/\$[0-9a-z]+\$\d+$/, "");
}

// A capture key without the compiler's uniqueness suffix is a free host
// reference (e.g. `console`): not a binding of any scope, it resolves on the
// global object wherever it is used.
function isHostRef(key: string): boolean {
  return sourceName(key) === key;
}

// Builds the bundle `{ functions, trees, root }` as plain data. The output
// shapes — the tables, the tagged expression forms, and their evaluation
// contract — are documented on the `Bundle` types; this file documents how
// they are derived.
//
// A tree entry is an implicit function of its slots: instantiating it supplies
// one value per slot, exactly as calling a `functions` entry supplies its
// captures. The slot signature is derived, not stored (see `treeSlots`). A
// reference to a tree from source position renders as a call `#ti(...)`
// passing those captures by name; from JSON position it is a `#call` whose
// arguments are `#slot`/`#global` expressions of the enclosing entry.
//
// A captured variable is threaded, not resolved by name at the splice site: a
// fragment written in one script but spliced (via host code) into another still
// refers to the binding it was written under. Each entry receives its live
// captures as parameters, and a reference to an entry passes those captures from
// the enclosing scope. Because the compiler gives every binding a globally
// unique name, a capture is threaded under that one name the whole way down — an
// intermediate entry that binds a same-looking variable has a different unique
// name, so there is nothing to disambiguate and nothing to rename.
//
// A splice hole is filled one of two ways, chosen per entry:
//
//   - Monomorphic entry — every reference to it passes structurally identical
//     splice arguments. The arguments are inlined directly into the body (a
//     nested-script argument as a call `#fj(...)`, a runtime value as a literal),
//     so the entry takes no splice parameters.
//   - Polymorphic entry — the same body (one source location) is reached with
//     differing splice arguments, as when a host helper builds a fragment from
//     its parameters and is called more than once (see the `splice-sharing`
//     fixture). Its splices can't be baked in, so each becomes a parameter
//     `$i`: the body fills the hole with `$i()` and every reference passes that
//     call's argument as a thunk. This threads splices exactly like captures,
//     just positionally.
export function buildBundle(ir: Ir): Bundle {
  const fns = ir.scripts;

  // Maps each binding key to a readable display name — its source name with the
  // uniqueness suffix (`$<fileHash>$<n>`) dropped — so the bundle reads like the
  // script it came from rather than exposing internal keys. A numeric suffix is
  // reattached only when distinct bindings share a source name (a shadowed or
  // threaded variable). The mapping is a bijection: the same key always renders
  // identically (so threaded captures still line up between a call site and its
  // parameter) and two different bindings never collapse onto one name (so no
  // accidental shadowing). Free host references carry no suffix and pass through
  // unchanged.
  const displayNames = new Map<string, string>();
  const usedNames = new Set<string>();
  const displayName = (key: string): string => {
    const existing = displayNames.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const base = sourceName(key);
    let name = base;
    for (let n = 2; usedNames.has(name); n++) {
      name = `${base}${n}`;
    }
    usedNames.add(name);
    displayNames.set(key, name);
    return name;
  };

  // Names each entry's body declares (variable declarations and arrow
  // parameters, at any depth), computed once by the compiler and carried on the
  // entry. A capture an entry binds itself is supplied by that entry, not
  // received as a parameter.
  const declaredKeys = fns.map((fn) => new Set(fn.declarations));

  // Every reference reaching each entry, grouped by target. Walking from the
  // root's argument tree reaches the whole table, since each nested script is
  // lowered to a reference nested in some entry's splice arguments or in a
  // tree entry's props. The tree set is shared across the walk so each tree
  // entry's contents are collected once.
  const refsByTarget = new Map<number, IrScriptRef[]>();
  const seenRefs = new Set<IrScriptRef>();
  const seenTrees = new Set<number>();
  const collectRefs = (ref: IrScriptRef): void => {
    const list = refsByTarget.get(ref.target);
    if (list) {
      list.push(ref);
    } else {
      refsByTarget.set(ref.target, [ref]);
    }
    if (seenRefs.has(ref)) {
      return; // a shared reference (a diamond arm) is descended into only once
    }
    seenRefs.add(ref);
    for (const child of nestedRefs(ref.args, ir.trees, seenTrees)) {
      collectRefs(child);
    }
  };
  for (const ref of nestedRefs([ir.root], ir.trees, seenTrees)) {
    collectRefs(ref);
  }

  // An entry is polymorphic when it is reached by more than one distinct
  // reference: its body (one source location) is shared across call sites that
  // pass different splices, so the splices can't be inlined and must be threaded
  // as parameters instead. `buildIr` interns one reference per source node,
  // so "more than one reference object" means the entry is reached from more than
  // one splice site — the only way its arguments can vary. Comparing reference
  // identity keeps this O(1) per entry; comparing the arguments structurally
  // would re-expand shared subtrees and cost 2^depth on a diamond.
  const polymorphic = new Set<number>();
  for (const [target, refs] of refsByTarget) {
    if (new Set(refs).size > 1) {
      polymorphic.add(target);
    }
  }

  // A representative splice-argument list for an entry. For a monomorphic entry
  // every reference agrees, so any list stands in for all of them.
  const monoArgs = (target: number): readonly IrArgument[] =>
    refsByTarget.get(target)?.[0]?.args ?? [];

  // The captures an entry must receive as parameters: its own free variables
  // plus, for a monomorphic entry, the captures free in the arguments it inlines
  // — minus the ones it binds itself. A polymorphic entry inlines nothing (its
  // arguments arrive as thunks bound at the call site), so it needs only its own
  // free variables. Binding keys are globally unique, so a capture is identified
  // by key alone. Returned in a stable order (own captures first); memoized, with
  // a cycle guard for self-referential scripts.
  const needCache = new Map<number, string[]>();
  const needStack = new Set<number>();
  const need = (i: number): string[] => {
    const cached = needCache.get(i);
    if (cached) {
      return cached;
    }
    if (needStack.has(i)) {
      return [];
    }
    needStack.add(i);
    const order: string[] = [];
    const seen = new Set<string>();
    const add = (key: string): void => {
      if (!seen.has(key)) {
        seen.add(key);
        order.push(key);
      }
    };
    for (const key of fns[i].captures) {
      add(key);
    }
    if (!polymorphic.has(i)) {
      for (const arg of monoArgs(i)) {
        for (const key of freeCaps(arg)) {
          add(key);
        }
      }
    }
    const result = order.filter((key) => !declaredKeys[i].has(key));
    needStack.delete(i);
    needCache.set(i, result);
    return result;
  };

  // The captures that the rendered form of a splice argument refers to in the
  // enclosing scope: whatever its target still needs, plus — when the target is
  // polymorphic — the captures of the thunks passed for its splices, since those
  // thunks are written inline at this call site. A tree reference needs its
  // slot values; an inline element whatever its props need.
  const freeCaps = (value: IrArgument): string[] => {
    switch (value.kind) {
      case "IrScriptRef": {
        const keys = [...need(value.target)];
        if (polymorphic.has(value.target)) {
          for (const arg of value.args) {
            keys.push(...freeCaps(arg));
          }
        }
        return keys;
      }
      case "IrTreeRef":
        return treeSlots(value.target);
      case "IrElement":
        return Object.values(value.props).flatMap(freeCaps);
      case "IrArray":
        return value.elements.flatMap(freeCaps);
      case "IrObject":
        return Object.values(value.entries).flatMap(freeCaps);
      case "IrValue":
        return [];
    }
  };

  // The slot signature of a tree entry: the capture keys its wiring needs from
  // whichever scope instantiates it, in first-need order. These are the
  // entry's implicit parameters — a reference to the tree passes one value per
  // key, exactly as captures thread between functions. Free host references
  // are excluded: inside tree JSON they resolve as `#global` leaves instead of
  // threading through the instance. Memoized; no cycle guard is needed because
  // the element graph is acyclic (children exist before their parent).
  const treeSlotsCache = new Map<number, string[]>();
  const treeSlots = (target: number): string[] => {
    const cached = treeSlotsCache.get(target);
    if (cached) {
      return cached;
    }
    const order: string[] = [];
    const seen = new Set<string>();
    for (const value of Object.values(ir.trees[target].element.props)) {
      for (const key of freeCaps(value)) {
        if (!isHostRef(key) && !seen.has(key)) {
          seen.add(key);
          order.push(key);
        }
      }
    }
    treeSlotsCache.set(target, order);
    return order;
  };

  const bodies = new Map<number, BundleArrowNode>();

  // Materializes an entry's arrow node into `bodies` the first time it is
  // reached. A polymorphic entry takes a `$i` parameter per splice (its holes
  // render as calls `$i()`) ahead of its captures; a monomorphic entry inlines
  // its splice arguments and takes only captures.
  const materialize = (target: number): void => {
    if (bodies.has(target)) {
      return;
    }
    // Reserve the slot to break reference cycles; overwritten below.
    bodies.set(target, { "#": "arrow", params: [], body: null });
    const captureParams = need(target).map(displayName);
    let params: string[];
    let renderSplice: RenderSplice;
    if (polymorphic.has(target)) {
      const arity = monoArgs(target).length;
      const spliceParams = Array.from({ length: arity }, (_, i) => `$${i}`);
      params = [...spliceParams, ...captureParams];
      renderSplice = (index) => ({
        "#": "call",
        callee: { "#": "identifier", name: `$${index}` },
        args: [],
      });
    } else {
      params = captureParams;
      const args = monoArgs(target);
      renderSplice = (index) => renderValue(args[index]);
    }
    const body = buildScriptNode(fns[target].body, renderSplice, displayName);
    bodies.set(target, { "#": "arrow", params, body });
  };

  // The arguments passed when calling an entry: for a polymorphic target, one
  // thunk per splice (bound to this reference's arguments) ahead of its
  // captures; for a monomorphic target, just its captures.
  const callArgs = (ref: IrScriptRef): BundleExpressionNode[] => {
    const parts: BundleExpressionNode[] = [];
    if (polymorphic.has(ref.target)) {
      for (const arg of ref.args) {
        parts.push(renderThunk(arg));
      }
    }
    for (const key of need(ref.target)) {
      parts.push({ "#": "identifier", name: displayName(key) });
    }
    return parts;
  };

  // Renders an IR argument in value position — as the node for the value it
  // evaluates to. A script reference becomes a call of its `#fi` entry, a tree
  // reference a call of its `#ti` entry passing the tree's slot captures;
  // every other value its literal form.
  const renderValue = (value: IrArgument): BundleExpressionNode => {
    switch (value.kind) {
      case "IrScriptRef":
        materialize(value.target);
        return {
          "#": "call",
          callee: { "#": "entry", label: `#f${value.target}` },
          args: callArgs(value),
        };
      case "IrTreeRef":
        materializeTree(value.target);
        return {
          "#": "call",
          callee: { "#": "entry", label: `#t${value.target}` },
          args: treeSlots(value.target).map((key) => ({
            "#": "identifier",
            name: displayName(key),
          })),
        };
      case "IrElement":
        throw new Error("An inline element can't appear outside a tree entry.");
      case "IrValue":
        return value.value;
      case "IrArray":
        return value.elements.map(renderValue);
      case "IrObject": {
        // A plain data object passes through, exactly as in `renderExpr`, so
        // it can't carry `#` — the bundle's one reserved key.
        if ("#" in value.entries) {
          throw new Error(
            "Can't bundle this object: the `#` key is reserved.",
          );
        }
        const entries: { [key: string]: BundleExpressionNode } = {};
        for (const [key, entry] of Object.entries(value.entries)) {
          entries[key] = renderValue(entry);
        }
        return entries;
      }
    }
  };

  // Renders a splice argument in thunk position — as a nullary function that
  // yields the value — so a polymorphic entry evaluates it lazily at the hole,
  // mirroring an inlined splice. A referenced entry that already takes no
  // arguments is a nullary thunk as-is; anything else is wrapped in an arrow.
  const renderThunk = (value: IrArgument): BundleExpressionNode => {
    if (value.kind === "IrScriptRef") {
      materialize(value.target);
      const args = callArgs(value);
      const entry = {
        "#": "entry",
        label: `#f${value.target}`,
      } as const satisfies BundleExpressionNode;
      return args.length === 0
        ? entry
        : {
            "#": "arrow",
            params: [],
            body: { "#": "call", callee: entry, args },
          };
    }
    if (value.kind === "IrTreeRef") {
      materializeTree(value.target);
      const args = treeSlots(value.target).map(
        (key): BundleExpressionNode => ({
          "#": "identifier",
          name: displayName(key),
        }),
      );
      const entry = {
        "#": "entry",
        label: `#t${value.target}`,
      } as const satisfies BundleExpressionNode;
      return args.length === 0
        ? entry
        : {
            "#": "arrow",
            params: [],
            body: { "#": "call", callee: entry, args },
          };
    }
    return { "#": "arrow", params: [], body: renderValue(value) };
  };

  const treeJsons = new Map<number, BundleTree>();

  // Materializes a tree entry into `treeJsons` the first time it is reached:
  // its element rendered as a bundle expression against the entry's own slot
  // indices.
  const materializeTree = (target: number): void => {
    if (treeJsons.has(target)) {
      return;
    }
    const keys = treeSlots(target);
    const slots = new Map(keys.map((key, index) => [key, index] as const));
    treeJsons.set(target, {
      element: renderElement(ir.trees[target].element, slots),
    });
  };

  // Renders a capture in JSON position: a free host reference resolves
  // globally; anything else must be a slot of the enclosing tree. At the
  // bundle root there is no enclosing instance, so a suffixed capture reaching
  // it can't be threaded from anywhere.
  const capExpr = (
    key: string,
    slots: Map<string, number>,
  ): BundleSlot | BundleGlobal => {
    if (isHostRef(key)) {
      return { "#": "global", name: key };
    }
    const index = slots.get(key);
    if (index === undefined) {
      throw new Error(
        `Can't thread the capture \`${sourceName(key)}\`: nothing encloses ` +
          "this reference to supply it.",
      );
    }
    return { "#": "slot", index };
  };

  // The arguments of a `#call` to a function entry, mirroring `callArgs`: for
  // a polymorphic target, one `#thunk` per splice ahead of its captures.
  const exprCallArgs = (
    ref: IrScriptRef,
    slots: Map<string, number>,
  ): BundleExpr[] => {
    const parts: BundleExpr[] = [];
    if (polymorphic.has(ref.target)) {
      for (const arg of ref.args) {
        parts.push({ "#": "thunk", expression: renderExpr(arg, slots) });
      }
    }
    for (const key of need(ref.target)) {
      parts.push(capExpr(key, slots));
    }
    return parts;
  };

  // Renders an inline element: static structure carried as data, each prop a
  // bundle expression against the enclosing tree's slots.
  const renderElement = (
    element: IrElement,
    slots: Map<string, number>,
  ): BundleElement => {
    const props: { [key: string]: BundleExpr } = {};
    for (const [key, entry] of Object.entries(element.props)) {
      props[key] = renderExpr(entry, slots);
    }
    return { "#": "element", type: element.type, key: element.key, props };
  };

  // Renders an IR argument in expression position — the form used inside tree
  // entries and for the bundle root, where composition is data rather than
  // source. The mirror of `renderValue`.
  const renderExpr = (
    value: IrArgument,
    slots: Map<string, number>,
  ): BundleExpr => {
    if (value.kind === "IrScriptRef") {
      materialize(value.target);
      return {
        "#": "apply",
        label: `#f${value.target}`,
        args: exprCallArgs(value, slots),
      };
    }
    if (value.kind === "IrTreeRef") {
      materializeTree(value.target);
      return {
        "#": "apply",
        label: `#t${value.target}`,
        args: treeSlots(value.target).map((key) => capExpr(key, slots)),
      };
    }
    if (value.kind === "IrElement") {
      return renderElement(value, slots);
    }
    if (value.kind === "IrValue") {
      return value.value;
    }
    if (value.kind === "IrArray") {
      return value.elements.map((entry) => renderExpr(entry, slots));
    }
    // A plain data object passes through. `#` is the bundle's one
    // reserved key — the discriminant of every node — so an object
    // carrying it would be indistinguishable from a node to the loader.
    if ("#" in value.entries) {
      throw new Error("Can't bundle this object: the `#` key is reserved.");
    }
    const entries: { [key: string]: BundleExpr } = {};
    for (const [key, entry] of Object.entries(value.entries)) {
      entries[key] = renderExpr(entry, slots);
    }
    return entries;
  };

  const root = renderExpr(ir.root, new Map());
  const functions: Record<FunctionLabel, BundleArrowNode> = {};
  for (const [index, body] of [...bodies].sort(([a], [b]) => a - b)) {
    functions[`#f${index}`] = body;
  }
  const trees: Record<TreeLabel, BundleTree> = {};
  for (const [index, tree] of [...treeJsons].sort(([a], [b]) => a - b)) {
    trees[`#t${index}`] = tree;
  }
  return { functions, trees, root };
}

// Collects every script reference reachable inside a list of arguments,
// descending into array and object values, inline elements, and — through the
// tree table — tree references, each entry once per `seenTrees` set (a nested
// script may be spliced anywhere).
function nestedRefs(
  values: readonly IrArgument[],
  trees: readonly IrTreeEntry[],
  seenTrees: Set<number>,
): IrScriptRef[] {
  const refs: IrScriptRef[] = [];
  const visit = (value: IrArgument): void => {
    if (value.kind === "IrScriptRef") {
      refs.push(value);
    } else if (value.kind === "IrTreeRef") {
      if (!seenTrees.has(value.target)) {
        seenTrees.add(value.target);
        visit(trees[value.target].element);
      }
    } else if (value.kind === "IrElement") {
      Object.values(value.props).forEach(visit);
    } else if (value.kind === "IrArray") {
      value.elements.forEach(visit);
    } else if (value.kind === "IrObject") {
      Object.values(value.entries).forEach(visit);
    }
  };
  values.forEach(visit);
  return refs;
}
