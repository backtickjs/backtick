// The page's CSS, in backtickjs.com's look, as the Backtick app's sign-in page
// (apps/auth.backtickjs.com) has it: its ink and paper, light and dark, and
// its pill buttons.
export const style = `
:root { color-scheme: light dark; --ink: #0e0e10; --paper: #ffffff; --muted: #6b6b76; --line: #e4e4e7; --danger: #dc2626; }
@media (prefers-color-scheme: dark) { :root { --ink: #fafafa; --paper: #0a0a0c; --muted: #a1a1aa; --line: #26262b; --danger: #f87171; } }
* { box-sizing: border-box; }
body { margin: 0; background: var(--paper); color: var(--ink); font: 16px/1.5 Inter, "Helvetica Neue", Helvetica, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
#app { min-height: 100dvh; display: grid; place-items: center; padding: 32px 24px; }
main { width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 12px; }
.wordmark { width: 150px; height: auto; margin: 0 auto 20px; }
h1 { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; text-align: center; margin: 0 0 12px; }
.message { color: var(--danger); text-align: center; margin: 0 0 4px; font-size: 15px; }
.pill { display: flex; align-items: center; justify-content: center; gap: 10px; height: 52px; border-radius: 999px; border: 1px solid var(--ink); background: none; color: var(--ink); font-family: inherit; font-size: 16px; font-weight: 600; line-height: 1; text-decoration: none; cursor: pointer; transition: opacity 0.15s; }
.pill.solid { background: var(--ink); color: var(--paper); }
.pill:active { opacity: 0.8; }
form { display: flex; flex-direction: column; gap: 12px; }
input { height: 52px; padding: 0 20px; border-radius: 999px; border: 1px solid var(--line); background: none; color: var(--ink); font: inherit; outline: none; }
input:focus { border-color: var(--ink); }
input::placeholder { color: var(--muted); }
.lede { color: var(--muted); text-align: center; margin: -4px 0 12px; font-size: 15px; }
input.code { text-align: center; font-size: 22px; letter-spacing: 0.3em; font-variant-numeric: tabular-nums; }
.other { color: var(--muted); text-align: center; font-size: 15px; margin-top: 8px; background: none; border: none; font-family: inherit; cursor: pointer; }
.or { color: var(--muted); text-align: center; font-size: 14px; margin: 4px 0; }
`;
