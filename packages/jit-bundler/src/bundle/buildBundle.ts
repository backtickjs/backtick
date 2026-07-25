import type {
  Ir,
  IrArgument,
  IrElement,
  IrExpansion,
  IrScriptRef,
  IrTreeEntry,
} from "../ir/Ir.js";
import type {
  Bundle,
  BundleArrowNode,
  BundleElement,
  BundleEntryNode,
  BundleExpr,
  BundleExpressionNode,
  BundleIdentifierNode,
  BundleSlot,
  BundleTree,
  FunctionLabel,
  TreeLabel,
} from "./Bundle.js";
import { lowerScriptBody, type RenderSplice } from "./lowerScriptBody.js";

// Recovers the source name from a binding key `<name>$<fileHash>$<n>` by
// dropping the hash/counter suffix the compiler appends for global uniqueness.
function sourceName(key: string): string {
  return key.replace(/\$[0-9a-z]+\$\d+$/, "");
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
// arguments are `#slot` expressions of the enclosing entry.
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
  // Memoized per argument — the IR is immutable and this fans out from
  // `need`, `passKeys`, and `treeSlots`. A result computed while a `need` is
  // in flight can reflect that cycle guard's partial answer, so it is only
  // cached when no `need` computation is active.
  const freeCapsCache = new Map<IrArgument, string[]>();
  const freeCaps = (value: IrArgument): string[] => {
    const cached = freeCapsCache.get(value);
    if (cached) {
      return cached;
    }
    const result = freeCapsImpl(value);
    if (needStack.size === 0) {
      freeCapsCache.set(value, result);
    }
    return result;
  };

  const freeCapsImpl = (value: IrArgument): string[] => {
    switch (value.kind) {
      case "IrScriptRef": {
        const keys = [...need(value.target)];
        if (polymorphic.has(value.target)) {
          for (const arg of value.args) {
            // A capture the entry itself declares is supplied by the hole
            // call (see `passKeys`), not by the call site.
            for (const key of freeCaps(arg)) {
              if (!declaredKeys[value.target].has(key)) {
                keys.push(key);
              }
            }
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
      // An expansion's holes are bound by its own params: only what its
      // body captures beyond them threads outward.
      case "IrExpansion":
        return freeCaps(value.body).filter(
          (key) => !value.params.includes(key),
        );
      // A hole threads like a capture — a free variable the enclosing
      // expansion's parameter binds — so a script entry hoisted out of the
      // expansion receives it as a parameter instead of escaping its scope.
      case "IrHole":
        return [value.name];
      case "IrValue":
        return [];
    }
  };

  // The entry-declared bindings a polymorphic entry's hole must feed its
  // thunk: whatever the splice arguments passed for that hole capture from
  // the entry's own scope, across every reference — the body's hole call and
  // every thunk's parameter list must agree positionally, so the union is
  // taken and ordered by the entry's declaration order (stable across
  // applications). This is what makes a spliced fragment see the bindings in
  // scope at its hole even though the thunk is written at the call site.
  const passKeysCache = new Map<string, string[]>();
  const passKeys = (target: number, hole: number): string[] => {
    const cacheKey = `${target}:${hole}`;
    const cached = passKeysCache.get(cacheKey);
    if (cached) {
      return cached;
    }
    const keys = new Set<string>();
    for (const ref of refsByTarget.get(target) ?? []) {
      const arg = ref.args[hole];
      if (arg) {
        for (const key of freeCaps(arg)) {
          if (declaredKeys[target].has(key)) {
            keys.add(key);
          }
        }
      }
    }
    const order = fns[target].declarations.filter((key) => keys.has(key));
    passKeysCache.set(cacheKey, order);
    return order;
  };

  // The slot signature of a tree entry: the capture keys its wiring needs from
  // whichever scope instantiates it, in first-need order. These are the
  // entry's implicit parameters — a reference to the tree passes one value per
  // key, exactly as captures thread between functions. Memoized; no cycle
  // guard is needed because the element graph is acyclic (children exist
  // before their parent).
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
        if (!seen.has(key)) {
          seen.add(key);
          order.push(key);
        }
      }
    }
    treeSlotsCache.set(target, order);
    return order;
  };

  const bodies = new Map<number, BundleArrowNode>();

  // A class's expansion compiles as its own `functions` entry, labeled
  // after the script entries (script indices are reserved whether or not
  // they materialize). The entry is an arrow over the expansion's holes; a
  // construction's call site applies it to the client arguments. Interned
  // by node identity: `lowerSpliceable` shares one expansion per class, so
  // it is one entry however many instances construct the class.
  const expansionBodies = new Map<FunctionLabel, BundleArrowNode>();
  const expansionLabels = new Map<IrExpansion, FunctionLabel>();
  const expansionEntry = (expansion: IrExpansion): BundleEntryNode => {
    let label = expansionLabels.get(expansion);
    if (label === undefined) {
      label = `#f${fns.length + expansionLabels.size}`;
      expansionLabels.set(expansion, label);
      expansionBodies.set(label, {
        "#": "arrow",
        params: [...expansion.params],
        body: renderValue(expansion.body),
      });
    }
    return { "#": "entry", label };
  };

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
    // The body references holes by key; a reference's `args` are
    // positional in the entry's `splices` order, so this maps between them.
    const holes = new Map(
      fns[target].splices.map((key, index) => [key, index]),
    );
    const holeIndex = (key: string): number => {
      const index = holes.get(key);
      if (index === undefined) {
        throw new Error(`This script has no \`${key}\` splice.`);
      }
      return index;
    };
    let params: string[];
    let renderSplice: RenderSplice;
    if (polymorphic.has(target)) {
      const arity = monoArgs(target).length;
      const spliceParams = Array.from({ length: arity }, (_, i) => `$${i}`);
      params = [...spliceParams, ...captureParams];
      renderSplice = (key) => {
        const index = holeIndex(key);
        return {
          "#": "call",
          callee: { "#": "identifier", name: `$${index}` },
          args: passKeys(target, index).map((key) => ({
            "#": "identifier",
            name: displayName(key),
          })),
        };
      };
    } else {
      params = captureParams;
      const args = monoArgs(target);
      renderSplice = (key) => renderValue(args[holeIndex(key)]);
    }
    const body = lowerScriptBody(fns[target].body, renderSplice, displayName);
    bodies.set(target, { "#": "arrow", params, body });
  };

  // The arguments passed when calling an entry: for a polymorphic target, one
  // thunk per splice (bound to this reference's arguments) ahead of its
  // captures; for a monomorphic target, just its captures.
  const callArgs = (ref: IrScriptRef): BundleExpressionNode[] => {
    const parts: BundleExpressionNode[] = [];
    if (polymorphic.has(ref.target)) {
      ref.args.forEach((arg, index) => {
        parts.push(renderThunk(arg, ref.target, index));
      });
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
      // An expansion in value position is its `functions` entry: passed
      // bare it is the function itself, which the construction's call site
      // applies to the client arguments.
      case "IrExpansion":
        return expansionEntry(value);
      case "IrHole":
        return { "#": "identifier", name: value.name };
      case "IrArray":
        return value.elements.map(renderValue);
      case "IrObject": {
        // A plain data object passes through, exactly as in `renderExpr`, so
        // it can't carry `#` — the bundle's one reserved key.
        if ("#" in value.entries) {
          throw new Error("Can't bundle this object: the `#` key is reserved.");
        }
        const entries: { [key: string]: BundleExpressionNode } = {};
        for (const [key, entry] of Object.entries(value.entries)) {
          entries[key] = renderValue(entry);
        }
        return entries;
      }
    }
  };

  // Renders a splice argument in thunk position — as a function yielding the
  // value — so a polymorphic entry evaluates it lazily at the hole, mirroring
  // an inlined splice. When the splice captures bindings the entry declares,
  // the thunk takes them as parameters and the hole call supplies them (see
  // `passKeys`); the body's identifiers then resolve through the thunk frame.
  // Otherwise a referenced entry that takes no arguments is a nullary thunk
  // as-is; anything else is wrapped in an arrow.
  const renderThunk = (
    value: IrArgument,
    target: number,
    hole: number,
  ): BundleExpressionNode => {
    const params = passKeys(target, hole).map(displayName);
    if (params.length > 0) {
      return { "#": "arrow", params, body: renderValue(value) };
    }
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
      element: renderElement(ir.trees[target].element, slots, new Set()),
    });
  };

  // Renders a capture in JSON position: a parameter of an enclosing thunk
  // resolves by name; anything else must be a slot of the enclosing tree. At
  // the bundle root there is no enclosing instance, so a capture reaching it
  // can't be threaded from anywhere.
  const capExpr = (
    key: string,
    slots: Map<string, number>,
    params: ReadonlySet<string> = new Set(),
  ): BundleSlot | BundleIdentifierNode => {
    if (params.has(key)) {
      return { "#": "identifier", name: displayName(key) };
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
    params: ReadonlySet<string>,
  ): BundleExpr[] => {
    const parts: BundleExpr[] = [];
    if (polymorphic.has(ref.target)) {
      ref.args.forEach((arg, index) => {
        const passed = passKeys(ref.target, index);
        if (passed.length === 0) {
          parts.push({
            "#": "thunk",
            expression: renderExpr(arg, slots, params),
          });
          return;
        }
        // The thunk's parameters extend the enclosing ones, like a nested
        // frame: the expression sees both.
        const inner = new Set([...params, ...passed]);
        parts.push({
          "#": "thunk",
          params: passed.map(displayName),
          expression: renderExpr(arg, slots, inner),
        });
      });
    }
    for (const key of need(ref.target)) {
      parts.push(capExpr(key, slots, params));
    }
    return parts;
  };

  // Renders an inline element: static structure carried as data, each prop a
  // bundle expression against the enclosing tree's slots.
  const renderElement = (
    element: IrElement,
    slots: Map<string, number>,
    params: ReadonlySet<string>,
  ): BundleElement => {
    const key = renderExpr(element.key, slots, params);
    const props: { [key: string]: BundleExpr } = {};
    for (const [key, entry] of Object.entries(element.props)) {
      props[key] = renderExpr(entry, slots, params);
    }
    return {
      "#": "element",
      id: element.id,
      key,
      props,
    };
  };

  // Renders an IR argument in expression position — the form used inside tree
  // entries and for the bundle root, where composition is data rather than
  // source. The mirror of `renderValue`.
  const renderExpr = (
    value: IrArgument,
    slots: Map<string, number>,
    params: ReadonlySet<string> = new Set(),
  ): BundleExpr => {
    if (value.kind === "IrScriptRef") {
      materialize(value.target);
      return {
        "#": "apply",
        label: `#f${value.target}`,
        args: exprCallArgs(value, slots, params),
      };
    }
    if (value.kind === "IrTreeRef") {
      materializeTree(value.target);
      return {
        "#": "apply",
        label: `#t${value.target}`,
        args: treeSlots(value.target).map((key) => capExpr(key, slots, params)),
      };
    }
    if (value.kind === "IrElement") {
      return renderElement(value, slots, params);
    }
    if (value.kind === "IrValue") {
      return value.value;
    }
    // In JSON position a parameterized `#thunk` is the arrow form: the
    // expansion's holes become its parameters, supplied by the
    // construction's call. The tree grammar has no entry-as-value node, so
    // here the expansion is written inline instead of referencing its
    // `functions` entry.
    if (value.kind === "IrExpansion") {
      // The expansion's params extend the enclosing ones, like a nested
      // frame, so a hole threading into the body resolves by name.
      return {
        "#": "thunk",
        params: [...value.params],
        expression: renderExpr(
          value.body,
          slots,
          new Set([...params, ...value.params]),
        ),
      };
    }
    if (value.kind === "IrHole") {
      return { "#": "identifier", name: value.name };
    }
    if (value.kind === "IrArray") {
      return value.elements.map((entry) => renderExpr(entry, slots, params));
    }
    // A plain data object passes through. `#` is the bundle's one
    // reserved key — the discriminant of every node — so an object
    // carrying it would be indistinguishable from a node to the loader.
    if ("#" in value.entries) {
      throw new Error("Can't bundle this object: the `#` key is reserved.");
    }
    const entries: { [key: string]: BundleExpr } = {};
    for (const [key, entry] of Object.entries(value.entries)) {
      entries[key] = renderExpr(entry, slots, params);
    }
    return entries;
  };

  const root = renderExpr(ir.root, new Map());
  const functions: Record<FunctionLabel, BundleArrowNode> = {};
  for (const [index, body] of [...bodies].sort(([a], [b]) => a - b)) {
    functions[`#f${index}`] = body;
  }
  for (const [label, body] of expansionBodies) {
    functions[label] = body;
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
    } else if (value.kind === "IrExpansion") {
      visit(value.body);
    }
  };
  values.forEach(visit);
  return refs;
}
