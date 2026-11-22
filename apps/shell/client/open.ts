import { type Bundle, createRuntime, modulesOf } from "@backtickjs/core";
import type { Runtime } from "@backtickjs/hono";
import { installedPackages, moduleMap } from "./backtick";
import { apps, home } from "./hosts";

// The modules this build carries, at their versions.
const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));

// Where an app is: its own host, or Backtick's for the home (app null). An
// app's paths are its server's, unchanged.
function originOf(app: string | null): string {
  return app === null ? `https://${home}` : `https://${app}.${apps}`;
}

// Opens in flight, by app: a screen mounted again while its app opens (as
// at startup) shares the request; a settled one is dropped, so each later
// open fetches the latest.
const opening = new Map<string | null, Promise<Runtime>>();

// An app as the phone opens it, or Backtick's home (app null): the runtime
// its server sends. The session's token, when there is one, is attached
// below JavaScript. A module this build lacks is named in the server's
// answer.
export function openApp(app: string | null): Promise<Runtime> {
  const pending = opening.get(app);
  if (pending !== undefined) {
    return pending;
  }
  const opened = fetchRuntime(app).finally(() => opening.delete(app));
  opening.set(app, opened);
  return opened;
}

async function fetchRuntime(app: string | null): Promise<Runtime> {
  const response = await fetch(
    originOf(app) + "/.well-known/backtick/runtime",
    { headers: { "x-backtick-modules": modules } },
  );
  const body = await response.text();
  if (
    response.status !== 200 ||
    !response.headers.get("content-type")?.startsWith("text/javascript")
  ) {
    // A refusal says why, as { name, message }.
    let reason = body;
    try {
      reason = JSON.parse(body).message ?? body;
    } catch {}
    throw new Error(
      `The app couldn't be opened (${response.status}): ${reason}`,
    );
  }
  // A runtime of its own for each app opened, so no two share what they make.
  return createRuntime(moduleMap).exec(body as Bundle<Runtime>);
}
