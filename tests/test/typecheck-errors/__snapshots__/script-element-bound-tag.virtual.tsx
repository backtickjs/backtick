import { cs } from "@backtickjs/core";

// A component tag naming a binding the script holds calls it, so what the
// binding holds has to be a function: `Tag` here is a number.
// @ts-expect-error: JSX element type 'Tag' does not have any construct or call signatures.
const held = cs.lift((__cs_Tag: number) => <__cs_Tag />);
