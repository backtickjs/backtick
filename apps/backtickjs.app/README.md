# backtickjs.app

Each app at its own host, `https://<id>.backtickjs.app`, as each Vercel project is at `<project>.vercel.app`. One of the hosts in `apps/` (see `apps/README.md`).

| Request                                                                    | Answer                                                                                                                       |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| The phone, at `<id>.backtickjs.app/<path>` (it sends `x-backtick-modules`) | The app's screen: the app's latest release, loaded into an isolate of its own, answers the path for the phone's modules      |
| A browser, at `<id>.backtickjs.app/<path>`                                 | A page with **Open in Expo Go**, a link to the shell's `exp://u.expo.dev/<project>/--/<id>/<path>`, and where to get Expo Go |
| `backtickjs.app/`                                                          | A redirect to backtickjs.com                                                                                                 |

The address is the app's share link: `https://<id>.backtickjs.app/day` offers the app at `/day`, in Expo Go. And a path is the app's own: the app's server answers `/day` at `/day`.

Users' code runs on this domain, so it holds no secrets. A Cloudflare Worker (`src/index.ts`) answers the phone:

1. It reads the app's latest version from Supabase with the phone's own token. Row-level security answers only the owner's apps, and Supabase refuses a missing or expired token, which is the phone's 401.
2. It loads that version's release (`versions.compiled`, which `save_app` writes) with the Dynamic Worker Loader, as `<id>@<version>`, into an isolate of its own. The code comes from this data center's Cache API, or from Supabase the first time, and is kept: a release never changes.
3. It hands the release the path and `x-backtick-modules`, never the token, and no network of its own. The release's Hono server answers: the screen, a 426 for a module the phone lacks, a 404 for a path with no route.

`backtickjs.app` goes on the Public Suffix List, so each app is its own site in a browser, apart from the others and from Backtick's sign-in.

## Setting up

`wrangler.jsonc` names the Worker, `backtickjs-app`, its loader binding, and Supabase's URL and publishable key, which are public. `pnpm dev` runs it on this machine; a phone's request is one with its host, `curl -H "Host: <id>.backtickjs.app" localhost:8787/`. `pnpm run deploy` deploys it.

`pnpm test` checks its routing, with Supabase, the cache and the loader stubbed.
