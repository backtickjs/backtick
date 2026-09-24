import type {
  ClientScriptArrayElement,
  ClientScriptBlock,
  ClientScriptBody,
  ClientScriptDeclaration,
  ClientScriptExpression,
  ClientScriptStatement,
} from "@backtickjs/client-script";
import type * as ES from "estree";
import {
  arrow,
  binding,
  builtin,
  call,
  chain,
  jsxComponent,
  jsxElement,
  literal,
  member,
  nullLiteral,
  objectKey,
  property,
  stringLiteral,
  thunk,
  undefinedValue,
} from "../estree.js";
import type { Names } from "../estree.js";
import type { ScriptEntry } from "./ScriptEntry.js";
import { sourceName } from "./bindingKey.js";

// Lowers a script to the ESTree body of its entry. The mapping mirrors the grammar —
// expressions lower to expressions, statements to statements — with two places
// where the script itself decides what to emit: an identifier, and a splice.
//
// Both are read off the script rather than passed in, so a body follows from
// its own source. Nothing else here needs the script, which is why the builders
// close over them instead of threading them down every branch to reach two
// leaves.
export function lowerScriptBody(
  script: ScriptEntry,
  names: Names,
): ES.Expression | ES.BlockStatement {
  // An entry's parameters are one numbered sequence: a thunk per splice hole
  // the script writes, then a value per binding it captures. Both lists come
  // from the script, so the arity and the order are its own.
  //
  // A capture reads as its number rather than its source name, which is what
  // keeps it out of the way: `$` cannot start a source name, so a capture can
  // never be shadowed by a local, and neither ever needs renaming to avoid the
  // other. A binding the script declares still reads as itself, since that is
  // what the source says.
  const captureIndex = new Map(
    script.captures.map((key, at) => [key, script.splices.length + at]),
  );
  const read = (key: string): ES.Identifier => {
    const at = captureIndex.get(key);
    return binding(names, at === undefined ? sourceName(key) : `$${at}`);
  };

  // The body names holes by key; a reference's `args` are positional in the
  // script's `splices` order, so this maps between them. The hole hands its
  // thunk the bindings bound where it sits (see `spliceParams`), since a
  // fragment landing there can only reference what was in scope where it was
  // written.
  const holes = new Map(
    script.splices.map((splice, index) => [splice.key, index] as const),
  );
  const paramsOf = new Map(
    script.splices.map((splice) => [splice.key, splice.params] as const),
  );
  const renderSplice = (key: string): ES.Expression => {
    const index = holes.get(key);
    if (index === undefined) {
      throw new Error(`This script has no \`${key}\` splice.`);
    }
    // What a fragment landing here could want: the bindings bound at this hole,
    // then everything this script captured — which, captures being transitive,
    // already covers what a fragment nested here needs. Positional, in an order
    // the script fixes, so a call site reading the same metadata can line its
    // thunk up without either side knowing the other.
    const args = [...(paramsOf.get(key) ?? []), ...script.captures].map(
      (bound) => read(bound),
    );
    return call(binding(names, `$${index}`), args);
  };

  const buildBody = (
    node: ClientScriptBody,
  ): ES.Expression | ES.BlockStatement =>
    node.kind === "{}" ? buildBlock(node) : buildExpression(node);

  function buildBlock(node: ClientScriptBlock): ES.BlockStatement {
    return {
      type: "BlockStatement",
      body: node.statements.map(buildStatement),
    };
  }

  function buildDeclaration(
    node: ClientScriptDeclaration,
  ): ES.VariableDeclaration {
    return {
      type: "VariableDeclaration",
      kind: node.kind,
      declarations: [
        {
          type: "VariableDeclarator",
          id: binding(names, sourceName(node.name.bindingKey)),
          init: buildExpression(node.initializer),
        },
      ],
    };
  }

  // Braced, so an `else` never attaches to an `if` nested inside.
  const braced = (node: ES.Statement): ES.BlockStatement =>
    node.type === "BlockStatement"
      ? node
      : { type: "BlockStatement", body: [node] };

  function buildStatement(node: ClientScriptStatement): ES.Statement {
    switch (node.kind) {
      case "{}":
        return buildBlock(node);
      case "if":
        return {
          type: "IfStatement",
          test: buildExpression(node.expression),
          consequent: braced(buildStatement(node.thenStatement)),
          alternate:
            node.elseStatement === null
              ? null
              : buildStatement(node.elseStatement),
        };
      case "while":
        return {
          type: "WhileStatement",
          test: buildExpression(node.expression),
          body: buildStatement(node.statement),
        };
      case "for":
        return {
          type: "ForStatement",
          init:
            node.initializer === null
              ? null
              : node.initializer.kind === "const" ||
                  node.initializer.kind === "let"
                ? buildDeclaration(node.initializer)
                : buildExpression(node.initializer),
          test:
            node.condition === null ? null : buildExpression(node.condition),
          update:
            node.incrementor === null
              ? null
              : buildExpression(node.incrementor),
          body: buildStatement(node.statement),
        };
      case "break":
        return { type: "BreakStatement", label: null };
      case "continue":
        return { type: "ContinueStatement", label: null };
      case "return":
        return {
          type: "ReturnStatement",
          argument: buildExpression(node.expression),
        };
      case "throw":
        return {
          type: "ThrowStatement",
          argument: buildExpression(node.expression),
        };
      case "try": {
        const clause = node.catchClause;
        return {
          type: "TryStatement",
          block: buildBlock(node.tryBlock),
          handler: {
            type: "CatchClause",
            param:
              clause.variableDeclaration === null
                ? null
                : binding(
                    names,
                    sourceName(clause.variableDeclaration.bindingKey),
                  ),
            body: buildBlock(clause.block),
          },
          finalizer: null,
        };
      }
      case "const":
      case "let":
        return buildDeclaration(node);
      default:
        // Every remaining kind is an expression, evaluated for its effect.
        return {
          type: "ExpressionStatement",
          expression: buildExpression(node),
        };
    }
  }

  // What an assignment or a step writes: only a variable, which the compiler
  // enforces; this is where the two meet.
  function assignmentTarget(operand: ClientScriptExpression): ES.Identifier {
    if (operand.kind !== "id") {
      throw new Error("An assignment target must be an identifier.");
    }
    return read(operand.bindingKey);
  }

  function buildExpression(node: ClientScriptExpression): ES.Expression {
    const e = buildExpression;
    // Where a list admits `...xs` as well as a value.
    const element = (
      child: ClientScriptArrayElement,
    ): ES.Expression | ES.SpreadElement =>
      child.kind === "..."
        ? { type: "SpreadElement", argument: e(child.expression) }
        : e(child);
    switch (node.kind) {
      case "arr":
        return {
          type: "ArrayExpression",
          elements: node.elements.map(element),
        };
      case "=>":
        return arrow(
          node.parameters.map((param) =>
            binding(names, sourceName(param.name.bindingKey)),
          ),
          buildBody(node.body),
        );
      case "binop":
        switch (node.operatorToken) {
          case "=":
          case "+=":
          case "-=":
          case "*=":
          case "/=":
          case "%=":
            return {
              type: "AssignmentExpression",
              operator: node.operatorToken,
              left: assignmentTarget(node.left),
              right: e(node.right),
            };
          case "&&":
          case "||":
          case "??":
            return {
              type: "LogicalExpression",
              operator: node.operatorToken,
              left: e(node.left),
              right: e(node.right),
            };
          default:
            return {
              type: "BinaryExpression",
              operator: node.operatorToken,
              left: e(node.left),
              right: e(node.right),
            };
        }
      case "prefixop":
        if (node.operator === "++" || node.operator === "--") {
          return {
            type: "UpdateExpression",
            operator: node.operator,
            prefix: true,
            argument: assignmentTarget(node.operand),
          };
        }
        return {
          type: "UnaryExpression",
          operator: node.operator,
          prefix: true,
          argument: e(node.operand),
        };
      case "typeof":
        return {
          type: "UnaryExpression",
          operator: "typeof",
          prefix: true,
          argument: e(node.operand),
        };
      case "postfixop":
        return {
          type: "UpdateExpression",
          operator: node.operator,
          prefix: false,
          argument: assignmentTarget(node.operand),
        };
      case "?:":
        return {
          type: "ConditionalExpression",
          test: e(node.condition),
          consequent: e(node.whenTrue),
          alternate: e(node.whenFalse),
        };
      case "true":
        return literal(true);
      case "false":
        return literal(false);
      case "()":
      case "?.()": {
        // The callee is built before the arguments, because building one can
        // mint a `functions` entry and the labels run in the order they are
        // taken. A method keeps its receiver: the member is read and called in
        // one expression, and `a?.b(…)` short-circuits the whole call.
        const optionalCall = node.kind === "?.()";
        const callee = node.expression;
        const method = callee.kind === "." || callee.kind === "?.";
        const optionalMember = callee.kind === "?.";
        const head = method
          ? member(e(callee.expression), callee.name, optionalMember)
          : e(callee);
        const called: ES.SimpleCallExpression = {
          type: "CallExpression",
          callee: head,
          arguments: node.arguments.map(element),
          optional: optionalCall,
        };
        return optionalCall || optionalMember ? chain(called) : called;
      }
      case "id":
        return read(node.bindingKey);
      case "null":
        return nullLiteral();
      case "undefined":
        return undefinedValue();
      case "number":
        return literal(node.value);
      case "obj":
        return {
          type: "ObjectExpression",
          properties: node.properties.map((one) =>
            one.kind === "..."
              ? { type: "SpreadElement", argument: e(one.expression) }
              : one.name.kind === "string"
                ? property(objectKey(one.name.text), e(one.initializer))
                : property(e(one.name), e(one.initializer), true),
          ),
        };
      case ".":
        return member(e(node.expression), node.name, false);
      case "?.":
        return chain(member(e(node.expression), node.name, true));
      case "[]":
        return {
          type: "MemberExpression",
          object: e(node.expression),
          property: e(node.argumentExpression),
          computed: true,
          optional: false,
        };
      case "bltn":
        return builtin(names, node.name);
      // An element the script wrote. The other kind of tag is a component: one
      // the script holds, or one it splices, whose expansion reads each prop by
      // calling it, so there each prop is a function of nothing.
      case "jsx": {
        const written = node.attributes.map(
          (attribute) => [attribute.name, e(attribute.initializer)] as const,
        );
        // One child stands on its own; several are an array. None is `null`.
        const children: ES.Expression | null =
          node.children.length === 0
            ? null
            : node.children.length === 1
              ? e(node.children[0])
              : { type: "ArrayExpression", elements: node.children.map(e) };
        if (node.type.kind === "splice") {
          return jsxComponent(
            names,
            renderSplice(node.type.key),
            written.map(([name, value]) => [name, thunk(value)] as const),
            children === null ? null : thunk(children),
          );
        }
        if (node.type.kind === "id") {
          return jsxComponent(names, e(node.type), written, children);
        }
        return jsxElement(names, node.type.text, written, children);
      }
      case "splice":
        return renderSplice(node.key);
      case "string":
        return stringLiteral(node.text);
      default: {
        const unhandled: never = node;
        throw new Error(`Unhandled AST node: ${JSON.stringify(unhandled)}`);
      }
    }
  }

  return buildBody(script.body);
}
