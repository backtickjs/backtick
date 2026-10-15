import { type Client, cs, type Spliceable } from "@backtickjs/core";
import {
  type DehydratedState,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

/**
 * Answers the server already has, by path, as the phone's React Query cache
 * holds them: what a screen hands `<$HydrationBoundary>`, so they draw
 * without being fetched. Each is what its route answers.
 */
export function cacheOf(
  answers: Record<string, Spliceable>,
): Client<DehydratedState> {
  // No timer to forget them: this cache lives for one response.
  const client = new QueryClient({
    defaultOptions: { queries: { gcTime: Infinity } },
  });
  for (const [path, answer] of Object.entries(answers)) {
    client.setQueryData([path], answer);
  }
  // `dehydrate` types the answers `unknown`; they're spliceable, as above.
  const state = dehydrate(client) as unknown as Spliceable;
  return cs`$state` as Client<DehydratedState>;
}
