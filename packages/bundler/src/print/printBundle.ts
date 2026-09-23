import type {
  Bundle,
  BundleArrayElement,
  BundleArrowFunction,
  BundleElement,
  BundleExpression,
  BundleIdentifier,
  BundleStatement,
  ClientUnknown,
} from "@backtickjs/platform-sdk";

/**
 * A bundle as JavaScript: a module whose default export takes `data` and
 * answers with what the bundle's root evaluates to.
 *
 * Data never becomes code. Every literal the bundle holds — every spliced
 * value among them — is an entry of `data`, and the code reads it as `$d[i]`.
 * The only text the code takes from the bundle is a name that matches the
 * identifier grammar; any other name is read from `data` too. Nothing is
 * escaped, because nothing from the bundle is printed where escaping would
 * matter.
 *
 * A builtin is read as the global of its name, and so are the runtime's
 * `element`, `list`, `component` and `memo`: the client puts them on
 * `globalThis` before it runs the module.
 */
export interface PrintedBundle {
  readonly code: string;
  readonly data: readonly (string | number | boolean)[];
  /** The builtins the code reads as globals, which the client provides. */
  readonly globals: readonly string[];
}

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

// What the module itself names, beside the builtins it reads.
const RUNTIME = ["$d", "element", "list", "component", "memo", "globalThis"];

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

export function printBundle(bundle: Bundle<ClientUnknown>): PrintedBundle {
  const data: (string | number | boolean)[] = [];
  const indexes = new Map<string, number>();
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

  const literal = (value: string | number | boolean): string => {
    const key = `${typeof value}:${String(value)}`;
    let index = indexes.get(key);
    if (index === undefined) {
      index = data.length;
      data.push(value);
      indexes.set(key, index);
    }
    return `$d[${index}]`;
  };

  // The name as written, unless the module needs it or may not bind it.
  const binding = (name: string): string => {
    let printed = bindings.get(name);
    if (printed === undefined) {
      printed =
        IDENTIFIER.test(name) && !taken.has(name) && !UNBINDABLE.has(name)
          ? name
          : fresh(IDENTIFIER.test(name) ? name : "binding");
      bindings.set(name, printed);
    }
    return printed;
  };

  let next = 1;
  const label = (name: string): string => {
    let printed = labels.get(name);
    if (printed === undefined) {
      while (taken.has(`f${next}`) || bound.has(`f${next}`)) {
        next += 1;
      }
      printed = `f${next}`;
      taken.add(printed);
      labels.set(name, printed);
    }
    return printed;
  };

  const builtin = (name: string): string =>
    IDENTIFIER.test(name) ? name : `globalThis[${literal(name)}]`;

  const member = (name: string, optional: boolean): string =>
    IDENTIFIER.test(name)
      ? `${optional ? "?." : "."}${name}`
      : `${optional ? "?." : ""}[${literal(name)}]`;

  const target = (node: BundleIdentifier): string => {
    if (!Array.isArray(node) || node[0] !== "id") {
      throw new Error("an assignment target must be an identifier");
    }
    return binding(node[1]);
  };

  const list = (elements: readonly BundleArrayElement[]): string =>
    elements
      .map((element) =>
        Array.isArray(element) && element[0] === "..."
          ? `...${expression(element[1])}`
          : expression(element),
      )
      .join(", ");

  const arrow = (node: BundleArrowFunction): string => {
    const parameters = node[1].map((parameter) => binding(parameter[1]));
    const body = node[2];
    const printed =
      Array.isArray(body) && body[0] === "{}"
        ? statement(body)
        : expression(body);
    return `((${parameters.join(", ")}) => ${printed})`;
  };

  // What `compileChildren` builds, written out: a value that cannot change,
  // an accessor alone in a position, a memo as a member of an array.
  const children = (node: BundleArrayElement, inArray: boolean): string => {
    if (Array.isArray(node) && node[0] === "arr") {
      return `[${node[1].map((one) => children(one, true)).join(", ")}]`;
    }
    const read = expression(node as BundleExpression);
    if (isFixed(node)) {
      return read;
    }
    return inArray ? `memo(() => ${read})` : `(() => ${read})`;
  };

  const element = (node: BundleElement): string => {
    const [, id, props, drawn] = node;
    if (id === "for") {
      return `list(() => ${expression(props["each"] ?? null)}, ${expression(drawn)})`;
    }
    if (id === "Fragment") {
      return drawn === null ? "null" : children(drawn, true);
    }
    const printed = Object.entries(props).map(
      ([name, value]) =>
        `[${literal(name)}, () => ${expression(value)}, ${isFixed(value)}]`,
    );
    const draw = drawn === null ? "null" : `() => ${children(drawn, false)}`;
    return `element(${literal(id)}, [${printed.join(", ")}], ${draw})`;
  };

  function expression(node: BundleExpression): string {
    if (node === null) {
      return "null";
    }
    if (typeof node !== "object") {
      return literal(node);
    }
    if (!Array.isArray(node)) {
      const members = Object.entries(node).map(
        ([key, value]) => `[${literal(key)}]: ${expression(value)}`,
      );
      return `({ ${members.join(", ")} })`;
    }
    switch (node[0]) {
      case "arr":
        return `[${list(node[1])}]`;
      case "undef":
        return "(void 0)";
      case "id":
        return binding(node[1]);
      case "fn":
        return label(node[1]);
      case "bltn":
        return builtin(node[1]);
      case "el":
        return element(node);
      case "comp": {
        const props = Object.entries(node[2]).map(
          ([name, value]) => `[${literal(name)}, () => ${expression(value)}]`,
        );
        if (node[3] !== null) {
          props.push(`[${literal("children")}, () => ${expression(node[3])}]`);
        }
        return `component(${expression(node[1])}, [${props.join(", ")}])`;
      }
      case "()":
      case "?.()": {
        const call = node[0] === "?.()" ? "?.(" : "(";
        const callee = node[1];
        // A method keeps its receiver: the member is read and called in one
        // expression, and `a?.b(…)` short-circuits the whole call.
        const head =
          Array.isArray(callee) && (callee[0] === "." || callee[0] === "?.")
            ? `${expression(callee[1])}${member(callee[2], callee[0] === "?.")}`
            : expression(callee);
        return `(${head}${call}${list(node[2])}))`;
      }
      case ".":
      case "?.":
        return `(${expression(node[1])}${member(node[2], node[0] === "?.")})`;
      case "[]":
        return `(${expression(node[1])}[${expression(node[2])}])`;
      case "=":
      case "+=":
      case "-=":
      case "*=":
      case "/=":
      case "%=":
        return `(${target(node[1])} ${node[0]} ${expression(node[2])})`;
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
      case ">=":
        return `(${expression(node[1])} ${node[0]} ${expression(node[2])})`;
      case "!":
        return `(!${expression(node[1])})`;
      case "-x":
        return `(-${expression(node[1])})`;
      case "typeof":
        return `(typeof ${expression(node[1])})`;
      case "++x":
        return `(++${target(node[1])})`;
      case "--x":
        return `(--${target(node[1])})`;
      case "x++":
        return `(${target(node[1])}++)`;
      case "x--":
        return `(${target(node[1])}--)`;
      case "?:":
        return `(${expression(node[1])} ? ${expression(node[2])} : ${expression(node[3])})`;
      case "=>":
        return arrow(node);
      default:
        throw new Error(`\`${String(node[0])}\` is not an expression`);
    }
  }

  function statement(node: BundleStatement): string {
    if (node === null || typeof node !== "object") {
      return ";";
    }
    if (!Array.isArray(node)) {
      return `${expression(node)};`;
    }
    switch (node[0]) {
      case "{}":
        return `{\n${node[1].map(statement).join("\n")}\n}`;
      case "const":
      case "let":
        return `${node[0]} ${binding(node[1])} = ${expression(node[2])};`;
      case "if": {
        // Braced, so an `else` never attaches to an `if` nested inside.
        const otherwise = node[3] === null ? "" : ` else ${statement(node[3])}`;
        return `if (${expression(node[1])}) {\n${statement(node[2])}\n}${otherwise}`;
      }
      case "while":
        return `while (${expression(node[1])}) ${statement(node[2])}`;
      case "for": {
        const [, initializer, condition, incrementor, body] = node;
        const head =
          initializer === null
            ? ""
            : Array.isArray(initializer) &&
                (initializer[0] === "const" || initializer[0] === "let")
              ? `${initializer[0]} ${binding(initializer[1])} = ${expression(initializer[2])}`
              : expression(initializer as BundleExpression);
        const test = condition === null ? "" : expression(condition);
        const step = incrementor === null ? "" : expression(incrementor);
        return `for (${head}; ${test}; ${step}) ${statement(body)}`;
      }
      case "break":
        return "break;";
      case "continue":
        return "continue;";
      case "return":
        return `return ${expression(node[1])};`;
      case "throw":
        return `throw ${expression(node[1])};`;
      case "try": {
        const [, attempted, [, caught, handler]] = node;
        const clause = caught === null ? "catch" : `catch (${binding(caught)})`;
        return `try ${statement(attempted)} ${clause} ${statement(handler)}`;
      }
      default:
        return `${expression(node)};`;
    }
  }

  const functions = Object.entries(bundle.functions).map(
    ([name, node]) => `const ${label(name)} = ${arrow(node)};`,
  );
  const root = expression(bundle.root);
  const code = [
    "export default ($d) => {",
    ...functions,
    `return ${root};`,
    "};",
    "",
  ].join("\n");
  return { code, data, globals: [...read] };
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
