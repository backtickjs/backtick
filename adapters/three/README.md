# @backtickjs/three

The three.js adapter for [Backtick](https://backtickjs.com): three's API as client values your scripts splice (`new $Vector3(…)`, `$MathUtils`), each typed with three's own declarations, and each class's instance type under its name (`Mesh`, `Group`), so a server never imports from `three`. Its version tracks the three it supports: `0.182.0` works with three `^0.182.0`.

To draw with three in React or React Native, pair it with [`@backtickjs/react-three-fiber`](https://github.com/backtickjs/backtick/tree/main/adapters/react-three-fiber).

## Install

```sh
npm install @backtickjs/three @backtickjs/core @backtickjs/bundler
```

The app itself needs `three`, and offers it to bundles under that name. The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

A client component that turns a mesh toward the camera at each frame, with its types from this adapter:

```tsx
import { cs } from "@backtickjs/core";
import { useRef } from "@backtickjs/react";
import { useFrame } from "@backtickjs/react-three-fiber";
import type { Mesh } from "@backtickjs/three";

const Billboard = cs`() => {
  const mesh = $useRef<Mesh>(null);
  $useFrame(({ camera }) => mesh.current?.lookAt(camera.position));
  return (
    <mesh ref={mesh}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#ffd23f" />
    </mesh>
  );
}`;
```

On each request, bundle it for the version the app provides:

```tsx
const bundle = await bundler.build({
  input: <Home />,
  packageVersions: { react: "19.2.3", three: "0.182.0" },
});
```

## What it exports

- `@backtickjs/three`: `three`'s exports, name for name, as client values (`Vector3`, `Color`, `MathUtils`, `Mesh`, …). A class's name is also its instance type, with three's generics (`Mesh<BufferGeometry, MeshStandardMaterial>`), and three's other types are exported as types.

## Related

- [`@backtickjs/core`](https://github.com/backtickjs/backtick/tree/main/packages/core): the `cs` tag
- [`@backtickjs/react-three-fiber`](https://github.com/backtickjs/backtick/tree/main/adapters/react-three-fiber): React Three Fiber's components and hooks
- [`@backtickjs/bundler`](https://github.com/backtickjs/backtick/tree/main/packages/bundler): builds bundles

## License

MIT
