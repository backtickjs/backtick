# @backtickjs/router

expo-router's `Link` and `router` for [Backtick](https://backtickjs.com): the next screen is fetched before it's shown, and the current one stays until then, like a page in a browser.

## Install

```sh
npm install @backtickjs/router
```

## Use

```tsx
import { Link, router, useNavigation } from "@backtickjs/router";

<Link href="/day">Next page</Link>;
```

`Link` takes expo-router's `href`, `replace`, `push`, `dismissTo` and `asChild`. `href` is a path from the root, a URL, or `{ pathname, params }`. `router` and `useRouter()` have expo-router's methods except `prefetch`, plus `reload`. `useNavigation()` returns `{ state: "idle" | "loading" }`.

The app around the screens provides the fetch and the navigator once, with `configure`. A screen pushed takes what was fetched from `arrived`, under the key its host was given.
