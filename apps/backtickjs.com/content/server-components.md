```tsx file=server-components/server/ProductScreen.tsx

```

A server component is a function your server runs for every request. It takes
props, reads whatever it needs, and returns a client script: the screen the
phone draws. It can be `async`, and usually is.

## Draw one from a route

Your server draws a server component the way React draws any component, with
JSX, and hands it to the bundler:

```tsx file=server-components/server/index.tsx

```

`bundler.build` runs `ProductScreen` with these props, then bundles the script
it returns. Each request gets its own run, so each user can get their own
screen.

## Props stay on your server

A server component's props never cross to the phone, so they can be anything:
a database client, a class instance like `Catalog`, a request, a function.
Only what you splice into the script crosses.

## Decide on your server

A server component can return a different script depending on what it found,
as `ProductScreen` does for a product that's gone. The decision runs on your
server, and the phone gets only the screen it led to.

## Ship only what the screen needs

The product has a `cost`, what you paid for it, and the screen shouldn't send
it to every phone. `ProductScreen` splices `name` and `inStock`, so they're all
that crosses:

```js file=server-components/server/ProductScreen.bundle.js details="What the phone receives"

```

The last line is everything the phone learns about the product: its name, and
whether it's in stock. [Splices](/docs/splices) explains what crosses, and how
to keep a value from crossing by accident.

## State belongs on the phone

A server component runs once per request and returns, so it has no state, and
React's hooks aren't available to it. The hooks from `@backtickjs/react` are
client values, and calling one on your server is a type error:

```tsx file=server-components/server/Counter.tsx

```

```text
This expression is not callable.
  Type 'Client<…>' has no call signatures.
```

State goes in a [client component](/docs/client-components), which a server
component can draw.
