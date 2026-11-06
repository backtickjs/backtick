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

The path is never changed: an app's `<Link href="/day">` is its server's `app.get("/day")`, and expo-router works in its screens as its docs say. Each app, Backtick's home included, renders its own navigator: its root layout, from `/.well-known/backtick/root-layout` (`rootLayout` in `@backtickjs/hono`), an expo-router `Stack` with the app's own options and whatever it puts around it, such as a progress bar on `unstable_useIsNavigating()`. The shell has no navigator of its own (`client/AppLayout.tsx`): it shows Backtick's splash until the root layout and the first screen have arrived, fetches each path navigated to, and passes the root layout the fetch as `navigating`. expo-router dispatches every navigation in a transition (`router.setTransitionMode("always")`), so a root layout that `use()`s it inside its own `Suspense` keeps the screen on top until the next arrives, as in a browser. Each route shows what was fetched for it (`client/Document.tsx`). The module map (`client/moduleMap.ts`) hands screens unmodified packages only.

Links into the shell (`client/app/+native-intent.tsx`) are the Backtick app's own: `backtick://<path>`, written by `shellURL` (`server/links.ts`), and an app's own address, `https://<id>.backtickjs.app/<path>`, as a verified App Link.

| Link                             | Does                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| `backtick://<id>/<path>`         | Closes what's open and opens the app at the path, over the home                            |
| `backtick://sign-in`, `sign-out` | Signs in while signed out; asks, then signs out                                            |
| `backtick://delete-account`      | Asks, then deletes the account (`POST /account/delete` on the home's server) and signs out |
| `backtick://reload`              | Loads the screen on top again, in place                                                    |

Sign-in and the session are the native module's (`modules/backtick-session`): sign-in in the system's sign-in browser at `auth.backtickjs.com` (OAuth 2.1 for native apps, with PKCE and DPoP), a key that never leaves the phone, and access tokens attached to requests to Backtick's own hosts below JavaScript. Its return, `https://app.backtickjs.com/signed-in`, is caught by the module, never by these links.

## Publishing it

The shell is its own app, built with EAS (`eas.json`): `development` builds an Android APK on its own update channel, for testing. EAS Update ships JavaScript changes to builds of the same runtime version on the same channel. The runtime version is Expo's fingerprint of the native side (`"policy": "fingerprint"` in `app.json`): native dependencies, the session module, config plugins and the native settings in `app.json`. A change to any of them gives the next build a new runtime version, and updates published after it reach only builds that have it; `eas fingerprint:compare` shows what changed.

```sh
pnpm dlx eas-cli build -p android --profile development --local
```

Without `--local`, EAS builds it in the cloud. A build signed by EAS is the only kind that can finish signing in: `app.backtickjs.com` vouches for EAS's certificate.

The store's Android build runs on this machine, `pnpm build:android`: EAS's free cloud workers run out of memory on it. Its profile, `production-local`, caps Gradle's memory (3 GB, the Kotlin compiler 1.5 GB) and runs one task at a time, and the script runs it at background priority, so the Mac stays usable; it takes longer. It's signed with EAS's keystore, like the cloud builds.

For iOS, run it with `EXPO_NO_CAPABILITY_SYNC=1`: the App ID's capabilities (Sign in with Apple, Associated Domains) are set in Apple's developer console, and EAS would otherwise turn Sign in with Apple off, since the app signs in with Apple on the web rather than with its native API. Apple refuses that anyway: the sign-in Services ID, `com.backtickjs.app.signin`, depends on it.

## What other projects import

The shell is a workspace package too. `pnpm build` (`tsconfig.server.json`, with `tspc`) writes `build/`, which its `package.json` exports:

| Import          | What it is                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shell/screens` | Backtick's own screens (`server/`), compiled: what `apps/app.backtickjs.com` serves                                                                           |
| `shell/modules` | The module map's names (`client/modules.ts`), as data: what `apps/mcp.backtickjs.com` lets an app import. `moduleMap.ts` must match it, or it won't typecheck |

Not `dist/`: that's where `eas update` exports the app. `pnpm typecheck` checks the client and the server.
