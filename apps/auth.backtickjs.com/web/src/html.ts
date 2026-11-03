// The sign-in page's HTML: the same for everyone. Its one script is
// /sign-in.js, from this origin; nothing inline runs.
import { style } from "./style.ts";

export const signInHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sign in to Backtick</title>
<link rel="icon" href="/favicon.png" sizes="32x32" type="image/png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<style>${style}</style>
</head>
<body>
<div id="app"></div>
<script type="module" src="/sign-in.js"></script>
</body>
</html>`;
