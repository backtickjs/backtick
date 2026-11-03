# auth.backtickjs.com

The Backtick app's sign-in, at `https://auth.backtickjs.com`: an OAuth 2.1 authorization server whose one client is the Backtick app. One of the hosts in `apps/` (see `apps/README.md`). It signs nothing for assistants: Claude and ChatGPT sign in through Supabase's own OAuth server, behind `api.backtickjs.com`.

| Standard                                       | Here                                                                                                                                                                                     |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OAuth 2.1 for native apps (RFC 8252)           | The app opens `/authorize` in the system's sign-in browser and receives the code at `https://app.backtickjs.com/signed-in`, a universal link and verified App Link only the app can open |
| PKCE (RFC 7636)                                | S256 only                                                                                                                                                                                |
| `iss` in the authorization response (RFC 9207) | `https://auth.backtickjs.com`                                                                                                                                                            |
| DPoP (RFC 9449)                                | Every `/token` and `/revoke` request carries a proof by the app's key, with this server's nonce; the code is bound to the key (`dpop_jkt`), and so is the refresh token                  |
| Resource indicators (RFC 8707)                 | An access token is for one origin: Backtick's home, or one app's host                                                                                                                    |
| JWT access tokens (RFC 9068)                   | Five minutes, signed with this server's key, published at `/.well-known/jwks.json`; Backtick's hosts check them, Supabase never sees them                                                |
| Revocation (RFC 7009)                          | `/revoke`                                                                                                                                                                                |
| Metadata (RFC 8414)                            | `/.well-known/oauth-authorization-server`                                                                                                                                                |

## Where the code runs

| Runs in             | Files                           | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The Vercel Function | `src/index.ts`, `src/function/` | The endpoints, the codes and devices in Supabase (with the service role), and the page                                                                                                                                                                                                                                                                                                                                                                                         |
| The browser         | `web/src/`                      | The sign-in page, email only (Apple and Google are the app's own buttons, which skip it): an email, then the six-digit code Supabase sends to it, new accounts included. No passwords anywhere. No Supabase in the browser: the server signs in with Supabase Auth itself (`src/function/supabaseAuth.ts`), with PKCE for Apple and Google. Its one script, Solid included, is a static file built at `pnpm build` (`scripts/page.ts`), under a strict content security policy |
| This machine        | `scripts/`, `test/`             | `pnpm dev`, and the tests                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

The tables (`authorization_codes`, `devices`, `dpop_proofs`) are in the Supabase project's migrations, in `apps/api.backtickjs.com/supabase/migrations`.

## Setting up

A Vercel project with this folder as its root directory, the domain `auth.backtickjs.com`, and these variables:

| Variable                     | What it is                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SUPABASE_URL`               | The project's URL                                                                                                                                      |
| `SUPABASE_PUBLISHABLE_KEY`   | For signing in with Supabase Auth, from the server                                                                                                     |
| `SUPABASE_SERVICE_ROLE_KEY`  | For the codes and devices                                                                                                                              |
| `BACKTICK_SIGNING_JWK`       | This server's private ES256 key, a JWK with a `kid`. To rotate: publish the new key beside the old, sign with the new, drop the old five minutes later |
| `BACKTICK_DPOP_NONCE_SECRET` | Random; signs DPoP nonces, and the cookie a sign-in waits in                                                                                           |
| `BACKTICK_HOME_ORIGIN`       | `https://app.backtickjs.com`                                                                                                                           |
| `BACKTICK_APPS_DOMAIN`       | `backtickjs.app`                                                                                                                                       |

In Supabase: `https://auth.backtickjs.com/authorize**` in the allowed redirect URLs, the Apple, Google and email providers, sign-ups on, emails sent through Resend's SMTP from `sign-in@backtickjs.com`, and the sign-up and magic-link templates showing the code (`{{ .Token }}`), not a link. Secure email change on (both addresses confirm). In Vercel's firewall: rate limits on `/authorize`, `/token` and `/revoke`.
