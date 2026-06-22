/**
 * A compiled backtick client script. Authored as a `` cs`...` `` tagged
 * template and rewritten by `@backtick/core/compiler`; the phantom `T` carries
 * the script's type through the rewrite.
 */
export type ClientScript<T = unknown> = { readonly __script: T };

interface Cs {
  (strings: TemplateStringsArray, ...values: unknown[]): ClientScript;
  /** Lifts a client value into the type system. Used by generated virtual code. */
  lift<T>(value: T): T;
  /** Lowers a host value spliced into a script. Used by generated virtual code. */
  lower<T>(value: T): T;
}

/**
 * The `cs` client-script tag. At runtime client scripts are compiled away, so
 * calling the raw tag is a configuration error; `lift`/`lower` exist for the
 * generated virtual code to type-check against and pass their value through.
 */
const cs: Cs = Object.assign(
  (_strings: TemplateStringsArray, ..._values: unknown[]): ClientScript => {
    throw new Error(
      "`cs` was not compiled. Is @backtick/core/compiler set up for this project?",
    );
  },
  {
    lift: <T>(value: T): T => value,
    lower: <T>(value: T): T => value,
  },
);

export { cs };
