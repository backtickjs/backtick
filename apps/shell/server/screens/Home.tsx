import { cs } from "@backtickjs/core";
import { accountOf, failed, supabase } from "../account.js";
import { Apps } from "./Apps.js";

// A card's preview until its app has been opened on the phone, which captures
// one (client/preview.ts).
const noPreview = `${process.env.SUPABASE_URL}/storage/v1/object/public/screenshots/no-preview.png`;

// The home's apps screen, from the server: the user's own apps, none they
// deleted, with their previews, and who's signed in; drawn by Apps
// (home/Apps.tsx).
export async function Home(props: { user: string }) {
  // An app still at its starter, with no saved version, isn't one yet.
  const { data, error } = await supabase()
    .from("apps")
    .select("id, title, created_at, versions!inner(version, created_at)")
    .eq("owner_id", props.user)
    .is("deleted_at", null);
  if (error) {
    throw failed(error);
  }
  const account = await accountOf(props.user);
  // Each app's preview, private to the user, through a link signed for an
  // hour: none for an app never opened. A link is new on every load, so the
  // phone caches a preview by its app and when it was captured instead.
  const { data: previews } = await supabase()
    .storage.from("previews")
    .createSignedUrls(
      data.map(({ id }) => `${props.user}/${id}.jpg`),
      60 * 60,
    );
  const { data: files } = await supabase()
    .storage.from("previews")
    .list(props.user, { limit: 1000 });
  const captured = new Map(
    (files ?? []).map((file) => [file.name, file.updated_at]),
  );
  const apps = data
    .map(({ id, title, created_at, versions }, index) => {
      const latest = versions.reduce((a, b) => (b.version > a.version ? b : a));
      return {
        id,
        title,
        createdAt: created_at,
        version: latest.version,
        savedAt: latest.created_at,
        screenshot: previews?.[index]?.signedUrl
          ? {
              uri: previews[index].signedUrl,
              cacheKey: `${id}@${captured.get(`${id}.jpg`)}`,
            }
          : { uri: noPreview, cacheKey: "no-preview" },
      };
    })
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt));

  return cs`<$Apps apps={$apps} account={$account} />`;
}
