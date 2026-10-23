# mobile

The Backtick app for phones. It's a shell, like a browser: it signs the user in, and every screen it shows comes from a server, Backtick's own included. Laid out as `create-backtick-app` makes any app:

| Folder        | What it is                                                                                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client/`     | The Expo app: the session, the screen stack, fetching and running screens, and nothing drawn of its own but errors and the new-version snackbar                             |
| `client/app/` | Its routes (expo-router, `app.json`'s `root`): `index.tsx` and `[...path].tsx` show the open app's screen at any path; `+native-intent.tsx` handles every link into the app |
| `server/`     | Backtick's own screens: sign-in and the app list. Deployed by `apps/app.backtickjs.com`                                                                                     |

Where a screen comes from (`client/screens.ts`):

| Open app              | Path          | Fetched from                             |
| --------------------- | ------------- | ---------------------------------------- |
| none: Backtick's home | `/`           | `https://app.backtickjs.com/`            |
| `<id>`                | `/day?week=2` | `https://<id>.backtickjs.app/day?week=2` |

The path is never changed: an app's `<Link href="/day">` is its server's `app.get("/day")`, and expo-router works in its screens as its docs say. The module map (`client/moduleMap.ts`) hands screens unmodified packages only.

Links into the app (`client/app/+native-intent.tsx`):

| Link                                                           | Does                                                                            |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `backtick://<id>/<path>`, `https://<id>.backtickjs.app/<path>` | Opens the app at the path                                                       |
| `backtick://sign-in`, `backtick://sign-out`                    | Signs in or out, from Backtick's home only                                      |
| `backtick://auth/callback?code=…`                              | Finishes Google's sign-in, when the browser didn't hand it back by the App Link |

Sign-in is Google's, through Supabase, in the system browser with PKCE; the session is sealed with AES-GCM, its key in the Keychain or Keystore. It returns by an App Link, `https://api.backtickjs.com/auth/callback`.

## Running it

It needs a development build (`eas.json`'s `development` profile): it claims `backtick://` and its App Links, and uses native modules Expo Go doesn't have.

```sh
pnpm dlx eas-cli build -p android --profile development
pnpm start
```

`pnpm typecheck` checks the client and the server.
