# shell

Backtick on phones, as its own app: it signs the user in, and every screen it shows comes from a server, Backtick's own included. Laid out as `create-backtick-app` makes any app:

| Folder    | What it is                                                                                                                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `client/` | The Expo app, kept thin: its entry (`index.tsx`, `Shell.tsx`), the session and the links that are the shell's own commands (`links.ts`), Backtick's splash, and the home drawn from its server (`Home.tsx`), with Retry if it doesn't open |
| `server/` | Backtick's home, deployed by `apps/app.backtickjs.com`: sign-in, the app list, an app's source, and the apps themselves                                                                                                                    |

The shell's client fetches `https://app.backtickjs.com/` and draws it, with a runtime of its own each time (`backtick.create()`, from `client/backtick.ts`), so nothing of a signed-out user is kept. Everything else is the home's, sent by its server (`server/navigator.tsx`): a React Navigation stack of the app list, an app's source, and an app, which it opens with a runtime of its own (`$runtime.create()`) from `https://<appId>.backtickjs.app/`, drawn in its own navigation tree. The home also follows links into apps and captures each app's preview. The module map (`client/backtick.ts`) hands screens unmodified packages, React Navigation's among them; not expo-router, which would be the shell's own router.

Links into the phone are the Backtick app's: `backtick://<path>`, written by `shellURL` (`server/links.ts`), and an app's own address, `https://<appId>.backtickjs.app/<path>`, as a verified App Link.

| Link                                                       | Does                                                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `backtick://<appId>/…`, `https://<appId>.backtickjs.app/…` | The home opens the app over its list                                                       |
| `backtick://sign-in`, `sign-out`                           | Signs in while signed out; asks, then signs out                                            |
| `backtick://delete-account`                                | Asks, then deletes the account (`POST /account/delete` on the home's server) and signs out |

Sign-in and the session are the native module's (`modules/backtick-session`): sign-in in the system's sign-in browser at `auth.backtickjs.com` (OAuth 2.1 for native apps, with PKCE and DPoP), a key that never leaves the phone, and access tokens attached to requests to Backtick's own hosts below JavaScript. Its return, `https://app.backtickjs.com/signed-in`, is caught by the module, never by these links.

## Publishing it

The shell is its own app, built with EAS (`eas.json`). The profiles differ by the JavaScript a build runs and who it's for:

| Profile             | Runs                                                  | For                                                                 |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| `development`       | JavaScript from Metro on this Mac (Debug)             | working on the shell: an iOS simulator app, an Android APK over USB |
| `preview`           | its own JavaScript, then production updates (Release) | trying what users get on your own phones before a release           |
| `preview-simulator` | the same, on the iOS simulator                        | the same, and the store's screenshots                               |
| `production`        | its own JavaScript, then production updates (Release) | the stores                                                          |

```sh
pnpm dlx eas-cli build -p ios --profile development
```

A Debug build doesn't take updates; the others take EAS Update's `production` channel. EAS Update ships JavaScript changes to builds of the same runtime version on the same channel. The runtime version is Expo's fingerprint of the native side (`"policy": "fingerprint"` in `app.json`): native dependencies, the session module, config plugins and the native settings in `app.json`. A change to any of them gives the next build a new runtime version, and updates published after it reach only builds that have it; `eas fingerprint:compare` shows what changed.

A build signed by EAS is the only kind that can finish signing in: `app.backtickjs.com` vouches for EAS's certificate.

The store's Android build runs on this machine, `pnpm build:android` (`--profile production --local`): EAS's free cloud workers run out of memory on it. `production` caps Gradle's memory (3 GB, the Kotlin compiler 1.5 GB) and runs one task at a time, and the script runs it at background priority, so the Mac stays usable; it takes longer. It's signed with EAS's keystore, like the cloud builds. Gradle needs `ANDROID_HOME` (Homebrew's SDK is `/opt/homebrew/share/android-commandlinetools`) and a JDK 17 as `JAVA_HOME`, both set in the shell that runs it.

For iOS, run it with `EXPO_NO_CAPABILITY_SYNC=1`: the App ID's capabilities (Sign in with Apple, Associated Domains) are set in Apple's developer console, and EAS would otherwise turn Sign in with Apple off, since the app signs in with Apple on the web rather than with its native API. Apple refuses that anyway: the sign-in Services ID, `com.backtickjs.app.signin`, depends on it.

## What other projects import

The shell is a workspace package too. `pnpm build` (`tsconfig.server.json`, with `tspc`) writes `build/`, which its `package.json` exports:

| Import           | What it is                                                                                                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shell/screens`  | Backtick's own screens (`server/`), compiled: what `apps/app.backtickjs.com` serves                                                                                                 |
| `shell/backtick` | The shell's runtime (`client/backtick.ts`), read in Node without loading a module: its `modules` are what `apps/mcp.backtickjs.com` lets an app import, at the versions phones send |

Not `dist/`: that's where `eas update` exports the app. `pnpm typecheck` checks the client and the server.
