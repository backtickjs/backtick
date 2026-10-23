# app.backtickjs.com

Backtick's own screens on the phone, at `https://app.backtickjs.com`: what the phone shows when no app is open. One of the hosts in `apps/` (see `apps/README.md`).

The screens are written in [`apps/shell/server`](../shell/server), beside the phone app that shows them, as `create-backtick-app` lays out any app: `client/` and `server/`. The shell builds them and exports them as `shell/screens`, a workspace dependency of this folder, which only deploys them: `src/index.ts` is the Vercel Function, that server as it is.

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

It's the Vercel project `app-backtickjs-com`, linked from this folder, and not connected to GitHub: it's deployed from this machine. Vercel builds it from the repo's root, as a monorepo: the project's root directory is this folder, `vercel.json` installs the workspace (`pnpm install` at the root) and builds what this project depends on (`turbo run build --filter=<project>...`). The root's `.vercelignore` keeps this machine's secrets and build output out of the upload. Deploy from the root, naming the project by its ids:

```sh
cd ../..
VERCEL_ORG_ID=$(node -p 'require("./apps/app.backtickjs.com/.vercel/project.json").orgId') \
VERCEL_PROJECT_ID=$(node -p 'require("./apps/app.backtickjs.com/.vercel/project.json").projectId') \
vercel deploy --prod
```

Without `--prod`, a preview to try first.

`pnpm typecheck` checks it, against the shell's build (`pnpm build` in `apps/shell`, which turbo runs first). To try a screen without the phone, send a request with the phone's modules:

```sh
curl -H 'x-backtick-modules: {"react":"19.2.3","react/jsx-runtime":"19.2.3","react-native":"0.86.3","expo-router":"57.0.28","react-native-safe-area-context":"5.7.0"}' https://app.backtickjs.com/
```
