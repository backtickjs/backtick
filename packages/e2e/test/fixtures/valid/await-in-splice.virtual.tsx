import { cs } from "@backtickjs/core";

async function fetchGreeting() {
  return "hello";
}

// A spliced host expression evaluates in the template's own scope — the
// compiled output wraps it in no function — so `await` works wherever the
// template itself may await, here at module top level.
export default cs.lift(cs.const((cs.splice(await fetchGreeting()) satisfies import("@backtickjs/core").ClientUnknown) + "!"));
