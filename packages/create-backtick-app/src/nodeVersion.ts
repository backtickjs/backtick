// Whether a Node version runs a Backtick project: what React Native 0.86 and
// Backtick's Node plugin both support, 22.15 and later in 22, 24.3 and later
// in 24, and 25 on. Node 23 runs neither reliably.
export function isSupportedNode(version: string): boolean {
  const [major = 0, minor = 0] = version.split(".").map(Number);
  return (
    (major === 22 && minor >= 15) || (major === 24 && minor >= 3) || major >= 25
  );
}
