import type { Client, ClientValue } from "@backtickjs/language-schema";

export type Prop<T extends ClientValue> = T | Client<T>;
