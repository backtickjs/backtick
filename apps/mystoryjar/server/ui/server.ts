import { cs, once } from "@backtickjs/core";
import { createContext, useContext } from "@backtickjs/react";

/** Where a screen's scripts reach the server, and as whom. */
export type Server = { origin: string; session: string | null };

// One context for the bundle, provided by `Screen` with the request's.
export const ServerContext = once(cs`$createContext<Server | null>(null)`);

/**
 * Posts JSON to the server's API as the signed-in user, and gives back its
 * answer: what the handler returned, or `{ error }` for a refusal the person
 * can act on.
 */
export const usePost = cs`() => {
  const server = $useContext($ServerContext)!;
  async function post<T>(
    path: string,
    body: object,
  ): Promise<T & { error?: string }> {
    const headers: Record<string, string> = {
      "content-type": "application/json",
    };
    if (server.session !== null) {
      headers.authorization = "Bearer " + server.session;
    }
    const response = await fetch(server.origin + path, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok && response.status !== 400) {
      return { error: "Something went wrong." } as T & { error?: string };
    }
    return response.json();
  }
  return post;
}`;
