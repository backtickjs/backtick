# apps

What runs Backtick, one folder per host, laid out as Vercel's own is: `vercel.com` is Vercel's, and `<project>.vercel.app` is each user's project. Here `backtickjs.com` is Backtick's, and `<id>.backtickjs.app` is each app. None of it is published to npm.

| Folder                                     | Serves                        | What it is                                                                                                                                                           |
| ------------------------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`backtickjs.com`](backtickjs.com)         | `https://backtickjs.com`      | The website and docs, and the app builder's privacy policy. Built with Bun into static files for GitHub Pages.                                                       |
| [`api.backtickjs.com`](api.backtickjs.com) | `https://api.backtickjs.com`  | The service: the MCP server Claude and ChatGPT connect to, sign-in for it, the build sandbox that checks and bundles apps, the database's schema. Holds the secrets. |
| [`app.backtickjs.com`](app.backtickjs.com) | `https://app.backtickjs.com`  | The Backtick app's own screens (sign-in, the app list), from `mobile/server`.                                                                                        |
| [`backtickjs.app`](backtickjs.app)         | `https://<id>.backtickjs.app` | Each app at its own host: its screens for the phone, a page to open it for a browser. Users' code lives here, so it holds no secrets.                                |
| [`mobile`](mobile)                         | the phone                     | The Backtick app: a shell that shows every screen from those hosts. `client/` is the Expo app, `server/` its own screens.                                            |
| [`vscode-extension`](vscode-extension)     | the editor                    | Backtick's VS Code extension.                                                                                                                                        |

A path on the phone is the path on the server: an app's `<Link href="/day">` is its `app.get("/day")`, fetched from `https://<id>.backtickjs.app/day`. The app is the host, never a prefix. The reasons, and what each host costs to run, are in `docs/backtick_app_rebuild_plan.md`, section 4.3.

How a screen reaches the phone:

```
phone ── GET https://app.backtickjs.com/ ─────────────────► app.backtickjs.com: Backtick's home (sign-in, your apps)
phone ── GET https://<id>.backtickjs.app/day ─────────────► backtickjs.app ── GET /apps/<id>/bundle ──► api.backtickjs.com
                                                                                  (checks the token, bundles in the sandbox)
Claude ── /mcp ───────────────────────────────────────────► api.backtickjs.com: start_app, get_app, save_app
```
