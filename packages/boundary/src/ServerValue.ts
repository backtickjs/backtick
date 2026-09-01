import type { Client } from "./Client.js";
import type { ClientHandle, ClientValue } from "./ClientValue.js";
import type { ServerRecord } from "./ServerRecord.js";

export type ServerValue =
  | Client<ClientValue>
  | null
  | number
  | boolean
  | string
  | ServerRecord
  | readonly ServerValue[]
  | ClientHandle;
