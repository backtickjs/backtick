import type { Build } from "@backtickjs/bundler";

// The bundle for the app, and its map kept on the server, for reading the
// app's stack traces against your server's files.
export function write(build: Build, maps: Map<string, string>, id: string) {
  const { code, map } = build.generate({ format: "cjs", sourcemap: "hidden" });
  maps.set(id, map!);
  return code;
}
