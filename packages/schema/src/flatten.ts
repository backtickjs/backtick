import type { ClientSchema } from "./ClientSchema.js";

/**
 * One schema holding everything it and the schemas beneath it declare.
 *
 * A generator writes what a client can do, and a client can do what its
 * schema says plus what it inherited — so every generator would otherwise
 * walk the bases itself, and each would have to agree about what a name
 * colliding means.
 *
 * Bases first and in the order they were written, so what a target added
 * reads last. Redefining an inherited name throws rather than winning: a tag
 * or a function is answered by the client that declared it, and two answers
 * is a question about which one the wire meant.
 */
export function flatten(schema: ClientSchema): ClientSchema {
  const types: Record<string, ClientSchema["types"][string]> = {};
  const elements: Record<string, ClientSchema["elements"][string]> = {};
  const builtins: Record<string, ClientSchema["builtins"][string]> = {};

  // A schema reached twice is inherited twice, which is not a collision — a
  // diamond is two paths to one declaration. Identity, since a name is only
  // ever declared once and the same schema is the same object.
  const seen = new Set<ClientSchema>();

  function take(one: ClientSchema): void {
    if (seen.has(one)) {
      return;
    }
    seen.add(one);
    for (const base of one.extends) {
      take(base);
    }
    add(types, one.types, "type");
    add(elements, one.elements, "element");
    add(builtins, one.builtins, "builtin");
  }

  function add<T>(
    into: Record<string, T>,
    from: Readonly<Record<string, T>>,
    what: string,
  ): void {
    for (const [name, node] of Object.entries(from)) {
      if (name in into) {
        throw new Error(
          `a schema it extends already declares the ${what} \`${name}\``,
        );
      }
      into[name] = node;
    }
  }

  take(schema);
  return { extends: [], types, elements, builtins };
}
