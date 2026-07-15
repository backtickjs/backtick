import type {
  ClientObjectConstructor,
  Spliceable,
} from "../../cs-runtime/index.js";
import type { AstExpansion, AstScriptNew, AstScriptStatement } from "./Ast.js";
import { createHole } from "./holes.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// One expansion per class and argument count, ever: a constructor sees only
// opaque holes — never the client's live argument values — so its expansion
// is a function of the class and its arity alone. (This bakes in the macro
// purity the holes already enforce: a constructor reading *mutable host*
// state at expansion time would get its first expansion replayed.) Sharing
// the node also dedups downstream: the IR interns one entry per expansion
// node however many instances construct the class.
const expansionsByClass = new WeakMap<
  ClientObjectConstructor,
  Map<number, AstExpansion>
>();

// Expands every macro node (`AstScriptNew`) in a parsed body: the callee's
// splice value — a class, live only on the host — runs once with one opaque
// hole per argument, and the instance it returns lowers into the
// `AstExpansion` that fills the callee's own splice slot, which the class
// leaves free by staying on the host. The body itself is never touched — a
// macro node serializes as a call of its slot (see `lowerScriptBody`), so
// expansion is pure slot data:
// new ${Point}(1, 2) -> (($0, $1) => new Point($0, $1))(1, 2)
// Expanding evaluates live host values — which differ per script instance
// even at one source location — so every client shares the one parsed body
// but walks it with its own splices.
export function expandMacros(
  body: AstScriptStatement,
  splices: readonly Spliceable[],
): ReadonlyMap<number, AstExpansion> {
  const expansions = new Map<number, AstExpansion>();
  forEachMacro(body, (node) => {
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
  });
  return expansions;
}

// Walks a body in source order, calling back on each macro node. Each
// template placeholder occurs exactly once in a script's source, so distinct
// macro nodes always name distinct slots. A macro's arguments may nest
// further macros, so the walk recurses into them too.
function forEachMacro(
  node: AstScriptStatement,
  callback: (node: AstScriptNew) => void,
): void {
  const visit = (child: AstScriptStatement): void =>
    forEachMacro(child, callback);
  switch (node.kind) {
    case "AstScriptNew":
      callback(node);
      node.args.forEach(visit);
      return;
    case "AstScriptAssignment":
    case "AstScriptReturn":
    case "AstScriptThrow":
    case "AstScriptVariableDeclaration":
    case "AstScriptPropertyAccess":
      visit(node.expression);
      return;
    case "AstScriptBlock":
      node.statements.forEach(visit);
      return;
    case "AstScriptIf":
      visit(node.condition);
      visit(node.consequent);
      if (node.alternate !== null) {
        visit(node.alternate);
      }
      return;
    case "AstScriptTry":
      visit(node.block);
      visit(node.handler);
      return;
    case "AstScriptArray":
      node.elements.forEach(visit);
      return;
    case "AstScriptArrow":
      visit(node.body);
      return;
    case "AstScriptBinop":
      visit(node.lhs);
      visit(node.rhs);
      return;
    case "AstScriptCall":
      visit(node.callee);
      node.args.forEach(visit);
      return;
    case "AstScriptObject":
      Object.values(node.entries).forEach(visit);
      return;
    case "AstScriptBoolean":
    case "AstScriptIdentifier":
    case "AstScriptNull":
    case "AstScriptNumber":
    case "AstScriptSplice":
    case "AstScriptString":
      // Literals, identifiers, and splices carry no children.
      return;
    default: {
      const unhandled: never = node;
      throw new Error(`Unhandled AST node: ${JSON.stringify(unhandled)}`);
    }
  }
}
