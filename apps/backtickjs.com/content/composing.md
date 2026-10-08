```tsx file=composing/server/ProductPage.tsx

```

Server and client components compose in both directions, in one file:

- **A client component inside a script:** `<$LikeButton />`.
- **A server component inside a script:** `{${<Reviews productId={…} />}}`,
  a splice of its element. It runs on your server when the bundle is built,
  and the phone gets only what it returns.
- **A server component inside a server component:** `Section` takes
  `<Reviews />` as its children and draws them with `{$children}`.

## Each place it's drawn, it runs

A server component's element runs its component once per place it's drawn, as
React renders an element at each place it stands. Drawn twice, it runs twice.
If two places need the same data, fetch it once and pass it down, or cache the
fetch for the request.

## Handing it the phone's state

A server component drawn inside a client component can be handed that
component's local values, as client code:

```tsx file=composing/server/LiveSection.tsx

```

- **`` cs`count + " in your cart"` `` is a fragment of `Cart`'s code,** reading
  its `count`. `Section` splices it as `$title`, and the phone computes it each
  time it's read, so the title follows the count.
- **`Like` keeps its state** while the title changes: it's a client component,
  one function for the bundle.
- **`Section` runs once, on your server.** It decides the layout; the phone
  fills in what depends on its state.
