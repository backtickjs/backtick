import type { Client } from "./Client.js";
import type { ClientHandle, ClientValue } from "./ClientValue.js";

export type ServerValue =
  | Client<ClientValue>
  | null
  | number
  | boolean
  | string
  | { readonly [key: string]: ServerValue }
  | readonly ServerValue[]
  | ClientHandle;
