// A file rather than a `<style>` in the head: the document declares
// `default-src 'self'`, which is a policy an inline stylesheet does not satisfy.
export const styles = `
:root {
  --ink: #0e0e10;
  --paper: #ffffff;
  --muted: #71717a;
  --line: #e4e4e7;
  --wash: #fafafa;
  --sans: "Helvetica Neue", Helvetica, Inter, system-ui, sans-serif;
  --mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --ink: #fafafa;
    --paper: #0e0e10;
    --muted: #a1a1aa;
    --line: #27272a;
    --wash: #161618;
  }
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.shell {
  max-width: 820px;
  margin: 0 auto;
  padding: 0 24px;
}

a {
  color: inherit;
}

/* The wordmark, as the file in \`assets/\`. A flex anchor so it is exactly the
   image, with no line box around it to leave descender space.

   The width is the size; the height follows from the file's 279x38. Whatever
   it is set to, \`Layout.tsx\` carries the same pair as attributes, so the space
   reserved before the file arrives is the space it takes. */
.mark {
  display: flex;
}

.mark img {
  display: block;
  width: 152px;
  height: auto;
}

/* The mark is one colour on transparent, so inverting it is exact rather than
   approximate, and one file answers both themes. A mark with any colour in it
   would want a second file instead. */
@media (prefers-color-scheme: dark) {
  .mark img {
    filter: invert(1);
  }
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 0;
}

.top nav {
  display: flex;
  gap: 20px;
  font-size: 15px;
  color: var(--muted);
}

.hero {
  padding: 64px 0 56px;
}

.hero h1 {
  margin: 0;
  font-size: clamp(38px, 8vw, 60px);
  line-height: 1.05;
  letter-spacing: -0.035em;
  font-weight: 700;
}

.hero p {
  margin: 24px 0 0;
  max-width: 34em;
  font-size: 19px;
  color: var(--muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.button {
  display: inline-block;
  padding: 11px 20px;
  border: 1px solid var(--ink);
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
}

.button-solid {
  background: var(--ink);
  color: var(--paper);
}

section {
  padding: 40px 0;
  border-top: 1px solid var(--line);
}

h2 {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.lede {
  margin: 0 0 28px;
  max-width: 36em;
  font-size: 19px;
  letter-spacing: -0.01em;
}

pre {
  margin: 0;
  padding: 18px 20px;
  overflow-x: auto;
  background: var(--wash);
  border: 1px solid var(--line);
  border-radius: 10px;
  font-family: var(--mono);
  font-size: 13.5px;
  line-height: 1.65;
  tab-size: 2;
}

code {
  font-family: var(--mono);
  font-size: 0.92em;
}

.steps {
  display: grid;
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
}

.steps h3 {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
}

.steps p {
  margin: 0;
  font-size: 15px;
  color: var(--muted);
}

.steps .ordinal {
  display: block;
  margin-bottom: 10px;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--muted);
}

/* The demo. Its markup is drawn by the bundle printed beneath it, so what is
   styled here is the only part of it this file knows about. */
.demo {
  display: grid;
  gap: 20px;
  padding: 28px;
  background: var(--wash);
  border: 1px solid var(--line);
  border-radius: 12px;
  justify-items: start;
}

.tally {
  font-size: 46px;
  font-weight: 700;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.key {
  padding: 8px 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--mono);
  font-size: 14px;
  cursor: pointer;
}

.key:hover {
  border-color: var(--muted);
}

.key-on {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}

.label {
  font-size: 14px;
  color: var(--muted);
}

.caption {
  margin: 14px 0 0;
  font-size: 14px;
  color: var(--muted);
}

.wire {
  max-height: 260px;
  overflow: auto;
  word-break: break-all;
  white-space: pre-wrap;
}

footer {
  padding: 40px 0 64px;
  border-top: 1px solid var(--line);
  font-size: 14px;
  color: var(--muted);
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  justify-content: space-between;
}

/* The one thing on the page that is not drawn from a bundle: what a browser
   with scripting off shows instead. */
.warn {
  max-width: 34em;
  margin: 48px auto;
  padding: 0 24px;
  font-family: var(--sans);
  color: var(--muted);
}
`;
