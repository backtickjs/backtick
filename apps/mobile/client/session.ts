import type { Session } from "@supabase/supabase-js";
import { createContext } from "react";

// The signed-in user's session, as the layout keeps it current, or none.
export const CurrentSession = createContext<Session | null>(null);
