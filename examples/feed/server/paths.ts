// Each route's path, from its params. A route is its path of its params'
// names, `itemPath(":id")`, typed `"/items/:id"` so Hono knows its params,
// and the phone is handed paths made here, so a route and the paths to it
// can't disagree.
export const pagePath = <Page extends string>(page: Page) =>
  `/pages/${page}` as const;
export const itemPath = <Id extends string>(id: Id) => `/items/${id}` as const;
export const likesPath = <Id extends string>(id: Id) =>
  `${itemPath(id)}/likes` as const;
export const commentsPath = <Id extends string>(id: Id) =>
  `${itemPath(id)}/comments` as const;
