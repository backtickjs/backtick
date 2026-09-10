import type { BinaryOperator } from "@backtickjs/client-script";

export function isSupportedBinop(operator: string): operator is BinaryOperator {
  const candidate = operator as BinaryOperator;
  switch (candidate) {
    case "=":
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
