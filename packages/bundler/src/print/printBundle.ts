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

/**
 * A bundle tree as JavaScript: one expression that answers with what the
 * tree's root evaluates to, built under the client's `untrack`, so nothing it
 * reads while it is built subscribes whoever evaluated it.
 *
 * Literals are printed as literals, strings escaped so that no `</script>`
 * or `<!--` appears. The bundle does not yet tell a value the host computed
 * from one a script wrote, so both are printed that way for now. An
 * element's tag or prop name that is not a plain name is data: the
 * expression carries its data in one `JSON.parse`, and reads it as `$d[i]`.
 *
 * A builtin is read as the global of its name, and so are the client's
 * `element`, `list`, `component` and `memo`: defining a client is putting them
 * on the global object before any bundle runs.
 */

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

// A tag or prop name that can be printed as a string without escaping.
const NAME = /^[A-Za-z][A-Za-z0-9_:-]*$/;

// A string a script wrote, as a literal: `<` escaped, so no `</script>` or
// `<!--` appears when the module is inlined in a page.
function stringLiteral(value: string): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

// What the module itself names, beside the builtins it reads.
const RUNTIME = [
  "$d",
  "component",
  "element",
  "globalThis",
  "list",
  "memo",
  "untrack",
];

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

  const read$d = (value: string): string => {
    data.push(value);
    return `$d[${data.length - 1}]`;
  };

  const literal = (value: string | number | boolean): string => {
    if (typeof value === "string") {
      return stringLiteral(value);
    }
    if (typeof value === "number" && !Number.isFinite(value)) {
      throw new Error(`${value} has no literal`);
    }
    return Object.is(value, -0) ? "-0" : String(value);
  };

  const name = (text: string): string =>
    NAME.test(text) ? `"${text}"` : read$d(text);

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

  // `eval` read as a value, so a call of it is indirect: a bundle closes over
  // nothing, and a direct call would hand it this one's scope.
  const builtin = (name: string): string =>
    name === "eval"
      ? "(0, eval)"
      : IDENTIFIER.test(name)
        ? name
        : `globalThis[${stringLiteral(name)}]`;

  const member = (name: string, optional: boolean): string =>
    IDENTIFIER.test(name)
      ? `${optional ? "?." : "."}${name}`
      : `${optional ? "?." : ""}[${stringLiteral(name)}]`;

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
      ([prop, value]) =>
        `[${name(prop)}, () => ${expression(value)}, ${isFixed(value)}]`,
    );
    const draw = drawn === null ? "null" : `() => ${children(drawn, false)}`;
    return `element(${name(id)}, [${printed.join(", ")}], ${draw})`;
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
        ([key, value]) =>
          `${IDENTIFIER.test(key) ? key : stringLiteral(key)}: ${expression(value)}`,
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
          ([prop, value]) => `[${name(prop)}, () => ${expression(value)}]`,
        );
        if (node[3] !== null) {
          props.push(`["children", () => ${expression(node[3])}]`);
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
  const carried =
    data.length === 0
      ? "[]"
      : `JSON.parse(${stringLiteral(JSON.stringify(data))})`;
  const code = [
    "(($d) => untrack(() => {",
    ...functions,
    `return ${root};`,
    `}))(${carried})`,
  ].join("\n");
  return code as Bundle<T>;
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
