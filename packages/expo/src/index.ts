// What the app imports: nothing of Node, so Metro can take it.

/** What the config plugin puts in the app config's `extra.backtick`. */
export type BacktickExtra = {
  // the installed version of each of the app's dependencies, by package
  installedPackages: Readonly<Record<string, string>>;
};

/**
 * What the config plugin recorded, from the app config Expo embeds: throws as
 * the app starts if the plugin isn't in app.json, or what's there isn't its.
 *
 *     const { installedPackages } = getBacktickExtra(Constants.expoConfig);
 *     const modules = JSON.stringify(modulesOf(moduleMap, installedPackages));
 */
export function getBacktickExtra(
  expoConfig: { extra?: Record<string, unknown> } | null | undefined,
): BacktickExtra {
  const backtick = expoConfig?.extra?.backtick as
    | { installedPackages?: unknown }
    | undefined;
  if (backtick === undefined) {
    throw new Error(
      "No extra.backtick in the app config: is @backtickjs/expo in app.json's plugins?",
    );
  }
  const { installedPackages } = backtick;
  if (
    typeof installedPackages !== "object" ||
    installedPackages === null ||
    Array.isArray(installedPackages) ||
    !Object.values(installedPackages).every(
      (version) => typeof version === "string",
    )
  ) {
    throw new Error(
      "extra.backtick.installedPackages isn't { package: version }: is it written by @backtickjs/expo?",
    );
  }
  return { installedPackages: installedPackages as Record<string, string> };
}
