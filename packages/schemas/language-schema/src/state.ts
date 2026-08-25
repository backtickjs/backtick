import { createBuiltin } from "./Builtin.js";
import type { Client } from "./Client.js";
import type { ClientValue, State } from "./schema.generated.js";

export const state: Client<{
  (initial: number): State<number>;
  (initial: string): State<string>;
  (initial: boolean): State<boolean>;
  <T extends ClientValue>(initial: T): State<T>;
}> = createBuiltin("state");
