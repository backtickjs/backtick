import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

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
