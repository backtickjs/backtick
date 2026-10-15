// What the app imports: nothing of Node, so its bundler can take it.

/**
 * This build's id on `platform`, from the app config's `extra`, where the
 * `@backtickjs/builds/expo` config plugin puts `buildIds`: it names the
 * modules the build carries, for the server to bundle screens it can run.
 * Send it however the app reaches its server: a header, a GraphQL variable.
 * Throws for an app config without it, as the app starts: no screen could be
 * drawn for a build without an id.
 *
 *     const buildId = buildIdFrom(Constants.expoConfig?.extra, Platform.OS);
 */
export function buildIdFrom(extra: unknown, platform: string): string {
  const ids = (extra as { buildIds?: Record<string, unknown> } | undefined)
    ?.buildIds;
  const id = ids?.[platform];
  if (typeof id !== "string") {
    throw new Error(
      `No build id for ${platform} in the app config: is @backtickjs/builds/expo in app.json's plugins?`,
    );
  }
  return id;
}
