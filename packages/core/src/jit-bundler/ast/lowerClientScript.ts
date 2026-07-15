import type { ClientScript } from "../../cs-runtime/index.js";
import { locKey } from "../locKey.js";
import type { AstScript, AstScriptBody } from "./Ast.js";
import { AstBuilder } from "./AstBuilder.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// The parsed body for each distinct source location. Two client objects at
// the same location — a script inside a host function, instantiated with
// different splices at different call sites — share one parse but still get
// their own node (their splices differ).
const parsedByLoc = new Map<string, AstScriptBody>();

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
  let body = parsedByLoc.get(key);
  if (body === undefined) {
    body = client.visit(new AstBuilder()) as AstScriptBody;
    parsedByLoc.set(key, body);
  }

  // The client object graph is acyclic — a script's splices are host values that
  // exist before the script itself — so lowering the splices before caching the
  // node cannot recurse back into this same object.
  const node: AstScript = {
    kind: "AstScript",
    loc: client.loc,
    fileHash: client.fileHash,
    splices: Object.fromEntries(
      Object.entries(client.metadata.splices).map(([key, splice]) => [
        key,
        lowerSpliceable(splice),
      ]),
    ),
    captures: client.metadata.captures,
    declarations: client.metadata.declarations,
    expression: body,
  };
  nodeByClient.set(client, node);
  return node;
}
