import { cs } from "@backtickjs/core";

// A tag names what the host's JSX namespace answers for, never a binding the
// script holds: `Tag` here is a parameter, and the element is not named by it.
const held = cs`(Tag: number) => <Tag />`;
