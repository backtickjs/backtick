import type {
  Client,
  ClientScript,
  ClientUnknown,
} from "../../cs-runtime/index.js";
import { locKey } from "../locKey.js";
import { AstBuilder } from "./AstBuilder.js";
import { buildAst } from "./buildAst.js";
import type { AstNode } from "./nodes/AstNode.js";
import { AstScript } from "./nodes/AstScript.js";

// The parsed body of each distinct script, keyed by source location. Two client
// objects at the same location — a script inside a host function, instantiated
// with different splices at different call sites — share one parsed body but
// still get their own node (their splices differ).
const bodyByLoc = new Map<string, AstNode>();

// The lowered node for each client object, keyed by identity. A script reached
// through several splice paths (a diamond) is the same object each time, so it
// lowers once and is shared: the AST stays a DAG instead of fanning out into a
// tree with exponentially many nodes. Safe to share because nodes are immutable,
// and safe to cache forever because a client object's lowering never changes;
// keyed weakly so entries vanish with their client objects.
const nodeByClient = new WeakMap<Client<ClientUnknown>, AstScript>();

export function buildAstScript(client: ClientScript<ClientUnknown>): AstScript {
  const shared = nodeByClient.get(client);
  if (shared) {
    return shared;
  }

  const key = locKey(client.fileHash, client.loc);
  let expression = bodyByLoc.get(key);
  if (!expression) {
    expression = client.visit(new AstBuilder());
    bodyByLoc.set(key, expression);
  }

  // The client object graph is acyclic — a script's splices are host values that
  // exist before the script itself — so lowering the splices before caching the
  // node cannot recurse back into this same object.
  const node = new AstScript(
    client.loc,
    client.fileHash,
    client.metadata.splices.map(buildAst),
    client.metadata.captures,
    client.metadata.declarations,
    expression,
  );
  nodeByClient.set(client, node);
  return node;
}
