import type {
  Client,
  ClientState,
  SpliceableValue,
  Spliced,
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
export function state<const T extends SpliceableValue>(
  initial: T,
): Client<State<Widen<Spliced<T>>>> {
  const cell: ClientState<T> = {
    "@backtickjs": "ClientState",
    initial,
    declaredIn: getInstance(),
  };
  return cell as unknown as Client<State<Widen<Spliced<T>>>>;
}
