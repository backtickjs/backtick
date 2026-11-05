# backtickjs.com

Backtick's own site, at `https://backtickjs.com`: what the Backtick app is, where to get it, and what the stores and the connector directory link to. One of the hosts in `apps/` (see `apps/README.md`). The framework's site is `backtickjs.dev`.

| Path         | Page                                                                                 |
| ------------ | ------------------------------------------------------------------------------------ |
| `/`          | What Backtick is and how it works; the home page Google's sign-in names              |
| `/download/` | Where each phone installs Backtick from (`src/pages/Download.tsx` names the links)   |
| `/support/`  | Help, and the contact address                                                        |
| `/privacy/`  | The privacy policy                                                                   |
| `/terms/`    | The terms of service                                                                 |
| `/docs/*`    | A redirect to the same path on backtickjs.dev, where the docs moved, as `/llms*.txt` |

It's built as backtickjs.dev is: Hono routes (`src/app.tsx`) whose pages are Solid scripts. `pnpm build` compiles `src/` into `dist/` with `tspc` and writes the CSS (`src/css.ts`); `server.ts` is the Vercel Function; Vercel serves `public/` from its CDN, and keeps each page until the next deploy. `pnpm start` serves it on `http://localhost:4321`, again on each save.

## Setting up

The Vercel project `backtickjs-com`, with this folder as its root directory and the domains `backtickjs.com` and `www.backtickjs.com` (redirected to it). A push to `main` deploys it (see `apps/README.md`, Deploying).
