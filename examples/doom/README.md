# Doom, served by Backtick

A Doom-like shooter for iOS and Android, drawn in 3D with [React Three Fiber](https://r3f.docs.pmnd.rs)'s React Native build, `@react-three/fiber/native`. The app ships nothing of the game: the levels, the 3D scene, the game loop and the HUD all come from a Backtick server, so a new level or a faster imp reaches every phone when you save.

## Run it

```sh
npm install
npm start
```

`npm start` runs the server and Expo side by side. Open the app in Expo Go, then edit a map in `server/levels.ts` and save: the phone plays the new map, without a rebuild.

Hold ▲ ▼ to walk, ◀ ▶ to turn, and FIRE to shoot. Clear every imp to finish the level.

`npm run web` plays the same game in a browser, from the same server. There, the arrow keys or WASD move and turn, and space fires.

## Where things are

- `server/levels.ts`: the levels, drawn as text, and read into walls, imps and pickups on the server.
- `server/Game.tsx`: the server component. It reads the levels and the starting loadout at every request, and hands them to `Doom`.
- `server/Doom.tsx`: the screen, a client component. React Native views for the HUD, the shotgun and the touch controls, over R3F's `<$Canvas>`.
- `server/World.tsx`: the 3D world, a client component inside the canvas: `<mesh>`, `<boxGeometry>` and `<pointLight>`, with the game loop in `$useFrame`.
- `client/App.tsx`: the app. It offers `@react-three/fiber/native` to screens alongside React and React Native, and draws what the server sends.
- `client/fiber.ts` and `client/fiber.web.ts`: R3F as the app offers it. On a phone, its React Native build; on the web, its web build, under the same name, so the server sends both the same bundle.

The server takes R3F and three from their adapters only, as it takes React Native from `@backtickjs/react-native`: `Canvas` and `useFrame` from `@backtickjs/react-three-fiber/native`, and the types of three's objects (`Mesh`, `PointLight`) from `@backtickjs/three`. Importing the R3F adapter also teaches JSX three's elements, so `<mesh>` is type-checked in a script.

## What it costs

Each stage logs what it took, from the server to the phone's GPU. The server's lines print in the `npm start` terminal, and so do the phone's, which Expo forwards there; on the web, the app's print in the browser's console. The phone's numbers below are only an illustration:

```
[server] /game: build 1.0 ms, generate 0.4 ms, 33.8 KB, heap 79.7 MB, rss 219.4 MB
[pipeline] /game in 182.3 ms
  server    1.4 ms (build 1.0 ms, generate 0.4 ms)
  network   41.2 ms to first byte, 6.1 ms to download 33.8 KB
  evaluate  4.8 ms
  render    128.8 ms to commit
  heap      18.2 MB of 24.0 MB, 3 GCs at fetch, …
[render] first GL frame 312.0 ms after mount: 2 shader programs, 94 geometries, 94 draw calls
[runtime] 60 fps, worst frame 21.3 ms, 94 draw calls, 1128 triangles, heap 21.0 MB (+0.4 MB), 1 GCs
```

- `[server]`, in `server/index.tsx`: running the server components and bundling them (`build`), then printing the code (`generate`), and the server's memory. The two times also travel to the app in a `Server-Timing` header.
- `[pipeline]`, in `client/App.tsx`, once per screen: the network is the time to the first byte less the server's share. `render` runs from `execRoot` to React's first commit of the screen, in development and production alike.
- `[render]` and `[runtime]`, in `server/World.tsx`: the first frame R3F draws, its shaders compiled, then every 5 seconds the frame rate, the slowest frame and what the GPU was asked to draw.
- `heap` is the JavaScript heap as Hermes reports it, and its garbage collections. On the web, Chrome reports the heap without its collections, and other browsers report neither. GL buffers and textures live in native memory, out of JavaScript's sight. When the OS runs short of memory, the app logs `[memory] warning from the OS` with the heap at that moment.

## Tests

`npm test` bundles `World` as the server does, runs it as the app does, and plays it with `@react-three/test-renderer`, which drives R3F's frame loop without a GPU: two shots kill an imp, an imp you ignore wounds you, a medkit waits until you're hurt.
