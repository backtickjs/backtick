import { type Bundle, createRuntime, modulesOf } from "@backtickjs/core";
import { QueryClient } from "@tanstack/react-query";
import Constants from "expo-constants";
import { installedPackages, moduleMap } from "./backtick";

// Your Backtick server runs on the computer Expo was started from.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server = `http://${host}:3000`;

// The modules this build carries, at their versions.
const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));
// What runs the screens the server sends, with the modules the app provides:
// one per app, so what a screen makes once stays made.
const runtime = createRuntime(moduleMap);

/**
 * What your server answers at `path`: its bundle, fetched with this build's
 * modules and run with the app's modules. A screen, an item, a like's count. Your
 * fetch to shape: headers, auth, caching.
 */
export async function fetchBundle(
  path: string,
  init: RequestInit = {},
): Promise<unknown> {
  const response = await fetch(`${server}${path}`, {
    ...init,
    headers: {
      "x-backtick-modules": modules,
      "content-type": "application/json",
      ...init.headers,
    },
  });
  // Why, as the server says it.
  if (!response.ok) {
    throw new Error(
      `${path} answered ${response.status}: ${await response.text()}`,
    );
  }
  const bundle = (await response.text()) as Bundle<unknown>;
  return runtime.exec(bundle);
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
