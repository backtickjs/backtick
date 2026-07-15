import type { ClientScript } from "../../cs-runtime/index.js";
import { locKey } from "../locKey.js";
import type { AstScript, AstScriptBody, AstScriptNew } from "./Ast.js";
import { AstBuilder } from "./AstBuilder.js";
import { expandConstructions } from "./expandConstructions.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// A script's source, parsed once: its body plus the construction nodes the
// builder indexed on the way, so expansion never has to walk the body for
// them.
interface ParsedScript {
  readonly body: AstScriptBody;
  readonly constructions: readonly AstScriptNew[];
}

// The parsed script for each distinct source location. Two client objects at
// the same location — a script inside a host function, instantiated with
// different splices at different call sites — share one parse but still get
// their own node (their splices differ).
const parsedByLoc = new Map<string, ParsedScript>();

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
  let parsed = parsedByLoc.get(key);
  if (parsed === undefined) {
    const builder = new AstBuilder();
    const body = client.visit(builder) as AstScriptBody;
    parsed = { body, constructions: builder.constructions };
    parsedByLoc.set(key, parsed);
  }

  // Constructions expand against the client's live splices — per-instance
  // values — so expansion runs per client over the shared parsed index.
  const expansions = expandConstructions(
    parsed.constructions,
    client.metadata.splices,
  );

  // The client object graph is acyclic — a script's splices are host values that
  // exist before the script itself — so lowering the splices before caching the
  // node cannot recurse back into this same object.
  const node: AstScript = {
    kind: "AstScript",
    loc: client.loc,
    fileHash: client.fileHash,
    // A construction's slot (its `new` callee) holds the class's expansion
    // rather than the class, which stays on the host; the construction
    // reads as a call of that slot.
    splices: Object.fromEntries(
      Object.entries(client.metadata.splices).map(([key, splice]) => [
        key,
        expansions.get(key) ?? lowerSpliceable(splice),
      ]),
    ),
    captures: client.metadata.captures,
    declarations: client.metadata.declarations,
    expression: parsed.body,
  };
  nodeByClient.set(client, node);
  return node;
}
