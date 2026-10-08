Every message Backtick can show you, by who says it, with its fix. Your
editor and `npm run typecheck` report the first two groups; the third is
thrown by your server, per request, before anything reaches the phone; the
last by your app.

## From TypeScript

### Argument of type '…' is not assignable to parameter of type 'Spliceable'

The splice holds something that can't cross: a function, a class instance, a
`Date`. Splice what it's for instead: a `Date` as a string, a function as a
client function, `` cs`(n: number) => …` ``. See
[what can cross](/docs/thinking-in-backtick#splices).

### Property '…' does not exist on type 'GlobalThis'

A script used a name from your server without a `$`. Splice it: `$total`,
not `total`. See [splices](/docs/thinking-in-backtick#splices).

### This expression is not callable. Type 'Client<…>' has no call signatures

A hook, or another client value, was called in a server component. Hooks
belong in a [client component](/docs/thinking-in-backtick#client-components).

### JSX element type '…' does not have any construct or call signatures

A client component was drawn as a tag on your server. Draw it in a script:
`` cs`<$Card />` ``. See
[client components](/docs/thinking-in-backtick#client-components).

## From the compiler

These are reported in the editor, and thrown when your server loads the file.

### `cs` was not compiled. Is @backtickjs set up for this project?

Your server ran a script without the plugin that compiles them. Start it with
`node --import @backtickjs/node-plugin`, or on Bun preload
`@backtickjs/bun-plugin`. A new project's `npm start` already does. See
[How it works](/docs/how-it-works#1-compiled-with-your-server).

### A `cs` client script is one expression or one block

Statements need braces: `` cs`{ a(); b(); }` ``. See the
[three shapes](/docs/scripts-in-depth#three-shapes).

### This `${…}` is in text, not code, so it isn't spliced

A `${…}` inside a string, a template literal or a comment in a script is text
to the phone. As an element's child, write it in braces: `{${…}}`.

### `$`-prefixed names are reserved for unbraced splices in a `cs` client script

A script declared a name starting with `$`, as `const $label = …`. Those are
splices; name it without the `$`.

### Can't splice `$name` unbraced: a `$`-prefixed host binding splices with braces

A server variable whose own name starts with `$`, spliced as `$$name`. Write
`${$name}`.

### A tag splices a host value by its name, e.g. `<$Card>`, not with `${…}`

A tag was written as `<${Card}>`. Write `<$Card>`.

### `<View>` is drawn by the client, so it belongs in a script

A React Native tag was drawn on your server, outside a script. Draw it in
one: `` cs`<$View>…</$View>` ``.

## From the bundler

Thrown by `bundler.build`, for the screen it was building.

### Can't import `…` from "…": the client provides …

A script uses a package missing from `packageVersions`. Add it there, at the
version the app is built with, and to the app's modules. See
[the three places a package goes](/docs/react-native-and-packages#any-package-your-app-ships).

### Can't import `…` from "…": it needs …, and the client provides …

The app was built with a version of the package outside the range in
`createImport`. Widen the range if the export works with that version, or
serve that app a screen that doesn't use it.

### Can't splice the host function `…`: it's host code, and only runs on the host

A function reached a splice, perhaps through `any`. Write the phone's code as
a script, `` cs`(n: number) => …` ``. A server component is drawn with a tag
in a braced splice: `{${<Reviews />}}`.

### Can't splice this `…` instance: only plain objects cross into a client script

A class instance reached a splice. Cross its data as a plain object,
`{ title: todo.title }`, or build it on the phone with a client function.

### Can't splice a symbol

A symbol reached a splice, through `any`. Splice its key as a string, and
make the symbol in a script: `` cs`Symbol.for($key)` ``.

### Can't splice a value that contains itself

A value refers back to itself, such as a tree whose nodes point at their
parents. Splice a copy without the back references.

### `…` is a client component, so it can't be a tag on the host

A client component, `` cs`(props) => …` ``, was drawn as a tag on your
server. Draw it in a script: `` cs`<$Card />` ``.

## From your app

### The bundle requires "…", which this app doesn't provide

The bundle uses a package missing from the `modules` your app hands to
`evaluate`. Add it, and install it in the app so its native code ships. If
your server shouldn't have sent it, check its `packageVersions` for this app.
See [the three places a package goes](/docs/react-native-and-packages#any-package-your-app-ships).
