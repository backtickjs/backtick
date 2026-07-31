# vanillajs, vendored

`Main.js` is the keyed vanilla implementation from Stefan Krause's
js-framework-benchmark, copied verbatim and left unedited so that what the
verifier compares against is the reference itself rather than a reading of it.

- Source: https://github.com/krausest/js-framework-benchmark — `frameworks/keyed/vanillajs/src/Main.js`
- Commit: `c5660d9fe3aeb706cdaa2883f7b4943d7b5b5281` (2024-05-05)
- License: Apache-2.0, © the js-framework-benchmark contributors

It runs against the DOM modelled in `src/dom.ts`, not a browser. The page it
expects — `#main` with the six buttons, and `table > tbody#tbody` — is built in
`src/vanilla.ts` to match the reference `index.html`.

One thing is not verbatim: the file ends in `new Main();`, and the instance it
builds is reachable from nowhere, so `src/vanilla.ts` rebinds that one line to
`globalThis.__main = new Main();` as it loads. The file on disk is untouched and
still only one instance is constructed — but the text that executes differs by
that line, which is what lets the verifier read the reference's own record of
what it rendered and so tell a wrong model from a wrong app.

To refresh it:

```sh
curl -o vendor/vanillajs/Main.js \
  https://raw.githubusercontent.com/krausest/js-framework-benchmark/master/frameworks/keyed/vanillajs/src/Main.js
```

If a refresh makes the verifier fail, read the diff before touching anything
here: the reference changing is a fact about the benchmark, not a bug.
