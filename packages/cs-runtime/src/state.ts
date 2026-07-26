import type { Client } from "./Client.js";
import type { ClientState } from "./ClientState.js";
import type { ClientValue } from "./ClientValue.js";
import type { SpliceableValue, Spliced } from "./Spliceable.js";
import type { Widen } from "./Widen.js";

export interface State<T extends ClientValue> {
  read(): T;
  write(value: T): void;
  update(updater: (value: T) => T): void;
}

export function state<const T extends SpliceableValue>(
  initial: T,
): Client<State<Widen<Spliced<T>>>> {
  const cell: ClientState<T> = { "@backtickjs": "ClientState", initial };
  return cell as unknown as Client<State<Widen<Spliced<T>>>>;
}
