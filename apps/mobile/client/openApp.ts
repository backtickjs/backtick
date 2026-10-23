import type { Session } from "@supabase/supabase-js";
import { createContext } from "react";

export type App = { id: string; title: string };

// The signed-in user's session, as the layout keeps it current: screens are
// opened only while there is one.
export const CurrentSession = createContext<Session | null>(null);

// The app whose screens are this app's routes outside /backtick, while it's
// open: a screen's `<Link href="/day">` opens that app's `/day`.
export const OpenApp = createContext<{
  app: App | null;
  open: (app: App) => void;
}>({ app: null, open: () => {} });
