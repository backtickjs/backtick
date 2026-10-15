declare const value: unique symbol;

/**
 * A bundle's code, which runs to a `T`: what the bundler writes for a
 * `Client<T>`, as it reaches the client, from the server.
 */
export type Bundle<T> = string & { readonly [value]: T };
