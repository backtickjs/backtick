import { createImport } from "@backtickjs/core";
import type * as ReactQuery from "@tanstack/react-query";

// TanStack Query's API as a script splices it — `$useSuspenseQuery(…)`,
// `$queryOptions(…)` — each typed with its own declarations, and each
// required from `@tanstack/react-query` by the app that runs the bundle.
// Internal: the adapter mirrors it, name for name.

// What every name needs: the @tanstack/react-query it is typed against (the
// adapter's version, and its `@tanstack/react-query` dependency), or a later
// 5.x.
const range = "^5.104.0";

export const query = <Name extends keyof typeof ReactQuery>(name: Name) =>
  createImport<(typeof ReactQuery)[Name]>({
    name,
    from: "@tanstack/react-query",
    version: range,
  });
