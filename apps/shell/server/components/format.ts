import { cs } from "@backtickjs/core";

export const date = cs`(iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })`;

// "2h ago", or the date once it's a month old.
export const ago = cs`(iso: string) => {
  const minutes = (Date.now() - Date.parse(iso)) / 60000;
  if (minutes < 1) return "just now";
  if (minutes < 60) return Math.floor(minutes) + "m ago";
  if (minutes < 60 * 24) return Math.floor(minutes / 60) + "h ago";
  if (minutes < 60 * 24 * 30) return Math.floor(minutes / 60 / 24) + "d ago";
  return $date(iso);
}`;
