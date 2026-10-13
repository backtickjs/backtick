import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { bucket, downloadUrl } from "./firebase.js";
import { Refusal } from "./refusal.js";

// A story's photo, as the website's Cloud Function stores one: two sizes in
// Storage under the author's folder, each read through a download link.

export type StoredPhoto = {
  source: "storage";
  id: string;
  urls: { large: string; small: string };
};

const path = (uid: string, size: "large" | "small", id: string) =>
  `story_photos/${uid}/${size}/${id}`;

/**
 * Stores a photo as it came from the phone, in the website's two sizes: large,
 * at most 2560 on its longer side, and small, 800 wide. Turned upright first,
 * as phones save photos sideways with a note to turn them.
 */
export async function storePhoto(
  uid: string,
  bytes: Buffer,
): Promise<StoredPhoto> {
  const upright = sharp(bytes).rotate();
  let sizes: { large: Buffer; small: Buffer };
  try {
    sizes = {
      large: await upright
        .clone()
        .resize({
          width: 2560,
          height: 2560,
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 82 })
        .toBuffer(),
      small: await upright
        .clone()
        .resize({ width: 800, withoutEnlargement: true })
        .jpeg({ quality: 78 })
        .toBuffer(),
    };
  } catch {
    throw new Refusal("That photo couldn't be read. Try another.");
  }
  const id = randomUUID();
  const urls = { large: "", small: "" };
  for (const size of ["large", "small"] as const) {
    const token = randomUUID();
    await bucket.file(path(uid, size, id)).save(sizes[size], {
      contentType: "image/jpeg",
      metadata: {
        cacheControl: "private,max-age=31536000",
        metadata: { firebaseStorageDownloadTokens: token },
      },
    });
    urls[size] = downloadUrl(path(uid, size, id), token);
  }
  return { source: "storage", id, urls };
}

/**
 * The photo `uid` stored under `id`, as a story records it, or a refusal for
 * one that isn't theirs, or isn't there.
 */
export async function storedPhoto(
  uid: string,
  id: string,
): Promise<StoredPhoto> {
  if (!/^[0-9a-f-]{36}$/.test(id)) {
    throw new Refusal("That photo is gone. Add it again.");
  }
  const urls = { large: "", small: "" };
  for (const size of ["large", "small"] as const) {
    const file = bucket.file(path(uid, size, id));
    const [metadata] = await file.getMetadata().catch(() => [undefined]);
    const token = metadata?.metadata?.firebaseStorageDownloadTokens;
    if (typeof token !== "string") {
      throw new Refusal("That photo is gone. Add it again.");
    }
    urls[size] = downloadUrl(path(uid, size, id), token.split(",")[0]!);
  }
  return { source: "storage", id, urls };
}

/**
 * Deletes both sizes of `uid`'s photo `id`, as the website's Cloud Function
 * does when a story loses its photo: one already gone is no matter.
 */
export async function deletePhoto(uid: string, id: string): Promise<void> {
  await Promise.all(
    (["large", "small"] as const).map((size) =>
      bucket.file(path(uid, size, id)).delete({ ignoreNotFound: true }),
    ),
  );
}
