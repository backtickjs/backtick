Each step shows `server/Home.tsx`, with what changed marked.

Start from the project the [Quick start](/docs) creates, with the app running,
and clear the welcome screen:

```sh
npm run reset-project
```

It also rewrites `server/Home.test.tsx` to test the blank screen. Delete that
file: the last step writes one for the screen you're about to build.

## 1. Show the menu

The menu is data your server reads. Here it's a file; yours could come from a
database or an API. Create `server/menu.ts`:

```ts file=tutorial-1/server/menu.ts

```

Then replace `server/Home.tsx`:

```tsx file=tutorial-1/server/Home.tsx

```

Save, and the menu appears. `Home` awaited it on your server, and `$menu`
wrote it into the screen, typed as `getMenu` returns it. The styles are made
in the script, with `$StyleSheet.create`: they're code that runs on the
phone, like the JSX.

## 2. Add a client component

Each coffee gets an "Add" button that counts its taps. A tap is handled on the
phone, so the button is a client component: a script that takes props, with
state of its own.

```tsx file=tutorial-2/server/Home.tsx diff=tutorial-1/server/Home.tsx

```

Tap "Add" a few times. Each button keeps its own count: `AddButton` is a
client component, like `Counter` in the quick start, and each tag is its own
instance.

## 3. Share the order across the screen

Counts kept in each button can't add up to a total. The order belongs one level
up, in a client component that holds every count and draws the rows.

```tsx file=tutorial-3/server/Home.tsx diff=tutorial-2/server/Home.tsx

```

Tap a price to add a coffee; the total updates below.

- **`styles` and `formatPrice` are scripts too,** a value and a function rather
  than components. Each component splices the ones it uses, and the bundle
  carries each script once.
- **`Order` holds the state; `CoffeeRow` gets it as props,** a count and an
  `onAdd` callback, as in any React app. Inside client code, props can be
  anything: functions included.

## 4. Send the order to your server

The order is placed with a `fetch` from the phone. First, the server needs
somewhere to keep orders. Create `server/orders.ts`:

```ts file=tutorial-4/server/orders.ts

```

Then add a route for them to `server/index.tsx`, and pass `Home` the address
the app reached your server at:

```tsx file=tutorial-4/server/index.tsx diff=../../../../packages/create-backtick-app/templates/react-native/server/index.tsx

```

Now the screen can send its order there:

```tsx file=tutorial-4/server/Home.tsx diff=tutorial-3/server/Home.tsx

```

Add a coffee, then tap "Place order".

- **`Home` takes props now.** The server reads them from the request, here the
  `origin`, and `Home` turns them into the screen.
- **The `/orders` route is an ordinary handler:** the screen talks to your
  server like any app would, with a `fetch` from the phone.

## 5. Make it personal

The server knows your last order, so the screen can start with it.

```tsx file=tutorial-5/server/Home.tsx diff=tutorial-4/server/Home.tsx

```

Place an order, then reload the app: press `r` in the terminal running it.
"Your usual" appears, and the order starts with it.

- **`Usual` is a server component drawn inside a script,** with a braced
  splice: `{${<Usual counts={usual} menu={menu} />}}`. It runs on your server,
  and the phone gets only what it returns.
- **`${usual ?? {}}` is a splice of an expression,** for when a name isn't
  enough. It's the order's starting state.

## 6. Test it

A test draws the screen as your app does, taps it, and checks what it shows.
Create `server/Home.test.tsx`:

```tsx file=tutorial-5/server/Home.test.tsx

```

`npm test` runs it. The phone's `fetch` is answered in the test, so placing an
order doesn't need your server; the usual does, through `saveOrder`.
[Testing screens](/docs/testing) explains `drawScreen`, and what a test
doesn't cover.

## What you learned

| You wrote                                    | It's a                                  | It runs on           |
| -------------------------------------------- | --------------------------------------- | -------------------- |
| `async function Home()`                      | Server component                        | Your server          |
| `` cs`…` ``                                  | Client script                           | The phone            |
| `$menu`, `${usual ?? {}}`                    | Splice: a server value, written as data | Crosses to the phone |
| `` cs`(props) => …` ``, used as `<$Order />` | Client component                        | The phone            |
| `{${<Usual />}}`                             | A server component inside a script      | Your server          |

Everything you changed lives in `server/`. Deploy your server, and every user
has the new screen the next time they open it, without an app release. And
the server builds each screen per request, so `lastOrder` could read the
user's account, A/B group or location.

Next, **[Thinking in Backtick](/docs/thinking-in-backtick)** explains the
model behind these steps.
