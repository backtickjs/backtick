import type {
  SchemaChildren,
  SchemaDocument,
  SchemaElement,
} from "./Document.js";
import type { SchemaType } from "./Vocabulary.js";

// How a target writes its schema, and the only way one is written by hand.
//
// Every combinator answers with the document's own shape, so what a schema
// builds is what a generator reads — there is no second form to keep in step.
// What the builder adds is the vocabulary as an API, so a kind that does not
// exist is a name that does not exist; defaults, so nothing optional in the
// source is optional in the artifact; and declarations, so one type reaches
// another by holding it rather than by spelling it.
//
// One shape for all of them: a single object, where `name` is what makes a type
// a declaration. So naming one is writing its name, and not wrapping it in
// something else.
//
// One callable with the rest hanging off it, as `cs` is, and for a reason
// beyond the likeness: `enum`, `interface` and `object` are the exact words, and
// only a property may be spelled with them.
//
// What a combinator answers with is decided by its arguments, and TypeScript
// cannot check a value against a type it computes that way. So each of those
// answers is worked out once, by a helper below whose signature is the claim
// being made — leaving the combinators to say what they mean and assert nothing.

/**
 * A name bound to a type.
 *
 * Not a type itself, deliberately. Writing a declaration where a type goes is a
 * reference to it — which is what a name means in any type language, and what
 * keeps the alternative from being possible: a declaration that *was* a type
 * could be pasted in place of one, and would inline the whole definition
 * wherever it was meant to be named.
 */
export interface Declared<
  N extends string = string,
  T extends SchemaType = SchemaType,
> {
  readonly kind: "declared";
  readonly name: N;
  readonly type: T;
}

/** A type, or a declaration standing for one. */
type Held = SchemaType | Declared;

/** What a held thing is once written down: a declaration is a reference to it. */
type Written<T> =
  T extends Declared<infer N, SchemaType>
    ? { readonly kind: "reference"; readonly name: N }
    : T;

type WrittenAll<T extends readonly Held[] | undefined> =
  T extends readonly Held[] ? { [K in keyof T]: Written<T[K]> } : readonly [];

type WrittenProperties<
  P extends { readonly [name: string]: Held } | undefined,
> = P extends { readonly [name: string]: Held }
  ? { readonly [K in keyof P]: Written<P[K]> }
  : Readonly<Record<never, never>>;

/** The names declarations carry, in the order they were held in. */
type Names<D extends readonly Declared[] | undefined> =
  D extends readonly Declared[]
    ? { [K in keyof D]: D[K] extends Declared<infer N, SchemaType> ? N : never }
    : readonly [];

/**
 * A declaration when the options named one, the type itself when they did not.
 *
 * Read off the options rather than a type parameter of its own: with a
 * parameter, omitting the options let the name infer from its constraint, and
 * an unnamed `string()` typed as a declaration called `string`.
 */
type Named<O, T> = O extends { readonly name: infer N extends string }
  ? T extends SchemaType
    ? Declared<N, T>
    : never
  : T;

function named<const O extends { readonly name?: string }, const T>(
  options: O | undefined,
  type: T,
): Named<O, T> {
  const answer =
    options?.name === undefined
      ? type
      : { kind: "declared" as const, name: options.name, type };
  return answer as unknown as Named<O, T>;
}

function written<const T extends Held>(held: T): Written<T> {
  const answer: SchemaType =
    held.kind === "declared" ? { kind: "reference", name: held.name } : held;
  return answer as unknown as Written<T>;
}

function writtenAll<const T extends readonly Held[] | undefined>(
  held: T,
): WrittenAll<T> {
  return (held ?? []).map((one) => written(one)) as unknown as WrittenAll<T>;
}

function writtenProperties<
  const P extends { readonly [name: string]: Held } | undefined,
>(properties: P): WrittenProperties<P> {
  const held: { readonly [name: string]: Held } = properties ?? {};
  return Object.fromEntries(
    Object.entries(held).map(([name, one]) => [name, written(one)]),
  ) as unknown as WrittenProperties<P>;
}

function names<const D extends readonly Declared[] | undefined>(
  declared: D,
): Names<D> {
  return (declared ?? []).map((one) => one.name) as unknown as Names<D>;
}

function string<
  const O extends { readonly name?: string } = Record<never, never>,
>(options?: O): Named<O, { readonly kind: "string" }> {
  return named(options, { kind: "string" });
}

function number<
  const O extends { readonly name?: string } = Record<never, never>,
>(options?: O): Named<O, { readonly kind: "number" }> {
  return named(options, { kind: "number" });
}

function boolean<
  const O extends { readonly name?: string } = Record<never, never>,
>(options?: O): Named<O, { readonly kind: "boolean" }> {
  return named(options, { kind: "boolean" });
}

/** A list of spellings, or the object a codebase already keeps them in. */
type EnumSource = readonly string[] | { readonly [member: string]: string };

type EnumValues<S> = S extends readonly string[]
  ? S
  : S extends { readonly [member: string]: infer V extends string }
    ? readonly V[]
    : never;

function spellings<const S extends EnumSource>(source: S): EnumValues<S> {
  const answer = Array.isArray(source)
    ? (source as readonly string[])
    : Object.values(source as { [member: string]: string });
  return answer as unknown as EnumValues<S>;
}

// `values` may be the enum the codebase has rather than a copy of it, so adding
// a spelling is one edit and not two that can disagree.
//
// Its members have to be literal types — `as const`, or a real `enum` where one
// is allowed. A plain object widens them to `string` at its own declaration,
// which is before this sees it and past what a `const` type parameter can
// recover. The document comes out right either way; what is lost is every type
// generated from it.
type Enumeration<O extends { readonly values: EnumSource }> = {
  readonly kind: "enum";
  readonly values: EnumValues<O["values"]>;
};

function enumeration<
  const O extends { readonly name?: string; readonly values: EnumSource },
>(options: O): Named<O, Enumeration<O>> {
  return named<O, Enumeration<O>>(options, {
    kind: "enum",
    values: spellings<O["values"]>(options.values),
  });
}

type Union<O extends { readonly of: readonly Held[] }> = {
  readonly kind: "union";
  readonly of: WrittenAll<O["of"]>;
};

function union<
  const O extends { readonly name?: string; readonly of: readonly Held[] },
>(options: O): Named<O, Union<O>> {
  return named<O, Union<O>>(options, {
    kind: "union",
    of: writtenAll<O["of"]>(options.of),
  });
}

type List<O extends { readonly of: Held }> = {
  readonly kind: "list";
  readonly of: Written<O["of"]>;
};

function list<const O extends { readonly name?: string; readonly of: Held }>(
  options: O,
): Named<O, List<O>> {
  return named<O, List<O>>(options, {
    kind: "list",
    of: written<O["of"]>(options.of),
  });
}

type Handler<O extends { readonly params?: readonly Held[] }> = {
  readonly kind: "handler";
  readonly params: WrittenAll<O["params"]>;
};

function handler<
  const O extends {
    readonly name?: string;
    readonly params?: readonly Held[];
  } = Record<never, never>,
>(options?: O): Named<O, Handler<O>> {
  return named<O, Handler<O>>(options, {
    kind: "handler",
    params: writtenAll<O["params"]>(options?.params),
  });
}

type Object_<
  O extends {
    readonly properties: { readonly [name: string]: Held };
    readonly includes?: readonly Declared[];
  },
> = {
  readonly kind: "object";
  readonly includes: Names<O["includes"]>;
  readonly properties: WrittenProperties<O["properties"]>;
};

function object<
  const O extends {
    readonly name?: string;
    readonly properties: { readonly [name: string]: Held };
    readonly includes?: readonly Declared[];
  },
>(options: O): Named<O, Object_<O>> {
  return named<O, Object_<O>>(options, {
    kind: "object",
    includes: names<O["includes"]>(options.includes),
    properties: writtenProperties<O["properties"]>(options.properties),
  });
}

type Interface<
  O extends {
    readonly properties: { readonly [name: string]: Held };
    readonly extends?: readonly Declared[];
  },
> = {
  readonly kind: "interface";
  readonly extends: Names<O["extends"]>;
  readonly properties: WrittenProperties<O["properties"]>;
};

function group<
  const O extends {
    readonly name?: string;
    readonly properties: { readonly [name: string]: Held };
    readonly extends?: readonly Declared[];
  },
>(options: O): Named<O, Interface<O>> {
  return named<O, Interface<O>>(options, {
    kind: "interface",
    extends: names<O["extends"]>(options.extends),
    properties: writtenProperties<O["properties"]>(options.properties),
  });
}

// Never a declaration: nothing references an element, which is what a name
// would be for.
function element<
  const O extends {
    readonly children: SchemaChildren;
    readonly extends?: readonly Declared[];
    readonly properties?: { readonly [name: string]: Held };
  },
>(
  options: O,
): {
  readonly extends: Names<O["extends"]>;
  readonly properties: WrittenProperties<O["properties"]>;
  readonly children: O["children"];
} {
  return {
    extends: names<O["extends"]>(options.extends),
    properties: writtenProperties<O["properties"]>(options.properties),
    children: options.children,
  };
}

type Registered<T extends readonly Declared[] | undefined> =
  T extends readonly Declared[]
    ? { readonly [D in T[number] as D["name"]]: D["type"] }
    : Readonly<Record<never, never>>;

function registered<const T extends readonly Declared[] | undefined>(
  declared: T,
): Registered<T> {
  const answer: { [name: string]: SchemaType } = {};
  for (const one of declared ?? []) {
    answer[one.name] = one.type;
  }
  return answer as unknown as Registered<T>;
}

// The declarations go where the artifact keeps them, which is under the name
// each carries. Elements are keyed by tag rather than declared, because nothing
// references one — a declaration exists to be reached.
function document<
  const T extends readonly Declared[] | undefined,
  const E extends { readonly [tag: string]: SchemaElement },
>(
  name: string,
  definition: { readonly types: T; readonly elements: E },
): {
  readonly name: string;
  readonly types: Registered<T>;
  readonly elements: E;
} {
  return {
    name,
    types: registered<T>(definition.types),
    elements: definition.elements,
  };
}

export const schema = Object.assign(document, {
  string,
  number,
  boolean,
  enum: enumeration,
  union,
  list,
  handler,
  object,
  interface: group,
  element,
});

// What a built schema is, for whoever takes one: the document itself, narrowed
// to what was written.
export type BuiltSchema = SchemaDocument;
