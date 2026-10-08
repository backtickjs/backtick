A Backtick screen is one file with code for two places: your server and the
phone. Three rules say which code runs where:

1. **A server component runs on your server,** for every request.
2. **A client script, `` cs`…` ``, runs on the phone.**
3. **A splice, `$name`, is the only way a value crosses** from one to the
   other.

## One screen, both sides

```tsx file=thinking/server/Home.tsx

```

Read it by where each part runs:

- **On your server: `Home`, and `await db.usualOrder(...)`.** It reads its
  data where the data lives. Queries, secrets and server-only packages stay on
  your server.
- **Crossing as data: `$user` and `$usual`.** Each splice is a value `Home`
  has, written into the screen. In the script, it has its server type.
- **On the phone: the script `Home` returns, and `ReorderButton`.** They draw
  the screen, keep state and handle taps.

Your server bundles this screen for each request, and your app runs the
bundle. [How it works](/docs/how-it-works) shows what the phone receives.

## Server components

```tsx file=thinking/server/ProductScreen.tsx

```

- **Props stay on your server, so they can be anything:** a database client,
  a class instance like `Catalog`, a request. Only what you splice crosses.
- **Decide on your server.** `ProductScreen` returns a different script for a
  product that's gone. The phone gets only the screen the decision led to.
- **It has no state, and no hooks.** It runs once per request and returns.
  Calling `useState` in it is a type error: "This expression is not
  callable". State goes in a [client component](#client-components).

## Splices

A splice carries a value from your server into a script. `$name` splices the
variable `name`; `${expression}` splices any expression, as `${user.name}`.
Both are evaluated on your server, when the `` cs`…` `` is.

A splice can carry what can be written as data, and scripts:

- Strings, numbers, bigints, booleans, `null` and `undefined`
- Plain objects and arrays of those
- Scripts: `` cs`…` `` values, client components and client functions
- What the adapters export: `$View`, `$useState` and the rest

Functions and class instances can't cross, because they're code and state on
your server. TypeScript stops them where you write the splice:

```tsx file=thinking/server/Signup.tsx

```

```text
Argument of type '() => void' is not assignable to parameter of type 'Spliceable'.
Argument of type 'Date' is not assignable to parameter of type 'Spliceable'.
```

The fix is to cross what each one is for: the date as a string, and the
handler as a client function, which runs on the phone.

```tsx file=thinking-fixed/server/Signup.tsx diff=thinking/server/Signup.tsx

```

Forget the `$`, and the script looks for a global by that name: "Property
'total' does not exist on type 'GlobalThis'". A script sees its own code and
the phone's globals, never the file around it.

### A splice takes the whole value

`$user.name` splices `user`, the whole object, then reads `name` on the phone.
Everything in `user` crosses, including the email the screen never shows:

```tsx file=thinking/server/Whole.tsx

```

```js file=thinking/server/Whole.bundle.js details="What the phone receives"

```

To send only the name, splice the expression: `${user.name}`. The same goes
for anything private in an object: splice what the screen needs, not what
holds it.

### Optional values

Each `$offer` in a script is its own splice, so TypeScript doesn't narrow one
by checking another. In `{$offer && <$Banner offer={$offer} />}`, the second
`$offer` could still be `null` as far as TypeScript knows. Read the splice
once into a constant, and check that:

```tsx file=thinking/server/Promo.tsx

```

## Client components

A client component is a script written as a function that takes props and
returns JSX, as `ReorderButton` above. It runs on the phone, where it keeps
state and handles taps, and another script draws it as a tag.

```tsx file=thinking/server/Cart.tsx

```

- **Import it like anything else.** `Stepper` is a client component in its
  own file, with `value`, `onChange` and `min` props; `Cart.tsx` imports it
  and draws `<$Stepper />`.
- **Props are typed by its parameter.** A missing or wrong prop is a type
  error where the tag is written.
- **Inside client code, props can be anything:** `onChange` is a function,
  `children` is JSX. Only what crosses from your server has to be data.
- **Hooks go here,** as in any React component: `$useState`, `$useEffect`
  and the rest.
- **Lists take `key`,** as in React.
- **Write it as a function, and it keeps its state.** A function script is
  one function for the whole bundle, so React sees the same component on
  every render. [Scripts in depth](/docs/scripts-in-depth#reading-a-script)
  explains why an expression wouldn't.
- **It's a tag in a script, never on your server.** Drawn on your server, it
  "does not have any construct or call signatures".

## Composing

```tsx file=thinking/server/ProductPage.tsx

```

Server and client components compose in both directions, in one file:

- **A client component inside a script:** `<$LikeButton />`.
- **A server component inside a script:** `{${<Reviews productId={…} />}}`,
  a splice of its element. It runs on your server when the bundle is built,
  and the phone gets only what it returns.
- **A server component inside a server component:** `Section` takes
  `<Reviews />` as its children and draws them with `{$children}`.

A server component runs once per place it's drawn, as React renders an
element at each place it stands. If two places need the same data, fetch it
once and pass it down.

## Where code goes

| You need                                                      | Write it as                                                     |
| ------------------------------------------------------------- | --------------------------------------------------------------- |
| Data from a database or an API, secrets, server-only packages | Code in a server component                                      |
| State, effects, taps, animation, device APIs                  | Code in a client script                                         |
| A server value on the phone                                   | A splice: `$name`, or `${expression}`                           |
| A piece of UI with its own props and state                    | A client component: `` cs`(props) => …` ``, used as `<$Name />` |
| A function the phone calls                                    | A client function: `` cs`(n: number) => …` ``                   |
| A piece of UI built on your server, inside a script           | A server component, spliced: `{${<Name />}}`                    |
