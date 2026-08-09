import { cs } from "@backtickjs/core";

// An element's tag names what the host's JSX namespace answers for, and that is
// a name — not a member of one.
const namespaced = cs`() => <Text.Small />`;
