import { type BundleResponse, type Client, cs } from "@backtickjs/core";
import { bundler } from "./bundler.js";
import { BundlerError, UnsupportedImportError } from "./errors.js";
import type { Modules } from "./modules.js";

export interface RenderOptions {
  /**
   * Called with each refusal `render` answers, and its request: an old build
   * without a module a screen imports, a server bundling for one too new, a
   * request that doesn't say what the app has. Required, so where refusals
   * go is a choice; `() => {}` drops them.
   */
  readonly onBundlerError: (error: BundlerError, request: Request) => void;
}

/**
 * Answers `request` with `input` bundled as CommonJS for the app that sent
 * it, never cached, with `init`'s status and headers. Made by `createRender`.
 */
export type Render = <T>(
  request: Request,
  input: Client<T>,
  init?: ResponseInit,
) => Promise<BundleResponse<T>>;

/**
 * `render`, for a server that speaks the Fetch API's `Request` and
 * `Response`, as Hono, Next.js route handlers and Workers do. CommonJS, on
 * every platform: the app runs it against its own modules.
 *
 *     const render = createRender({ onBundlerError: (error) => console.error(error) });
 *     app.get("/", (c) => render(c.req.raw, <Home />));
 *     return render(c.req.raw, <NotFound />, { status: 404 });
 *
 * What the bundler refuses is answered, after `onBundlerError`, with a bundle
 * that throws it, so the app's `exec` throws an `Error` with its `name` and
 * `message`: a 406 for an `UnsupportedImportError` (the app can't run it, so
 * it has to update), a 400 for anything else, never stored. An error a server
 * component throws passes through.
 */
export function createRender({ onBundlerError }: RenderOptions): Render {
  return async function render<T>(
    request: Request,
    input: Client<T>,
    init?: ResponseInit,
  ): Promise<BundleResponse<T>> {
    try {
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
      const { code } = build.generate();
      // The route's headers win over these.
      const headers = new Headers({
        "content-type": "text/javascript",
        "cache-control": "no-store",
      });
      new Headers(init?.headers).forEach((value, name) =>
        headers.set(name, value),
      );
      return new Response(code, { ...init, headers }) as BundleResponse<T>;
    } catch (error) {
      if (!(error instanceof BundlerError)) {
        throw error;
      }
      onBundlerError(error, request);
      return responseThatThrows(error, init);
    }
  };
}

// A response whose bundle throws `error`: the route's headers, but never
// stored, whatever it caches, at the refusal's own status.
async function responseThatThrows(
  error: BundlerError,
  init: ResponseInit | undefined,
): Promise<BundleResponse<never>> {
  const { name, message } = error;
  const build = await bundler.build({
    input: cs`{
      const error = new Error($message);
      error.name = $name;
      throw error;
    }`,
    modules: {},
  });
  const headers = new Headers(init?.headers);
  headers.set("content-type", "text/javascript");
  headers.set("cache-control", "no-store");
  return new Response(build.generate().code, {
    status: error instanceof UnsupportedImportError ? 406 : 400,
    headers,
  }) as BundleResponse<never>;
}
