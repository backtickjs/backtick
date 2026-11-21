import type { Bundle, Client } from "@backtickjs/core";
import { bundler } from "./bundler.js";
import { BundlerError } from "./errors.js";
import type { Modules } from "./modules.js";

/** A `Response` whose body is a `Bundle<T>`: the app runs it to a `T`. */
export interface BundleResponse<T> extends Response {
  text(): Promise<Bundle<T>>;
}

/**
 * Answers `request` with `input` bundled for the app that sent it: CommonJS,
 * never cached, with `init`'s status and headers.
 *
 *     app.get("/", (c) => render(c.req.raw, <Home />));
 *     return render(c.req.raw, <NotFound />, { status: 404 });
 *
 * Throws a `BundlerError` (a 426 or a 400) when the app can't run it.
 */
export async function render<T>(
  request: Request,
  input: Client<T>,
  init?: ResponseInit,
): Promise<BundleResponse<T>> {
  let modules: Modules;
  try {
    modules = JSON.parse(request.headers.get("x-backtick-modules") ?? "{}");
  } catch (error) {
    throw new BundlerError(
      `x-backtick-modules isn't JSON: ${(error as SyntaxError).message}`,
      { cause: error },
    );
  }
  const build = await bundler.build({ input, modules });
  const { code } = build.generate({ format: "cjs" });
  // The route's headers win over these.
  const headers = new Headers({
    "content-type": "text/javascript",
    "cache-control": "no-store",
  });
  new Headers(init?.headers).forEach((value, name) => headers.set(name, value));
  return new Response(code, { ...init, headers }) as BundleResponse<T>;
}
