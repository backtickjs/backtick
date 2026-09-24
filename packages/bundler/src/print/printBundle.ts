import type {
  Bundle,
  BundleArrayElement,
  BundleTree,
  BundleArrowFunction,
  BundleElement,
  BundleExpression,
  BundleIdentifier,
  BundleStatement,
  ClientUnknown,
} from "@backtickjs/platform-sdk";
import { generate } from "astring";
import type * as ES from "estree";

/**
 * A bundle tree as JavaScript: one expression that answers with what the
 * tree's root evaluates to.
 *
 * Built as ESTree and printed by `astring`. Literals are printed as literals,
 * strings escaped so that no `</script>` or `<!--` appears. The bundle does not yet tell a value the host computed
 * from one a script wrote, so both are printed that way for now. An
 * element's tag or prop name that is not a plain name is data: the
 * expression carries its data in one `JSON.parse`, and reads it as `$d[i]`.
 *
 * An element or a component is a call of the client's `jsx`, and a builtin is
 * read as the global of its name: defining a client is putting them on the
 * global object before any bundle runs. What an element is, is the client's.
 */

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

// A tag or prop name that can be printed as a string without escaping.
const NAME = /^[A-Za-z][A-Za-z0-9_:-]*$/;

// What the module itself names, beside the builtins it reads.
const RUNTIME = ["$d", "globalThis", "jsx"];

// Names a module may not bind: it is strict code, and `await` is reserved in
// a module.
const UNBINDABLE = new Set(["arguments", "await", "eval", "yield"]);

// Every name a bundle binds and every builtin it reads, so a printed name can
// avoid both.
function namesOf(node: unknown, bound: Set<string>, read: Set<string>): void {
  if (node === null || typeof node !== "object") {
    return;
  }
  if (!Array.isArray(node)) {
    for (const value of Object.values(node)) {
      namesOf(value, bound, read);
    }
    return;
  }
  const [kind, name] = node as [unknown, unknown];
  if (typeof name === "string") {
    if (kind === "bltn") {
      read.add(name);
    } else if (
      kind === "id" ||
      kind === "param" ||
      kind === "const" ||
      kind === "let" ||
      kind === "catch"
    ) {
      bound.add(name);
    }
  }
  for (const member of node) {
    namesOf(member, bound, read);
  }
}

export function printBundle<T extends ClientUnknown>(
  bundle: BundleTree<T>,
): Bundle<T> {
  const data: string[] = [];
  const bindings = new Map<string, string>();
  const labels = new Map<string, string>();

  const bound = new Set<string>();
  const read = new Set<string>();
  namesOf(bundle, bound, read);
  const globals = [...read].filter((name) => IDENTIFIER.test(name));
  // Taken by the module, so a binding or a label named the same is renamed.
  const taken = new Set([...RUNTIME, ...globals]);
  const fresh = (base: string): string => {
    let at = 1;
    while (taken.has(`${base}_${at}`) || bound.has(`${base}_${at}`)) {
      at += 1;
    }
    taken.add(`${base}_${at}`);
    return `${base}_${at}`;
  };

  const read$d = (value: string): ES.Expression => {
    data.push(value);
    return index(identifier("$d"), numberLiteral(data.length - 1));
  };

  const literal = (value: string | number | boolean): ES.Expression =>
    typeof value === "string"
      ? stringLiteral(value)
      : typeof value === "number"
        ? numberLiteral(value)
        : { type: "Literal", value };

  const name = (text: string): ES.Expression =>
    NAME.test(text) ? stringLiteral(text) : read$d(text);

  // The name as written, unless the module needs it or may not bind it.
  const binding = (name: string): ES.Identifier => {
    let printed = bindings.get(name);
    if (printed === undefined) {
      printed =
        IDENTIFIER.test(name) && !taken.has(name) && !UNBINDABLE.has(name)
          ? name
          : fresh(IDENTIFIER.test(name) ? name : "binding");
      bindings.set(name, printed);
    }
    return identifier(printed);
  };

  let next = 1;
  const label = (name: string): ES.Identifier => {
    let printed = labels.get(name);
    if (printed === undefined) {
      while (taken.has(`f${next}`) || bound.has(`f${next}`)) {
        next += 1;
      }
      printed = `f${next}`;
      taken.add(printed);
      labels.set(name, printed);
    }
    return identifier(printed);
  };

  // `eval` read as a value, so a call of it is indirect: a bundle closes over
  // nothing, and a direct call would hand it this one's scope.
  const builtin = (name: string): ES.Expression =>
    name === "eval"
      ? {
          type: "SequenceExpression",
          expressions: [numberLiteral(0), identifier("eval")],
        }
      : IDENTIFIER.test(name)
        ? identifier(name)
        : index(identifier("globalThis"), stringLiteral(name));

  const member = (
    object: ES.Expression,
    name: string,
    optional: boolean,
  ): ES.MemberExpression =>
    IDENTIFIER.test(name)
      ? {
          type: "MemberExpression",
          object,
          property: identifier(name),
          computed: false,
          optional,
        }
      : {
          type: "MemberExpression",
          object,
          property: stringLiteral(name),
          computed: true,
          optional,
        };

  const target = (node: BundleIdentifier): ES.Identifier => {
    if (!Array.isArray(node) || node[0] !== "id") {
      throw new Error("an assignment target must be an identifier");
    }
    return binding(node[1]);
  };

  const list = (
    elements: readonly BundleArrayElement[],
  ): (ES.Expression | ES.SpreadElement)[] =>
    elements.map((element) =>
      Array.isArray(element) && element[0] === "..."
        ? { type: "SpreadElement", argument: expression(element[1]) }
        : expression(element),
    );

  const arrow = (node: BundleArrowFunction): ES.ArrowFunctionExpression => {
    const body = node[2];
    const block = Array.isArray(body) && body[0] === "{}";
    return {
      type: "ArrowFunctionExpression",
      params: node[1].map((parameter) => binding(parameter[1])),
      body: block
        ? (statement(body) as ES.BlockStatement)
        : expression(body as BundleExpression),
      expression: !block,
    };
  };

  // A prop's key: bare where it can be, a string where it is a plain name, and
  // read from `data` otherwise.
  const propKey = (key: string): { key: ES.Expression; computed: boolean } =>
    IDENTIFIER.test(key)
      ? { key: identifier(key), computed: false }
      : NAME.test(key)
        ? { key: stringLiteral(key), computed: false }
        : { key: read$d(key), computed: true };

  // A child that can change is a function of nothing, so the client decides
  // when to read it.
  const child = (node: BundleArrayElement): ES.Expression =>
    Array.isArray(node) && node[0] === "arr"
      ? { type: "ArrayExpression", elements: node[1].map(child) }
      : isFixed(node)
        ? expression(node as BundleExpression)
        : thunk(expression(node as BundleExpression));

  // One object for an element's or a component's props: what cannot change is
  // a property, what can is a getter. `children` is a getter too, and in an
  // array of them, what can change is a function of nothing.
  const props = (
    written: { readonly [key: string]: BundleExpression },
    drawn: BundleExpression | null,
  ): ES.ObjectExpression => {
    const members = Object.entries(written).map(([key, value]) =>
      isFixed(value)
        ? property(propKey(key), expression(value))
        : getter(propKey(key), expression(value)),
    );
    // Children are read when the client asks, so an element among them is
    // built where the client draws it: inside an `svg`, say. A literal has
    // nothing to build.
    if (drawn !== null) {
      const key = { key: identifier("children"), computed: false };
      members.push(
        typeof drawn !== "object"
          ? property(key, expression(drawn))
          : getter(
              key,
              Array.isArray(drawn) && drawn[0] === "arr"
                ? child(drawn)
                : expression(drawn),
            ),
      );
    }
    return { type: "ObjectExpression", properties: members };
  };

  const jsx = (
    type: ES.Expression,
    written: ES.ObjectExpression,
  ): ES.CallExpression => call(identifier("jsx"), [type, written]);

  // A fragment draws nothing of its own, so it is its children, as an array.
  const element = (node: BundleElement): ES.Expression => {
    const [, id, written, drawn] = node;
    if (id === "Fragment") {
      return drawn === null ? { type: "Literal", value: null } : child(drawn);
    }
    return jsx(name(id), props(written, drawn));
  };

  // An optional link is a chain of its own, as each `?.` was parenthesized
  // before: `a?.b` and `a?.b()` short-circuit themselves and nothing outside.
  const chain = (node: ES.ChainElement): ES.Expression => ({
    type: "ChainExpression",
    expression: node,
  });

  function expression(node: BundleExpression): ES.Expression {
    if (node === null) {
      return { type: "Literal", value: null };
    }
    if (typeof node !== "object") {
      return literal(node);
    }
    if (!Array.isArray(node)) {
      return {
        type: "ObjectExpression",
        properties: Object.entries(node).map(([key, value]) =>
          property(
            IDENTIFIER.test(key)
              ? { key: identifier(key), computed: false }
              : { key: stringLiteral(key), computed: false },
            expression(value),
          ),
        ),
      };
    }
    switch (node[0]) {
      case "arr":
        return { type: "ArrayExpression", elements: list(node[1]) };
      case "undef":
        return {
          type: "UnaryExpression",
          operator: "void",
          prefix: true,
          argument: numberLiteral(0),
        };
      case "id":
        return binding(node[1]);
      case "fn":
        return label(node[1]);
      case "bltn":
        return builtin(node[1]);
      case "el":
        return element(node);
      case "comp":
        return jsx(expression(node[1]), props(node[2], node[3]));
      case "()":
      case "?.()": {
        const optionalCall = node[0] === "?.()";
        const callee = node[1];
        // A method keeps its receiver: the member is read and called in one
        // expression, and `a?.b(…)` short-circuits the whole call.
        const method =
          Array.isArray(callee) && (callee[0] === "." || callee[0] === "?.");
        const optionalMember = method && callee[0] === "?.";
        const called: ES.SimpleCallExpression = {
          type: "CallExpression",
          callee: method
            ? member(expression(callee[1]), callee[2], optionalMember)
            : expression(callee),
          arguments: list(node[2]),
          optional: optionalCall,
        };
        return optionalCall || optionalMember ? chain(called) : called;
      }
      case ".":
        return member(expression(node[1]), node[2], false);
      case "?.":
        return chain(member(expression(node[1]), node[2], true));
      case "[]":
        return index(expression(node[1]), expression(node[2]));
      case "=":
      case "+=":
      case "-=":
      case "*=":
      case "/=":
      case "%=":
        return {
          type: "AssignmentExpression",
          operator: node[0],
          left: target(node[1]),
          right: expression(node[2]),
        };
      case "&&":
      case "||":
      case "??":
        return {
          type: "LogicalExpression",
          operator: node[0],
          left: expression(node[1]),
          right: expression(node[2]),
        };
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
      case ">=":
        return {
          type: "BinaryExpression",
          operator: node[0],
          left: expression(node[1]),
          right: expression(node[2]),
        };
      case "!":
      case "typeof":
        return {
          type: "UnaryExpression",
          operator: node[0],
          prefix: true,
          argument: expression(node[1]),
        };
      case "-x":
        return {
          type: "UnaryExpression",
          operator: "-",
          prefix: true,
          argument: expression(node[1]),
        };
      case "++x":
      case "--x":
        return {
          type: "UpdateExpression",
          operator: node[0] === "++x" ? "++" : "--",
          prefix: true,
          argument: target(node[1]),
        };
      case "x++":
      case "x--":
        return {
          type: "UpdateExpression",
          operator: node[0] === "x++" ? "++" : "--",
          prefix: false,
          argument: target(node[1]),
        };
      case "?:":
        return {
          type: "ConditionalExpression",
          test: expression(node[1]),
          consequent: expression(node[2]),
          alternate: expression(node[3]),
        };
      case "=>":
        return arrow(node);
      default:
        throw new Error(`\`${String(node[0])}\` is not an expression`);
    }
  }

  const declaration = (
    kind: "const" | "let",
    name: string,
    initializer: BundleExpression,
  ): ES.VariableDeclaration => ({
    type: "VariableDeclaration",
    kind,
    declarations: [
      {
        type: "VariableDeclarator",
        id: binding(name),
        init: expression(initializer),
      },
    ],
  });

  const block = (node: ES.Statement): ES.BlockStatement =>
    node.type === "BlockStatement"
      ? node
      : { type: "BlockStatement", body: [node] };

  function statement(node: BundleStatement): ES.Statement {
    if (node === null || typeof node !== "object") {
      return { type: "EmptyStatement" };
    }
    if (!Array.isArray(node)) {
      return { type: "ExpressionStatement", expression: expression(node) };
    }
    switch (node[0]) {
      case "{}":
        return { type: "BlockStatement", body: node[1].map(statement) };
      case "const":
      case "let":
        return declaration(node[0], node[1], node[2]);
      // Braced, so an `else` never attaches to an `if` nested inside.
      case "if":
        return {
          type: "IfStatement",
          test: expression(node[1]),
          consequent: block(statement(node[2])),
          alternate: node[3] === null ? null : statement(node[3]),
        };
      case "while":
        return {
          type: "WhileStatement",
          test: expression(node[1]),
          body: statement(node[2]),
        };
      case "for": {
        const [, initializer, condition, incrementor, body] = node;
        return {
          type: "ForStatement",
          init:
            initializer === null
              ? null
              : Array.isArray(initializer) &&
                  (initializer[0] === "const" || initializer[0] === "let")
                ? declaration(initializer[0], initializer[1], initializer[2])
                : expression(initializer as BundleExpression),
          test: condition === null ? null : expression(condition),
          update: incrementor === null ? null : expression(incrementor),
          body: statement(body),
        };
      }
      case "break":
        return { type: "BreakStatement", label: null };
      case "continue":
        return { type: "ContinueStatement", label: null };
      case "return":
        return { type: "ReturnStatement", argument: expression(node[1]) };
      case "throw":
        return { type: "ThrowStatement", argument: expression(node[1]) };
      case "try": {
        const [, attempted, [, caught, handler]] = node;
        return {
          type: "TryStatement",
          block: statement(attempted) as ES.BlockStatement,
          handler: {
            type: "CatchClause",
            param: caught === null ? null : binding(caught),
            body: statement(handler) as ES.BlockStatement,
          },
          finalizer: null,
        };
      }
      default:
        return { type: "ExpressionStatement", expression: expression(node) };
    }
  }

  const functions: ES.Statement[] = Object.entries(bundle.functions).map(
    ([name, node]) => ({
      type: "VariableDeclaration",
      kind: "const",
      declarations: [
        { type: "VariableDeclarator", id: label(name), init: arrow(node) },
      ],
    }),
  );
  const root = expression(bundle.root);
  const carried: ES.Expression =
    data.length === 0
      ? { type: "ArrayExpression", elements: [] }
      : call(member(identifier("JSON"), "parse", false), [
          stringLiteral(JSON.stringify(data)),
        ]);
  const program: ES.Expression = call(
    {
      type: "ArrowFunctionExpression",
      params: [identifier("$d")],
      body: {
        type: "BlockStatement",
        body: [...functions, { type: "ReturnStatement", argument: root }],
      },
      expression: false,
    },
    [carried],
  );
  return generate(program) as Bundle<T>;
}

function identifier(name: string): ES.Identifier {
  return { type: "Identifier", name };
}

// A string a script wrote, as a literal: `<` escaped, so no `</script>` or
// `<!--` appears when the bundle is inlined in a page.
function stringLiteral(value: string): ES.Literal {
  return {
    type: "Literal",
    value,
    raw: JSON.stringify(value).replace(/</g, "\\u003c"),
  };
}

// A negative number is the negation of one, as JavaScript writes it.
function numberLiteral(value: number): ES.Expression {
  if (!Number.isFinite(value)) {
    throw new Error(`${value} has no literal`);
  }
  return value < 0 || Object.is(value, -0)
    ? {
        type: "UnaryExpression",
        operator: "-",
        prefix: true,
        argument: { type: "Literal", value: -value },
      }
    : { type: "Literal", value };
}

function index(object: ES.Expression, key: ES.Expression): ES.MemberExpression {
  return {
    type: "MemberExpression",
    object,
    property: key,
    computed: true,
    optional: false,
  };
}

function call(
  callee: ES.Expression,
  args: (ES.Expression | ES.SpreadElement)[],
): ES.SimpleCallExpression {
  return { type: "CallExpression", callee, arguments: args, optional: false };
}

function thunk(body: ES.Expression): ES.ArrowFunctionExpression {
  return {
    type: "ArrowFunctionExpression",
    params: [],
    body,
    expression: true,
  };
}

function property(
  { key, computed }: { key: ES.Expression; computed: boolean },
  value: ES.Expression,
): ES.Property {
  return {
    type: "Property",
    key,
    value,
    kind: "init",
    computed,
    method: false,
    shorthand: false,
  };
}

function getter(
  { key, computed }: { key: ES.Expression; computed: boolean },
  value: ES.Expression,
): ES.Property {
  return {
    type: "Property",
    key,
    value: {
      type: "FunctionExpression",
      params: [],
      body: {
        type: "BlockStatement",
        body: [{ type: "ReturnStatement", argument: value }],
      },
    },
    kind: "get",
    computed,
    method: false,
    shorthand: false,
  };
}

// Whether what a position holds can change after it has first been read: the
// interpreter's `isFixed`, which printed code has to agree with.
function isFixed(node: BundleArrayElement): boolean {
  if (!Array.isArray(node)) {
    if (node === null || typeof node !== "object") {
      return true;
    }
    return Object.values(node).every((member) => isFixed(member));
  }
  if (node[0] === "arr") {
    return node[1].every((member) => isFixed(member));
  }
  return node[0] === "=>" || node[0] === "el";
}
