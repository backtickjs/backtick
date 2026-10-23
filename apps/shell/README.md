# shell

Backtick on phones. It's a shell, like a browser, that runs in Expo Go: it signs the user in, and every screen it shows comes from a server, Backtick's own included. Laid out as `create-backtick-app` makes any app:

| Folder        | What it is                                                                                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client/`     | The Expo app: the session, the screen stack, fetching and running screens, and nothing drawn of its own but errors                                                            |
| `client/app/` | Its routes (expo-router, `app.json`'s `root`): `index.tsx` and `[...path].tsx` show the open app's screen at any path; `+native-intent.tsx` handles every link into the shell |
| `server/`     | Backtick's own screens: sign-in and the app list. Deployed by `apps/app.backtickjs.com`                                                                                       |

Where a screen comes from (`client/screens.ts`):

| Open app              | Path          | Fetched from                             |
| --------------------- | ------------- | ---------------------------------------- |
| none: Backtick's home | `/`           | `https://app.backtickjs.com/`            |
| `<id>`                | `/day?week=2` | `https://<id>.backtickjs.app/day?week=2` |

The path is never changed: an app's `<Link href="/day">` is its server's `app.get("/day")`, and expo-router works in its screens as its docs say. The module map (`client/moduleMap.ts`) hands screens unmodified packages only.

Links into the shell (`client/app/+native-intent.tsx`) are Expo Go's own, to the published project: `exp://u.expo.dev/<project>/--/<path>?channel-name=production`, written by `shellURL` (`server/links.ts`). Not `expo-linking`'s `createURL`: Expo Go 58 reports itself as a bare app, and `createURL` then writes a custom scheme Android can't open.

| Path after `--/`       | Does                                                                    |
| ---------------------- | ----------------------------------------------------------------------- |
| `<id>/<path>`          | Opens the app at the path                                               |
| `sign-in`, `sign-out`  | Signs in or out, from Backtick's home only                              |
| `auth/callback?code=…` | Google's sign-in returning, which the browser session hands back itself |

Sign-in is Google's, through Supabase, in the system browser with PKCE (OAuth for native apps, RFC 8252), returning to `auth/callback`; the session is sealed with AES-GCM, its key in the Keychain or Keystore.

## Publishing it

The shell is an EAS Update on the `production` channel, which Expo Go opens from anywhere at `exp://u.expo.dev/baed8ee5-a651-438c-999f-aff346fa0064?channel-name=production`. Its runtime version is the SDK (`exposdk:58.0.0`), and Expo Go only runs updates for its own SDK: when Expo Go moves to a new SDK, upgrade this app (`expo install expo@^<sdk> --fix`) and publish again.

```sh
pnpm dlx eas-cli update --channel production --environment production --message "…"
```

`pnpm start` runs it from this machine in Expo Go instead.

## What other projects import

The shell is a workspace package too. `pnpm build` (`tsconfig.server.json`, with `tspc`) writes `build/`, which its `package.json` exports:

| Import          | What it is                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `shell/screens` | Backtick's own screens (`server/`), compiled: what `apps/app.backtickjs.com` serves                                                                           |
| `shell/modules` | The module map's names (`client/modules.ts`), as data: what `apps/api.backtickjs.com` lets an app import. `moduleMap.ts` must match it, or it won't typecheck |

Not `dist/`: that's where `eas update` exports the app. `pnpm typecheck` checks the client and the server.
