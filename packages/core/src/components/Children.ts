import type { Client, ClientValue } from "@backtickjs/cs-runtime";

// One child or several, written the same way either way in JSX.
export type Children<T extends ClientValue> =
  | T
  | Client<T | T[]>
  | Children<T>[];
