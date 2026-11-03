import { cs } from "@backtickjs/core";

// The shell's links, at the Backtick app's scheme.
export const shellURL = cs`(path: string) => "backtick://" + path`;
