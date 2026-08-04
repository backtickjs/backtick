import { NodeKind } from "./Bundle.js";
import type {
  BundleFunction,
  BundleSpreadElementNode,
  BundleStatementNode,
  FunctionLabel,
} from "./Bundle.js";

/**
 * Marks every entry whose value cannot change.
 *
 * Evaluating a bundle is deterministic, so an entry yields something different
 * only if one of its inputs did. Storage is what moves — a cell, or the
 * position of a member of a list — and storage is read by calling `read()` on a
 * handle. So an entry that calls nothing reads nothing that moves, whatever it
 * holds.
 *
 * That is the whole test. What it needs beyond it is to stop where evaluation
 * stops: a function is made here, not run — its body is read by whoever calls
 * it, in whatever computation that is — so a call written inside one is not
 * this entry's reading.
 *
 * Nor does it follow a label into the table, and it cannot need to: an entry's
 * body holds no application at all. Nothing a call site supplies is inlined, so
 * a body reaches what encloses it through its own thunk parameters, and
 * invoking one is a call; an expansion named in a body is the function itself,
 * and using that is a call as well. Whatever an entry can reach while it is
 * being evaluated, it reaches by calling.
 */
export function markFixed(
  functions: Record<FunctionLabel, BundleFunction>,
): void {
  for (const entry of Object.values(functions)) {
    const [[_kind, _parameters, body]] = entry;
    if (!calls(body)) {
      entry[1] = true;
    }
  }
}

// Every kind says for itself where a call could be, rather than the walk
// guessing from the shape: a node and a list of nodes are both arrays, so a
// walk that went by shape would read `f(1005, g())`'s arguments as an arrow and
// stop at it. The `never` below is what keeps this honest — a kind added
// without an answer here fails to compile.
function calls(node: BundleStatementNode | BundleSpreadElementNode): boolean {
  if (node === null || typeof node !== "object") {
    return false;
  }
  if (!Array.isArray(node)) {
    // Data, whose keys are the host's: no kind to ask, and every value under it
    // is an expression.
    return Object.values(node).some((member) =>
      member === undefined ? false : calls(member),
    );
  }
  switch (node[0]) {
    // Made, not run.
    case NodeKind.ArrowFunction: {
      return false;
    }
    // A call is the whole test. An arrow written where it is called is still
    // called: the call is the node reached first, and the stop above is for a
    // function this expression only makes.
    case NodeKind.CallExpression: {
      return true;
    }
    // An application runs another entry's body, which this has not read — and
    // whatever that body reads, it reads by invoking the thunks supplied here.
    // A body holds no application today, so this says no about nothing; it is
    // here so that a lowering which put one in a body would be conservative
    // rather than wrong.
    case NodeKind.ApplyFunction: {
      return true;
    }
    // Named, not applied: reaching an entry is not running it.
    case NodeKind.GetFunction:
    case NodeKind.Builtin:
    case NodeKind.Identifier:
    case NodeKind.BreakStatement:
    case NodeKind.ContinueStatement: {
      return false;
    }
    case NodeKind.DataArray: {
      const [_kind, members] = node;
      return members.some(calls);
    }
    case NodeKind.Element: {
      const [_kind, _id, props] = node;
      return Object.values(props).some(calls);
    }
    case NodeKind.SpreadElement:
    case NodeKind.ReturnStatement:
    case NodeKind.ThrowStatement: {
      const [_kind, expression] = node;
      return calls(expression);
    }
    case NodeKind.PropertyAccessExpression: {
      const [_kind, expression] = node;
      return calls(expression);
    }
    case NodeKind.PrefixUnaryExpression: {
      const [_kind, _operator, operand] = node;
      return calls(operand);
    }
    case NodeKind.ElementAccessExpression: {
      const [_kind, expression, argumentExpression] = node;
      return calls(expression) || calls(argumentExpression);
    }
    case NodeKind.WhileStatement: {
      const [_kind, expression, statement] = node;
      return calls(expression) || calls(statement);
    }
    // The operator leads, so the operands are the last two slots.
    case NodeKind.BinaryExpression: {
      const [_kind, _operatorToken, left, right] = node;
      return calls(left) || calls(right);
    }
    case NodeKind.ConditionalExpression: {
      const [_kind, condition, whenTrue, whenFalse] = node;
      return calls(condition) || calls(whenTrue) || calls(whenFalse);
    }
    case NodeKind.Block: {
      const [_kind, statements] = node;
      return statements.some(calls);
    }
    case NodeKind.VariableDeclaration: {
      const [_kind, _name, initializer] = node;
      return calls(initializer);
    }
    case NodeKind.IfStatement: {
      const [_kind, expression, thenStatement, elseStatement] = node;
      return (
        calls(expression) ||
        calls(thenStatement) ||
        (elseStatement !== null && calls(elseStatement))
      );
    }
    case NodeKind.ForStatement: {
      const [_kind, initializer, condition, incrementor, statement] = node;
      return (
        (initializer !== null && calls(initializer)) ||
        (condition !== null && calls(condition)) ||
        (incrementor !== null && calls(incrementor)) ||
        calls(statement)
      );
    }
    case NodeKind.TryStatement: {
      const [_kind, tryBlock, catchClause] = node;
      const [_clauseKind, _variableDeclaration, block] = catchClause;
      return calls(tryBlock) || calls(block);
    }
    default: {
      const unhandled: never = node;
      throw new Error(`Unhandled node kind: ${JSON.stringify(unhandled)}`);
    }
  }
}
