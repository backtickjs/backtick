import { cs } from "@backtickjs/core";
import { applicationId } from "expo-application" with { backtick: "client" };

// The shell's links, worked out on the phone, which may be the Backtick app or
// Expo Go. Backtick's are its scheme's; Expo Go's name the published project,
// the path after `--/`, and its channel. Written out, since Expo Go 58 reports
// itself as a bare app and expo-linking's createURL then writes `backtick://`.
const project = "exp://u.expo.dev/baed8ee5-a651-438c-999f-aff346fa0064";

export const shellURL = cs`(path: string) =>
  $applicationId === "com.backtickjs.app"
    ? "backtick://" + path
    : $project + "/--/" + path + "?channel-name=production"`;
