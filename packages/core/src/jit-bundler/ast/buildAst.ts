import { type Client, isClientScript } from "../../cs-runtime/index.js";
import { locKey } from "../locKey.js";
import { AstBuilder } from "./AstBuilder.js";
import { buildObject } from "./buildObject.js";
import { buildSplice } from "./buildSplice.js";
import type { AstNode } from "./nodes/AstNode.js";
import { SourceClientScript } from "./nodes/SourceClientScript.js";

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
const nodeByClient = new WeakMap<Client<unknown>, SourceClientScript>();

export function buildAst(client: Client<unknown>): AstNode {
  if (!isClientScript(client)) {
    return buildObject(client);
  }

  const shared = nodeByClient.get(client);
  if (shared) {
    return shared;
  }

  const key = locKey(client.loc);
  let expression = bodyByLoc.get(key);
  if (!expression) {
    expression = client.visit(new AstBuilder());
    bodyByLoc.set(key, expression);
  }

  // The client object graph is acyclic — a script's splices are host values that
  // exist before the script itself — so lowering the splices before caching the
  // node cannot recurse back into this same object.
  const node = new SourceClientScript(
    client.loc,
    client.metadata.splices.map(buildSplice),
    client.metadata.captures,
    client.metadata.declarations,
    expression,
  );
  nodeByClient.set(client, node);
  return node;
}
