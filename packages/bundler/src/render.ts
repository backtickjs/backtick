import type { Bundle, Client } from "@backtickjs/core";
import { bundler } from "./bundler.js";
import { BundlerError } from "./errors.js";
import type { Modules } from "./modules.js";

/** A `Response` whose body is a `Bundle<T>`: the app runs it to a `T`. */
export interface BundleResponse<T> extends Response {
  text(): Promise<Bundle<T>>;
}

/**
 * Answers `request` with `input` bundled for the app that sent it, in the
 * format its `x-backtick-format` asks for (`cjs` when it doesn't say), never
 * cached, with `init`'s status and headers.
 *
 *     app.get("/", (c) => render(c.req.raw, <Home />));
 *     return render(c.req.raw, <NotFound />, { status: 404 });
 *
 * Throws a `BundlerError` (a 406 or a 400) when the app can't run it, or
 * when the request doesn't say what the app has.
 */
export async function render<T>(
  request: Request,
  input: Client<T>,
  init?: ResponseInit,
): Promise<BundleResponse<T>> {
  // React Native runs CommonJS, a web page ES modules.
  const format = request.headers.get("x-backtick-format") ?? "cjs";
  if (format !== "cjs" && format !== "es") {
    throw new BundlerError(
      `x-backtick-format must be "cjs" or "es", not "${format}".`,
    );
  }
  const modulesHeader = request.headers.get("x-backtick-modules");
  if (modulesHeader === null) {
    throw new BundlerError(
      "x-backtick-modules is missing: a Backtick route needs the modules the app provides, as { specifier: version }.",
    );
  }
  let modules: Modules;
  try {
    modules = JSON.parse(modulesHeader);
  } catch (error) {
    throw new BundlerError(
      `x-backtick-modules isn't JSON: ${(error as SyntaxError).message}`,
      { cause: error },
    );
  }
  const build = await bundler.build({ input, modules });
  const { code } = build.generate({ format });
  // The route's headers win over these.
  const headers = new Headers({
    "content-type": "text/javascript",
    "cache-control": "no-store",
  });
  new Headers(init?.headers).forEach((value, name) => headers.set(name, value));
  return new Response(code, { ...init, headers }) as BundleResponse<T>;
}
