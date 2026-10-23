# app.backtickjs.com

Backtick's own screens on the phone, at `https://app.backtickjs.com`: what the phone shows when no app is open. One of the hosts in `apps/` (see `apps/README.md`).

The screens are written in [`apps/shell/server`](../shell/server), beside the phone app that shows them, as `create-backtick-app` lays out any app: `client/` and `server/`. This folder only deploys them:

- `shell/` builds `apps/shell/server` with `tspc` into `shell/dist/`, with the React and Expo plugins its `package.json` names. The client imports' versions come from `apps/shell`, the phone's own packages.
- `src/index.ts` is the Vercel Function: that server, as it is.

| Path | Screen                                                            |
| ---- | ----------------------------------------------------------------- |
| `/`  | Sign-in, for a request without a token; the user's apps, with one |

A token is checked by Supabase itself: the app list reads the user's apps as the user, through Supabase's row-level security, so this holds no secret key.

## Setting up

A Vercel project with this folder as its root directory, the domain `app.backtickjs.com`, and these variables:

| Variable                   | What it is                                     |
| -------------------------- | ---------------------------------------------- |
| `SUPABASE_URL`             | The project's URL, `https://<ref>.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | Supabase's publishable key. Safe in a phone.   |

It's the Vercel project `app-backtickjs-com`, linked from this folder, and not connected to GitHub: it's deployed from this machine.

```sh
pnpm run deploy
```

`scripts/deploy.sh` builds it here (`vercel build`), since it compiles `apps/shell/server`, outside this folder, which Vercel's own build can't see; then deploys the prebuilt output from the repo's root (`vercel deploy --prebuilt`), where its file paths start, naming the project by its ids. It cleans up after itself.

`pnpm typecheck` builds and checks it. To try a screen without the phone, send a request with the phone's modules:

```sh
curl -H 'x-backtick-modules: {"react":"19.2.3","react/jsx-runtime":"19.2.3","react-native":"0.86.3","expo-router":"57.0.28","react-native-safe-area-context":"5.7.0"}' https://app.backtickjs.com/
```
