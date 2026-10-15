import { createImport } from "@backtickjs/core";
import type * as ReactErrorBoundary from "react-error-boundary";

// react-error-boundary's API as a script splices it — `<$ErrorBoundary>`,
// `$useErrorBoundary()` — each typed with its own declarations, and each
// required from `react-error-boundary` by the app that runs the bundle.
// Internal: the adapter mirrors it, name for name.

// What every name needs: the react-error-boundary it is typed against (the
// adapter's version, and its `react-error-boundary` dependency), or a later
// 6.x.
const range = "^6.1.6";

export const errorBoundary = <Name extends keyof typeof ReactErrorBoundary>(
  name: Name,
) =>
  createImport<(typeof ReactErrorBoundary)[Name]>({
    name,
    from: "react-error-boundary",
    version: range,
  });
