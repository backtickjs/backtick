```tsx file=client-components/server/Stepper.tsx

```

A client component is a script written as a function that takes props and
returns JSX. It runs on the phone, where it keeps state and handles taps. In
another script, it's drawn as a tag: `<$Stepper value={1} onChange={…} />`.

## Draw it from any script

```tsx file=client-components/server/Cart.tsx

```

- **Import it like anything else.** `Stepper` lives in its own file;
  `Cart.tsx` imports it and draws `<$Stepper />`.
- **Props are typed by its parameter.** A missing or wrong prop is a type
  error where the tag is written.
- **Inside client code, props can be anything:** `onChange` is a function,
  `children` is JSX. Only what crosses from your server has to be data.
- **Lists take `key`,** as in React: `<$Card key={line.id} …>`.
- **`Card` draws what it's handed,** as `children`.

## It keeps its state

A client component is one function, made once for the bundle. React sees the
same component on every render of its parent, so its state stays. That only
holds for a script written as a function: a component made by an expression or
a block is code that runs each time it's read, so it's a new component on each
of its parent's renders, and React remounts it, as one defined inside a render
function would be.

A component made by a call, such as `memo(…)`, is made once where React would
make it, in `useMemo`:

```tsx file=client-components/server/Rows.tsx

```

## Mistakes it catches

```tsx file=client-components/server/Mistakes.tsx

```

- **A client component is a tag in a script, never on your server.** Drawn on
  your server, TypeScript says it "does not have any construct or call
  signatures", and the bundler refuses it: "A script is a client component, so
  it can't be a tag on the host. Use it as a tag in a script."
- **A missing prop** is reported on the tag, as for any React component.
