import type { Client, ClientValue } from "@backtickjs/core-schema";

export type Prop<T extends ClientValue> = T | Client<T>;
