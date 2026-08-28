import type { Schema } from "./Schema.js";

/**
 * One schema holding everything it and the schemas beneath it declare.
 *
 * A generator writes what a client can do, and a client can do what its
 * schema says plus what it inherited — so every generator would otherwise
 * walk the bases itself, and each would have to agree about what a name
 * colliding means.
 *
 * Bases first and in the order they were written, so what a target added
 * reads last. Redefining an inherited name throws rather than winning: an
 * element or a function is answered by the client that declared it, and two
 * answers is a question about which one the wire meant.
 *
 * One namespace across the three records, for the same reason. A name is the
 * unit two ends agree over — a capability list is written per name — so a name
 * meaning a type here and a builtin there is a list that cannot be written
 * without saying which record each entry came from. `Math` was both until the
 * builtins went flat; this is what keeps it from happening again.
 */
export function flatten(schema: Schema): Schema {
  const types: Record<string, Schema["types"][string]> = {};
  const elements: Record<string, Schema["elements"][string]> = {};
  const builtins: Record<string, Schema["builtins"][string]> = {};
  const publishes = new Set<string>();

  // A schema reached twice is inherited twice, which is not a collision — a
  // diamond is two paths to one declaration. Identity, since a name is only
  // ever declared once and the same schema is the same object.
  const seen = new Set<Schema>();

  // Every name taken, and what took it. One map for the three records, which is
  // what makes them one namespace.
  const declared = new Map<string, string>();

  function take(one: Schema): void {
    if (seen.has(one)) {
      return;
    }
    seen.add(one);
    for (const base of one.extends) {
      take(base);
    }
    one.publishes.forEach((name) => publishes.add(name));
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
      const already = declared.get(name);
      // A record holds a name once, so the same kind twice is two schemas; a
      // different kind is one name meaning two things, wherever it came from.
      if (already === what) {
        throw new Error(
          `a schema it extends already declares the ${what} \`${name}\``,
        );
      }
      if (already !== undefined) {
        throw new Error(
          `\`${name}\` is declared as a ${already} and as a ${what}`,
        );
      }
      declared.set(name, what);
      into[name] = node;
    }
  }

  take(schema);
  return {
    package: schema.package,
    namespace: schema.namespace,
    extends: [],
    publishes: [...publishes],
    types,
    elements,
    builtins,
  };
}
