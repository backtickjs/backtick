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
- **Crossing as data: `$user` and `$usual`.** Each splice is a value
  `Home` has, written into the screen. In the script, it has its server type.
- **On the phone: the script `Home` returns, and `ReorderButton`.** They draw
  the screen, keep state and handle taps.

## What the phone receives

For a request from Sam, the server sends this bundle. It's generated from the
screen above by the docs' tests, so it's exactly what the bundler writes:

```js file=thinking/bundle.js

```

- **The scripts are compiled to plain JavaScript,** one module each. Their JSX
  is React's `jsx` calls.
- **The splices are the last line:** Sam's name and order, as data. Nothing of
  `Home` is there, and `db` isn't either: the phone gets results, never the
  code that produced them.
- **React and React Native come from the app** through `require`. The
  app's `evaluate` provides its own copies, so a screen needs nothing the app
  doesn't ship.

## What can cross

A splice can carry what can be written as data, and scripts:

- Strings, finite numbers, booleans, `null` and `undefined`
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

## Optional values

Each `$offer` in a script is its own splice, so TypeScript doesn't narrow one
by checking another. In `{$offer && <$Banner offer={$offer} />}`, the second
`$offer` could still be `null` as far as TypeScript knows. Read the splice
once into a constant, and check that:

```tsx file=optional/server/Promo.tsx

```

## Where code goes

| You need                                                      | Write it as                                                     |
| ------------------------------------------------------------- | --------------------------------------------------------------- |
| Data from a database or an API, secrets, server-only packages | Code in a server component                                      |
| State, effects, taps, animation, device APIs                  | Code in a client script                                         |
| A server value on the phone                                   | A splice: `$name`, or `${expression}`                           |
| A piece of UI with its own props and state                    | A client component: `` cs`(props) => …` ``, used as `<$Name />` |
| A function the phone calls                                    | A client function: `` cs`(n: number) => …` ``                   |
| A piece of UI built on your server, inside a script           | A server component, spliced: `{${<Name />}}`                    |

## How a screen gets to the phone

Your server bundles a screen when the app asks for it:

```tsx file=thinking/server/index.tsx

```

Your app fetches the bundle, runs it with its own React and React Native, and
draws what it returns:

```tsx file=thinking/App.tsx

```

Both are what `create-backtick-app` sets up, without its development extras.
