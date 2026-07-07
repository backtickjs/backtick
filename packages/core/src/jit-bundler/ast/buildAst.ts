import {
  type Client,
  ClientObject,
  isClientScript,
  type Spliceable,
} from "../../cs-runtime/index.js";
import { locKey } from "../locKey.js";
import { AstBuilder } from "./AstBuilder.js";
import { buildSplice } from "./buildSplice.js";
import type { AstNode } from "./nodes/AstNode.js";
import { RuntimeObject } from "./nodes/RuntimeObject.js";
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
const nodeByClient = new WeakMap<Client<unknown>, AstNode>();

export function buildAst(client: Client<unknown>): AstNode {
  const shared = nodeByClient.get(client);
  if (shared) {
    return shared;
  }

  if (client instanceof ClientObject) {
    const fields = client as unknown as Record<string, Spliceable>;
    const entries: Record<string, AstNode> = {};
    for (const key of Object.keys(fields)) {
      entries[key] = buildSplice(fields[key]);
    }
    const node = new RuntimeObject(entries);
    nodeByClient.set(client, node);
    return node;
  }

  // Anything else reaching here must be a cs`` script. A bare `Client` that only
  // implements `visit` has no splice frame to resolve, so lowering it would
  // silently produce dangling splice holes; fail loudly instead.
  if (!isClientScript(client)) {
    throw new Error(
      "A spliced value lowered to a `Client` that is neither a cs`` script nor " +
        "a `ClientObject`. Author a custom client by extending `ClientObject` " +
        "or returning a cs`` script.",
    );
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
