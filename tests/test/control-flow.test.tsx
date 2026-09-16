import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "./snapshotCase.ts";

// Statements and control flow in client scripts: loops, jumps, try/catch, and
// actions.

// `for (;;)` has no condition, so `break` is the only way out.
const forEndless = cs`{
  let i = 0;
  for (;;) {
    if (i === 4) {
      break;
    }
    i = i + 1;
  }
  return i;
}`;

// Every part of the header is optional: this one declares nothing and updates
// nothing, leaving both to the block around it and the body.
const forHeaderParts = cs`{
  let i = 0;
  let seen = "";
  for (; i < 3; ) {
    seen = seen + i;
    i = i + 1;
  }
  return seen;
}`;

// `i++` is not an operator in a client script, so the update is an assignment.
const forLoop = cs`{
  let total = 0;
  for (let i = 0; i < 5; i = i + 1) {
    total = total + i;
  }
  return total;
}`;

// Nested headers reusing a name, and a body that shadows the header's own: the
// update still means the header's binding, because names resolve to their
// binding before anything is lowered.
const forNestedShadowing = cs`{
  let out = "";
  for (let i = 0; i < 2; i = i + 1) {
    const i = "-";
    for (let j = 0; j < 2; j = j + 1) {
      out = out + i + j;
    }
  }
  return out;
}`;

// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3 the
// loop stopped at.
const forPerTurnBinding = cs`{
  let last: () => number = () => 0;
  for (let i = 0; i < 3; i = i + 1) {
    last = () => i;
  }
  return last();
}`;

// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
const loopJumps = cs`{
  let out = "";
  for (let i = 0; i < 5; i = i + 1) {
    if (i === 1) {
      continue;
    }
    while (true) {
      out = out + i;
      break;
    }
    if (i === 3) {
      break;
    }
  }
  return out;
}`;

const whileLoop = cs`{
  let i = 0;
  let total = 0;
  while (i < 5) {
    total = total + i;
    if (i === 3) {
      return total;
    }
    i = i + 1;
  }
  return total;
}`;

const tryCatch = cs`{
  const message = "boom";
  try {
    throw message;
  } catch (error) {
    if (error === message) {
      return "caught boom";
    }
    return "caught something else";
  }
}`;

// A `catch` without a binding: the try node's `param` is null and the
// handler runs with no new binding in scope.
const bindinglessCatch = cs`{
  try {
    throw "boom";
  } catch {
    return "caught";
  }
}`;

// A bare `return` exits an action early; the completion is null either way.
const earlyReturn = cs`{
  let n = 0;
  if (n === 0) {
    return;
  }
  n = 1;
}`;

// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects: Client<void> = cs`{
  const x = 1;
}`;

const composed: Client<void> = cs`{
  $effects;
}`;

const actionComposition = cs`{
  $composed;
}`;

// A script that returns a value may still run an action: what a statement
// discards has to be nothing, and an action is what answers with nothing.
//
// The check is `cs.statement`'s and not the compiler's — the position is what
// decides, not the kind of script it sits in. A value in statement position is
// a mistake wherever it stands (see `discarded-value`), and an action is the
// point of the position rather than something a value script has to go without.
const valueScriptEffects: Client<void> = cs`{
  const x = 1;
}`;

const ping: Client<() => void> = cs`() => {
  let n = 0;
  n = 1;
}`;

const actionInValueScript = cs`(b: boolean) => {
  let n = 0;
  $valueScriptEffects;
  if (b) {
    $ping();
    n = 1;
  }
  return n;
}`;

// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep: Client<void> = cs`{
  let n = 0;
  n = 1;
}`;

const onTap: Client<(id: number) => void> = cs`(id: number) => {
  $beep;
}`;

const handlerObject = cs`{
  const handlers = {
    tap: $onTap,
    hold: $onTap,
  };
  return handlers;
}`;

describe("what each case compiles and bundles to", () => {
  it("forEndless", async (t) => {
    await snapshotCase(t, "forEndless", forEndless);
  });

  it("forHeaderParts", async (t) => {
    await snapshotCase(t, "forHeaderParts", forHeaderParts);
  });

  it("forLoop", async (t) => {
    await snapshotCase(t, "forLoop", forLoop);
  });

  it("forNestedShadowing", async (t) => {
    await snapshotCase(t, "forNestedShadowing", forNestedShadowing);
  });

  it("forPerTurnBinding", async (t) => {
    await snapshotCase(t, "forPerTurnBinding", forPerTurnBinding);
  });

  it("loopJumps", async (t) => {
    await snapshotCase(t, "loopJumps", loopJumps);
  });

  it("whileLoop", async (t) => {
    await snapshotCase(t, "whileLoop", whileLoop);
  });

  it("tryCatch", async (t) => {
    await snapshotCase(t, "tryCatch", tryCatch);
  });

  it("bindinglessCatch", async (t) => {
    await snapshotCase(t, "bindinglessCatch", bindinglessCatch);
  });

  it("earlyReturn", async (t) => {
    await snapshotCase(t, "earlyReturn", earlyReturn);
  });

  it("actionComposition", async (t) => {
    await snapshotCase(t, "actionComposition", actionComposition);
  });

  it("actionInValueScript", async (t) => {
    await snapshotCase(t, "actionInValueScript", actionInValueScript);
  });

  it("handlerObject", async (t) => {
    await snapshotCase(t, "handlerObject", handlerObject);
  });
});
