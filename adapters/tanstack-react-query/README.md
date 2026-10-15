# @backtickjs/tanstack-react-query

The TanStack Query adapter for [Backtick](https://backtickjs.com): `@tanstack/react-query`'s API as client values your scripts splice (`$useSuspenseQuery(…)`, `$queryOptions(…)`, `$useMutation(…)`), each typed with its own declarations. Its version tracks the TanStack Query it supports: `5.104.0` works with `@tanstack/react-query` `^5.104.0`. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) and [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native).

## Install

```sh
npm install @backtickjs/tanstack-react-query @backtickjs/react-native @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `@tanstack/react-query`: `npm install @tanstack/react-query`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

Query options next to the route that answers them, and a client component that reads them:

```tsx
// server/Item.tsx
import { cs } from "@backtickjs/core";
import {
  queryOptions,
  useSuspenseQuery,
} from "@backtickjs/tanstack-react-query";
import type { ReactNode } from "react";

// What `GET /items/:id` answers with: the component that draws that item.
type ItemComponent = (props: { id: string }) => ReactNode;

export const itemQuery = cs`(id: string) =>
  $queryOptions<ItemComponent>({ queryKey: ["/items/" + id] })`;

export const ItemCard = cs`(props: { id: string }) => {
  const { data: Item } = $useSuspenseQuery($itemQuery(props.id));
  return <Item id={props.id} />;
}`;
```

The `QueryClient` and its `QueryClientProvider` are the app's: its default `queryFn` fetches the path in the key and runs the answer with `execRoot`. On each request, bundle for the versions the app provides, `"@tanstack/react-query": "5.104.0"` among them. In the app, offer it to bundles by the name the adapter imports it from, so every bundle shares the app's one copy, and so its one `QueryClient`:

```tsx
import * as ReactQuery from "@tanstack/react-query";

const moduleMap = {
  // …react, react/jsx-runtime, react-native
  "@tanstack/react-query": ReactQuery,
};
```

## What it exports

- `@backtickjs/tanstack-react-query`: `@tanstack/react-query`'s exports, name for name, as client values (`useQuery`, `useSuspenseQuery`, `useMutation`, `queryOptions`, `useQueryClient`, `QueryClient`, …), and its types.

## Related

- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
