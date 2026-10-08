import assert from "node:assert/strict";
import { it } from "node:test";
import { type Client, cs, createImport } from "@backtickjs/core";
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
  await assert.rejects(bundle(cs.lift((() => (cs.splice((todo))).title)())), {
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
  await assert.rejects(bundle(cs.lift((() => (cs.splice((todo))).title)())), {
    message:
      "Can't splice this `TodoRecord` instance: only plain objects cross into a client script. Build one with a client function instead.",
  });
});

// A gap in the types: a value that contains itself type-checks as any
// recursive type does. The bundler writes each value out in full, so it
// refuses one it's already inside of, rather than render it forever. A value
// used in two places isn't refused: it's left before it's met again.
interface Link {
  name: string;
  next: Link | null;
}

const message =
  "Can't splice a value that contains itself: a bundle writes each value out in full, so a cycle never ends. Break the cycle before splicing it.";

it("an object that contains itself", async () => {
  const link: Link = { name: "a", next: null };
  link.next = link;
  await assert.rejects(bundle(cs.lift((() => (cs.splice((link))).name)())), { message });
});

it("a cycle through a script's splice", async () => {
  const holder: { script: Client<string> | null } = { script: null };
  holder.script = cs.lift((() => cs.globalThis.String((cs.splice((holder)))))());
  await assert.rejects(bundle(cs.lift((() => cs.globalThis.String((cs.splice((holder)))))())), { message });
});

it("a value used in two places is no cycle", async () => {
  const shared = { name: "shared" };
  const pair = { first: shared, second: shared };
  await bundle(cs.lift((() => (cs.splice((pair))).first.name + (cs.splice((pair))).second.name)()));
});

// By design: `any` opts out of the typechecker, so a host function it hides
// is refused where the bundler meets it. Its name isn't a component's, so the
// message doesn't suggest drawing `<hidden />`, which would be a client tag.
it("a host function typed as any", async () => {
  const hidden: any = () => 1;
  await assert.rejects(bundle(cs.lift((() => (cs.splice((hidden)))())())), {
    message:
      "Can't splice the host function `hidden`: it's host code, and only runs on the host. Write a client function as a script instead: cs`(n: number) => ...`. If it's a server component, draw it with a tag in a braced splice: `{${<Name />}}`.",
  });
});

// By design, as above: a bigint or a symbol has no place in a bundle.
it("a bigint typed as any", async () => {
  const big: any = 1n;
  await assert.rejects(bundle(cs.lift((() => (cs.splice((big))))())), {
    message:
      "Can't splice a bigint: only strings, numbers, booleans, null, undefined, scripts, and arrays and plain objects of those cross into a client script.",
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
  await assert.rejects(bundle(cs.lift((() => (cs.splice((missing)))())())), {
    message:
      'Can\'t import `track` from "analytics": the client provides solid-js@1.9.14, app@1.0.0, acme-ui@1.0.0.',
  });
});
