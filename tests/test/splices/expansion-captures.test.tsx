import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// A host function is declared once, as `$expn<n>`, and what its body reaches
// from outside itself arrives as a capture: an argument of an enclosing host
// function, or a binding an enclosing script hands the hole it fills.

// A render callback inside a host function, reading the function's argument:
// two expansions, the inner capturing the outer's argument.
const rows = (label: Client<string>) => (
  <ul>
    <For each={cs`[1, 2]`}>
      {(n: Client<number>) =>
        cs`<li>
          {$label} {$n}
        </li>`
      }
    </For>
  </ul>
);

it("expansionCapturesArgument", async (t) => {
  await snapshotCase(t, "expansionCapturesArgument", cs`$rows("row")`);
});

// A host function written inside a script, whose script reads the enclosing
// script's binding: the declaration captures it.
it("expansionCapturesBinding", async (t) => {
  await snapshotCase(
    t,
    "expansionCapturesBinding",
    cs`{
      const base = 10;
      const add = ${(n: Client<number>) => cs`base + $n`};
      return add(1) + add(2);
    }`,
  );
});
