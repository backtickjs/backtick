import { createHash } from "node:crypto";
import { client } from "@backtickjs/web-sdk";
import { styles } from "./styles.js";

// Each file is asked for at a name that says what it holds, so a rebuilt file is
// a name no cache has an old answer for. Pages serves what it is given with a
// short cache of its own; this is what keeps a stale client out of a browser's.
function stamp(name: string, extension: string, source: string): string {
  const hash = createHash("sha256").update(source, "utf8").digest("hex");
  return `/${name}-${hash.slice(0, 16)}.${extension}`;
}

// The client's hash is the one it published for itself, not one taken again
// here — same bytes, and one place that decides what naming them means.
export const clientUrl = `/client-${client.sha256.slice(0, 16)}.js`;
export const styleUrl = stamp("styles", "css", styles);

// What `build.mjs` writes beside the document. A `/`-rooted url and a file in
// the published directory are the same name, which is why the paths are built
// here rather than twice.
export const files: readonly { url: string; source: string }[] = [
  { url: clientUrl, source: client.source },
  { url: styleUrl, source: styles },
];
