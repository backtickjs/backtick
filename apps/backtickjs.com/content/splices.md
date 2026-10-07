```tsx file=splices/server/Profile.tsx

```

A splice carries a value from your server into a client script. Your server
evaluates it when the script is made, and the bundle carries the result to the
phone, as data.

## Two forms

- **`$name`** splices the variable `name`: `$points`, `$View`.
- **`${expression}`** splices any expression: `${user.name}`,
  `${orders.length}`.

Both are evaluated on your server, in order, when the `` cs`…` `` is.

## What can cross

A splice can carry what can be written as data, and scripts:

- Strings, finite numbers, booleans, `null` and `undefined`
- Plain objects and arrays of those
- Scripts: values, functions and client components made with `` cs`…` ``
- What the adapters export, as `$View` or `$useState`

On the phone, each value has the type it had on your server, except a script:
a `Client<T>` arrives as the `T` it computes. That's why `$formatPrice` can be
called, and `<$Counter />` drawn.

## Data, never code

A spliced string arrives as a string, whatever it holds. A note that reads
like code is still only text:

```tsx file=splices/server/Data.tsx

```

```js file=splices/server/Data.bundle.js details="What the phone receives for a note holding code"

```

The bundle writes the note escaped, inside quotes. Nothing a user types can
become code on the phone.

## A splice takes the whole value

`$user.name` splices `user`, the whole object, then reads `name` on the phone.
Everything in `user` crosses, including the email the screen never shows:

```tsx file=splices/server/Whole.tsx

```

```js file=splices/server/Whole.bundle.js details="What the phone receives"

```

To send only the name, splice the expression: `${user.name}`, as `Profile`
does. The same goes for anything private in an object: splice what the screen
needs, not what holds it.

## What can't cross

Functions and class instances stay on your server: they're code, and state
the phone can't have. TypeScript stops them at the splice, with
`… is not assignable to parameter of type 'Spliceable'`. Cross what each one
is for instead: a `Date` as a string, a function as a client function,
`` cs`(n: number) => …` ``. [Thinking in Backtick](/docs/thinking-in-backtick#what-can-cross)
has the fix in full.

## Two more rules

- **A script can't declare a name starting with `$`.** Those are splices, and
  `const $label = "Hi"` is refused:
  "`$`-prefixed names are reserved for unbraced splices in a `cs` client
  script."
- **`${…}` in a script's text isn't a splice.** In a string, a template
  literal or a comment, it's refused, since the phone would read it as text:
  "This `${…}` is in text, not code, so it isn't spliced."
