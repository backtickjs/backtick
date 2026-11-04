# shell

Backtick on phones, as its own app: it signs the user in, and every screen it shows comes from a server, Backtick's own included. Laid out as `create-backtick-app` makes any app:

| Folder        | What it is                                                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `client/`     | The Expo app: the session, the screen stack, fetching and running screens, and nothing drawn of its own but errors                                                                                                 |
| `client/app/` | Its routes (expo-router, `app.json`'s `root`): `(home)/` is Backtick's screens and `(app)/` a navigator per app opened, each run by `client/AppLayout.tsx`; `+native-intent.tsx` handles every link into the shell |
| `server/`     | Backtick's own screens: sign-in and the app list. Deployed by `apps/app.backtickjs.com`                                                                                                                            |

Where a screen comes from (`client/screens.ts`):

| Open app              | Path          | Fetched from                             |
| --------------------- | ------------- | ---------------------------------------- |
| none: Backtick's home | `/`           | `https://app.backtickjs.com/`            |
| `<id>`                | `/day?week=2` | `https://<id>.backtickjs.app/day?week=2` |

The path is never changed: an app's `<Link href="/day">` is its server's `app.get("/day")`, and expo-router works in its screens as its docs say. Navigating to a path fetches it, and the screen on top stays until it arrives, as in a browser: expo-router dispatches every navigation in a transition (`router.setTransitionMode("always")`), and the navigator's layout (`client/AppLayout.tsx`) suspends while the screen is fetched. Each route shows what its layout fetched (`client/Document.tsx`); the progress bar (`client/Progress.tsx`) reads expo-router's `unstable_useIsNavigating()`. An app's web app manifest comes with each of its screens (`x-backtick-manifest`), and the last one is kept on the phone (`client/manifest.ts`) for the splash an open shows (`client/AppSplash.tsx`). The module map (`client/moduleMap.ts`) hands screens unmodified packages only.

Links into the shell (`client/app/+native-intent.tsx`) are the Backtick app's own: `backtick://<path>`, written by `shellURL` (`server/links.ts`), and an app's own address, `https://<id>.backtickjs.app/<path>`, as a verified App Link.

| Link                             | Does                                                            |
| -------------------------------- | --------------------------------------------------------------- |
| `backtick://<id>/<path>`         | Closes what's open and opens the app at the path, over the home |
| `backtick://sign-in`, `sign-out` | Signs in while signed out; asks, then signs out                 |
| `backtick://reload`              | Loads the screen on top again, in place                         |

Sign-in and the session are the native module's (`modules/backtick-session`): sign-in in the system's sign-in browser at `auth.backtickjs.com` (OAuth 2.1 for native apps, with PKCE and DPoP), a key that never leaves the phone, and access tokens attached to requests to Backtick's own hosts below JavaScript. Its return, `https://app.backtickjs.com/signed-in`, is caught by the module, never by these links.

## Publishing it

The shell is its own app, built with EAS (`eas.json`): `development` builds an Android APK on its own update channel, for testing. EAS Update ships JavaScript changes to builds of the same runtime version (`runtimeVersion` in `app.json`, set by hand) on the same channel. A change to native code (a dependency with native code, the session module, a config plugin, the SDK) needs a new build and a new runtime version; `pnpm test` fails until it has one (`native.json` records the native side; `UPDATE=1 pnpm test` rewrites it).

```sh
pnpm dlx eas-cli build -p android --profile development --local
```

Without `--local`, EAS builds it in the cloud. A build signed by EAS is the only kind that can finish signing in: `app.backtickjs.com` vouches for EAS's certificate.

## What other projects import

The shell is a workspace package too. `pnpm build` (`tsconfig.server.json`, with `tspc`) writes `build/`, which its `package.json` exports:

| Import          | What it is                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shell/screens` | Backtick's own screens (`server/`), compiled: what `apps/app.backtickjs.com` serves                                                                           |
| `shell/modules` | The module map's names (`client/modules.ts`), as data: what `apps/mcp.backtickjs.com` lets an app import. `moduleMap.ts` must match it, or it won't typecheck |

Not `dist/`: that's where `eas update` exports the app. `pnpm typecheck` checks the client and the server.
