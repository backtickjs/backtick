# @backtickjs/react-three-fiber

The React Three Fiber adapter for [Backtick](https://backtickjs.com): R3F's API as client values your scripts splice (`<$Canvas>`, `$useFrame`, `$useThree`), each typed with R3F's own declarations, for React and React Native. Importing it also gives JSX three's elements, so `<mesh>` and `<boxGeometry>` are type-checked in a script. Its version tracks the R3F it supports: `9.8.1` works with `@react-three/fiber` `^9.8.1`. It pairs with [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react) for React's hooks, the JSX runtime and the compile plugin, and with [`@backtickjs/three`](https://github.com/backtickjs/backtick/tree/main/adapters/three) for three's classes and types.

## Install

```sh
npm install @backtickjs/react-three-fiber @backtickjs/three @backtickjs/react @backtickjs/core @backtickjs/bundler @backtickjs/node-plugin
npm install -D @backtickjs/tsc
```

The app itself needs `@react-three/fiber` and `three`, and in React Native, `expo-gl`. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

A client component that spins a box, drawn in a canvas by a server component:

```tsx
// server/Home.tsx
import { cs } from "@backtickjs/core";
import { useRef } from "@backtickjs/react";
import { Canvas, useFrame } from "@backtickjs/react-three-fiber/native";
import type { Mesh } from "@backtickjs/three";

const Spinner = cs`(props: { speed: number }) => {
  const mesh = $useRef<Mesh>(null);
  $useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * props.speed;
  });
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#9c3018" />
    </mesh>
  );
}`;

export async function Home() {
  const speed = 2;
  return cs`(
    <$Canvas style={{ flex: 1 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} />
      <$Spinner speed={$speed} />
    </$Canvas>
  )`;
}
```

On each request, bundle it for the versions the app provides:

```tsx
const bundle = await bundler.build({
  input: <Home />,
  modules: {
    react: "19.2.3",
    "react/jsx-runtime": "19.2.3",
    "react-native": "0.86.3",
    "@react-three/fiber/native": "9.8.1",
  },
});
```

In the app, offer R3F to bundles by the name the adapter imports it from:

```tsx
import * as FiberNative from "@react-three/fiber/native";

const moduleMap = {
  // …react, react/jsx-runtime, react-native
  "@react-three/fiber/native": FiberNative,
};
```

## What it exports

- `@backtickjs/react-three-fiber`: `@react-three/fiber`'s exports, name for name, as client values (`Canvas`, `useFrame`, `useThree`, `useLoader`, …), and R3F's types. Required from `@react-three/fiber`, its web build.
- `@backtickjs/react-three-fiber/native`: the same names from `@react-three/fiber/native`, whose `Canvas` draws with expo-gl. An app that also runs on the web can offer R3F's web build under this name there.

## Related

- [`@backtickjs/three`](https://github.com/backtickjs/backtick/tree/main/adapters/three): three's classes, values and types
- [`@backtickjs/react`](https://github.com/backtickjs/backtick/tree/main/adapters/react): the React adapter
- [`@backtickjs/react-native`](https://github.com/backtickjs/backtick/tree/main/adapters/react-native): the React Native adapter
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
