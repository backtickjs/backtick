import { createRuntime } from "@backtickjs/core";
import { QueryClient } from "@tanstack/react-query";
import Constants from "expo-constants";
import { installedPackages, moduleMap } from "./backtick";

// Your Backtick server runs on the computer Expo was started from.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server = `http://${host}:3000`;

// What fetches and runs the screens the server sends, with the modules the
// app provides at their versions: one per app, so what a screen makes once
// stays made.
const runtime = createRuntime({ moduleMap, installedPackages });

/**
 * What your server answers at `path`: its bundle, fetched with this build's
 * modules and run with the app's modules. A screen, an item, a like's count. Your
 * fetch to shape: headers, auth, caching.
 */
export function fetchBundle(
  path: string,
  init: RequestInit = {},
): Promise<unknown> {
  const headers = new Headers(init.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return runtime.fetch(`${server}${path}`, { ...init, headers });
}

/**
 * The client that runs screens' queries and mutations: a query's key is the
 * path it reads, or, for pages, its page param is; a mutation is sent a path,
 * and a body, to POST. Made in
 * a component, so what it sends may come from React: a token, a locale.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: ({ queryKey: [path], pageParam }) =>
          fetchBundle((pageParam ?? path) as string),
      },
      mutations: {
        mutationFn: (variables) => {
          const { path, body } = variables as { path: string; body?: unknown };
          return fetchBundle(path, {
            method: "POST",
            body: JSON.stringify(body ?? null),
          });
        },
      },
    },
  });
}
