# apps

What runs Backtick, one folder per host, laid out as Vercel's own is: `vercel.com` is Vercel's, and `<project>.vercel.app` is each user's project. Here `backtickjs.com` is Backtick's, and `<id>.backtickjs.app` is each app. None of it is published to npm.

| Folder                                       | Serves                        | What it is                                                                                                                                                                                                          |
| -------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`backtickjs.dev`](backtickjs.dev)           | `https://backtickjs.dev`      | The framework's website and docs, a Vercel Function: Hono routes whose pages are Solid scripts, cached by Vercel's CDN until the next deploy.                                                                       |
| [`backtickjs.com`](backtickjs.com)           | `https://backtickjs.com`      | Backtick's own site: what the app is, download, support, privacy and terms, and redirects to the docs on backtickjs.dev. A Vercel Function, built as backtickjs.dev is.                                             |
| [`mcp.backtickjs.com`](mcp.backtickjs.com)   | `https://mcp.backtickjs.com`  | The service: the MCP server Claude and ChatGPT connect to, sign-in for it, the build sandbox that checks apps and compiles their releases, the database's schema. Holds the secrets.                                |
| [`auth.backtickjs.com`](auth.backtickjs.com) | `https://auth.backtickjs.com` | The Backtick app's sign-in: an OAuth 2.1 authorization server (PKCE, DPoP, tokens for one origin each) and the sign-in page.                                                                                        |
| [`app.backtickjs.com`](app.backtickjs.com)   | `https://app.backtickjs.com`  | Backtick's own screens on the phone (sign-in, the app list), from `shell/server`.                                                                                                                                   |
| [`backtickjs.app`](backtickjs.app)           | `https://<id>.backtickjs.app` | Each app at its own host, a Cloudflare Worker: its screens for the phone, each from the app's release in an isolate of its own, and a page to open it for a browser. Users' code runs here, so it holds no secrets. |
| [`shell`](shell)                             | the phone                     | Backtick on phones: the Backtick app, a shell that shows every screen from those hosts. `client/` is the Expo app, `server/` its own screens.                                                                       |
| [`vscode-extension`](vscode-extension)       | the editor                    | Backtick's VS Code extension.                                                                                                                                                                                       |

A path on the phone is the path on the server: an app's `<Link href="/day">` is its `app.get("/day")`, fetched from `https://<id>.backtickjs.app/day`. The app is the host, never a prefix. The reasons, and what each host costs to run, are in `docs/backtick_app_rebuild_plan.md`, section 4.3.

How a screen reaches the phone:

```
phone ── GET https://app.backtickjs.com/ ─────────────────► app.backtickjs.com: Backtick's home (sign-in, your apps)
phone ── GET https://<id>.backtickjs.app/day ─────────────► backtickjs.app (Cloudflare): the latest version from Supabase,
                                                             as the phone's user; its release answers /day in an isolate
Claude ── MCP ────────────────────────────────────────────► mcp.backtickjs.com: new_app, get_app, save_app (each save
                                                             checks the app and stores its release in Supabase)
```

## Deploying

A push to `main` deploys every Vercel host it changes: each is a Vercel project connected to this repo, with its folder as its root directory. Vercel skips a host when neither its folder, nor a workspace package it depends on, nor its part of the lockfile changed; a change outside the workspace (a root file) deploys them all. Each production deployment goes live only once CI's `check` job passes on its commit (a Deployment Check, 30 minutes at most); a pull request gets a preview of each host it changes.

So `main` must always be safe to ship as it is:

1. A migration is applied (`supabase db push`, `mcp.backtickjs.com`) before the commit that needs it reaches `main`, or the code works with and without it.
2. A new build sandbox snapshot (`mcp.backtickjs.com`, after a `@backtickjs/*` release) is made and set as `SNAPSHOT_ID` before the commit that expects it.
3. A secret, a variable or DNS a commit needs is set before it's pushed.

Vercel's settings for this live in each project: the connection, "skip unaffected projects" (`enableAffectedProjectsDeployments`) and the `CI` check.

`backtickjs.app` deploys the same way from Cloudflare (Workers Builds on the Worker `backtickjs-app`): a push to `main` that changes its folder or the lockfile runs `pnpm run deploy` there. Unlike Vercel, Cloudflare doesn't wait for CI: the commit goes live as soon as Wrangler deploys it.
