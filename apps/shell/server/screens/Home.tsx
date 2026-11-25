import { cs } from "@backtickjs/core";
import { connectionsOf, failed, supabase } from "../account.js";
import { Apps } from "./Apps.js";

// A card's preview until its app has been opened on the phone, which captures
// one (client/preview.ts).
const noPreview = `${process.env.SUPABASE_URL}/storage/v1/object/public/screenshots/no-preview.png`;

// The home's apps screen, from the server: the user's own apps, none they
// deleted, with their previews, and who's signed in; drawn by Apps
// (home/Apps.tsx).
export async function Home(props: { user: string; modules: string }) {
  // An app still at its starter, with no saved version, isn't one yet.
  const { data, error } = await supabase()
    .from("apps")
    .select("id, title, created_at, versions!inner(version, created_at)")
    .eq("owner_id", props.user)
    .is("deleted_at", null);
  if (error) {
    throw failed(error);
  }
  // Who's signed in, for the avatar: Apple's or Google's sign-in put the name
  // and picture in the user's metadata.
  const profile = await supabase().auth.admin.getUserById(props.user);
  if (profile.error) {
    throw failed(profile.error);
  }
  // The modules the phone offers, as it sent them, for its debug info.
  let modules: Record<string, string> = {};
  try {
    modules = JSON.parse(props.modules);
  } catch {}
  const metadata = profile.data.user.user_metadata ?? {};
  const account = {
    name: String(metadata.full_name ?? metadata.name ?? ""),
    email: profile.data.user.email ?? "",
    picture: (metadata.avatar_url ?? metadata.picture ?? null) as string | null,
  };
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
  // The user's assistants, and the one New and Edit open: read each time
  // the home loads.
  const { connected, assistant } = await connectionsOf(props.user);
  const claude = connected.includes("claude");
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

  return cs`(
    <$Apps
      apps={$apps}
      account={$account}
      modules={$modules}
      claude={$claude}
      assistant={$assistant}
    />
  )`;
}
