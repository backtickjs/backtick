# backtickjs.dev

The framework's website and docs, at `https://backtickjs.dev`. One of the hosts in `apps/` (see `apps/README.md`).

It's a Backtick app itself: Hono routes (`src/app.tsx`) whose pages are Solid scripts, bundled per page and drawn by Solid in the browser. The docs are the Markdown in `content/`, with examples from `content/examples/` that are typechecked and tested, so what a page shows works. Each page is also served as Markdown for agents, with `/llms.txt` and `/llms-full.txt`.

`pnpm build` compiles `src/` into `dist/` with `tspc` (the pages are scripts) and writes the CSS from the classes the source uses (`src/css.ts`) and the docs' Markdown with the example files it names as one file (`src/content.ts`). `server.ts` is the Vercel Function, the compiled routes as they are; Vercel serves `public/` from its CDN. Every answer carries `s-maxage`, so the CDN keeps each page until the next deploy, which clears it.

`pnpm start` builds and serves it on `http://localhost:4321`, again on each save. `pnpm test` runs the examples' tests.

## Setting up

The Vercel project `backtickjs-dev`, with this folder as its root directory and the domain `backtickjs.dev`. A push to `main` deploys it (see `apps/README.md`, Deploying).
