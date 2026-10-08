import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { bundle } from "../evaluate.ts";

// What the typechecker accepts and the bundler refuses: each splice below
// type-checks, and fails only when the server bundles it.

// A gap in the types: an instance whose members are all data looks, to
// TypeScript, like a plain object, so it splices member by member. Only the
// bundler sees its class.
class TodoRecord {
  title = "Ship";
  done = false;
}

it("a class instance with only data members", async () => {
  const todo = new TodoRecord();
  await assert.rejects(bundle(cs`$todo.title`), {
    message:
      "Can't splice this `TodoRecord` instance: only plain objects cross into a client script. Build one with a client function instead.",
  });
});

// The same instance, typed as an interface it satisfies.
interface Todo {
  title: string;
  done: boolean;
}

it("a class instance typed as an interface", async () => {
  const todo: Todo = new TodoRecord();
  await assert.rejects(bundle(cs`$todo.title`), {
    message:
      "Can't splice this `TodoRecord` instance: only plain objects cross into a client script. Build one with a client function instead.",
  });
});

// A gap in the types: `Spliceable` takes any `number`, and a bundle has no
// literal for one that isn't finite.
it("NaN and Infinity", async () => {
  const notANumber = NaN;
  const infinite = Infinity;
  await assert.rejects(bundle(cs`$notANumber + 1`), {
    message: "NaN has no literal",
  });
  await assert.rejects(bundle(cs`$infinite + 1`), {
    message: "Infinity has no literal",
  });
});

// A gap, and a hang: a value that contains itself type-checks as any
// recursive type does, and the bundler renders it forever, so a server bundling
// it never answers. Skipped, as it would stall the suite, until the bundler
// refuses a cycle.
interface Link {
  name: string;
  next: Link | null;
}

it(
  "an object that contains itself",
  { skip: "the bundler renders it forever" },
  async () => {
    const link: Link = { name: "a", next: null };
    link.next = link;
    await assert.rejects(bundle(cs`$link.name`));
  },
);

// By design: `any` opts out of the typechecker, so a host function it hides
// is refused where the bundler meets it.
it("a host function typed as any", async () => {
  const hidden: any = () => 1;
  await assert.rejects(bundle(cs`$hidden()`), {
    message: /^Can't splice the host function `hidden`/,
  });
});

// By design: what the app provides is the server's `packageVersions`, which
// only the bundler reads.
it("an import from a package the app doesn't provide", async () => {
  const missing = createImport<() => void>({
    name: "track",
    from: "analytics",
    version: "^1.0.0",
  });
  await assert.rejects(bundle(cs`$missing()`), {
    message:
      'Can\'t import `track` from "analytics": the client provides solid-js@1.9.14, app@1.0.0, acme-ui@1.0.0.',
  });
});
