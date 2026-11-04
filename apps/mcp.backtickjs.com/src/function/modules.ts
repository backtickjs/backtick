// What an app may import, on each side. On the phone, what it provides for
// client imports: the shell's module names (`shell/modules`), which its module
// map must match. On the server, the packages a release bundles. save_app
// refuses anything else (diagnostics/unavailable-module.ts).
import { modules } from "shell/modules";
import sandbox from "../../sandbox/package.json" with { type: "json" };

export const phoneModules: readonly string[] = modules;

// Each phone module at its package's exact version: the sandbox pins the
// shell's (sandbox/test/versions.test.ts), so an app is checked against what
// the phone runs.
export const phoneVersions: Readonly<Record<string, string>> =
  Object.fromEntries(
    phoneModules.map((specifier) => [
      specifier,
      (sandbox.dependencies as Record<string, string>)[packageOf(specifier)]!,
    ]),
  );

function packageOf(specifier: string): string {
  return specifier
    .split("/")
    .slice(0, specifier.startsWith("@") ? 2 : 1)
    .join("/");
}

export const serverModules: readonly string[] = [
  "hono",
  "@backtickjs/core",
  "@backtickjs/bundler",
  "@backtickjs/hono",
];
