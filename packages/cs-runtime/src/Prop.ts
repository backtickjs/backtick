import type { Client } from "./Client.ts";
import type { ClientValue } from "./ClientValue.js";

export type Prop<T extends ClientValue> = T | Client<T>;
