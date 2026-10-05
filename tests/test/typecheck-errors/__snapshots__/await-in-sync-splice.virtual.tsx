import { cs } from "@backtickjs/core";

async function fetchGreeting() {
  return "hello";
}

// A spliced host expression evaluates in the template's own scope, so `await`
// in one is the host's `await`: refused where the function around the
// template isn't async, as anywhere else in host code.
export function greeting() {
  // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
  return cs.lift((() => (cs.splice(await fetchGreeting())) + "!")());
}
