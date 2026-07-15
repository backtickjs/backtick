import type {
  Client,
  ClientUnknown,
  Spliceable,
} from "../../cs-runtime/index.js";
import type {
  AstScriptBlock,
  AstScriptBody,
  AstScriptCall,
  AstScriptExpression,
  AstScriptNew,
  AstScriptStatement,
} from "./Ast.js";
import { createHole } from "./holes.js";

// A macro's raw expansion: the spliceable a bundle-time evaluation returned
// when applied to one hole per parameter. `buildClientScript` serializes the
// value into the `AstExpansion` filling the synthetic splice slot the
// expanded node calls.
export interface MacroExpansion {
  readonly params: readonly string[];
  readonly value: Spliceable;
}

export interface MacroExpandedBody {
  readonly body: AstScriptBody;
  // Expansions in source order; the expansion at position `i` occupies
  // splice slot `splices.length + i`.
  readonly expansions: readonly MacroExpansion[];
  // Splice slots consumed by an expansion (a `new` callee): the raw value —
  // a class, which isn't spliceable — stays on the host, so the slot
  // serializes as null.
  readonly consumedSplices: ReadonlySet<number>;
}

// Rewrites every macro node (`AstScriptNew`) in a parsed body into a call of
// a synthetic splice slot. Expanding evaluates live host values — which
// differ per script instance even at one source location — so the parsed
// body is shared but this pass runs once per client. A macro-free body comes
// back unchanged, by identity.
export function expandMacros(
  body: AstScriptBody,
  splices: readonly Spliceable[],
): MacroExpandedBody {
  const expander = new MacroExpander(splices);
  return {
    body: expander.body(body),
    expansions: expander.expansions,
    consumedSplices: expander.consumedSplices,
  };
}

class MacroExpander {
  readonly expansions: MacroExpansion[] = [];
  readonly consumedSplices = new Set<number>();
  private readonly splices: readonly Spliceable[];

  constructor(splices: readonly Spliceable[]) {
    this.splices = splices;
  }

  body(node: AstScriptBody): AstScriptBody {
    return node.kind === "AstScriptBlock"
      ? this.block(node)
      : this.expression(node);
  }

  private block(node: AstScriptBlock): AstScriptBlock {
    const statements = mapNodes(node.statements, (s) => this.statement(s));
    return statements === node.statements ? node : { ...node, statements };
  }

  private statement(node: AstScriptStatement): AstScriptStatement {
    switch (node.kind) {
      case "AstScriptAssignment":
      case "AstScriptReturn":
      case "AstScriptThrow":
      case "AstScriptVariableDeclaration": {
        const expression = this.expression(node.expression);
        return expression === node.expression ? node : { ...node, expression };
      }
      case "AstScriptBlock":
        return this.block(node);
      case "AstScriptIf": {
        const condition = this.expression(node.condition);
        const consequent = this.statement(node.consequent);
        const alternate =
          node.alternate === null ? null : this.statement(node.alternate);
        return condition === node.condition &&
          consequent === node.consequent &&
          alternate === node.alternate
          ? node
          : { ...node, condition, consequent, alternate };
      }
      case "AstScriptTry": {
        const block = this.block(node.block);
        const handler = this.block(node.handler);
        return block === node.block && handler === node.handler
          ? node
          : { ...node, block, handler };
      }
      default:
        // Every remaining kind is an expression, evaluated for its effect.
        return this.expression(node);
    }
  }

  private expression(node: AstScriptExpression): AstScriptExpression {
    switch (node.kind) {
      case "AstScriptNew":
        return this.expand(node);
      case "AstScriptArray": {
        const elements = mapNodes(node.elements, (e) => this.expression(e));
        return elements === node.elements ? node : { ...node, elements };
      }
      case "AstScriptArrow": {
        const body = this.body(node.body);
        return body === node.body ? node : { ...node, body };
      }
      case "AstScriptBinop": {
        const lhs = this.expression(node.lhs);
        const rhs = this.expression(node.rhs);
        return lhs === node.lhs && rhs === node.rhs
          ? node
          : { ...node, lhs, rhs };
      }
      case "AstScriptCall": {
        const callee = this.expression(node.callee);
        const args = mapNodes(node.args, (arg) => this.expression(arg));
        return callee === node.callee && args === node.args
          ? node
          : { ...node, callee, args };
      }
      case "AstScriptObject": {
        let changed = false;
        const entries: { [key: string]: AstScriptExpression } = {};
        for (const [key, value] of Object.entries(node.entries)) {
          const expanded = this.expression(value);
          if (expanded !== value) {
            changed = true;
          }
          entries[key] = expanded;
        }
        return changed ? { ...node, entries } : node;
      }
      case "AstScriptPropertyAccess": {
        const expression = this.expression(node.expression);
        return expression === node.expression ? node : { ...node, expression };
      }
      default:
        // Literals, identifiers, and splices carry no children.
        return node;
    }
  }

  // The constructor — the callee's splice value, live on the host — runs
  // once with one opaque hole per argument, and the instance it returns
  // fills a synthetic splice slot as a function of those holes (see
  // `AstExpansion`). The rewritten node reads as an ordinary call of that
  // slot:
  // new ${Point}(1, 2) -> (($0, $1) => new Point($0, $1))(1, 2)
  private expand(node: AstScriptNew): AstScriptCall {
    // Arguments expand first, so nested macros take lower slots — the same
    // bottom-up order the builder visits in.
    const args = mapNodes(node.args, (arg) => this.expression(arg));
    const splicedClass = this.splices[node.callee.index] as unknown as new (
      ...args: Client<ClientUnknown>[]
    ) => Spliceable;
    const params = node.args.map((_, position) => `$${position}`);
    const index = this.splices.length + this.expansions.length;
    this.expansions.push({
      params,
      value: new splicedClass(...params.map(createHole)),
    });
    this.consumedSplices.add(node.callee.index);
    return {
      kind: "AstScriptCall",
      loc: node.loc,
      callee: { kind: "AstScriptSplice", loc: node.callee.loc, index },
      args,
    };
  }
}

// Maps a node list, returning the input array untouched when no element
// changed so an unchanged subtree keeps its identity.
function mapNodes<T>(nodes: readonly T[], map: (node: T) => T): readonly T[] {
  let changed = false;
  const mapped = nodes.map((node) => {
    const result = map(node);
    if (result !== node) {
      changed = true;
    }
    return result;
  });
  return changed ? mapped : nodes;
}
