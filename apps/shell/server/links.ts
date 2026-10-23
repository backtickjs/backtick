// The shell's links, as Expo Go opens them: the published project, the path
// after `--/`, and its channel. Written out, since Expo Go 58 reports itself
// as a bare app and expo-linking's createURL then writes `backtick://`.
const project = "exp://u.expo.dev/baed8ee5-a651-438c-999f-aff346fa0064";

export function shellURL(path: string): string {
  return `${project}/--/${path}?channel-name=production`;
}
