import type { Bundle } from "@backtickjs/bundler";

// The bundle for the app, and its map kept on the server, for reading the
// app's stack traces against your server's files.
export function write(bundle: Bundle, maps: Map<string, string>, id: string) {
  const { code, map } = bundle.generate({ format: "cjs", sourcemap: "hidden" });
  maps.set(id, map!);
  return code;
}
