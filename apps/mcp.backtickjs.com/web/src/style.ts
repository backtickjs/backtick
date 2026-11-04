// The pages' CSS: one card on a quiet background, in light and dark.
export const style = `
:root { color-scheme: light dark; --fg: #17201b; --muted: #64706a; --bg: #f3f5f2; --card: #fff; --accent: #1f7a55; }
@media (prefers-color-scheme: dark) { :root { --fg: #eaf0ec; --muted: #94a39b; --bg: #0f1412; --card: #18201c; --accent: #3dbe86; } }
body { margin: 0; background: var(--bg); color: var(--fg); font: 16px/1.5 system-ui, sans-serif; }
#app { min-height: 100vh; display: grid; place-items: center; }
main { width: min(100% - 32px, 640px); background: var(--card); border-radius: 12px; padding: 24px; margin: 16px 0; box-sizing: border-box; }
h1 { font-size: 22px; margin: 0 0 8px; }
h2 { font-size: 17px; margin: 24px 0 8px; }
p, li { color: var(--muted); }
p { margin: 0 0 16px; }
a { color: var(--accent); }
.buttons { display: flex; gap: 8px; }
button { flex: 1; padding: 12px; border-radius: 8px; border: 1px solid var(--muted); background: none; color: var(--fg); font: inherit; cursor: pointer; }
button.allow { background: var(--accent); border-color: var(--accent); color: #fff; }
`;
