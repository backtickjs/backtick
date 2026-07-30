import type { ClientScript } from "@backtickjs/cs-runtime";
import { locKey } from "../locKey.js";
import type { Ast, AstScript, AstScriptBody, AstScriptNode } from "./Ast.js";
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
const nodeByClient = new WeakMap<ClientScript, Promise<AstScript>>();

export function lowerClientScript(client: ClientScript): Promise<AstScript> {
  const shared = nodeByClient.get(client);
  if (shared) {
    return shared;
  }
  // memoized before the first await, so a script reached again while this one
  // is still lowering joins it instead of lowering a second copy
  const node = buildScript(client);
  nodeByClient.set(client, node);
  return node;
}

async function buildScript(client: ClientScript): Promise<AstScript> {
  const key = locKey(client.metadata.fileHash, client.loc);
  let body = parsedByLoc.get(key);
  if (body === undefined) {
    body = client.visit<AstScriptNode>(new AstBuilder()) as AstScriptBody;
    parsedByLoc.set(key, body);
  }

  const splices: { [key: string]: Ast } = Object.fromEntries(
    await Promise.all(
      Object.entries(client.metadata.splices).map(async ([key, splice]) => [
        key,
        await lowerSpliceable(splice, "ClientUnknown"),
      ]),
    ),
  );

  const node: AstScript = {
    kind: "AstScript",
    loc: client.loc,
    fileHash: client.metadata.fileHash,
    splices,
    captures: client.metadata.captures,
    spliceParams: client.metadata.spliceParams,
    expression: body,
  };
  return node;
}
