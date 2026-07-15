import type { ClientScript } from "../../cs-runtime/index.js";
import { locKey } from "../locKey.js";
import type { AstScript, AstScriptBody } from "./Ast.js";
import { AstBuilder } from "./AstBuilder.js";
import { expandMacros } from "./expandMacros.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// The parsed body of each distinct script, keyed by source location. Two client
// objects at the same location — a script inside a host function, instantiated
// with different splices at different call sites — share one parsed body but
// still get their own node (their splices differ).
const bodyByLoc = new Map<string, AstScriptBody>();

// The lowered node for each client object, keyed by identity. A script reached
// through several splice paths (a diamond) is the same object each time, so it
// lowers once and is shared: the AST stays a DAG instead of fanning out into a
// tree with exponentially many nodes. Safe to share because nodes are immutable,
// and safe to cache forever because a client object's lowering never changes;
// keyed weakly so entries vanish with their client objects.
const nodeByClient = new WeakMap<ClientScript, AstScript>();

export function lowerClientScript(client: ClientScript): AstScript {
  const shared = nodeByClient.get(client);
  if (shared) {
    return shared;
  }

  const key = locKey(client.fileHash, client.loc);
  let parsed = bodyByLoc.get(key);
  if (parsed === undefined) {
    parsed = client.visit(new AstBuilder()) as AstScriptBody;
    bodyByLoc.set(key, parsed);
  }

  // Macros expand against the client's live splices — per-instance values —
  // so expansion runs per client over the shared parsed body; a macro-free
  // body passes through untouched.
  const { body, expansions, consumedSplices } = expandMacros(
    parsed,
    client.metadata.splices,
  );

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
    // splices in the same order `expandMacros` assigned their indices.
    splices: [
      ...client.metadata.splices.map((splice, index) =>
        consumedSplices.has(index)
          ? { kind: "AstNull" as const }
          : lowerSpliceable(splice),
      ),
      ...expansions,
    ],
    captures: client.metadata.captures,
    declarations: client.metadata.declarations,
    expression: body,
  };
  nodeByClient.set(client, node);
  return node;
}
