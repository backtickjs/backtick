import { createRequire } from "node:module";

// What this uses of Babel, which the app's `expo` brings with its preset.
interface Babel {
  transformSync(
    code: string,
    options: object,
  ): { code?: string | null; map?: object | null } | null;
}

/**
 * Expo's Babel preset as a build's compile step, after the framework's:
 * each script as Metro compiles the app's own code for Hermes, so a script
 * gets what Expo works around in Hermes V1, as an async arrow with a default
 * parameter losing its first `await`. Babel and the preset are the ones the
 * app's own `expo` brings. A script is compiled once for every client, so no
 * platform is given: `process.env.EXPO_OS` is `null` in one, and
 * `Platform.OS` says the platform.
 */
export default function babel(): (
  code: string,
  id: string,
) => { code: string; map: string } {
  const fromExpo = createRequire(
    createRequire(import.meta.url).resolve("expo/package.json"),
  );
  const preset = fromExpo.resolve("babel-preset-expo");
  const babel = createRequire(preset)("@babel/core") as Babel;
  return (code, id) => {
    const compiled = babel.transformSync(code, {
      filename: id,
      babelrc: false,
      configFile: false,
      // readable, as the framework's step left it
      compact: false,
      comments: true,
      sourceMaps: true,
      // the module's imports kept, for the compiler to find
      presets: [[preset, { disableImportExportTransform: true }]],
      caller: {
        name: "metro",
        bundler: "metro",
        engine: "hermes",
        supportsStaticESM: true,
      },
    });
    return { code: compiled!.code!, map: JSON.stringify(compiled!.map) };
  };
}
