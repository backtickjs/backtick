import type {
  Client,
  ClientState,
  ClientValue,
  Spliceable,
  State,
  Widen,
} from "@backtickjs/cs-runtime";
import { getInstance } from "./Instance.js";

/**
 * Declares a cell, and answers with the handle a script reads it through.
 *
 * It runs on the server while a component is expanded — which is why it lives
 * here rather than beside `State` in cs-runtime: the cell records the instance
 * that declared it, and only the bundler knows which one is running.
 */
export function state<T extends ClientValue>(
  initial: Spliceable<T>,
): Client<State<Widen<T>>> {
  const cell: ClientState<Spliceable<T>> = {
    "@backtickjs": "ClientState",
    initial: initial,
    declaredIn: getInstance(),
  };
  return cell as unknown as Client<State<Widen<T>>>;
}
