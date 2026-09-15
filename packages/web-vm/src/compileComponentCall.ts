import type { ClientValue } from "@backtickjs/core";
import type { BundleComponentCall } from "@backtickjs/language";
import { untrack } from "solid-js";
import { compile } from "./compile.js";
import type { Scope } from "./compile.js";
import type { Instance } from "./Instance.js";

/**
 * A call of a component a script holds: called once, untracked, with its
 * props as a record whose members are read again on every access — what keeps
 * a prop live for a function the bundler never saw.
 */
export function compileComponentCall(
  instance: Instance,
  node: BundleComponentCall,
): (scope: Scope | null) => ClientValue {
  const callee = compile(instance, node[1]);
  const props = Object.entries(node[2]).map(
    ([name, expression]) => [name, compile(instance, expression)] as const,
  );
  if (node[3] !== null) {
    props.push(["children", compile(instance, node[3])]);
  }
  return (scope) => {
    const record: { [key: string]: ClientValue } = {};
    for (const [name, read] of props) {
      Object.defineProperty(record, name, {
        get: () => read(scope),
        enumerable: true,
      });
    }
    const called = callee(scope);
    if (typeof called !== "function") {
      throw new Error("a component call names a function, and this is not one");
    }
    return untrack(() =>
      (called as (props: ClientValue) => ClientValue)(record),
    );
  };
}
