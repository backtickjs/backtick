# The JavaScript client

What a bundle means, in JavaScript, and the answer the other clients are read
against. A client is the half below the boundary: it takes a bundle and a
target's own names, and answers with values and a drawing. It does not compile
anything — that happens once, above, and what ships is the tree.

Nothing here may reach for a DOM, a file system or a clock the host owns. A
target brings those. `tsconfig.build.json` says so with `"types": []`, which is
the only place the rule is enforced rather than described.

## Why this one is the reference

Two clients that disagree are two languages. One of them has to be the answer,
and it is this one: `tests/test/fixtures/valid` holds bundles beside the values
this client produced for them, and a second client is right exactly insofar as
it agrees case by case. That corpus already caught three real bugs in the C++
port — per-turn `for` bindings, `for` expanding under a parent rather than
where it is written, and a receiver prepended to record members that should
only reach schema builtins.

Being the reference is a constraint, not a privilege. A thing this client can
only do because JavaScript does it — `undefined`, a prototype chain, a host
`Number.prototype` — is a thing the language has not got, and writing it here
makes it unimplementable elsewhere.

## What exists already

`packages/js-interpreter` is a client of this kind today: `interpret.ts`
evaluates, `globals.ts` holds the language's own names, `view.ts` turns a value
into a drawing a renderer can be driven from, and `ClientOptions`/
`RendererOptions` are what a target hands in. It is what the fixtures were
recorded from, and `packages/web-client`, `tests` and the js-framework-benchmark
all run it.

Whether this becomes that one or replaces it is not settled. What is settled is
that one of them is the answer the others are read against, and that nothing
here depends on a package of this repository's — a client that needs the format
needs the format, not a package.
