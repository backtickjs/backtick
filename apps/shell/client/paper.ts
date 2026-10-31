import { useColorScheme } from "react-native";

// backtickjs.com's paper, behind every screen (server/look.ts).
export function usePaper(): string {
  return useColorScheme() === "dark" ? "#0a0a0c" : "#ffffff";
}
