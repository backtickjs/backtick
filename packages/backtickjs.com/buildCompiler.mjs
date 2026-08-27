import { createHash } from "node:crypto";
import { build } from "esbuild";
import ts from "typescript";
import { compile } from "./dist/compile/compile.js";
import { EXAMPLE } from "./dist/play/examples.js";

// The playground's half of the site, which is not a Backtick page and cannot be:
// it is a document that runs what somebody wrote, and everything else here is a
// document that draws data. Plain ESM, outside `src`, the way `web-client`'s
// build script is — `src` is what it bundles.

const TYPESCRIPT = "typescript/lib/typescript.js";

/** A `/`-rooted url carrying the hash of what is at it, so nothing is ever stale. */
function asset(name, extension, source) {
  const hash = createHash("sha256").update(source, "utf8").digest("hex");
  return { url: `/compile/${name}-${hash.slice(0, 16)}.${extension}`, source };
}

async function bundled(contents, options = {}) {
  const { outputFiles } = await build({
    stdin: { contents, resolveDir: process.cwd(), loader: "js" },
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
    minify: true,
    write: false,
    ...options,
  });
  return outputFiles[0].text;
}

// TypeScript is minified but not bundled, and loaded as a classic script.
// Bundling it goes through its `browser` field, which maps `os` to nothing and
// leaves the file reading `os.platform()` at load — the error is
// `c.platform is not a function`, and it happens before anything is compiled.
async function parser() {
  const { outputFiles } = await build({
    entryPoints: [TYPESCRIPT],
    minify: true,
    write: false,
    logLevel: "warning",
  });
  return asset("typescript", "js", outputFiles[0].text);
}

// One classic script holding the harness and everything it imports. `iife`
// rather than `esm` because the frame is sandboxed onto an opaque origin, where
// a module script is a cross-origin fetch and a classic script is not — and a
// static host sends no header that would let the first one through.
async function harness(typescriptUrl) {
  return asset(
    "entry",
    "js",
    await bundled(`import "./src/compile/entry.js";`, {
      format: "iife",
      define: { BACKTICK_TYPESCRIPT_URL: JSON.stringify(typescriptUrl) },
    }),
  );
}

// The playground's own wiring, which is a script on a page rather than part of
// its bundle — see `src/play/entry.ts` for why, and `docs/browser-playground.md`
// for what closes it.
async function playground(prepared) {
  return asset(
    "play",
    "js",
    await bundled(`import "./src/play/entry.js";`, {
      format: "iife",
      define: { BACKTICK_EXAMPLE: JSON.stringify(JSON.stringify(prepared)) },
    }),
  );
}

// The example, compiled here so that reading the page costs no compiler: what
// the reader is handed on load is bytes this build already made, and the
// megabyte behind the editor waits for the first keystroke that needs it.
async function prepare() {
  return {
    source: EXAMPLE.source,
    result: await compile(EXAMPLE.source, { typescript: ts }),
  };
}

// No content policy on this document, and that is a finding rather than an
// oversight: a frame carrying `sandbox` without `allow-same-origin` runs on an
// opaque origin, where `'self'` matches nothing — a `default-src 'self'` here
// would refuse this document its own scripts. The sandbox is the boundary. The
// page that embeds it keeps its own policy, and never evaluates anything.
function frameDocument(entry) {
  return (
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<title>backtick — compiler</title>` +
    `<script src="${entry.url}"></script>` +
    `</head><body></body></html>`
  );
}

/** Every file the playground publishes, and where each goes. */
export async function buildCompiler() {
  const typescriptAsset = await parser();
  const [entry, play] = await Promise.all([
    harness(typescriptAsset.url),
    prepare().then(playground),
  ]);

  return {
    scripts: { play: play.url },
    assets: [typescriptAsset, entry, play],
    documents: [{ path: "/compile/", html: frameDocument(entry) }],
  };
}
