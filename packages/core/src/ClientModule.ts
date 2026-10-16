import type { Client } from "./Client.js";

/**
 * A module's exports as client imports, each typed by its declaration: what
 * the editor checks the names of a client import against.
 */
export type ClientModule<M> = { readonly [Name in keyof M]: Client<M[Name]> };
