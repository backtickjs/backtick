# A feed, served by Backtick

A feed for iOS and Android whose pages and items each come from their own route. The feed knows only its items' ids. Each item is a post, a photo or a poll, with its own layout and state, sent by `GET /items/:id` when the feed asks for it. The app ships neither, so a new kind of item reaches every phone when you deploy, without the feed changing.

Everything the app loads after the first screen is a [TanStack Query](https://tanstack.com/query) query keyed by its path, and every answer is a bundle the app runs. Backtick adds no protocol and no cache: the routes are ordinary routes, and React Query is the cache.

Made with `create-backtick-app`, from its React Native template.

## Run it

```sh
npm install
npm start
```

`npm start` runs the server and Expo side by side. Open the app in Expo Go, then edit an item in `server/items.ts` or its look in `server/Item.tsx` and save: the app reloads with it. The feed has 200 items, 3 to a page: the first 7 are written out in `server/items.ts`, and the server makes up the rest from their number. The next page loads as you scroll near the end, or with Load more. `npm run web` shows the same feed in a browser.

## Where things are

- `server/paths.ts`: each route's path, from its params. A route is written as its path of its params' names, `app.get(itemPath(":id"), …)`, and the phone never builds a path: it's handed the ones made here. A route and the paths to it can't disagree.
- `server/app.tsx`: the routes, one per path. Reads are GETs and writes are POSTs, so a like sent as a GET finds no route.
  - `GET /` draws the feed, and `GET /pages/:page` answers a page of it: each item's path, where to like it and its likes, and the path of the next page.
  - `GET /items/:id` answers with the client component that draws the item, one per kind, so its bundle carries only its own.
  - `POST /items/:id/likes` counts a like, and answers with the new count.
  - `GET /items/:id/comments` answers a post's comments, and `POST` to the same path adds one.
- `server/Item.tsx`: what each item route answers, and the query and mutation options for it, next to it. A post is answered with its comments' path written in. `commentMutation` refetches the comments it changed: its `onSuccess` invalidates the query of the path it posted to.
- `server/cache.ts`: `cacheOf(answers)`, answers the server already has, by path, as React Query's cache holds them. The screen hands them to `<$HydrationBoundary>`, so they draw without a request.
- `server/Feed.tsx`: the feed. The screen at `/` comes with the first page, its items and a post's comments already answered, by the same functions as their routes, so the first screen is one request. On the phone, `$useSuspenseInfiniteQuery($feedQuery)` reads its pages, each fetched at the path the last one named. Each item is `$useSuspenseQuery($itemQuery(item.path))`, suspended until its route answers, then drawn with the feed's props: whether it's liked, how many likes, and what a tap does. An item that couldn't load shows its own error, and the others still draw.
- `client/connection.ts`: how the app talks to the server. `fetchBundle(path)` fetches a path with this build's id, so the server bundles for the modules the build carries, and runs the answer with `execRoot`. `createQueryClient()` makes it the default for every query, by its key's path or its page's, and for every mutation, which is sent a path and a body to POST.
- `client/moduleMap.ts`: `@tanstack/react-query` is listed, so the screen and every answer use the app's one copy, and so its one `QueryClient`.

## Tests

`npm test` draws `/` through the server's own routes, as the app does. It checks that:

- the first page, its items and their comments draw from the screen alone, one request;
- the next page's items each come from a GET of their path;
- the next page comes from the path the last one named, and the last page names none;
- a like is counted on the server and handed to the item as props, without fetching it again;
- a comment is added on the server, and its item's comments, and nothing else, are fetched again;
- a poll's vote stays the poll's;
- a like sent as a GET is refused;
- an item that couldn't load shows its error, and the others draw.
