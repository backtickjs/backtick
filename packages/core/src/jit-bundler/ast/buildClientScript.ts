import type { ClientScript } from "../../cs-runtime/index.js";
import { locKey } from "../locKey.js";
import type { AstScript, AstScriptBody } from "./Ast.js";
import { AstBuilder } from "./AstBuilder.js";
import { buildAst } from "./buildAst.js";

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

export function buildClientScript(client: ClientScript): AstScript {
  const shared = nodeByClient.get(client);
  if (shared) {
    return shared;
  }

  const key = locKey(client.fileHash, client.loc);
  let expression = bodyByLoc.get(key);
  if (!expression) {
    expression = client.visit(new AstBuilder()) as AstScriptBody;
    bodyByLoc.set(key, expression);
  }

  // The client object graph is acyclic — a script's splices are host values that
  // exist before the script itself — so lowering the splices before caching the
  // node cannot recurse back into this same object.
  const node: AstScript = {
    kind: "AstScript",
    loc: client.loc,
    fileHash: client.fileHash,
    splices: client.metadata.splices.map(buildAst),
    captures: client.metadata.captures,
    declarations: client.metadata.declarations,
    expression,
  };
  nodeByClient.set(client, node);
  return node;
}
