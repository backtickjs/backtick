// Every name this schema declares that a script splices, as the value it is
// imported as. Written from the schema rather than beside it, so a name added
// there is a name an app can reach without anything being told about it twice.
export * from "./builtins.generated.js";
export type * from "./declarations.generated.js";
