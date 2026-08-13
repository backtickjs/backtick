import type {
  Ir,
  IrArgument,
  IrElement,
  IrExpansion,
  IrFor,
  IrScriptEntry,
  IrScriptRef,
  IrTreeRef,
} from "../ir/Ir.js";
import { cellIndex, cellKey, isCellKey, sourceName } from "./bindingKey.js";
import { locKey } from "../locKey.js";
import { NodeKind } from "./Bundle.js";
import type {
  Bundle,
  BundleArrowFunctionNode,
  BundleBody,
  BundleFunction,
  BundleCallExpressionNode,
  BundleElement,
  BundleFor,
  BundleGetFunction,
  BundleExpressionNode,
  BundleIdentifierNode,
  BundleVariableDeclarationNode,
  FunctionLabel,
} from "./Bundle.js";
import type { BundleOptions } from "../bundler.js";
import { lowerScriptBody, parameterNodes } from "./lowerScriptBody.js";

// What a tree expression renders against: the entry being materialized, and
// which keys are its parameters. The two travel together because resolving a
// key takes both the key and whose entry it is landing in. `target` is null
// where no entry encloses the expression — the bundle root, and a cell's
// initial.
interface TreeScope {
  readonly target: number | null;
  readonly params: Set<string>;
}

// Renders in no entry: nothing is in scope, and a cell reaching here has
// nowhere to resolve against.
const noInstance = (): TreeScope => ({ target: null, params: new Set() });

// Builds the bundle `{ functions, root }` as plain data. The output
// shapes — the tables, the tagged expression forms, and their evaluation
// contract — are documented on the `Bundle` types; this file documents how
// they are derived.
//
// A tree entry is a function of what it was handed: instantiating it supplies
// one value per parameter, exactly as calling a `functions` entry supplies its
// captures. The signature is derived, not stored (see `treeParams`), and a
// reference passes those captures by name.
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
export function buildBundle(ir: Ir, options: BundleOptions = {}): Bundle {
  // A binding key in a call site's own expression. Never a capture read: an
  // entry resolves its captures against its own parameters (see
  // `lowerScriptBody`) — out here a key is a name in the expression being
  // built.
  const readKey = (key: string): BundleExpressionNode => [
    NodeKind.Identifier,
    displayName(key),
  ];

  // A binding key printed under its source name, with a numeric suffix when two
  // distinct bindings would otherwise print the same — within one naming scope.
  //
  // Disambiguated at all because these become identifiers, and identifiers nest:
  // a hole inside a thunk puts one thunk's parameters inside another's, so two
  // bindings sharing a source name can land in one chain and the inner would
  // shadow what the outer was handed (`shadowing` nests three).
  //
  // Two scopes here, neither of them the whole bundle: a drawing entry, over the
  // cells it declares and the thunks written in its content; and the root, which
  // is a tree's content without the entry. A `functions` entry names inside
  // `lowerScriptBody`, from its own script — nothing out here reads those names,
  // because a call site hands an entry its arguments positionally, and its
  // captures arrive as numbered parameters rather than under a name.
  interface Naming {
    readonly names: Map<string, string>;
    readonly used: Set<string>;
  }
  const namings = new Map<string, Naming>();
  let naming = "root";
  const withNaming = <T>(scope: string, build: () => T): T => {
    const previous = naming;
    naming = scope;
    try {
      return build();
    } finally {
      naming = previous;
    }
  };
  const displayName = (key: string): string => {
    let scope = namings.get(naming);
    if (scope === undefined) {
      scope = { names: new Map(), used: new Set() };
      namings.set(naming, scope);
    }
    const existing = scope.names.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const base = sourceName(key);
    let name = base;
    for (let n = 2; scope.used.has(name); n++) {
      name = `${base}${n}`;
    }
    scope.used.add(name);
    scope.names.set(key, name);
    return name;
  };

  // The captures that the rendered form of a splice argument refers to in the
  // enclosing scope: whatever its target still needs, plus the captures of the
  // thunks passed for its splices, since those thunks are written inline at this
  // call site. A tree reference needs its
  // arguments; an inline element whatever its props need.
  // Memoized per argument — the IR is immutable and this fans out from `need`
  // and `treeParams`.
  const freeCapsCache = new Map<IrArgument, string[]>();
  const freeCaps = (value: IrArgument): string[] => {
    const cached = freeCapsCache.get(value);
    if (cached) {
      return cached;
    }
    const result = freeCapsImpl(value);
    freeCapsCache.set(value, result);
    return result;
  };

  const freeCapsImpl = (value: IrArgument): string[] => {
    switch (value.kind) {
      case "IrScriptRef": {
        const keys = [...value.target.captures];
        value.args.forEach((arg, index) => {
          // What the hole hands its thunk is supplied there, not by the call
          // site. Asking the hole rather than the entry is the exact question:
          // a binding the entry declares but that is not in scope at *this*
          // hole is not supplied here, so it still has to thread in.
          const supplied = new Set(passKeys(value.target, index));
          for (const key of freeCaps(arg)) {
            if (!supplied.has(key)) {
              keys.push(key);
            }
          }
        });
        return keys;
      }
      case "IrTreeRef":
        // An entry supplies the cells it owns, so only its params thread out.
        // The key belongs to this reference rather than the entry, so it
        // captures here, alongside them.
        return treeParams(value.target);
      // A cell threads like a capture: the entry reading it takes the handle as
      // a parameter, and its owner supplies it.
      case "IrStateRef":
        return [cellKey(value.target)];
      case "IrElement":
        return Object.values(value.props).flatMap(freeCaps);
      case "IrFor":
        return [value.each, value.children].flatMap(freeCaps);
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

  // The entry-declared bindings a hole feeds its thunk, so a spliced fragment
  // sees the bindings in scope at its hole even though the thunk is written at
  // the call site. The body's hole call and every thunk's parameter list read
  // this, so they agree positionally.
  //
  // Read off the entry's own source (see `spliceParams` in `resolveBindings`),
  // not off what the arguments reaching that hole in this bundle happen to
  // capture. That is what lets an entry be compiled from its script alone: a
  // second call site appearing elsewhere in a render cannot change a thunk a
  // first one already had.
  //
  // It is a superset — the bindings a fragment written there *could* name, not
  // the ones it does — because which fragment reaches a hole is a host
  // decision. A carried fragment arrives with its own captures already bound,
  // so the extra parameters are unused rather than wrong.
  const passKeys = (target: IrScriptEntry, hole: number): readonly string[] => {
    const splice = target.splices[hole];
    return splice === undefined ? [] : (target.spliceParams[splice] ?? []);
  };

  // What to scan for an entry's needs: an element contributes its key and its
  // props — a key may be a script, so it captures like any other value — and a
  // reference contributes itself, so the inner entry's params thread through.
  // What an entry's wiring has to reach: whatever it draws, since `freeCaps` is
  // exhaustive over every kind that could be. Empty when it draws nothing.
  const contentValues = (content: IrArgument | null): IrArgument[] =>
    content === null ? [] : [content];

  // Whether a cell's storage lives in this entry. A cell sits in the entry that
  // holds it, so ownership is a lookup rather than something to infer from
  // where the cell is read.
  const ownsCell = (target: number, key: string): boolean =>
    isCellKey(key) && cellIndex(key) in ir.trees[target].state;

  // What an entry's wiring needs, split by where it comes from:
  //
  //   params — the capture keys it takes from whichever scope instantiates it,
  //     in first-need order, which are the entry's parameters. A cell the entry
  //     doesn't own is one of them: it threads down from its owner like any
  //     other value.
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
    readonly params: string[];
    readonly cells: string[];
  }
  const treeNeedsCache = new Map<number, TreeNeeds>();
  const treeNeeds = (target: number): TreeNeeds => {
    const cached = treeNeedsCache.get(target);
    if (cached) {
      return cached;
    }
    const needs: TreeNeeds = { params: [], cells: [] };
    const seen = new Set<string>();
    for (const value of contentValues(ir.trees[target].content)) {
      for (const key of freeCaps(value)) {
        if (seen.has(key)) {
          continue;
        }
        seen.add(key);
        // Anything this entry doesn't hold is a parameter, cell or not.
        (ownsCell(target, key) ? needs.cells : needs.params).push(key);
      }
    }
    treeNeedsCache.set(target, needs);
    return needs;
  };

  const treeParams = (target: number): string[] => treeNeeds(target).params;
  const treeCells = (target: number): string[] => treeNeeds(target).cells;

  const bodies = new Map<IrScriptEntry, BundleArrowFunctionNode>();

  // A script entry's label, either of the two things that name one (see
  // `BundleOptions.functionLabels`): where it landed in the table, or where it
  // was written. Only the second is the same across responses — a table position
  // follows the order this composition reached things — so it is what a client
  // holding an entry from an earlier response can recognize.
  const scriptIndex = new Map(ir.scripts.map((script, at) => [script, at]));
  const fnLabel = (target: IrScriptEntry): FunctionLabel =>
    options.functionLabels === "location"
      ? locKey(target.fileHash, target.loc)
      : `${scriptIndex.get(target)}`;

  // A class's expansion compiles as its own `functions` entry. The entry is an
  // arrow over the expansion's holes; a construction's call site applies it to
  // the client arguments. Interned by node identity: `lowerSpliceable` shares
  // one expansion per class, so it is one entry however many instances
  // construct the class.
  //
  // Numbered rather than located whichever way scripts are labeled: an
  // expansion carries no source position (see `AstExpansion`), so its label can
  // only name where it landed, and it is not recognizable across responses the
  // way a located script entry is. Numbered past the script table so it can't
  // collide with an index label.
  const expansionBodies = new Map<FunctionLabel, BundleArrowFunctionNode>();
  const expansionLabels = new Map<IrExpansion, FunctionLabel>();
  const expansionEntry = (expansion: IrExpansion): BundleGetFunction => {
    let label = expansionLabels.get(expansion);
    if (label === undefined) {
      label = `${ir.scripts.length + ir.trees.length + expansionLabels.size}`;
      expansionLabels.set(expansion, label);
      const params = [...expansion.params];
      const expansionBody = renderValue(expansion.body);
      expansionBodies.set(label, [
        NodeKind.ArrowFunction,
        parameterNodes(params),
        expansionBody,
      ]);
    }
    return [NodeKind.GetFunction, label];
  };

  // Materializes an entry's arrow node into `bodies` the first time it is
  // reached. An entry takes a `$i` parameter per splice — its holes render as
  // calls `$i()` — ahead of its environment. Nothing from a call site is
  // inlined, so the body is a function of the script's source alone.
  const materialize = (script: IrScriptEntry): void => {
    if (bodies.has(script)) {
      return;
    }
    // One numbered sequence: a thunk per splice hole, then a value per capture.
    const params = [...script.splices, ...script.captures].map(
      (_, index) => `$${index}`,
    );
    bodies.set(script, [
      NodeKind.ArrowFunction,
      parameterNodes(params),
      lowerScriptBody(script),
    ]);
  };

  // The arguments passed when calling an entry: one thunk per splice, bound to
  // this reference's arguments, then the environment.
  const callArgs = (ref: IrScriptRef): BundleExpressionNode[] => {
    const parts: BundleExpressionNode[] = [];
    ref.args.forEach((arg, index) => {
      parts.push(renderLazily(arg, ref.target, index));
    });
    for (const key of ref.target.captures) {
      parts.push(readKey(key));
    }
    return parts;
  };

  // A fragment that is one entry whose parameters are exactly what this hole
  // passes, so calling it is what a thunk around it would have done. The lists
  // are compared rather than assumed: a hole hands over what its own entry has,
  // and a fragment wants what its own script needs, and those coincide often
  // but not always.
  const forwarding = (
    value: IrArgument,
    passed: readonly string[],
  ): BundleExpressionNode | null => {
    if (value.kind !== "IrScriptRef" || value.args.length > 0) {
      return null;
    }
    const wanted = value.target.captures;
    if (
      wanted.length !== passed.length ||
      wanted.some((key, at) => key !== passed[at])
    ) {
      return null;
    }
    materialize(value.target);
    return [NodeKind.GetFunction, fnLabel(value.target)];
  };

  // Instantiating a tree in value position: which entry, and what to hand
  // it. A tree is applied wherever it is reached — there was once a plain call
  // for the unkeyed case and an apply for the keyed one, but the two carried
  // the same label and the same arguments and differed only in the node they were
  // written as.
  // One table, one numbering: the scripts, then the entries that draw, then a
  // class's expansions. Every part is known up front — a tree per `ir.trees`
  // and an expansion interned as it is reached — so a label is decided by
  // arithmetic rather than by the order rendering happens to reach things.
  const treeLabel = (target: number): FunctionLabel =>
    `${ir.scripts.length + target}`;

  const instantiation = (value: IrTreeRef): BundleExpressionNode => {
    materializeTree(value.target);
    const args: BundleExpressionNode[] = treeParams(value.target).map(readKey);
    return [NodeKind.ApplyFunction, treeLabel(value.target), args];
  };

  // Renders an IR argument in value position — as the node for the value it
  // evaluates to. A script reference becomes a call of its `functions` entry, a
  // tree reference an application of its entry passing its captures by name;
  // every other value its literal form.
  const renderValue = (value: IrArgument): BundleExpressionNode => {
    switch (value.kind) {
      case "IrScriptRef": {
        materialize(value.target);
        const args = callArgs(value);
        const entry: BundleGetFunction = [
          NodeKind.GetFunction,
          fnLabel(value.target),
        ];
        return [NodeKind.CallExpression, entry, false, args];
      }
      case "IrTreeRef":
        return instantiation(value);
      case "IrElement":
        throw new Error("An inline element can't appear outside a tree entry.");
      case "IrFor":
        throw new Error("A `For` can't appear outside a tree entry.");
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
        // Data, and a node is an array too, so it says which it is.
        return [NodeKind.DataArray, value.elements.map(renderValue)];
      case "IrObject": {
        // A plain data object passes through, exactly as in `renderExpr`.
        const entries: { [key: string]: BundleExpressionNode } = {};
        for (const [key, entry] of Object.entries(value.entries)) {
          entries[key] = renderValue(entry);
        }
        return entries;
      }
    }
  };

  // Renders a splice argument in thunk position — as a function yielding the
  // value — so the entry evaluates it lazily at the hole, which is what keeps a
  // splice as lazy as it reads. When the splice captures bindings the entry
  // declares, the arrow takes them as parameters and the hole call supplies them
  // (see `passKeys`); the body's identifiers then resolve through its frame.
  // Otherwise a referenced entry that takes no arguments already is one;
  // anything else is wrapped.
  const renderLazily = (
    value: IrArgument,
    target: IrScriptEntry,
    hole: number,
  ): BundleExpressionNode => {
    const params = passKeys(target, hole).map(displayName);
    if (params.length > 0) {
      return [
        NodeKind.ArrowFunction,
        parameterNodes(params),
        renderValue(value),
      ];
    }
    if (value.kind === "IrScriptRef") {
      materialize(value.target);
      const args = callArgs(value);
      const entry: BundleGetFunction = [
        NodeKind.GetFunction,
        fnLabel(value.target),
      ];
      const call: BundleCallExpressionNode = [
        NodeKind.CallExpression,
        entry,
        false,
        args,
      ];
      return args.length === 0 ? entry : [NodeKind.ArrowFunction, [], call];
    }
    if (value.kind === "IrTreeRef") {
      // A hole calls what it is handed, so what it is handed is a body to run:
      // the application, in an arrow. An entry taking nothing used to be passed as
      // itself, being already a function of nothing — but that took a node kind
      // of its own to say, and this says it with the one every other reference
      // uses.
      materializeTree(value.target);
      return [NodeKind.ArrowFunction, [], instantiation(value)];
    }
    return [NodeKind.ArrowFunction, [], renderValue(value)];
  };

  const treeJsons = new Map<number, BundleFunction>();

  // Materializes a tree entry into `treeJsons` the first time it is reached:
  // its element rendered as a bundle expression against the entry's own
  // parameters.
  const materializeTree = (target: number): void => {
    if (treeJsons.has(target)) {
      return;
    }
    withNaming(`t${target}`, () => buildTree(target));
  };

  // `const s0 = state(<initial>)`: the entry allocates its own storage, and its
  // content resolves the name.
  const cellBinding = (
    name: string,
    initial: IrArgument,
  ): BundleVariableDeclarationNode => [
    NodeKind.VariableDeclaration,
    name,
    [
      NodeKind.State,
      // A cell's initial is data (`state-in-state-initial` rejects anything that
      // reads), so it is an expression node wherever it renders.
      renderExpr(initial, noInstance()) as BundleExpressionNode,
    ],
    "const",
  ];

  // An entry as its arrow: the cells it declares, then what it draws. A body
  // only where there is something to bind — otherwise the arrow is its content.
  const treeEntry = (
    params: string[],
    bindings: BundleVariableDeclarationNode[],
    drawn: BundleExpressionNode,
  ): BundleFunction => {
    const body: BundleBody =
      bindings.length === 0
        ? (drawn as BundleExpressionNode)
        : [
            NodeKind.Block,
            [
              ...bindings,
              [NodeKind.ReturnStatement, drawn as BundleExpressionNode],
            ],
          ];
    return [[NodeKind.ArrowFunction, parameterNodes(params), body]];
  };

  const buildTree = (target: number): void => {
    const keys = treeParams(target);
    const scope: TreeScope = { target, params: new Set(keys) };
    // Named where its expressions name them.
    const names = keys.map(displayName);
    const content = ir.trees[target].content;
    // A cell's initial is data the entry carries, evaluated in no instance: it
    // can't read a parameter or another cell, so it renders against nothing.
    const bindings: BundleVariableDeclarationNode[] = [];
    for (const key of treeCells(target)) {
      // `treeCells` only yields keys this entry holds, so the initial is here.
      const initial = ir.trees[target].state[cellIndex(key)];
      if (initial !== undefined) {
        bindings.push(cellBinding(displayName(key), initial));
      }
    }
    // An instance that draws nothing: the entry stays, with nothing under it.
    if (content === null) {
      treeJsons.set(target, treeEntry(names, bindings, null));
      return;
    }
    // Whatever it draws, rendered as any other value in tree position is: an
    // element inline, an inner instance applied, a fragment's children as the
    // list they are.
    treeJsons.set(
      target,
      treeEntry(names, bindings, renderExpr(content, scope, new Set())),
    );
  };

  // Renders a capture in JSON position: a parameter of an enclosing thunk
  // resolves by name; anything else must be a parameter of the enclosing entry.
  // At
  // the bundle root there is no enclosing instance, so a capture reaching it
  // can't be threaded from anywhere.
  const capExpr = (
    key: string,
    scope: TreeScope,
    params: ReadonlySet<string> = new Set(),
  ): BundleIdentifierNode => {
    if (params.has(key)) {
      return [NodeKind.Identifier, displayName(key)];
    }
    // Before the cell case: a cell this entry doesn't own arrives as a
    // parameter, and only one it owns is bound here.
    if (scope.params.has(key)) {
      return [NodeKind.Identifier, displayName(key)];
    }
    if (isCellKey(key)) {
      // The one place a `cell` node is made, so the rule `Bundle.ts` states —
      // a cell only means anything inside the entry declaring it — is enforced
      // by this comparison rather than by rescanning the finished bundle.
      // Reaching here off its owner means the cell threaded outward as a parameter
      // until nothing was left to supply it.
      if (scope.target === null) {
        throw new Error(
          `Can't read the state cell \`${sourceName(key)}\` here: its ` +
            "storage belongs to a component instance, and this is evaluated " +
            "where there is none — a cell's initial value, or the bundle's " +
            "root. Read it from a script the component renders instead.",
        );
      }
      if (!ownsCell(scope.target, key)) {
        throw new Error(
          `Can't read the state cell \`${sourceName(key)}\` here: a cell's ` +
            "storage belongs to the component instance that declared it, so " +
            "it reaches another component only by being passed down as a " +
            "prop. Pass it down, or declare a cell where it is read.",
        );
      }
      return [NodeKind.Identifier, displayName(key)];
    }
    throw new Error(
      `Can't thread the capture \`${sourceName(key)}\`: nothing encloses ` +
        "this reference to supply it. A fragment carries the bindings it was " +
        "written under, so this is also what happens when one is spliced " +
        "somewhere another `" +
        sourceName(key) +
        "` shadows it: the binding is still there, but no longer reachable by " +
        "name, and naming it anyway would mean emitting what the source " +
        "couldn't say.",
    );
  };

  // The arguments of a `#call` to a function entry, mirroring `callArgs`: for
  // one `#thunk` per splice ahead of the environment.
  const exprCallArgs = (
    ref: IrScriptRef,
    scope: TreeScope,
    params: ReadonlySet<string>,
  ): BundleExpressionNode[] => {
    const parts: BundleExpressionNode[] = [];
    ref.args.forEach((arg, index) => {
      // What the hole hands over, in the order the entry fixes: the bindings
      // bound there, then the captures it forwards on behalf of whatever is
      // nested inside it.
      const passed = [...passKeys(ref.target, index), ...ref.target.captures];
      // A fragment whose own parameters are exactly that list reads the hole's
      // arguments as they arrive, so it is passed as it is rather than wrapped
      // in a thunk that would only pass them along.
      const forwarded = forwarding(arg, passed);
      if (forwarded !== null) {
        parts.push(forwarded);
        return;
      }
      if (passed.length === 0) {
        parts.push([
          NodeKind.ArrowFunction,
          [],
          renderExpr(arg, scope, params),
        ]);
        return;
      }
      // Otherwise a thunk names them and calls the fragment with what it wants.
      const inner = new Set([...params, ...passed]);
      parts.push([
        NodeKind.ArrowFunction,
        parameterNodes(passed.map(displayName)),
        renderExpr(arg, scope, inner),
      ]);
    });
    for (const key of ref.target.captures) {
      parts.push(capExpr(key, scope, params));
    }
    return parts;
  };

  // Renders an inline element: static structure carried as data, each prop a
  // bundle expression in the enclosing entry's scope.
  const renderElement = (
    element: IrElement,
    scope: TreeScope,
    params: ReadonlySet<string>,
  ): BundleElement => {
    const props: { [key: string]: BundleExpressionNode } = {};
    let children: BundleExpressionNode = null;
    for (const [key, entry] of Object.entries(element.props)) {
      const rendered = renderExpr(entry, scope, params);
      if (key === "children") {
        children = rendered;
        continue;
      }
      props[key] = rendered;
    }
    return [NodeKind.Element, element.id, props, children];
  };

  const renderFor = (
    value: IrFor,
    scope: TreeScope,
    params: ReadonlySet<string>,
  ): BundleFor => [
    NodeKind.For,
    renderExpr(value.each, scope, params),
    renderExpr(value.children, scope, params),
  ];

  // Renders an IR argument in expression position — the form used inside tree
  // entries and for the bundle root, where composition is data rather than
  // source. The mirror of `renderValue`.
  const renderExpr = (
    value: IrArgument,
    scope: TreeScope,
    params: ReadonlySet<string> = new Set(),
  ): BundleExpressionNode => {
    if (value.kind === "IrScriptRef") {
      materialize(value.target);
      const args = exprCallArgs(value, scope, params);
      return [NodeKind.ApplyFunction, fnLabel(value.target), args];
    }
    if (value.kind === "IrTreeRef") {
      materializeTree(value.target);
      const args = treeParams(value.target).map((key) =>
        capExpr(key, scope, params),
      );
      return [NodeKind.ApplyFunction, treeLabel(value.target), args];
    }
    if (value.kind === "IrElement") {
      return renderElement(value, scope, params);
    }
    if (value.kind === "IrFor") {
      return renderFor(value, scope, params);
    }
    // A cell in tree position resolves by name, like anything else the entry
    // bound or was handed.
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
      return [
        NodeKind.ArrowFunction,
        parameterNodes(value.params),
        renderExpr(value.body, scope, new Set([...params, ...value.params])),
      ];
    }
    if (value.kind === "IrHole") {
      return [NodeKind.Identifier, value.name];
    }
    if (value.kind === "IrArray") {
      // Data, and a node is an array too, so it says which it is.
      return [
        NodeKind.DataArray,
        value.elements.map((entry) => renderExpr(entry, scope, params)),
      ];
    }
    // A plain data object passes through, every key of it: a node is an array,
    // so an object is never mistaken for one and the format reserves no key.
    const entries: { [key: string]: BundleExpressionNode } = {};
    for (const [key, entry] of Object.entries(value.entries)) {
      entries[key] = renderExpr(entry, scope, params);
    }
    return entries;
  };

  // Nothing encloses the root, so it can hold no cell at all.
  const root = renderExpr(ir.root, noInstance());
  const functions: Record<FunctionLabel, BundleFunction> = {};
  // In table order, which is the order the walk first reached each script.
  for (const script of ir.scripts) {
    const body = bodies.get(script);
    if (body !== undefined) {
      functions[fnLabel(script)] = [body];
    }
  }
  for (const [index, tree] of [...treeJsons].sort(([a], [b]) => a - b)) {
    functions[treeLabel(index)] = tree;
  }
  for (const [label, body] of expansionBodies) {
    functions[label] = [body];
  }
  return { functions, root };
}
