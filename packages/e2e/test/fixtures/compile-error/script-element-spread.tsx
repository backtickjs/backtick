import { cs } from "@backtickjs/core";

// An element's attributes are named, one by one: the node carries a list of
// names, so there is nowhere for a spread's members to go.
const spread = cs`(rest: { fontSize: number }) => <span {...rest} />`;
