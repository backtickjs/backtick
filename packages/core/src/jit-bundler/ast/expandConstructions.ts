import type {
  ClientObjectConstructor,
  Spliceable,
} from "../../cs-runtime/index.js";
import type { AstExpansion, AstScriptNew } from "./Ast.js";
import { createHole } from "./holes.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// One expansion per class and argument count, ever: a constructor sees only
// opaque holes — never the client's live argument values — so its expansion
// is a function of the class and its arity alone. (This bakes in the
// constructor purity the holes already enforce: one reading *mutable host*
// state at expansion time would get its first expansion replayed.) Sharing
// the node also dedups downstream: the IR interns one entry per expansion
// node however many instances construct the class.
const expansionsByClass = new WeakMap<
  ClientObjectConstructor,
  Map<number, AstExpansion>
>();

// Expands every construction (`AstScriptNew`) of a parsed body: the callee's
// splice value — a class, live only on the host — runs once with one opaque
// hole per argument, and the instance it returns lowers into the
// `AstExpansion` that fills the callee's own splice slot, which the class
// leaves free by staying on the host. The body itself is never touched — a
// construction serializes as a call of its slot (see `lowerScriptBody`), so
// expansion is pure slot data:
// new ${Point}(1, 2) -> (($0, $1) => new Point($0, $1))(1, 2)
// Expanding evaluates live host values — which differ per script instance
// even at one source location — so every client reuses the constructions
// `AstBuilder` indexed at parse time but expands them with its own splices.
export function expandConstructions(
  constructions: readonly AstScriptNew[],
  splices: readonly Spliceable[],
): ReadonlyMap<number, AstExpansion> {
  const expansions = new Map<number, AstExpansion>();
  for (const node of constructions) {
    const splicedClass = splices[node.callee.index];
    if (typeof splicedClass !== "function") {
      throw new Error(
        "Can't expand this construction: the spliced `new` callee isn't a " +
          "class.",
      );
    }
    let byArity = expansionsByClass.get(splicedClass);
    if (byArity === undefined) {
      byArity = new Map();
      expansionsByClass.set(splicedClass, byArity);
    }
    let expansion = byArity.get(node.args.length);
    if (expansion === undefined) {
      const params = node.args.map((_, position) => `$${position}`);
      expansion = {
        kind: "AstExpansion",
        params,
        body: lowerSpliceable(new splicedClass(...params.map(createHole))),
      };
      byArity.set(node.args.length, expansion);
    }
    expansions.set(node.callee.index, expansion);
  }
  return expansions;
}
