import Constants from "expo-constants";

// Where screens come from, from app.json: Backtick's home at `home`, each app
// at <id>.`apps`, as a Vercel project is at <name>.vercel.app.
const extra = Constants.expoConfig?.extra as { home: string; apps: string };

export const home = extra.home;
export const apps = extra.apps;
