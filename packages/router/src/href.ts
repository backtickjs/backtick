/** A path from the root or a URL, or a path and its params, as expo-router's. */
export type Href =
  | string
  | {
      pathname: string;
      params?: Record<
        string,
        string | number | boolean | readonly string[] | null | undefined
      >;
    };

function encodeParam(value: unknown): string {
  return Array.isArray(value)
    ? value.map(encodeParam).join("/")
    : encodeURIComponent(String(value));
}

/**
 * What expo-router's `resolveHref` gives: `[id]` and `[...rest]` take their
 * params, the others are the query. A leading `//` isn't another host.
 */
export function hrefString(href: Href): string {
  if (typeof href === "string") {
    return isExternal(href) ? href : href.replace(/^\/+/, "/");
  }
  let pathname = href.pathname.replace(/^\/+/, "/");
  const query: string[] = [];
  for (const [name, value] of Object.entries(href.params ?? {})) {
    const key = [`[${name}]`, `[...${name}]`].find((each) =>
      pathname.includes(each),
    );
    if (key !== undefined) {
      pathname = pathname.replace(key, encodeParam(value ?? ""));
    } else if (value !== null && value !== undefined) {
      query.push(`${name}=${encodeURIComponent(value.toString())}`);
    }
  }
  return query.length > 0 ? `${pathname}?${query.join("&")}` : pathname;
}

/** A link's own URL scheme, as `https:` or `mailto:`, leaves the app. */
export function isExternal(href: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(href);
}
