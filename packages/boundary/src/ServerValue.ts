import type { Client } from "./Client.js";
import type { BacktickElement } from "./BacktickElement.js";
import type { ClientValue } from "./ClientValue.js";
import type { ServerRecord } from "./ServerRecord.js";

export type ServerValue =
  | Client<ClientValue>
  | null
  | number
  | boolean
  | string
  | ServerRecord
  | readonly ServerValue[]
  | BacktickElement;
