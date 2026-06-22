interface Client<T> {
  type: () => T;
}

type Spliceable =
  | null
  | number
  | boolean
  | string
  | Client<unknown>
  | Spliceable[]
  | { [key: string]: Spliceable };

// Recursively lowers a Spliceable type:
//   Client<U>        -> U
//   T[]              -> Lower<T>[]
//   { k: T }         -> { k: Lower<T> }
//   primitives       -> unchanged
type Lower<T> =
  T extends Client<infer U>
    ? U
    : T extends (infer Item)[]
      ? Lower<Item>[]
      : T extends object
        ? { [Tk in keyof T]: Lower<T[Tk]> }
        : T;

function lift<const T extends Spliceable>(_value: T): Client<Lower<T>> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function lower<const T extends Spliceable>(_value: T): Lower<T> {
  throw new Error(
    "Don't call `cs.lower` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

const cs = Object.assign(
  (_strings: TemplateStringsArray, ..._values: unknown[]): Client<unknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtick/core/compiler set up for this project?",
    );
  },
  {
    lift,
    lower,
  },
);

export { cs };
