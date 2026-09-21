import type { BinaryOperator } from "@backtickjs/client-script";

export function isSupportedBinop(operator: string): operator is BinaryOperator {
  const candidate = operator as BinaryOperator;
  switch (candidate) {
    case "=":
    case "+=":
    case "-=":
    case "*=":
    case "/=":
    case "%=":
    case "&&":
    case "||":
    case "??":
    case "+":
    case "-":
    case "*":
    case "/":
    case "%":
    case "===":
    case "!==":
    case "<":
    case "<=":
    case ">":
    case ">=": {
      return true;
    }
    default: {
      // Exhaustiveness: adding a `BinaryOperator` member without a case above
      // fails to compile here. At runtime, an operator string outside the set
      // lands here and is rejected.
      candidate satisfies never;
      return false;
    }
  }
}

// An assignment that computes what it assigns from the variable: `x += y`.
export function isCompoundAssignment(operator: string | undefined): boolean {
  return (
    operator === "+=" ||
    operator === "-=" ||
    operator === "*=" ||
    operator === "/=" ||
    operator === "%="
  );
}
