# @backtickjs/expo-router

expo-router as the Backtick app runs it: the same API and types, with a `Link` that fetches its href ahead while its screen is on top, and as it's pressed, as Next.js's `Link` prefetches every link it shows. The Backtick app serves it as `expo-router`, so apps import `expo-router` as usual and never write `prefetch`.

The fetch is data only: expo-router never preloads a route for it. `prefetch={false}` turns it off. An app sets how a `Link` fetches with `PrefetchContext`; without it, a `Link` is expo-router's.

## License

MIT
