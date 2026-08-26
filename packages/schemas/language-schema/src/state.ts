import { createBuiltin } from "./Builtin.js";
import type { Client } from "./Client.js";
import type { State } from "./schema.generated.js";

export const state: Client<<T>(initial: T) => State<T>> =
  createBuiltin("state");
