# backtickjs.app

The server behind Backtick's app builder. A chat app's model (Claude, ChatGPT) calls its MCP tools to make an app for the user's phone, writing Backtick code; this server type-checks the code in a sandbox and stores each clean version in Supabase. It's private and deploys to Vercel as the project `backtickjs-app`.

## Where the code runs

| Runs in             | Files                           | What it does                                                                                                                                             |
| ------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The Vercel Function | `src/index.ts`, `src/function/` | The MCP endpoint: the tools, the store and the client that drives the sandbox. It holds the secrets.                                                     |
| A Vercel Sandbox    | `src/sandbox/`                  | A server on localhost that type-checks an `App.tsx` and bundles it for a phone's modules. It runs the model's code, so it has no secrets and no network. |
| This machine        | `scripts/`, `test/`             | The snapshot, timing and dev scripts, and the tests.                                                                                                     |

Each user gets one sandbox, `build-<user>-<snapshot>`, made from a snapshot of this package and kept for 10 minutes after its last call. `start_app` makes it in the background, so the first `save_app` finds it warm. Its name includes the snapshot, so after a new snapshot no one's sandbox from the old one is reused.

`supabase/migrations/` holds the database's schema: `apps` (made by an app's first save, with its title) and `versions` (one per clean `save_app`, numbered from 1), and `checks` (one per `save_app`, with its errors and warnings; a failed check keeps the source it checked, and is deleted after 30 days).

## The tools

| Tool        | Takes                 | Returns                                                                                                                |
| ----------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `start_app` | nothing               | A new app's id and the starter `App.tsx` (`src/function/starter.ts`) to edit. Saves nothing, so it's marked read-only. |
| `get_app`   | `id`                  | The latest saved version's number and source                                                                           |
| `save_app`  | `id`, `title`, `code` | The type errors to fix, or the new version's number with any warnings. The first save creates the app.                 |

An error stops the save; a warning, such as a regex escaped as if in a string, goes back with the saved version.

## Setting up

Link the Vercel project and the Supabase project from this folder:

```sh
vercel link
pnpm exec supabase login
pnpm exec supabase link
```

The function reads these environment variables, set in the Vercel project for production and development, then pulled into `.env.local` with `vercel env pull`:

| Variable                    | What it is                                                                       |
| --------------------------- | -------------------------------------------------------------------------------- |
| `SUPABASE_URL`              | The project's URL, `https://<ref>.supabase.co`, with nothing after it            |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase's secret key. It bypasses row-level security: keep it in the function.  |
| `SNAPSHOT_ID`               | The sandbox snapshot `scripts/snapshot.ts` printed                               |
| `MCP_SECRET`                | The secret a host sends as `Authorization: Bearer <secret>`, until users sign in |

`VERCEL_OIDC_TOKEN`, which `vercel env pull` also writes, lets the scripts drive sandboxes from this machine. It expires within hours; pull again when a script reports an authentication error.

Vercel stores sensitive variables for production only, so `SUPABASE_SERVICE_ROLE_KEY` and `MCP_SECRET` are added to `.env.local` by hand.

## Running it locally

```sh
pnpm dev
```

It serves the function at `http://localhost:3000/mcp`, against the real sandbox and the real database. To use it from Claude Code:

```sh
claude mcp add --transport http backtick http://localhost:3000/mcp --header "Authorization: Bearer <secret>"
```

`pnpm test` checks the typecheck, the bundle and the sandbox's server on this machine, with no Vercel or Supabase calls.

## Changing the schema

Write a migration, then apply it:

```sh
pnpm exec supabase migration new <name>
pnpm exec supabase db push
```

Don't change tables from Supabase's SQL editor: the database and `supabase/migrations/` would disagree.

## Releasing

The sandbox installs `@backtickjs/*` from npm, so a change to them or to `src/sandbox/` reaches users only through a new snapshot. In this order:

1. Release the `@backtickjs/*` packages, if they changed, and wait until `npm view @backtickjs/compiler version` shows the new version.
2. Make a snapshot. It prints its id:

   ```sh
   node --env-file=.env.local scripts/snapshot.ts
   ```

3. Check it: the four timings print, and the starter's typecheck prints `{ errors: [], warnings: [] }`.

   ```sh
   node --env-file=.env.local scripts/time.ts <snapshot id>
   ```

4. Point the function at it, in production and development:

   ```sh
   vercel env rm SNAPSHOT_ID production --yes
   printf <snapshot id> | vercel env add SNAPSHOT_ID production
   vercel env rm SNAPSHOT_ID development --yes
   printf <snapshot id> | vercel env add SNAPSHOT_ID development
   vercel env pull
   ```

5. Deploy the function, only now: it may expect what the new sandbox answers. Sandboxes from the old snapshot aren't reused, and time out on their own.

   ```sh
   vercel deploy --prod
   ```

6. Delete the previous snapshot once the new one has served for a while. Snapshots don't expire, and storage is billed.

A change to `src/function/` alone needs only step 5.
