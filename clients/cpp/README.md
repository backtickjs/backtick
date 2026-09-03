# The C++ client

What a bundle means, in C++, and nothing about any one device. Read against
`clients/js` case by case: where the two disagree, this one is wrong.

A client is the half below the boundary — a bundle and a target's own names in,
values and a drawing out. Nothing here may reach for a screen, a pin, a clock
or a file system: a target brings those, and a project that has none of them
should still be able to include these headers and evaluate a bundle.

Its own toolchain, because native code keeps one. It is not a pnpm workspace
member and has no `package.json`; `make` checks the sources under whatever
`clang++` or `g++` is to hand, and a project that brings its own compiler
compiles the same `src/`.

## Matching 1:1

The two clients are meant to be read side by side. A file here has a file of
the same name there, saying the same thing in the other language — where
`Value.ts` is a union of seven alternatives, `Value.h` is a union of seven
alternatives, in the same order under the same names.

What may differ is what the languages differ about, and only that. C++ pays for
a value with a tag where JavaScript has one already; JavaScript gets identity,
ordered records and a garbage collector from its runtime where this has to say
so. What may not differ is which seven cases there are, what makes two values
the same one, and what any of it is called.

Beyond reading alike, agreeing is the contract:
`tests/test/fixtures/valid` holds bundles beside the values the reference
client produced, and a case answered differently here is a bug here whatever
the reasoning behind it.

## What it does not write itself

Simplicity, reliability and robustness over cleverness. Where a mature library
does a job, this uses it — reading JSON above all, which is a job with decided
answers and a long tail of escapes, encodings and malformed input that a
hand-rolled reader gets wrong quietly.

`clients/cardputer/src/Json.cpp` is what not to do, and it is instructive: its
header says it parses "into one flat vector rather than a tree of
allocations", and it does — but it takes 381 heap allocations to read a 2 KB
bundle, because it builds a scratch vector per container on the way there. It
also recurses without a depth limit, on a device whose stack has already been
overflowed once by a recursive walk. Both are the ordinary cost of writing one
of these rather than taking one.

## What this is not

`clients/cardputer` is a spike — an end-to-end proof that backtick runs on an
M5Stack Cardputer, screen and keyboard and all. It carries its own copy of an
interpreter, which is how it got finished. Nothing here is taken from it and
nothing there depends on this; it is evidence that the target is reachable, not
a draft of this.
