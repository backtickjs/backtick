import { useColorScheme } from "react-native";

// backtickjs.com's paper, behind every screen (server/look.tsx).
export function usePaper(): string {
  return useColorScheme() === "dark" ? "#0a0a0c" : "#ffffff";
}

// backtickjs.com's ink, for what the app draws itself.
export function useInk(): string {
  return useColorScheme() === "dark" ? "#fafafa" : "#0e0e10";
}
