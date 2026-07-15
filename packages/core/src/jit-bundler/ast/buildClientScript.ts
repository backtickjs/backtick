import type { ClientScript } from "../../cs-runtime/index.js";
import { locKey } from "../locKey.js";
import type { AstExpansion, AstScript, AstScriptBody } from "./Ast.js";
import { AstBuilder, type MacroExpansion } from "./AstBuilder.js";
import { buildAst } from "./buildAst.js";

// The parsed body of each distinct script, keyed by source location. Two client
// objects at the same location — a script inside a host function, instantiated
// with different splices at different call sites — share one parsed body but
// still get their own node (their splices differ).
const bodyByLoc = new Map<string, AstScriptBody>();

// Source locations whose body contains a macro. A macro's `expand` is a live
// closure over the instance's splices, so its expansion is per-instance data:
// a cached body still stands (macro nodes carry only stable slot indices),
// but each client must re-visit to run its own expansions.
const macroLocs = new Set<string>();

// The lowered node for each client object, keyed by identity. A script reached
// through several splice paths (a diamond) is the same object each time, so it
// lowers once and is shared: the AST stays a DAG instead of fanning out into a
// tree with exponentially many nodes. Safe to share because nodes are immutable,
// and safe to cache forever because a client object's lowering never changes;
// keyed weakly so entries vanish with their client objects.
const nodeByClient = new WeakMap<ClientScript, AstScript>();

export function buildClientScript(client: ClientScript): AstScript {
  const shared = nodeByClient.get(client);
  if (shared) {
    return shared;
  }

  const key = locKey(client.fileHash, client.loc);
  let expression = bodyByLoc.get(key);
  let expansions: readonly MacroExpansion[] = [];
  let consumedSplices: ReadonlySet<number> = new Set();
  if (expression === undefined || macroLocs.has(key)) {
    const builder = new AstBuilder(client.metadata.splices);
    const built = client.visit(builder) as AstScriptBody;
    expansions = builder.expansions;
    consumedSplices = builder.consumedSplices;
    if (expression === undefined) {
      if (expansions.length > 0) {
        macroLocs.add(key);
      }
      bodyByLoc.set(key, built);
      expression = built;
    }
  }

  // The client object graph is acyclic — a script's splices are host values that
  // exist before the script itself — so lowering the splices before caching the
  // node cannot recurse back into this same object.
  const node: AstScript = {
    kind: "AstScript",
    loc: client.loc,
    fileHash: client.fileHash,
    // A slot consumed by an expansion (a `new` callee) holds the raw class,
    // which stays on the host and serializes as null. The expansions fill
    // the synthetic slots their expanded nodes call, appended after the real
    // splices in the same order `AstBuilder.new` assigned their indices.
    splices: [
      ...client.metadata.splices.map((splice, index) =>
        consumedSplices.has(index) ? { kind: "AstNull" as const } : buildAst(splice),
      ),
      ...expansions.map(
        (expansion): AstExpansion => ({
          kind: "AstExpansion",
          params: expansion.params,
          body: buildAst(expansion.value),
        }),
      ),
    ],
    captures: client.metadata.captures,
    declarations: client.metadata.declarations,
    expression,
  };
  nodeByClient.set(client, node);
  return node;
}
