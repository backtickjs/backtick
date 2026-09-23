import type { ClientValue } from "@backtickjs/core";
import type { BundleComponentCall } from "@backtickjs/platform-sdk";
import { compile } from "./compile.js";
import type { Scope } from "./compile.js";
import { callComponent } from "./draw.js";
import type { Instance } from "./Instance.js";

/** A call of a component a script holds: see `callComponent`. */
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
  return (scope) =>
    callComponent(
      callee(scope),
      props.map(([name, read]) => [name, () => read(scope)] as const),
    );
}
