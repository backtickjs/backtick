import type {
  Ir,
  IrArgument,
  IrElement,
  IrExpansion,
  IrScriptRef,
  IrTreeRef,
} from "../ir/Ir.js";
import { NodeKind, NodeField } from "./Bundle.js";
import type {
  Bundle,
  BundleArrowNode,
  BundleElement,
  BundleGetEntry,
  BundleExpr,
  BundleExpressionNode,
  BundleIdentifierNode,
  BundleTree,
  BundleGetState,
  BundleGetSlot,
  FunctionLabel,
  TreeLabel,
} from "./Bundle.js";
import { lowerScriptBody, type RenderSplice } from "./lowerScriptBody.js";

// A state cell threads into entries exactly like a capture — an entry that
// reads a cell receives its handle as a parameter — so a cell travels as a
// capture key. `#` starts the key because it can't appear in a binding key
// (or in a JS identifier), so the two namespaces can't collide.
function cellKey(index: number): string {
  return `#s${index}`;
}

function isCellKey(key: string): boolean {
  return key.startsWith("#s");
}

function cellIndex(key: string): number {
  return Number(key.slice(2));
}

// What a tree expression renders against: the entry being materialized, and the
// slot index of each capture it threads in. The two travel together because a
// `cell` node means storage on the enclosing entry, so resolving one takes both
// the key and whose entry it is landing in. `target` is null where no instance
// encloses the expression — the bundle root, and a cell's initial.
interface TreeScope {
  readonly target: number | null;
  readonly slots: Map<string, number>;
}

// Renders in no instance: nothing is in scope, and a cell reaching here has
// nowhere to resolve against.
const noInstance = (): TreeScope => ({ target: null, slots: new Map() });

// Recovers the source name from a binding key `<name>$<fileHash>$<n>` by
// dropping the hash/counter suffix the compiler appends for global uniqueness.
//
// Two bindings may print the same: they only share a scope when the source
// shadows, and a block frames its own declarations, so the inner one shadows the
// outer as written. Entries never meet — arguments are positional — and a
// capture is a key in `$env` rather than an identifier.
function sourceName(key: string): string {
  if (isCellKey(key)) {
    return key.slice(1);
  }
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
// reference to a tree from source position renders as a call of its entry
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
//     nested-script argument as a call of its entry, a runtime value as a
//     literal),
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

  // The parameter an entry receives its captures under, and the key each capture
  // sits at: its source name, or a cell's own reserved key — `#` can't appear in
  // an identifier, so a cell can never collide with a variable.
  //
  // Two captures of one entry can want the same source name. An entry's own free
  // variables can't collide — within one script a name resolves outward to
  // exactly one binding — but an entry also receives whatever the arguments it
  // inlines capture, and a fragment written under one `base` can be carried by
  // host code into a script written under another. So a name is disambiguated,
  // per entry: distinct bindings never share a key, and the same binding always
  // renders the same, which is what makes a body's reads line up with the object
  // a call site builds.
  //
  // Per entry rather than per bundle, so a name minted for one entry can't shift
  // another's — an entry's keys depend on its own captures and nothing else.
  const envParam = "$env";
  const envKeys = new Map<number, Map<string, string>>();
  const envKey = (target: number, key: string): string => {
    if (isCellKey(key)) {
      return key;
    }
    let names = envKeys.get(target);
    if (names === undefined) {
      names = new Map();
      envKeys.set(target, names);
    }
    const existing = names.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const taken = new Set(names.values());
    const base = sourceName(key);
    let name = base;
    for (let n = 2; taken.has(name); n++) {
      name = `${base}${n}`;
    }
    names.set(key, name);
    return name;
  };

  // The captures a reference supplies, as the object the entry reads them from.
  // Null when the entry captures nothing, so neither side carries an empty one.
  const envObject = <T>(
    target: number,
    value: (key: string) => T,
  ): { [name: string]: T } | null => {
    const keys = need(target);
    if (keys.length === 0) {
      return null;
    }
    const env: { [name: string]: T } = {};
    for (const key of keys) {
      env[envKey(target, key)] = value(key);
    }
    return env;
  };

  // Which entry's body is being rendered. A binding key emitted inside a body
  // has to resolve the way that body resolves it — a capture reads off the
  // environment, anything else is a local name — but bodies are built through
  // `renderValue` and `callArgs`, which are shared with tree position. Ambient
  // rather than a parameter on both, and on everything they reach.
  let bodyEntry: number | null = null;
  const withBodyOf = <T>(target: number | null, build: () => T): T => {
    const previous = bodyEntry;
    bodyEntry = target;
    try {
      return build();
    } finally {
      bodyEntry = previous;
    }
  };
  const capturedCache = new Map<number, ReadonlySet<string>>();
  const capturedBy = (target: number): ReadonlySet<string> => {
    let keys = capturedCache.get(target);
    if (keys === undefined) {
      keys = new Set(need(target));
      capturedCache.set(target, keys);
    }
    return keys;
  };
  const envRead = (target: number, key: string): BundleExpressionNode => ({
    "#": NodeKind.Property,
    [NodeField.object]: {
      "#": NodeKind.Identifier,
      [NodeField.name]: envParam,
    },
    [NodeField.name]: envKey(target, key),
  });
  const readKey = (key: string): BundleExpressionNode =>
    bodyEntry !== null && capturedBy(bodyEntry).has(key)
      ? envRead(bodyEntry, key)
      : { "#": NodeKind.Identifier, [NodeField.name]: sourceName(key) };

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
  const seenCells = new Set<number>();
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
    for (const child of nestedRefs(ref.args, ir, seenTrees, seenCells)) {
      collectRefs(child);
    }
  };
  for (const ref of nestedRefs([ir.root], ir, seenTrees, seenCells)) {
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

  // The captures an entry receives in its environment: its own free variables
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
  // `need`, `captured`, and `treeSlots`. A result computed while a `need` is
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
            // call (it is one of the entry's `captured`), not by the call site.
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
        // An entry supplies the cells it owns, so only its slots thread out.
        // The key belongs to this reference rather than the entry, so it
        // captures here, alongside them.
        return [...freeCaps(value.key), ...treeSlots(value.target)];
      // A cell threads like a capture: the entry reading it takes the handle as
      // a parameter, and its owner supplies it.
      case "IrStateRef":
        return [cellKey(value.target)];
      case "IrElement":
        return [value.key, ...Object.values(value.props)].flatMap(freeCaps);
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

  // What to scan for an entry's needs: an element contributes its key and its
  // props — a key may be a script, so it captures like any other value — and a
  // reference contributes itself, so the inner instance's slots thread through.
  const contentValues = (
    content: IrElement | IrTreeRef | null,
  ): IrArgument[] =>
    content === null
      ? [] // renders nothing, so there is no wiring to thread
      : content.kind === "IrElement"
        ? [content.key, ...Object.values(content.props)]
        : [content];

  // Where each cell's storage lives: the entry the declaring component's
  // invocation became. `state()` recorded which invocation declared it, so
  // there is nothing to infer from where the cell is read.
  const cellOwner = new Map<string, number>();
  ir.states.forEach((entry, index) => {
    cellOwner.set(cellKey(index), entry.owner);
  });

  // What an entry's wiring needs, split by where it comes from:
  //
  //   slots — the capture keys it takes from whichever scope instantiates it,
  //     in first-need order. These are the entry's implicit parameters, and a
  //     reference passes one value per key, exactly as captures thread between
  //     functions. A cell the entry doesn't own is one of them: it threads down
  //     from its owner like any other value.
  //   cells — the cells it owns, and so declares. Every instance of the entry
  //     allocates its own storage for each.
  //
  // Split here rather than by filtering a combined list, so the rule is stated
  // once and the two can't drift into overlapping or leaving a key out.
  //
  // An entry whose content is a reference needs whatever that inner instance
  // needs, so the walk starts from the content rather than from props.
  // Memoized; no cycle guard is needed because the entry graph is acyclic —
  // a child is always built before its parent.
  interface TreeNeeds {
    readonly slots: string[];
    readonly cells: string[];
  }
  const treeNeedsCache = new Map<number, TreeNeeds>();
  const treeNeeds = (target: number): TreeNeeds => {
    const cached = treeNeedsCache.get(target);
    if (cached) {
      return cached;
    }
    const needs: TreeNeeds = { slots: [], cells: [] };
    const seen = new Set<string>();
    for (const value of contentValues(ir.trees[target].content)) {
      for (const key of freeCaps(value)) {
        if (seen.has(key)) {
          continue;
        }
        seen.add(key);
        // Only a cell is ever owned, so a binding key falls through to a slot
        // without needing to be recognized as one.
        const owned = cellOwner.get(key) === target;
        (owned ? needs.cells : needs.slots).push(key);
      }
    }
    treeNeedsCache.set(target, needs);
    return needs;
  };

  const treeSlots = (target: number): string[] => treeNeeds(target).slots;
  const treeCells = (target: number): string[] => treeNeeds(target).cells;

  const bodies = new Map<number, BundleArrowNode>();

  // A class's expansion compiles as its own `functions` entry, labeled
  // after the script entries (script indices are reserved whether or not
  // they materialize). The entry is an arrow over the expansion's holes; a
  // construction's call site applies it to the client arguments. Interned
  // by node identity: `lowerSpliceable` shares one expansion per class, so
  // it is one entry however many instances construct the class.
  const expansionBodies = new Map<FunctionLabel, BundleArrowNode>();
  const expansionLabels = new Map<IrExpansion, FunctionLabel>();
  const expansionEntry = (expansion: IrExpansion): BundleGetEntry => {
    let label = expansionLabels.get(expansion);
    if (label === undefined) {
      label = `${fns.length + expansionLabels.size}`;
      expansionLabels.set(expansion, label);
      const params = [...expansion.params];
      const expansionBody = withBodyOf(null, () => renderValue(expansion.body));
      expansionBodies.set(label, {
        "#": NodeKind.Arrow,
        ...(params.length === 0 ? {} : { [NodeField.params]: params }),
        [NodeField.body]: expansionBody,
      });
    }
    return { "#": NodeKind.GetFunction, [NodeField.label]: label };
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
    bodies.set(target, { "#": NodeKind.Arrow, [NodeField.body]: null });
    const captured = new Set(need(target));
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
      params = [...spliceParams, ...(captured.size === 0 ? [] : [envParam])];
      renderSplice = (key) => {
        const index = holeIndex(key);
        const args = fns[target].captured.map((key) => ({
          "#": NodeKind.Identifier,
          [NodeField.name]: sourceName(key),
        }));
        return {
          "#": NodeKind.Call,
          [NodeField.callee]: {
            "#": NodeKind.Identifier,
            [NodeField.name]: `$${index}`,
          },
          ...(args.length === 0 ? {} : { [NodeField.args]: args }),
        };
      };
    } else {
      params = captured.size === 0 ? [] : [envParam];
      const args = monoArgs(target);
      renderSplice = (key) => renderValue(args[holeIndex(key)]);
    }
    const body = withBodyOf(target, () =>
      lowerScriptBody(fns[target].body, renderSplice, sourceName, readKey),
    );
    bodies.set(target, {
      "#": NodeKind.Arrow,
      ...(params.length === 0 ? {} : { [NodeField.params]: params }),
      [NodeField.body]: body,
    });
  };

  // The arguments passed when calling an entry: for a polymorphic target, one
  // thunk per splice (bound to this reference's arguments) ahead of its
  // environment; for a monomorphic target, just the environment.
  const callArgs = (ref: IrScriptRef): BundleExpressionNode[] => {
    const parts: BundleExpressionNode[] = [];
    if (polymorphic.has(ref.target)) {
      ref.args.forEach((arg) => {
        parts.push(renderThunk(arg, ref.target));
      });
    }
    const env = envObject(ref.target, readKey);
    if (env !== null) {
      parts.push(env);
    }
    return parts;
  };

  // A body instantiates a tree with a plain call, which carries no key — so a
  // keyed component spliced into a script would lose it. Refused rather than
  // dropped; the key only means something where siblings are compared.
  const requireUnkeyed = (value: IrTreeRef): void => {
    if (!(value.key.kind === "IrValue" && value.key.value === null)) {
      throw new Error(
        "Can't splice a keyed component into a script: a key identifies an " +
          "instance among siblings, and a script instantiates one on its own. " +
          "Wrap it in a fragment, or drop the key. An array won't do — only " +
          "an element survives a splice, and its children are what land in " +
          "tree position, where a key means something.",
      );
    }
  };

  // Renders an IR argument in value position — as the node for the value it
  // evaluates to. A script reference becomes a call of its `functions` entry, a
  // tree reference a call of its `trees` entry passing the tree's slot captures;
  // every other value its literal form.
  const renderValue = (value: IrArgument): BundleExpressionNode => {
    switch (value.kind) {
      case "IrScriptRef": {
        materialize(value.target);
        const args = callArgs(value);
        return {
          "#": NodeKind.Call,
          [NodeField.callee]: {
            "#": NodeKind.GetFunction,
            [NodeField.label]: `${value.target}`,
          },
          ...(args.length === 0 ? {} : { [NodeField.args]: args }),
        };
      }
      case "IrTreeRef": {
        materializeTree(value.target);
        requireUnkeyed(value);
        const args = treeSlots(value.target).map(readKey);
        return {
          "#": NodeKind.Call,
          [NodeField.callee]: {
            "#": NodeKind.GetTree,
            [NodeField.label]: `${value.target}`,
          },
          ...(args.length === 0 ? {} : { [NodeField.args]: args }),
        };
      }
      case "IrElement":
        throw new Error("An inline element can't appear outside a tree entry.");
      // In a body the handle is already in scope: the entry was handed it with
      // its captures (see `freeCaps`), so it reads like any of them.
      case "IrStateRef":
        return readKey(cellKey(value.target));
      case "IrValue":
        return value.value;
      // An expansion in value position is its `functions` entry: passed
      // bare it is the function itself, which the construction's call site
      // applies to the client arguments.
      case "IrExpansion":
        return expansionEntry(value);
      // A hole threads like a capture (see `freeCaps`), so in a body it is
      // reached the same way — through the environment when the entry took it
      // as one.
      case "IrHole":
        return readKey(value.name);
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
  // an inlined splice. Otherwise a referenced entry that takes no arguments is a
  // nullary thunk as-is; anything else is wrapped in an arrow.
  //
  // The entry's `captured` are its parameters: the bindings it declares that
  // escape into a fragment written inside it, so a spliced fragment sees the
  // bindings in scope at its hole even though the thunk is written at the call
  // site. The hole call supplies them positionally, reading the same list, and
  // the body's identifiers then resolve through the thunk frame.
  //
  // One list for every hole rather than one per hole: which fragment reaches
  // which hole is a host decision — a fragment can be carried in from another
  // scope entirely — so no reading of the source can say it exactly. The
  // compiler's answer is the tightest thing that is a fact about the script
  // alone, which is what keeps a second call site appearing elsewhere in a
  // render from changing a thunk a first one already had.
  const renderThunk = (
    value: IrArgument,
    target: number,
  ): BundleExpressionNode => {
    const params = fns[target].captured.map(sourceName);
    if (params.length > 0) {
      return {
        "#": NodeKind.Arrow,
        ...(params.length === 0 ? {} : { [NodeField.params]: params }),
        [NodeField.body]: renderValue(value),
      };
    }
    if (value.kind === "IrScriptRef") {
      materialize(value.target);
      const args = callArgs(value);
      const entry = {
        "#": NodeKind.GetFunction,
        [NodeField.label]: `${value.target}`,
      } as const satisfies BundleExpressionNode;
      return args.length === 0
        ? entry
        : {
            "#": NodeKind.Arrow,
            [NodeField.body]: { "#": NodeKind.Call, callee: entry, args },
          };
    }
    if (value.kind === "IrTreeRef") {
      materializeTree(value.target);
      requireUnkeyed(value);
      const args = treeSlots(value.target).map(readKey);
      const entry = {
        "#": NodeKind.GetTree,
        [NodeField.label]: `${value.target}`,
      } as const satisfies BundleExpressionNode;
      return args.length === 0
        ? entry
        : {
            "#": NodeKind.Arrow,
            [NodeField.body]: { "#": NodeKind.Call, callee: entry, args },
          };
    }
    return { "#": NodeKind.Arrow, [NodeField.body]: renderValue(value) };
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
    const scope: TreeScope = {
      target,
      slots: new Map(keys.map((key, index) => [key, index] as const)),
    };
    const content = ir.trees[target].content;
    // A cell's initial is data the entry carries, evaluated in no instance: it
    // can't read a slot or another cell, so it renders against an empty scope.
    const cells = treeCells(target);
    const state: { [name: string]: BundleExpr } = {};
    for (const key of cells) {
      state[sourceName(key)] = renderExpr(
        ir.states[cellIndex(key)].initial,
        noInstance(),
      );
    }
    const declared = cells.length === 0 ? {} : { [NodeField.state]: state };
    // An instance that renders nothing: the entry stays, with nothing under it.
    if (content === null) {
      treeJsons.set(target, { [NodeField.content]: null, ...declared });
      return;
    }
    if (content.kind === "IrElement") {
      treeJsons.set(target, {
        [NodeField.content]: renderElement(content, scope, new Set()),
        ...declared,
      });
      return;
    }
    // An instance that renders another instance: applying the inner entry,
    // passing whatever its slots need from this one's.
    materializeTree(content.target);
    const passedKey = renderExpr(content.key, scope);
    const args = treeSlots(content.target).map((key) => capExpr(key, scope));
    treeJsons.set(target, {
      [NodeField.content]: {
        "#": NodeKind.ApplyTree,
        [NodeField.label]: `${content.target}`,
        ...(args.length === 0 ? {} : { [NodeField.args]: args }),
        ...(passedKey === null ? {} : { [NodeField.key]: passedKey }),
      },
      ...declared,
    });
  };

  // Renders a capture in JSON position: a parameter of an enclosing thunk
  // resolves by name; anything else must be a slot of the enclosing tree. At
  // the bundle root there is no enclosing instance, so a capture reaching it
  // can't be threaded from anywhere.
  const capExpr = (
    key: string,
    scope: TreeScope,
    params: ReadonlySet<string> = new Set(),
  ): BundleGetSlot | BundleGetState | BundleIdentifierNode => {
    if (params.has(key)) {
      return { "#": NodeKind.Identifier, [NodeField.name]: sourceName(key) };
    }
    // Before the cell case: a cell this entry doesn't own arrives as a slot, and
    // only one it owns resolves against the instance.
    const index = scope.slots.get(key);
    if (index !== undefined) {
      return { "#": NodeKind.GetSlot, [NodeField.index]: index };
    }
    if (isCellKey(key)) {
      // The one place a `cell` node is made, so the rule `Bundle.ts` states —
      // a cell only means anything inside the entry declaring it — is enforced
      // by this comparison rather than by rescanning the finished bundle.
      // Reaching here off its owner means the cell threaded outward as a slot
      // until nothing was left to supply it.
      if (scope.target === null) {
        throw new Error(
          `Can't read the state cell \`${sourceName(key)}\` here: its ` +
            "storage belongs to a component instance, and this is evaluated " +
            "where there is none — a cell's initial value, or the bundle's " +
            "root. Read it from a script the component renders instead.",
        );
      }
      if (cellOwner.get(key) !== scope.target) {
        throw new Error(
          `Can't read the state cell \`${sourceName(key)}\` here: a cell's ` +
            "storage belongs to the component instance that declared it, so " +
            "it reaches another component only by being passed down as a " +
            "prop. Pass it down, or declare a cell where it is read.",
        );
      }
      return { "#": NodeKind.GetState, [NodeField.name]: sourceName(key) };
    }
    throw new Error(
      `Can't thread the capture \`${sourceName(key)}\`: nothing encloses ` +
        "this reference to supply it.",
    );
  };

  // The arguments of a `#call` to a function entry, mirroring `callArgs`: for
  // a polymorphic target, one `#thunk` per splice ahead of its environment.
  const exprCallArgs = (
    ref: IrScriptRef,
    scope: TreeScope,
    params: ReadonlySet<string>,
  ): BundleExpr[] => {
    const parts: BundleExpr[] = [];
    if (polymorphic.has(ref.target)) {
      ref.args.forEach((arg) => {
        const passed = fns[ref.target].captured;
        if (passed.length === 0) {
          parts.push({
            "#": NodeKind.Thunk,
            [NodeField.expression]: renderExpr(arg, scope, params),
          });
          return;
        }
        // The thunk's parameters extend the enclosing ones, like a nested
        // frame: the expression sees both.
        const inner = new Set([...params, ...passed]);
        parts.push({
          "#": NodeKind.Thunk,
          [NodeField.params]: passed.map(sourceName),
          [NodeField.expression]: renderExpr(arg, scope, inner),
        });
      });
    }
    const env = envObject(ref.target, (key) => capExpr(key, scope, params));
    if (env !== null) {
      parts.push(env);
    }
    return parts;
  };

  // Renders an inline element: static structure carried as data, each prop a
  // bundle expression against the enclosing tree's slots.
  const renderElement = (
    element: IrElement,
    scope: TreeScope,
    params: ReadonlySet<string>,
  ): BundleElement => {
    const key = renderExpr(element.key, scope, params);
    const props: { [key: string]: BundleExpr } = {};
    for (const [key, entry] of Object.entries(element.props)) {
      props[key] = renderExpr(entry, scope, params);
    }
    return {
      "#": NodeKind.Element,
      [NodeField.id]: element.id,
      ...(key === null ? {} : { [NodeField.key]: key }),
      ...(Object.keys(props).length === 0 ? {} : { [NodeField.props]: props }),
    };
  };

  // Renders an IR argument in expression position — the form used inside tree
  // entries and for the bundle root, where composition is data rather than
  // source. The mirror of `renderValue`.
  const renderExpr = (
    value: IrArgument,
    scope: TreeScope,
    params: ReadonlySet<string> = new Set(),
  ): BundleExpr => {
    if (value.kind === "IrScriptRef") {
      materialize(value.target);
      const args = exprCallArgs(value, scope, params);
      return {
        "#": NodeKind.ApplyFunction,
        [NodeField.label]: `${value.target}`,
        ...(args.length === 0 ? {} : { [NodeField.args]: args }),
      };
    }
    if (value.kind === "IrTreeRef") {
      materializeTree(value.target);
      const keyed = renderExpr(value.key, scope, params);
      const args = treeSlots(value.target).map((key) =>
        capExpr(key, scope, params),
      );
      return {
        "#": NodeKind.ApplyTree,
        [NodeField.label]: `${value.target}`,
        ...(args.length === 0 ? {} : { [NodeField.args]: args }),
        ...(keyed === null ? {} : { [NodeField.key]: keyed }),
      };
    }
    if (value.kind === "IrElement") {
      return renderElement(value, scope, params);
    }
    // A handle in tree position resolves against the instance, exactly as a
    // slot resolves against the instantiation arguments.
    if (value.kind === "IrStateRef") {
      return capExpr(cellKey(value.target), scope, params);
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
        "#": NodeKind.Thunk,
        [NodeField.params]: [...value.params],
        [NodeField.expression]: renderExpr(
          value.body,
          scope,
          new Set([...params, ...value.params]),
        ),
      };
    }
    if (value.kind === "IrHole") {
      return { "#": NodeKind.Identifier, [NodeField.name]: value.name };
    }
    if (value.kind === "IrArray") {
      return value.elements.map((entry) => renderExpr(entry, scope, params));
    }
    // A plain data object passes through. `#` is the bundle's one
    // reserved key — the discriminant of every node — so an object
    // carrying it would be indistinguishable from a node to the loader.
    if ("#" in value.entries) {
      throw new Error("Can't bundle this object: the `#` key is reserved.");
    }
    const entries: { [key: string]: BundleExpr } = {};
    for (const [key, entry] of Object.entries(value.entries)) {
      entries[key] = renderExpr(entry, scope, params);
    }
    return entries;
  };

  // Nothing encloses the root, so it can hold no cell at all.
  const root = renderExpr(ir.root, noInstance());
  const functions: Record<FunctionLabel, BundleArrowNode> = {};
  for (const [index, body] of [...bodies].sort(([a], [b]) => a - b)) {
    functions[`${index}`] = body;
  }
  for (const [label, body] of expansionBodies) {
    functions[label] = body;
  }
  const trees: Record<TreeLabel, BundleTree> = {};
  for (const [index, tree] of [...treeJsons].sort(([a], [b]) => a - b)) {
    trees[`${index}`] = tree;
  }
  return { functions, trees, root };
}

// Collects every script reference reachable inside a list of arguments,
// descending into array and object values, inline elements, and — through the
// tree and state tables — tree and cell references, each entry once per `seen`
// set (a nested script may be spliced anywhere).
function nestedRefs(
  values: readonly IrArgument[],
  ir: Ir,
  seenTrees: Set<number>,
  seenCells: Set<number>,
): IrScriptRef[] {
  const refs: IrScriptRef[] = [];
  const visit = (value: IrArgument): void => {
    if (value.kind === "IrScriptRef") {
      refs.push(value);
    } else if (value.kind === "IrTreeRef") {
      // The key is this reference's own, so it is walked per reference rather
      // than once per entry.
      visit(value.key);
      if (!seenTrees.has(value.target)) {
        seenTrees.add(value.target);
        const content = ir.trees[value.target].content;
        if (content !== null) {
          visit(content);
        }
      }
    } else if (value.kind === "IrStateRef") {
      // A cell's initial is carried by its owning entry, so scripts spliced
      // into it are reachable only through here.
      if (!seenCells.has(value.target)) {
        seenCells.add(value.target);
        visit(ir.states[value.target].initial);
      }
    } else if (value.kind === "IrElement") {
      visit(value.key);
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
