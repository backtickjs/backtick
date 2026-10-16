import { createImport } from "@backtickjs/core";
import type * as React from "react";
import type * as ReactDOMClient from "react-dom/client";

// React's API as a script splices it — `$useState(0)` — each typed with
// React's own declarations, and each imported from React by the bundle that
// uses it. Internal: the adapter's modules mirror React's, name for name.

// The React every name is typed against: the adapter's version, and its `react`
// dependency.
const version = "19.2.3";

export const react = <Name extends keyof typeof React>(name: Name) =>
  createImport<(typeof React)[Name]>({ name, from: "react", version });

export const client = <Name extends keyof typeof ReactDOMClient>(name: Name) =>
  createImport<(typeof ReactDOMClient)[Name]>({
    name,
    from: "react-dom/client",
    version,
  });
