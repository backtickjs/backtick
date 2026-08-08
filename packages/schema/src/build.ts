import type {
  SchemaChildren,
  SchemaDocument,
  SchemaElement,
} from "./Document.js";
import type {
  SchemaInterface,
  SchemaObject,
  SchemaType,
  SchemaValue,
  SchemaVoid,
} from "./Vocabulary.js";

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

/**
 * A declaration, or one behind a thunk.
 *
 * Holding rather than spelling is what makes an unresolvable name a binding
 * that does not exist, and its one cost is that a cycle cannot be written: `a`
 * naming `b` naming `a` has no order to be declared in. A thunk restores that,
 * as Drizzle's `references(() => …)` does, and is written only where a cycle
 * needs one.
 */
type HeldDeclaration<T extends SchemaType = SchemaType> =
  | Declared<string, T>
  | (() => Declared<string, T>);

/** A value's type, or a declaration of one standing in its place. */
type Held = SchemaValue | HeldDeclaration<SchemaValue>;

/** What a held thing is once written down: a declaration is a reference to it. */
type Written<T> = T extends () => Declared<infer N, SchemaValue>
  ? { readonly kind: "reference"; readonly name: N }
  : T extends Declared<infer N, SchemaValue>
    ? { readonly kind: "reference"; readonly name: N }
    : T;

type WrittenAll<T extends readonly Held[] | undefined> =
  T extends readonly Held[] ? { [K in keyof T]: Written<T[K]> } : readonly [];

/**
 * A property under construction: a type, and the two facts the position carries.
 *
 * Chained rather than wrapped — `schema.string().optional()` — because required
 * by default means the exception is written on nearly every line, and a wrapper
 * puts it at the front where the type should be. The methods are
 * non-enumerable, so a bare type is still exactly the document node it is.
 *
 * The one thing here that is *not* the document's own shape, and deliberately:
 * its fields are named apart from `optional` and `description` so that a
 * modifier and the field it sets cannot be one name on one object.
 * `writtenProperty` is where it becomes what the artifact keeps.
 */
type PropertyOf<T, O extends boolean, D extends string | null> = {
  readonly kind: "property";
  readonly type: T;
  readonly optionality: O;
  readonly documentation: D;
};

export interface CanOptional<T, D extends string | null> {
  optional(): PropertyOf<T, true, D> & CanDescribe<T, true>;
}

export interface CanDescribe<T, O extends boolean> {
  describe<const S extends string>(
    text: S,
  ): PropertyOf<T, O, S> & CanOptional<T, S>;
}

/** What every combinator's answer carries beyond the type itself. */
export type Chain<T> = CanOptional<T, null> & CanDescribe<T, false>;

type HeldProperty = Held | PropertyOf<Held, boolean, string | null>;

type WrittenProperty<P> =
  P extends PropertyOf<infer T, infer O, infer D>
    ? {
        readonly type: Written<T>;
        readonly optional: O;
        readonly description: D;
      }
    : {
        readonly type: Written<P>;
        readonly optional: false;
        readonly description: null;
      };

// Attached rather than spread, so nothing a chain adds is a key the document
// carries: `Object.keys`, `JSON.stringify` and a deep comparison all skip them.
function hidden<V extends object>(
  value: V,
  methods: { readonly [name: string]: unknown },
): V {
  for (const [name, method] of Object.entries(methods)) {
    Object.defineProperty(value, name, { value: method, enumerable: false });
  }
  return value;
}

function property(
  type: unknown,
  optionality: boolean,
  documentation: string | null,
): object {
  return hidden(
    { kind: "property", type, optionality, documentation },
    {
      optional: () => property(type, true, documentation),
      describe: (text: string) => property(type, optionality, text),
    },
  );
}

function chained<V extends object>(value: V): V {
  return hidden(value, {
    optional: () => property(value, true, null),
    describe: (text: string) => property(value, false, text),
  });
}

/** A parameter as it is written: named and typed, and nullable where it says
 * so — which a parameter list almost never does. */
type HeldParameter = {
  readonly name: string;
  readonly type: Held;
  readonly nullable?: boolean;
};

type WrittenParameter<P extends HeldParameter> = {
  readonly name: P["name"];
  readonly type: Written<P["type"]>;
  readonly nullable: P extends { readonly nullable: infer B extends boolean }
    ? B
    : false;
};

type WrittenParameters<T extends readonly HeldParameter[] | undefined> =
  T extends readonly HeldParameter[]
    ? {
        [K in keyof T]: T[K] extends HeldParameter
          ? WrittenParameter<T[K]>
          : never;
      }
    : readonly [];

function writtenParameter<const P extends HeldParameter>(
  held: P,
): WrittenParameter<P> {
  const answer = {
    name: held.name,
    type: written<Held>(held.type),
    nullable: held.nullable ?? false,
  };
  return answer as unknown as WrittenParameter<P>;
}

function writtenParameters<
  const T extends readonly HeldParameter[] | undefined,
>(held: T): WrittenParameters<T> {
  return (held ?? []).map((one) =>
    writtenParameter(one),
  ) as unknown as WrittenParameters<T>;
}

type WrittenProperties<
  P extends { readonly [name: string]: HeldProperty } | undefined,
> = P extends { readonly [name: string]: HeldProperty }
  ? { readonly [K in keyof P]: WrittenProperty<P[K]> }
  : Readonly<Record<never, never>>;

/** The names declarations carry, in the order they were held in. */
type Names<D extends readonly HeldDeclaration[] | undefined> =
  D extends readonly HeldDeclaration[]
    ? {
        [K in keyof D]: D[K] extends () => Declared<infer N, SchemaType>
          ? N
          : D[K] extends Declared<infer N, SchemaType>
            ? N
            : never;
      }
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
    ? Declared<N, T> & Chain<Declared<N, T>>
    : never
  : T & Chain<T>;

function named<const O extends { readonly name?: string }, const T>(
  options: O | undefined,
  type: T,
): Named<O, T> {
  const answer =
    options?.name === undefined
      ? type
      : { kind: "declared" as const, name: options.name, type };
  return chained(answer as object) as unknown as Named<O, T>;
}

// A reference whose name is not known yet, and the thunks owed one. A cycle is
// the only reason to write one, and by definition the declaration it names does
// not exist while this is being built — so the name is filled in by `document`,
// which is the first moment every declaration does exist.
const owed: {
  readonly node: { name: string };
  readonly reach: () => Declared<string, SchemaType>;
}[] = [];

function settle(): void {
  for (const { node, reach } of owed) {
    node.name = reach().name;
  }
  owed.length = 0;
}

function written<const T extends Held>(held: T): Written<T> {
  if (typeof held === "function") {
    const node = { kind: "reference" as const, name: "" };
    owed.push({ node, reach: held });
    return node as unknown as Written<T>;
  }
  const answer: SchemaValue =
    held.kind === "declared" ? { kind: "reference", name: held.name } : held;
  return answer as unknown as Written<T>;
}

function writtenAll<const T extends readonly Held[] | undefined>(
  held: T,
): WrittenAll<T> {
  return (held ?? []).map((one) => written(one)) as unknown as WrittenAll<T>;
}

function writtenProperty<const P extends HeldProperty>(
  held: P,
): WrittenProperty<P> {
  const answer =
    typeof held === "object" && "optionality" in held
      ? {
          type: written<Held>(held.type),
          optional: held.optionality,
          description: held.documentation,
        }
      : {
          type: written<Held>(held as Held),
          optional: false,
          description: null,
        };
  return answer as unknown as WrittenProperty<P>;
}

function writtenProperties<
  const P extends { readonly [name: string]: HeldProperty } | undefined,
>(properties: P): WrittenProperties<P> {
  const held: { readonly [name: string]: HeldProperty } = properties ?? {};
  return Object.fromEntries(
    Object.entries(held).map(([name, one]) => [name, writtenProperty(one)]),
  ) as unknown as WrittenProperties<P>;
}

function names<const D extends readonly HeldDeclaration[] | undefined>(
  declared: D,
): Names<D> {
  const answer: string[] = [];
  for (const one of declared ?? []) {
    if (typeof one === "function") {
      const node = { kind: "reference" as const, name: "" };
      owed.push({ node, reach: one });
      answer.push("");
      // The array holds strings, so the name is settled through this slot.
      const at = answer.length - 1;
      owed[owed.length - 1] = {
        node: {
          get name() {
            return answer[at];
          },
          set name(value: string) {
            answer[at] = value;
          },
        },
        reach: one,
      };
    } else {
      answer.push(one.name);
    }
  }
  return answer as unknown as Names<D>;
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

// Absent is answering with nothing, which is what a handler is: the common case
// is the one that needs no writing.
type Returns<O extends { readonly returns?: Held }> = O extends {
  readonly returns: infer R extends Held;
}
  ? Written<R>
  : { readonly kind: "void" };

type Function_<
  O extends {
    readonly params?: readonly HeldParameter[];
    readonly returns?: Held;
  },
> = {
  readonly kind: "function";
  readonly params: WrittenParameters<O["params"]>;
  readonly returns: Returns<O>;
};

function returned<const O extends { readonly returns?: Held }>(
  options: O | undefined,
): Returns<O> {
  const held = options?.returns;
  const answer: SchemaValue | SchemaVoid =
    held === undefined ? { kind: "void" } : written<Held>(held);
  return answer as unknown as Returns<O>;
}

function functionOf<
  const O extends {
    readonly name?: string;
    readonly params?: readonly HeldParameter[];
    readonly returns?: Held;
  } = Record<never, never>,
>(options?: O): Named<O, Function_<O>> {
  return named<O, Function_<O>>(options, {
    kind: "function",
    params: writtenParameters<O["params"]>(options?.params),
    returns: returned<O>(options),
  });
}

type Object_<
  O extends {
    readonly properties: { readonly [name: string]: HeldProperty };
    readonly includes?: readonly HeldDeclaration<SchemaObject>[];
  },
> = {
  readonly kind: "object";
  readonly includes: Names<O["includes"]>;
  readonly properties: WrittenProperties<O["properties"]>;
};

function object<
  const O extends {
    readonly name?: string;
    readonly properties: { readonly [name: string]: HeldProperty };
    readonly includes?: readonly HeldDeclaration<SchemaObject>[];
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
    readonly properties: { readonly [name: string]: HeldProperty };
    readonly extends?: readonly HeldDeclaration<SchemaInterface>[];
  },
> = {
  readonly kind: "interface";
  readonly extends: Names<O["extends"]>;
  readonly properties: WrittenProperties<O["properties"]>;
};

function group<
  const O extends {
    readonly name?: string;
    readonly properties: { readonly [name: string]: HeldProperty };
    readonly extends?: readonly HeldDeclaration<SchemaInterface>[];
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
    readonly extends?: readonly HeldDeclaration<SchemaInterface>[];
    readonly properties?: { readonly [name: string]: HeldProperty };
    readonly description?: string;
  },
>(
  options: O,
): {
  readonly extends: Names<O["extends"]>;
  readonly properties: WrittenProperties<O["properties"]>;
  readonly children: O["children"];
  readonly description: O extends {
    readonly description: infer D extends string;
  }
    ? D
    : null;
} {
  return {
    extends: names<O["extends"]>(options.extends),
    properties: writtenProperties<O["properties"]>(options.properties),
    children: options.children,
    description: options.description ?? null,
  } as never;
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
  settle();
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
  function: functionOf,
  object,
  interface: group,
  element,
});

// What a built schema is, for whoever takes one: the document itself, narrowed
// to what was written.
export type BuiltSchema = SchemaDocument;
