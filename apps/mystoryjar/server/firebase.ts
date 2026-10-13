import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

// The Firebase project the server reads and writes, as an admin. In
// development, the emulators `npm start` runs, under `demo-mystoryjar`: a
// demo- project is one Firebase never connects to a real one, and the
// emulator hosts in the environment send every call to this computer.
const development = process.env.NODE_ENV === "development";
if (development && process.env.FIRESTORE_EMULATOR_HOST === undefined) {
  throw new Error(
    "Development reads and writes the Firebase emulators: run `npm start`.",
  );
}

const projectId = development ? "demo-mystoryjar" : "mystoryjar-d5639";

const app = initializeApp({
  projectId,
  storageBucket: `${projectId}.appspot.com`,
});

export const firestore = getFirestore(app);
export const bucket = getStorage(app).bucket();
export const auth = getAuth(app);

/**
 * The link the website stores for a file in Storage: Firebase's download
 * URL, whose token lets anyone holding it read the file. In development, the
 * emulator's.
 */
export function downloadUrl(path: string, token: string): string {
  const emulator = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
  const origin = emulator
    ? `http://${emulator}`
    : "https://firebasestorage.googleapis.com";
  return (
    `${origin}/v0/b/${bucket.name}/o/${encodeURIComponent(path)}` +
    `?alt=media&token=${token}`
  );
}

/**
 * A Storage download link as the phone can follow it: as is in production;
 * in development, the emulator on this computer, at the address the phone
 * reached the server by, rather than at 127.0.0.1, which is the phone.
 */
export function storageLink(url: string, origin: string): string {
  const emulator = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
  if (!development || emulator === undefined) {
    return url;
  }
  const port = emulator.split(":")[1];
  return url.replace(
    `http://${emulator}`,
    `http://${new URL(origin).hostname}:${port}`,
  );
}
