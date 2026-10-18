// What the app imports: nothing of Node, so its bundler can take it.

/**
 * The modules this build carries on `platform`, from the app config's
 * `extra.backtick`, where the `@backtickjs/builds/expo` config plugin puts them: as
 * JSON, for the app to send however it reaches its server, a header, a
 * GraphQL variable, and the server to bundle screens it can run. Throws for
 * an app config without them, as the app starts: no screen could be drawn
 * for a build that doesn't say what it has.
 *
 *     const modules = modulesFrom(Constants.expoConfig?.extra, Platform.OS);
 */
export function modulesFrom(extra: unknown, platform: string): string {
  const modules = (
    extra as { backtick?: { modules?: Record<string, unknown> } } | undefined
  )?.backtick?.modules?.[platform];
  if (typeof modules !== "object" || modules === null) {
    throw new Error(
      `No modules for ${platform} in the app config: is @backtickjs/builds/expo in app.json's plugins?`,
    );
  }
  return JSON.stringify(modules);
}
