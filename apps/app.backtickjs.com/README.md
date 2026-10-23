# app.backtickjs.com

The Backtick app's own screens, at `https://app.backtickjs.com`: what the phone shows when no app is open. One of the hosts in `apps/` (see `apps/README.md`).

The screens are written in [`apps/mobile/server`](../mobile/server), beside the phone app that shows them, as `create-backtick-app` lays out any app: `client/` and `server/`. This folder only deploys them:

- `mobile/` builds `apps/mobile/server` with `tspc` into `mobile/dist/`, with the React and Expo plugins its `package.json` names. The client imports' versions come from `apps/mobile`, the phone's own packages.
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

`pnpm typecheck` builds and checks it. To try a screen without the phone, send a request with the phone's modules:

```sh
curl -H 'x-backtick-modules: {"react":"19.2.3","react/jsx-runtime":"19.2.3","react-native":"0.86.3","expo-router":"57.0.28","react-native-safe-area-context":"5.7.0"}' https://app.backtickjs.com/
```
