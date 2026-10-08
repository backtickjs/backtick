```ts
import { evaluate, type Modules } from "@backtickjs/react-native-client";
```

## `evaluate(code, modules)`

Runs a bundle in your app, and returns what it draws.

```tsx file=other-packages/App.tsx

```

### Parameters

- **`code`:** the bundle, as your server's `bundle.generate({ format: "cjs" })`
  wrote it.
- **`modules`:** the packages the bundle may require, each as its module. At
  least `react`, `react/jsx-runtime` and `react-native`.

### Returns

What the bundle exports: for a server component, the screen, a React node to
render.

### Caveats

- **It runs the code it's given,** as `eval` does. Fetch bundles only from your
  own server, over HTTPS.
- **Fetching is your app's,** and so is when: on launch, on focus, on a pull to
  refresh.
- **`modules` must match `packageVersions`.** Your server's
  `packageVersions` say which versions the app provides; `modules` is what it
  provides. Take both from the same `package.json`, as a new project does.

## `Modules`

The type of `modules`: each specifier a bundle may require, and its module.

```ts
type Modules = Readonly<Record<string, unknown>>;
```

## Troubleshooting

### "The bundle requires "…", which this app doesn't provide."

The bundle uses a package missing from `modules`. Add it, and install it in the
app so its native code ships. If your server shouldn't have sent it, check its
`packageVersions` for this app.
