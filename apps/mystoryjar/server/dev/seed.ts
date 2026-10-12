// Fills the emulators `npm start` runs with an account to sign in as, and a
// year of its stories, in the shape the website writes them. Development
// only: it refuses to run anywhere but the emulators.
import { randomUUID } from "node:crypto";
import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore, Timestamp } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { midnightIn } from "../dates.js";
import { photo } from "./photos.js";

if (process.env.FIRESTORE_EMULATOR_HOST === undefined) {
  throw new Error("The seed writes only to the Firebase emulators.");
}

const bucketName = "demo-mystoryjar.appspot.com";
const app = initializeApp({
  projectId: "demo-mystoryjar",
  storageBucket: bucketName,
});
const firestore = getFirestore(app);

// Who to sign in as in development, under the same uid on every run, so a
// session the phone kept from the last run still finds these stories. Made
// through the Auth emulator's admin API, which takes a uid, as the
// firebase-admin SDK calls it.
const tester = { email: "tester@mystoryjar.com", password: "storyjar" };
const uid = "tester";
const created = await fetch(
  `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/projects/demo-mystoryjar/accounts`,
  {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "Bearer owner",
    },
    body: JSON.stringify({ localId: uid, ...tester }),
  },
);
if (!created.ok) {
  throw new Error(`Couldn't create the tester: ${await created.text()}`);
}

const entries: {
  text: string;
  tags?: string[];
  location?: string;
  favorite?: boolean;
  // one of the scenes in photos.ts
  photo?: string;
}[] = [
  {
    text: "First snow of the year. The kids built a lopsided snowman and named him Gerald.",
    photo: "snow",
    tags: ["family"],
    favorite: true,
  },
  {
    text: "Finally finished the puzzle that's been on the dining table since Christmas. 1,000 pieces, one missing.",
    tags: ["home"],
  },
  {
    text: "Ran 10k without stopping for the first time. Legs are jelly.",
    tags: ["running"],
    location: "Central Park",
    favorite: true,
  },
  {
    text: "Dinner at Nonna's. She made the lasagna and refused to share the recipe again.",
    tags: ["family", "food"],
    location: "Queens",
  },
  {
    text: "Rainy Sunday. Read half a novel and drank too much tea.",
    tags: ["reading"],
  },
  {
    text: "Got the job offer! Starting in three weeks.",
    tags: ["work"],
    favorite: true,
  },
  {
    text: "Planted tomatoes, basil and way too much mint on the balcony.",
    tags: ["garden"],
  },
  {
    text: "Leo lost his first tooth at breakfast and put it in a cereal bowl for safekeeping.",
    tags: ["family"],
    favorite: true,
  },
  {
    text: "Long walk by the river after work. The light was gold for ten whole minutes.",
    photo: "lake",
    location: "Hudson River Park",
  },
  {
    text: "Tried the new ramen place. Worth the forty-minute line.",
    tags: ["food"],
    location: "East Village",
  },
  {
    text: "Power went out during the storm, so we played cards by candlelight.",
    tags: ["family", "home"],
  },
  {
    text: "Saw a heron standing perfectly still in the pond for an hour.",
    tags: ["nature"],
    location: "Prospect Park",
  },
  {
    text: "Called Grandpa for his 90th. He told the same fishing story, and it was still great.",
    tags: ["family"],
    favorite: true,
  },
  {
    text: "Beach day. Sunburnt shoulders, sand in everything, worth it.",
    photo: "sunset",
    tags: ["summer"],
    location: "Rockaway Beach",
  },
  {
    text: "Taught Mia to ride a bike without training wheels. She did one lap and declared herself a pro.",
    tags: ["family"],
    favorite: true,
  },
  {
    text: "Rooftop dinner with old friends. We talked until the neighbours complained.",
    tags: ["friends"],
  },
  {
    text: "First day at the new job. Everyone's kind, the coffee is terrible.",
    tags: ["work"],
  },
  {
    text: "Picked apples upstate and came home with enough for six pies.",
    tags: ["food", "family"],
    location: "Hudson Valley",
  },
  {
    text: "Leaves are turning on our street. Took the long way home just to see them.",
    tags: ["nature"],
  },
  {
    text: "Carved pumpkins. Leo's has three eyes and, he says, a secret.",
    tags: ["family"],
  },
  {
    text: "Quiet morning. Watched the fog lift off the water from the ferry.",
    location: "Staten Island Ferry",
  },
  {
    text: "Hosted Thanksgiving for the first time. The turkey was dry, the company wasn't.",
    tags: ["family", "food"],
    favorite: true,
  },
  { text: "Finished the scarf I started knitting in March.", tags: ["home"] },
  {
    text: "Lights went up on the tree. Mia insisted every ornament face her.",
    tags: ["family", "home"],
  },
  {
    text: "Ran the half marathon. Slow and happy.",
    tags: ["running"],
    location: "Brooklyn",
    favorite: true,
  },
  {
    text: "Sunday pancakes, and the first real conversation with my brother in months.",
    tags: ["family"],
  },
  {
    text: "Saw the northern lights from the cabin porch. No photo did it justice.",
    tags: ["nature", "travel"],
    location: "Vermont",
    favorite: true,
  },
  {
    text: "Rearranged the living room. It feels like a new apartment.",
    tags: ["home"],
  },
  {
    text: "Mom's birthday. We surprised her with the band from her wedding.",
    tags: ["family"],
    favorite: true,
  },
  { text: "Today was ordinary, and that was nice.", tags: [] },
];

// Each story's day, counting back from today in New York.
function daysAgo(days: number): Timestamp {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return Timestamp.fromDate(midnightIn("America/New_York", date));
}

// A photo as the website's Cloud Function stores one: both sizes in Storage,
// read through links whose token lets anyone holding them in.
const bucket = getStorage(app).bucket();
async function upload(scene: string) {
  const id = randomUUID();
  const sizes = await photo(scene);
  const urls = { large: "", small: "" };
  for (const size of ["large", "small"] as const) {
    const path = `story_photos/${uid}/${size}/${id}`;
    const token = randomUUID();
    await bucket.file(path).save(sizes[size], {
      contentType: "image/jpeg",
      metadata: {
        cacheControl: "private,max-age=31536000",
        metadata: { firebaseStorageDownloadTokens: token },
      },
    });
    urls[size] =
      `http://${process.env.FIREBASE_STORAGE_EMULATOR_HOST}/v0/b/${bucketName}` +
      `/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
  }
  return { source: "storage", id, urls };
}
const photos = await Promise.all(
  entries.map((entry) => (entry.photo ? upload(entry.photo) : null)),
);

const batch = firestore.batch();
entries.forEach((entry, index) => {
  batch.set(firestore.collection("stories").doc(), {
    author: uid,
    value: entry.text,
    date: daysAgo(index * 12 + 1),
    isFavorite: entry.favorite ?? false,
    tags: (entry.tags ?? []).map((label) => ({ label })),
    location: entry.location ?? "",
    photos: photos[index] ? [photos[index]] : [],
    synced: true,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
});
batch.set(firestore.doc(`preferences/${uid}`), { colorTheme: "light" });
await batch.commit();

console.log(
  `[seed] ${entries.length} stories for ${tester.email}, password "${tester.password}"`,
);
