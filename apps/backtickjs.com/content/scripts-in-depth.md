To your server, a script is a value, a `Client<T>`: something the phone will
compute as a `T`. This page is what follows from that, for when a screen does
something you didn't expect.

## Three shapes

```ts file=scripts-in-depth/server/shapes.ts

```

A script is an expression, a block of statements, or a function. An
expression is a `Client` of its value; a block, of what it returns; a
function, of the function itself. A function that returns JSX is a client
component. TypeScript infers each type; the annotations above only show
them.

Your server can't read the `T`, which doesn't exist until the phone runs the
script. It can splice the script into another, pass it around, and return it
from a server component. Annotate a function that builds scripts with
`Client<T>`, taking the phone's number and giving back the phone's string:

```ts file=scripts-in-depth/server/formatted.ts

```

## Reading a script

How a splice of a script behaves follows from its shape, as the same code
written by hand in TypeScript would:

- **A function is one function.** `$logTap` is the same function at every
  read, and its body runs each time it's called.
- **An expression or a block is code, run each time it's read.** Reading
  `$logVisit` twice runs it twice.

```tsx file=scripts-in-depth/server/Log.tsx

```

This is why a client component is written as a function: one function for the
bundle, so React sees the same component on every render and keeps its
state. A component made by an expression or a block is new code at each read,
so React remounts it on every render of its parent, as it would one defined
inside a render function.

A component made by a call, such as `memo(…)`, is made once where React would
make it, in `useMemo`:

```tsx file=scripts-in-depth/server/Rows.tsx

```

## No template literals inside a script

A script is a template literal itself, so it can't hold one: a backtick
inside it is refused, with "A `cs` client script can't hold a template
literal". Build the string with `+` instead: `n + "%"`, not `` `${n}%` ``.

## A script in data

A splice can carry scripts inside data. On the phone, each `Client<U>` in it
is the `U` it computes; everything else is unchanged. `Spliced<T>` names that
type, and TypeScript applies it to every splice:

```ts file=scripts-in-depth/server/menu.ts

```

## Client code handed to a server component

A server component drawn inside a client component can be handed that
component's local values, as client code:

```tsx file=scripts-in-depth/server/LiveSection.tsx

```

`` cs`count + " in your cart"` `` is a fragment of `Cart`'s code, reading its
`count`. `Section` splices it as `$title`, and the phone computes it each
time it's read, so the title follows the count. `Section` itself runs once,
on your server: it decides the layout, and the phone fills in what depends on
its state.

## Data, never code

A spliced string arrives as a string, whatever it holds. A note that reads
like code is still only text:

```tsx file=scripts-in-depth/server/Data.tsx

```

For a note holding `"); require("fs").rmSync("/"); ("`, the bundle writes it
escaped, inside quotes:

<!-- prettier-ignore -->
```js
const $thunk1 = () => ("\"); require(\"fs\").rmSync(\"/\"); (\"");
```

Nothing a user types can become code on the phone.

## What a splice checks

A splice checks a value member by member, so an object typed with an
interface splices as one typed with a type alias does. `Spliceable` written
by hand, in an annotation or a `satisfies`, matches an object through an index
signature, which TypeScript never gives an interface: annotate with your own
types and let the splice check them.

Numbers include `NaN`, `Infinity` and `-0`, which arrive as themselves, as do
bigints. A class whose members are all data looks like a plain object to
TypeScript, so the bundler is what refuses it, when it builds the screen. A
value that contains itself is refused too: a bundle writes each value out in
full. [Errors](/docs/errors#from-the-bundler) has each message.

The rest of `@backtickjs/core` is how Backtick's own pieces talk to each
other; its
[README](https://github.com/backtickjs/backtick/tree/main/packages/core#api)
lists them. An app doesn't need it.
