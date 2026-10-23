# backtickjs.app

Each app at its own host, `https://<id>.backtickjs.app`, as each Vercel project is at `<project>.vercel.app`. One of the hosts in `apps/` (see `apps/README.md`).

| Request                                                                    | Answer                                                                                                                                                            |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The phone, at `<id>.backtickjs.app/<path>` (it sends `x-backtick-modules`) | The app's screen: the request goes to `api.backtickjs.com/apps/<id>/<path>` with the phone's token, which checks it and runs the app's Hono server in the sandbox |
| A browser, at `<id>.backtickjs.app/<path>`                                 | A page with **Open in Expo Go**, a link to the shell's `exp://u.expo.dev/<project>/--/<id>/<path>`, and where to get Expo Go                                      |
| `backtickjs.app/`                                                          | A redirect to backtickjs.com                                                                                                                                      |

The address is the app's share link: `https://<id>.backtickjs.app/day` offers the app at `/day`, in Expo Go. And a path is the app's own: the app's server answers `/day` at `/day`.

Users' code runs on this domain, so it holds no secrets: the token check, the database and the sandbox are `api.backtickjs.com`'s. `backtickjs.app` goes on the Public Suffix List, so each app is its own site in a browser, apart from the others and from Backtick's sign-in.

Standing in for the runtime (plan, section 10): today the path isn't forwarded, since apps are one screen, and each open bundles in the sandbox.

## Setting up

The Vercel project `backtickjs-app`, linked from this folder, with the domains `backtickjs.app` and `*.backtickjs.app` (a wildcard needs the domain on Vercel's nameservers). It needs no variables: `vercel deploy --prod`.

`pnpm test` checks its routing, with the service's answers stubbed.
