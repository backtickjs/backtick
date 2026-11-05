# backtickjs.app

Each app at its own host, `https://<id>.backtickjs.app`, as each Vercel project is at `<project>.vercel.app`. One of the hosts in `apps/` (see `apps/README.md`).

| Request                                                                    | Answer                                                                                                                                 |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| The phone, at `<id>.backtickjs.app/<path>` (it sends `x-backtick-modules`) | The app's screen: the app's latest release, loaded into an isolate of its own, answers the path for the phone's modules                |
| A browser, at `<id>.backtickjs.app/<path>`                                 | A page with **Open in Backtick**, a link to `backtick://<id>/<path>`, and where to get Backtick; a computer gets a QR code of the page |
| `backtickjs.app/`                                                          | A redirect to backtickjs.com                                                                                                           |

The address opens the app at the same path in Backtick, for its owner: `https://<id>.backtickjs.app/day` opens it at `/day`. And a path is the app's own: the app's server answers `/day` at `/day`.

Users' code runs on this domain: the Worker's secrets stay in its own environment, and a release is loaded with none of them. A Cloudflare Worker (`src/index.ts`) answers the phone:

1. It checks the phone's access token: issued by `auth.backtickjs.com` (signed with a key it publishes), for this app's own origin, `https://<id>.backtickjs.app`, and not expired. Anything else is the phone's 401. It then reads the app's latest version from Supabase with its own key, only if the app is the token's user's and not deleted.
2. It loads that version's release (`versions.compiled`, which `save_app` writes) with the Dynamic Worker Loader, as `<id>@<version>`, into an isolate of its own. The code comes from this data center's Cache API, or from Supabase the first time, and is kept: a release never changes.
3. It hands the release the path, `x-backtick-modules` and `x-backtick-user`, the user's ID for this app alone (an HMAC of the app and the user, so two apps can't match their users), never the token or the account's ID. The release's Hono server answers: the screen, a 426 for a module the phone lacks, a 404 for a path with no route. Its `fetch()` reaches the internet through `OutboundGateway` (`src/worker.ts`), which logs each call's app and host.

`backtickjs.app` goes on the Public Suffix List, so each app is its own site in a browser, apart from the others and from Backtick's sign-in.

## Setting up

`wrangler.jsonc` names the Worker, `backtickjs-app`, its loader binding, Supabase's URL and the token issuer, which are public. Two secrets, set with `wrangler secret put`: `SUPABASE_SERVICE_ROLE_KEY`, and `BACKTICK_APP_USER_SECRET` (random; changing it changes every app's user IDs). `pnpm dev` runs it on this machine; a phone's request is one with its host, `curl -H "Host: <id>.backtickjs.app" localhost:8787/`. A push to `main` deploys it (see `apps/README.md`, Deploying); `pnpm run deploy` deploys it from this machine.

`pnpm test` checks its routing and its token checks, with the issuer's keys, Supabase, the cache and the loader stubbed.
