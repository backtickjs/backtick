# Security

## Reporting a vulnerability

Please report vulnerabilities privately, through GitHub:
[report a vulnerability](https://github.com/backtickjs/backtick/security/advisories/new).
Don't open a public issue. You'll get a reply within a few days, and a fix or a
plan before anything is disclosed.

## Supported versions

Backtick is early, at 0.x. Fixes land in the latest release only.

## How Backtick is meant to be used safely

Backtick sends code, not only data, to the client, so it helps to know what it
protects and what it leaves to you.

- **Your server is trusted.** A bundle is JavaScript that the client runs with
  its full privileges: a React Native app's native modules and stored data, or
  a page's origin. Whoever controls the server that answers, or the connection
  to it, controls that code. Serve screens over HTTPS from an endpoint you
  control.
- **Bundles aren't signed yet.** Nothing on the client checks that a bundle
  came from your server, beyond what HTTPS provides. Certificate pinning is up
  to the app.
- **Data spliced into a script stays data.** Client scripts are compiled at
  build time, never assembled from strings at request time. A value spliced in
  with `$name` is written into the bundle as data: strings as escaped
  literals, plain objects and arrays as literals. Functions and class instances
  are refused. User input in a splice can't become code.
- **The app owns fetching.** On React Native, your app fetches each bundle
  itself, with its own headers and authentication. Protect screen endpoints
  as you would any API that returns user data.
- **Client code is ordinary code.** A client script that passes user data to
  `eval`, a WebView's injected JavaScript or `dangerouslySetInnerHTML` is as
  unsafe as it would be in any React or React Native app.

Reports about any of these, including ways around the splice guarantee, are
welcome.
