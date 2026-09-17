import type {
  ClientScriptBody,
  SourceLocation,
} from "@backtickjs/client-script";

// The value grammar: what a splice becomes. A script's own syntax is the other
// half of this AST and lives in `client-script`, since that is where the compiler's
// output has to be able to name it — the compiler emits those nodes directly.

// A node built from a value spliced into a client script. Splice values are
// resolved at runtime and have no source text, so a value node never has a
// location.
export type Ast =
  | AstScript
  | AstArray
  | AstBoolean
  | AstBuiltin
  | AstComponentCall
  | AstElement
  | AstExpansion
  | AstHole
  | AstNull
  | AstNumber
  | AstObject
  | AstString
  | AstUndefined;

// `Metadata`'s splice, lowered.
export interface AstSplice {
  readonly value: Ast;
  readonly params: readonly string[];
}

export interface AstScript {
  readonly kind: "AstScript";
  readonly loc: SourceLocation;
  readonly fileHash: string;
  readonly splices: Readonly<Record<string, AstSplice>>;
  readonly captures: readonly string[];
  readonly expression: ClientScriptBody;
}

export interface AstArray {
  readonly kind: "AstArray";
  readonly elements: readonly Ast[];
}

export interface AstBoolean {
  readonly kind: "AstBoolean";
  readonly value: boolean;
}

// A name the client answers for, spliced: `state` imported and handed to a
// script that writes `$state(0)`. The same node a script writing the name bare
// reaches, so it goes where it stands the way an element does — see
// `ScriptEntry.builtins` for the hole it fills.
export interface AstBuiltin {
  readonly kind: "AstBuiltin";
  readonly name: string;
}

// The script a host component drew, where its tag stood. Called as a component
// is, untracked, so what the script reads while setting up is read once rather
// than running the setup again — the tag is gone, and this is what is left of
// it on the client.
export interface AstComponentCall {
  readonly kind: "AstComponentCall";
  readonly body: AstScript;
}

// A drawing named by its id, with each prop lowered. `<For />` is one of these
// too — the id `for`, an `each` prop and a child applied per member — so what
// draws no node of its own is still a name a client answers for rather than a
// node kind every reader has to know.
export interface AstElement {
  readonly kind: "AstElement";
  readonly id: string;
  readonly props: Readonly<Record<string, Ast>>;
}

// A spliced class's bundle-time expansion: the spliceable the constructor
// returned when applied to one opaque hole per declared parameter (see
// `createHole`), read as an arrow over `params`. It is what the class's
// splice slot holds (see `lowerSpliceable`), so a construction — compiled as
// a plain call of the slot — binds its arguments, client expressions with no
// bundle-time value, to the holes only when the client evaluates the call.
export interface AstExpansion {
  readonly kind: "AstExpansion";
  readonly params: readonly string[];
  readonly body: Ast;
}

// Where a hole surfaced in an expansion's result: a reference to the
// enclosing expansion's parameter of that name.
export interface AstHole {
  readonly kind: "AstHole";
  readonly name: string;
}

export interface AstNull {
  readonly kind: "AstNull";
}

// Written as the bundle's `undef` node, because JSON has no form for it.
export interface AstUndefined {
  readonly kind: "AstUndefined";
}

export interface AstNumber {
  readonly kind: "AstNumber";
  readonly value: number;
}

export interface AstObject {
  readonly kind: "AstObject";
  readonly entries: Readonly<Record<string, Ast>>;
}

export interface AstString {
  readonly kind: "AstString";
  readonly value: string;
}
