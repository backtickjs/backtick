import type { Client } from "./Client.js";
import type { ClientScript, Metadata } from "./ClientScript.js";
import type { ClientUnknown } from "./ClientUnknown.js";
import type { SourceLocation } from "./SourceLocation.js";
import type { Lower, Spliceable } from "./Spliceable.js";
import type { Visitor } from "./Visitor.js";

function lift<const T extends ClientUnknown>(_value: T): Client<T> {
  throw new Error(
    "Don't call `cs.lift` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function lower<const T extends Spliceable>(_value: T): Lower<T> {
  throw new Error(
    "Don't call `cs.lower` directly; it's used to generate virtual " +
      "code for the typechecker. Write code using cs`...` instead.",
  );
}

function create(
  loc: SourceLocation,
  fileHash: string,
  metadata: Metadata,
  visit: <U>(visitor: Visitor<U>) => U,
): ClientScript {
  return {
    "@backtickjs": "ClientScript",
    loc,
    fileHash,
    metadata,
    visit,
  };
}

export const cs = Object.assign(
  (
    _strings: TemplateStringsArray,
    ..._values: unknown[]
  ): Client<ClientUnknown> => {
    throw new Error(
      "`cs` was not compiled. Is @backtickjs set up for this project?",
    );
  },
  { lift, lower, create },
);
