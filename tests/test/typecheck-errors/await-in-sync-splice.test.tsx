import { cs } from "@backtickjs/core";

async function fetchGreeting() {
  return "hello";
}

// A spliced host expression evaluates in the template's own scope, so `await`
// in one is the host's `await`: refused where the function around the
// template isn't async, as anywhere else in host code.
export function greeting() {
  // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
  return cs`${await fetchGreeting()} + "!"`;
}

// Nor in a class field's initializer, a static block, or a parameter's
// default, where JavaScript refuses `await` even at a module's top level or
// in an async function.
export class Greeter {
  // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
  static greeting = cs`${await fetchGreeting()} + "!"`;
}

export class Logged {
  static {
    // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
    console.log(cs`${await fetchGreeting()} + "!"`);
  }
}

export async function greet(
  // @ts-expect-error: 'await' expressions are only allowed within async functions and at the top levels of modules.
  greeting = cs`${await fetchGreeting()} + "!"`,
) {
  return greeting;
}
