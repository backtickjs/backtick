import type {
  BinaryOperator,
  SourceLocation,
  Visitor,
} from "@backtickjs/cs-runtime";
import type {
  AstScriptArrayLiteralExpression,
  AstScriptArrowFunction,
  AstScriptBinaryExpression,
  AstScriptBlock,
  AstScriptBody,
  AstScriptBooleanLiteral,
  AstScriptBreakStatement,
  AstScriptCallExpression,
  AstScriptCatchClause,
  AstScriptConditionalExpression,
  AstScriptContinueStatement,
  AstScriptElementAccessExpression,
  AstScriptExpression,
  AstScriptForStatement,
  AstScriptIdentifier,
  AstScriptIfStatement,
  AstScriptNewExpression,
  AstScriptNode,
  AstScriptNullLiteral,
  AstScriptNumericLiteral,
  AstScriptObjectLiteralExpression,
  AstScriptPropertyAccessExpression,
  AstScriptReturnStatement,
  AstScriptSplice,
  AstScriptStatement,
  AstScriptStringLiteral,
  AstScriptThrowStatement,
  AstScriptTryStatement,
  AstScriptVariableDeclaration,
  AstScriptWhileStatement,
} from "./Ast.js";

// Mirrors a client script's source 1:1: each visitor method returns the node
// for the construct it was called with, so the built body is pure syntax —
// client-independent and cacheable by source location.
export class AstBuilder implements Visitor<AstScriptNode> {
  splice(loc: SourceLocation, key: string): AstScriptSplice {
    return { kind: "AstScriptSplice", loc, key };
  }

  nullLiteral(loc: SourceLocation): AstScriptNullLiteral {
    return { kind: "AstScriptNullLiteral", loc };
  }

  numericLiteral(loc: SourceLocation, value: number): AstScriptNumericLiteral {
    return { kind: "AstScriptNumericLiteral", loc, value };
  }

  booleanLiteral(loc: SourceLocation, value: boolean): AstScriptBooleanLiteral {
    return { kind: "AstScriptBooleanLiteral", loc, value };
  }

  stringLiteral(loc: SourceLocation, text: string): AstScriptStringLiteral {
    return { kind: "AstScriptStringLiteral", loc, text };
  }

  identifier(
    loc: SourceLocation,
    text: string,
    bindingKey: string,
  ): AstScriptIdentifier {
    return { kind: "AstScriptIdentifier", loc, text, bindingKey };
  }

  block(loc: SourceLocation, statements: AstScriptStatement[]): AstScriptBlock {
    return { kind: "AstScriptBlock", loc, statements };
  }

  variableDeclaration(
    loc: SourceLocation,
    name: AstScriptIdentifier,
    initializer: AstScriptExpression,
    keyword: "let" | "const",
  ): AstScriptVariableDeclaration {
    return {
      kind: "AstScriptVariableDeclaration",
      loc,
      name,
      initializer,
      keyword,
    };
  }

  ifStatement(
    loc: SourceLocation,
    expression: AstScriptExpression,
    thenStatement: AstScriptStatement,
    elseStatement: AstScriptStatement | null,
  ): AstScriptIfStatement {
    return {
      kind: "AstScriptIfStatement",
      loc,
      expression,
      thenStatement,
      elseStatement,
    };
  }

  whileStatement(
    loc: SourceLocation,
    expression: AstScriptExpression,
    statement: AstScriptStatement,
  ): AstScriptWhileStatement {
    return { kind: "AstScriptWhileStatement", loc, expression, statement };
  }

  forStatement(
    loc: SourceLocation,
    initializer: AstScriptStatement | null,
    condition: AstScriptExpression | null,
    incrementor: AstScriptStatement | null,
    statement: AstScriptStatement,
  ): AstScriptForStatement {
    return {
      kind: "AstScriptForStatement",
      loc,
      initializer,
      condition,
      incrementor,
      statement,
    };
  }

  breakStatement(loc: SourceLocation): AstScriptBreakStatement {
    return { kind: "AstScriptBreakStatement", loc };
  }

  continueStatement(loc: SourceLocation): AstScriptContinueStatement {
    return { kind: "AstScriptContinueStatement", loc };
  }

  returnStatement(
    loc: SourceLocation,
    expression: AstScriptExpression,
  ): AstScriptReturnStatement {
    return { kind: "AstScriptReturnStatement", loc, expression };
  }

  throwStatement(
    loc: SourceLocation,
    expression: AstScriptExpression,
  ): AstScriptThrowStatement {
    return { kind: "AstScriptThrowStatement", loc, expression };
  }

  tryStatement(
    loc: SourceLocation,
    tryBlock: AstScriptBlock,
    catchClause: AstScriptCatchClause,
  ): AstScriptTryStatement {
    return { kind: "AstScriptTryStatement", loc, tryBlock, catchClause };
  }

  catchClause(
    loc: SourceLocation,
    variableDeclaration: AstScriptIdentifier | null,
    block: AstScriptBlock,
  ): AstScriptCatchClause {
    return {
      kind: "AstScriptCatchClause",
      loc,
      variableDeclaration,
      block,
    };
  }

  propertyAccessExpression(
    loc: SourceLocation,
    expression: AstScriptExpression,
    questionDotToken: boolean,
    name: string,
  ): AstScriptPropertyAccessExpression {
    return {
      kind: "AstScriptPropertyAccessExpression",
      loc,
      expression,
      questionDotToken,
      name,
    };
  }

  elementAccessExpression(
    loc: SourceLocation,
    expression: AstScriptExpression,
    argumentExpression: AstScriptExpression,
  ): AstScriptElementAccessExpression {
    return {
      kind: "AstScriptElementAccessExpression",
      loc,
      expression,
      argumentExpression,
    };
  }

  binaryExpression(
    loc: SourceLocation,
    left: AstScriptExpression,
    operatorToken: BinaryOperator,
    right: AstScriptExpression,
  ): AstScriptBinaryExpression {
    return {
      kind: "AstScriptBinaryExpression",
      loc,
      left,
      operatorToken,
      right,
    };
  }

  conditionalExpression(
    loc: SourceLocation,
    condition: AstScriptExpression,
    whenTrue: AstScriptExpression,
    whenFalse: AstScriptExpression,
  ): AstScriptConditionalExpression {
    return {
      kind: "AstScriptConditionalExpression",
      loc,
      condition,
      whenTrue,
      whenFalse,
    };
  }

  arrayLiteralExpression(
    loc: SourceLocation,
    elements: AstScriptExpression[],
  ): AstScriptArrayLiteralExpression {
    return { kind: "AstScriptArrayLiteralExpression", loc, elements };
  }

  objectLiteralExpression(
    loc: SourceLocation,
    properties: { [name: string]: AstScriptExpression },
  ): AstScriptObjectLiteralExpression {
    return { kind: "AstScriptObjectLiteralExpression", loc, properties };
  }

  // `argumentsArray` rather than `arguments`, which is not a legal parameter
  // name in strict mode — TypeScript's own factory does the same.
  callExpression(
    loc: SourceLocation,
    expression: AstScriptExpression,
    questionDotToken: boolean,
    argumentsArray: AstScriptExpression[],
  ): AstScriptCallExpression {
    return {
      kind: "AstScriptCallExpression",
      loc,
      expression,
      questionDotToken,
      arguments: argumentsArray,
    };
  }

  arrowFunction(
    loc: SourceLocation,
    parameters: AstScriptIdentifier[],
    body: AstScriptBody,
  ): AstScriptArrowFunction {
    return { kind: "AstScriptArrowFunction", loc, parameters, body };
  }

  newExpression(
    loc: SourceLocation,
    expression: AstScriptExpression,
    argumentsArray: AstScriptExpression[],
  ): AstScriptNewExpression {
    return {
      kind: "AstScriptNewExpression",
      loc,
      expression,
      arguments: argumentsArray,
    };
  }
}
