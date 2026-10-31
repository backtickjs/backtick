import type ts from "typescript";
import { inTypePosition } from "./inTypePosition.js";
import type { ClientScript, ParsedFile } from "./parseFile.js";
import { programOf } from "./programOf.js";

/**
 * Every client script in a file, its scopes resolved by TypeScript's checker,
 * so any syntax TypeScript reads is resolved as the language does. It produces
 * three things:
 *
 *  - `bindings`: every *bound* variable identifier — a declaration, an arrow
 *    parameter, or a reference that resolves to one of those — mapped to a
 *    stable, globally unique binding key: what a capture is threaded by, and
 *    what the virtual code renames a script's own bindings from.
 *
 *  - `params`: for each script, its parameters in order (see `ResolvedParam`):
 *
 *    - each splice it reads, a tag's (`<$Card>`) among them, with where it
 *      reads it and `bindings`: the script's own bindings a fragment landing
 *      at that hole can reach, what the hole must hand whatever arrives.
 *      Unlike counting what actually reached a hole in one bundle, it is a
 *      fact about the script alone.
 *    - each capture: a free variable it references but does not itself
 *      declare, which it must capture from the enclosing scope, as a binding
 *      key. Captures are ordered by first use, which falls out of the
 *      source-order walk. A name bound by no script at all is not a capture:
 *      the rewrite reads it as a global or reports it as unresolvable.
 *
 *    Two filters, and both matter. Declared *above* the hole, not merely in
 *    scope: a hoisted declaration is in scope before the source reaches it,
 *    and handing it over would name a binding inside its own initializer. And
 *    captured by something, somewhere: a binding no fragment ever wants is
 *    dead weight in every thunk written for that hole.
 *
 *  - `hostReferences`: every script identifier that resolves to a host
 *    binding — a name the host file declares in scope around the script,
 *    imports and all, and no script does. The client has no such binding, so
 *    the virtual code reports the read: it has to be spliced. A name that
 *    resolves to nothing is the client's global, read as written.
 *
 * The file is checked as one text: the host code as written, each script
 * `(() => …)` where its template stands, a nested script where it stands in
 * its splice's host expression, as it lands at runtime. A reference is free
 * for the script it appears in exactly when the binding it resolves to was
 * declared in an *enclosing* script (or in none at all); it is the host's when
 * no script declares it.
 *
 * Uniqueness of keys has two axes. A per-file counter distinguishes bindings
 * *within* a file; a hash of the file's text (see `hashText`) distinguishes
 * bindings *across* files — necessary because the compiler runs one file at a
 * time and so cannot hand out globally coordinated numbers. Together
 * `<name>$<fileHash>$<n>` is
 * unique across the whole program, so fragments composed from different scripts
 * (even different files) never collide, and the serializer never has to rename a
 * capture to dodge a same-named binding it threads through.
 *
 * Resolution spans scripts: a reference in a nested script
 * (`cs`{ const x = 0; return ${cs`x`}; }``) resolves to the enclosing binding
 * and so shares its key, keeping independently rewritten scripts consistent. A
 * splice placeholder is not a variable — it evaluates host code in the enclosing
 * scope — so it is never captured, though the pass descends into any scripts
 * nested inside it so their references resolve against this scope chain.
 */
export type BindingResolution = Map<ts.Identifier, string>;

export interface ResolvedScopes {
  bindings: BindingResolution;
  // the scripts' identifiers that read a host binding
  hostReferences: Set<ts.Identifier>;
  // `params.get(script)[i]` is the script's parameter `i` (`$splice<i>`,
  // `$capture<i>`): splices in the order the script first reads them, then
  // captures
  params: Map<ClientScript, ResolvedParam[]>;
}

/**
 * One of a script's parameters as the compiler knows it: `ClientScript`'s `Param`,
 * with the splice's key and where it is read in place of its host value.
 * `refs` are a hole's placeholder, or an unbraced `$name`, a tag's name among
 * them.
 */
export type ResolvedParam = ResolvedSplice | ResolvedCapture;

interface ResolvedSplice {
  kind: "splice";
  key: string;
  bindings: string[];
  refs: ts.Identifier[];
}

interface ResolvedCapture {
  kind: "capture";
  key: string;
}

// A script's parameters as the pass finds them, by key.
interface ScriptParams {
  // in first-use order, tags among them
  splices: ResolvedSplice[];
  // in first-use order
  captures: Map<string, ResolvedCapture>;
}

// Where each piece of the combined text came from.
interface Piece {
  start: number;
  length: number;
  script: ClientScript;
  // the piece's offset in the script's placeholder text
  from: number;
}

interface Combined {
  text: string;
  pieces: Piece[];
  // each script's enclosing script, for the top-level ones none
  parents: Map<ClientScript, ClientScript | undefined>;
  // where a script's own identifier stands in the combined text; a
  // placeholder its nested scripts replace, where they start
  positions: Map<ts.Identifier, number>;
}

export function resolveBindings(
  ts: typeof import("typescript"),
  { sourceFile, scripts }: ParsedFile,
  fileHash: string,
): ResolvedScopes {
  const combined = combine(ts, sourceFile, scripts);
  const file = ts.createSourceFile(
    sourceFile.fileName,
    combined.text,
    ts.ScriptTarget.Latest,
    true,
  );
  const checker = programOf(ts, file).getTypeChecker();
  const binding =
    ts.SymbolFlags.Variable | ts.SymbolFlags.Function | ts.SymbolFlags.Class;
  // what the host declares by a name: the above, an enum, a namespace, an import
  const hostBinding =
    binding |
    ts.SymbolFlags.Enum |
    ts.SymbolFlags.Module |
    ts.SymbolFlags.Alias;

  const scriptAt = (position: number): ClientScript | undefined =>
    combined.pieces.find(
      (piece) =>
        position >= piece.start && position < piece.start + piece.length,
    )?.script;
  const own = new Map<ClientScript, Map<number, ts.Identifier>>();
  // The script's own identifier written at a combined position.
  const identifierAt = (position: number): ts.Identifier | undefined => {
    const piece = combined.pieces.find(
      (each) => position >= each.start && position < each.start + each.length,
    );
    if (piece === undefined) {
      return undefined;
    }
    let identifiers = own.get(piece.script);
    if (identifiers === undefined) {
      identifiers = identifiersOf(ts, piece.script.fileWithPlaceholders);
      own.set(piece.script, identifiers);
    }
    return identifiers.get(piece.from + position - piece.start);
  };

  const scriptParams = new Map<ClientScript, ScriptParams>();
  for (const script of combined.parents.keys()) {
    scriptParams.set(script, {
      splices: Object.values(script.splices).map(({ key, refs }) => ({
        kind: "splice",
        key,
        bindings: [],
        refs,
      })),
      captures: new Map(),
    });
  }

  // A binding's key, its declaring script and where it is declared, minted
  // the first time the pass meets it, so keys count up in source order.
  const bindings: BindingResolution = new Map();
  const keys = new Map<ts.Declaration, string>();
  const owner = new Map<string, ClientScript>();
  const declaredAt = new Map<string, ts.Declaration>();
  let next = 0;
  const keyOf = (declaration: ts.Declaration): string => {
    let key = keys.get(declaration);
    if (key === undefined) {
      const name = ts.getNameOfDeclaration(declaration);
      key = `${name && ts.isIdentifier(name) ? name.text : "_"}$${fileHash}$${next++}`;
      keys.set(declaration, key);
      owner.set(key, scriptAt(declaration.getStart(file))!);
      declaredAt.set(key, declaration);
    }
    return key;
  };
  // What a name resolves to, and where it is declared.
  const resolve = (
    identifier: ts.Identifier,
  ): { symbol: ts.Symbol; declaration: ts.Declaration } | undefined => {
    const symbol =
      ts.isShorthandPropertyAssignment(identifier.parent) &&
      identifier.parent.name === identifier
        ? checker.getShorthandAssignmentValueSymbol(identifier.parent)
        : checker.getSymbolAtLocation(identifier);
    const declaration = symbol?.declarations?.find(
      (declaration) => declaration.getSourceFile() === file,
    );
    return symbol !== undefined && declaration !== undefined
      ? { symbol, declaration }
      : undefined;
  };

  // Every binding some nested script captures, whatever hole it was written at.
  const escaped = new Set<string>();
  const hostReferences = new Set<ts.Identifier>();

  const visit = (node: ts.Node): void => {
    // A type's names are never runtime bindings, but for a `typeof`, however
    // deep in a type, and a class's `extends`, which read values.
    if (ts.isIdentifier(node) && !inTypePosition(ts, node)) {
      const script = scriptAt(node.getStart(file));
      if (script === undefined) {
        return;
      }
      const resolved = resolve(node);
      if (resolved === undefined) {
        return;
      }
      const { symbol, declaration } = resolved;
      const identifier = identifierAt(node.getStart(file));
      if (scriptAt(declaration.getStart(file)) === undefined) {
        // The host's, unless a `declare global` declares it: that is a global.
        if (
          (symbol.flags & hostBinding) !== 0 &&
          !inGlobalAugmentation(ts, declaration) &&
          identifier !== undefined
        ) {
          hostReferences.add(identifier);
        }
        return;
      }
      if ((symbol.flags & binding) === 0) {
        return;
      }
      const key = keyOf(declaration);
      if (identifier !== undefined) {
        bindings.set(identifier, key);
      }
      // Captured by the script that reads it and by every one between it and
      // the script that declared it: each hands it to the next.
      const from = owner.get(key);
      for (
        let reader: ClientScript | undefined = script;
        reader !== undefined && reader !== from;
        reader = combined.parents.get(reader)
      ) {
        const captures = scriptParams.get(reader)!.captures;
        if (!captures.has(key)) {
          captures.set(key, { kind: "capture", key });
        }
        escaped.add(key);
      }
      return;
    }
    node.forEachChild(visit);
  };
  visit(file);

  // Each splice where the script reads it, and what a fragment landing there
  // may be handed: the script's own bindings in scope, by a name nothing
  // shadows, whose declaration the source has passed.
  for (const [script, { splices }] of scriptParams) {
    for (const splice of splices) {
      for (const ref of splice.refs) {
        const position = combined.positions.get(ref)!;
        const location = nodeAt(file, position);
        splice.bindings = checker
          .getSymbolsInScope(location, binding)
          .flatMap((symbol) => {
            const declaration = symbol.declarations?.find(
              (each) => each.getSourceFile() === file,
            );
            if (
              declaration === undefined ||
              declared(ts, declaration).getEnd() > position
            ) {
              return [];
            }
            const key = keyOf(declaration);
            return owner.get(key) === script ? [key] : [];
          })
          .sort(
            (a, b) =>
              declaredAt.get(a)!.getStart(file) -
              declaredAt.get(b)!.getStart(file),
          );
      }
    }
  }

  const params = new Map<ClientScript, ResolvedParam[]>();
  for (const [script, { splices, captures }] of scriptParams) {
    for (const splice of splices) {
      // Narrowed only now: whether anything captures a binding is not known
      // until every script that could has been read.
      splice.bindings = splice.bindings.filter((key) => escaped.has(key));
    }
    params.set(script, [...splices, ...captures.values()]);
  }

  return { bindings, hostReferences, params };
}

// The file as one text: the host code as written, each script `(() => text)`
// where its template stands, a braced splice's host expression where its
// placeholder stands, parenthesized, with the scripts nested in it written the
// same way.
function combine(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  scripts: ClientScript[],
): Combined {
  const combined: Combined = {
    text: "",
    pieces: [],
    parents: new Map(),
    positions: new Map(),
  };
  // Host text up to an offset, from where the last host text ended.
  let at = 0;
  const host = (to: number): void => {
    combined.text += sourceFile.text.slice(at, to);
    at = to;
  };
  const emit = (script: ClientScript, parent?: ClientScript): void => {
    combined.parents.set(script, parent);
    const identifiers = identifiersOf(ts, script.fileWithPlaceholders);
    const holes = [...identifiers.values()].filter(
      (identifier) => script.splices[identifier.text]?.kind === "braced",
    );
    combined.text += "(() => ";
    let cursor = 0;
    const copy = (to: number): void => {
      const start = combined.text.length;
      combined.pieces.push({
        start,
        length: to - cursor,
        script,
        from: cursor,
      });
      for (const [offset, identifier] of identifiers) {
        if (offset >= cursor && offset < to) {
          combined.positions.set(identifier, start + offset - cursor);
        }
      }
      combined.text += script.textWithPlaceholders.slice(cursor, to);
      cursor = to;
    };
    for (const hole of holes) {
      copy(hole.getStart(script.fileWithPlaceholders));
      combined.positions.set(hole, combined.text.length);
      const splice = script.splices[hole.text]!;
      combined.text += "(";
      at = splice.expression.getStart(sourceFile);
      for (const nested of splice.scripts) {
        host(nested.sourceNode.getStart(sourceFile));
        emit(nested, script);
        at = nested.sourceNode.getEnd();
      }
      host(splice.expression.getEnd());
      combined.text += ")";
      cursor = hole.getEnd();
    }
    copy(script.textWithPlaceholders.length);
    combined.text += ")";
  };
  for (const script of scripts) {
    host(script.sourceNode.getStart(sourceFile));
    emit(script);
    at = script.sourceNode.getEnd();
  }
  host(sourceFile.text.length);
  return combined;
}

function inGlobalAugmentation(
  ts: typeof import("typescript"),
  declaration: ts.Declaration,
): boolean {
  for (let node: ts.Node | undefined = declaration; node; node = node.parent) {
    if (
      ts.isModuleDeclaration(node) &&
      (node.flags & ts.NodeFlags.GlobalAugmentation) !== 0
    ) {
      return true;
    }
  }
  return false;
}

// A script's own identifiers, by where they start in its placeholder text.
function identifiersOf(
  ts: typeof import("typescript"),
  file: ts.SourceFile,
): Map<number, ts.Identifier> {
  const identifiers = new Map<number, ts.Identifier>();
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) {
      identifiers.set(node.getStart(file), node);
    }
    node.forEachChild(visit);
  };
  visit(file);
  return identifiers;
}

// The innermost node starting at a position.
function nodeAt(file: ts.SourceFile, position: number): ts.Node {
  let found: ts.Node = file;
  const visit = (node: ts.Node): void => {
    if (node.getStart(file) <= position && position < node.getEnd()) {
      found = node;
      node.forEachChild(visit);
    }
  };
  file.forEachChild(visit);
  return found;
}

// What declares a name, whole: a name a pattern destructures is declared when
// the declaration it is in is, initializer and all, not where the pattern ends.
function declared(
  ts: typeof import("typescript"),
  declaration: ts.Declaration,
): ts.Node {
  let at: ts.Node = declaration;
  while (
    ts.isBindingElement(at) ||
    ts.isObjectBindingPattern(at) ||
    ts.isArrayBindingPattern(at)
  ) {
    at = at.parent;
  }
  return at;
}
