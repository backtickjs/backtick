// An app's screen at `path`, as the app's Hono server answers the phone that
// sent `modules` (its `x-backtick-modules`): its bundle, or the 426 for a
// module the phone lacks, or whatever else the app answers.
import { pathToFileURL } from "node:url";

export type Answer = { status: number; contentType: string; body: string };

export async function screen(
  file: string,
  path: string,
  modules: string,
): Promise<Answer> {
  const { default: app } = await import(pathToFileURL(file).href);
  const response: Response = await app.fetch(
    new Request(new URL(path, "http://app"), {
      headers: { "x-backtick-modules": modules },
    }),
  );
  return {
    status: response.status,
    contentType: response.headers.get("content-type") ?? "text/plain",
    body: await response.text(),
  };
}
