import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, type ReactNode, use } from "react";
import type { BacktickClient } from "./client.js";

const BacktickContext = createContext<BacktickClient | null>(null);

/** The client every `<Backtick>` and `useBacktickClient()` under it uses. */
export function BacktickProvider(props: {
  client: BacktickClient;
  children?: ReactNode;
}): ReactNode {
  return (
    <BacktickContext value={props.client}>{props.children}</BacktickContext>
  );
}

/** The client of the nearest `<BacktickProvider>`, as an answer reaches it. */
export function useBacktickClient(): BacktickClient {
  const client = use(BacktickContext);
  if (client === null) {
    throw new Error("useBacktickClient() needs a <BacktickProvider> above it.");
  }
  return client;
}

/**
 * What the server renders at `href`, drawn in place, cached in the app's
 * `QueryClient`: suspends to the nearest `<Suspense>` until it's in, and
 * throws to the nearest error boundary if it can't be fetched or run.
 *
 *     <Suspense fallback={<ActivityIndicator />}>
 *       <Backtick href="/feed" />
 *     </Suspense>
 */
export function Backtick(props: { href: string }): ReactNode {
  const client = useBacktickClient();
  const { data } = useSuspenseQuery(client.queryOptions(props.href));
  return data as ReactNode;
}
