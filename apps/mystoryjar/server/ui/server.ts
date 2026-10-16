import { cs, once } from "@backtickjs/core";
import { createContext, useContext } from "@backtickjs/react";
import { File } from "expo-file-system" with { backtick: "client" };

/** Where a screen's scripts reach the server, and as whom. */
export type Server = { origin: string; session: string | null };

// One context for the bundle, provided by `Screen` with the request's.
export const ServerContext = once(cs`$createContext<Server | null>(null)`);

// What every post sends: who's asking, and where the phone is, which dates
// a story.
const headers = cs`(server: Server, type: string) => {
  const sent: Record<string, string> = {
    "content-type": type,
    "x-time-zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  if (server.session !== null) {
    sent.authorization = "Bearer " + server.session;
  }
  return sent;
}`;

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
    const response = await fetch(server.origin + path, {
      method: "POST",
      headers: $headers(server, "application/json"),
      body: JSON.stringify(body),
    });
    // a refusal answers with its error; anything else that failed, the
    // server couldn't say why
    const answer = await response.json().catch(() => ({}));
    if (!response.ok && typeof answer.error !== "string") {
      return { error: "Something went wrong." } as T & { error?: string };
    }
    return answer;
  }
  return post;
}`;

/**
 * Uploads the file at `uri`, a photo the phone picked, as the body of a post
 * to the server's `path`, and gives back its answer, or `{ error }`. Sent
 * from disk by the platform, never read into JavaScript.
 */
export const useUpload = cs`() => {
  const server = $useContext($ServerContext)!;
  async function upload<T>(
    path: string,
    uri: string,
    type: string,
  ): Promise<T & { error?: string }> {
    try {
      const sent = await new $File(uri).upload(server.origin + path, {
        headers: $headers(server, type),
        mimeType: type,
      });
      return JSON.parse(sent.body);
    } catch {
      return { error: "That photo couldn't be sent. Try again." } as T & {
        error?: string;
      };
    }
  }
  return upload;
}`;
