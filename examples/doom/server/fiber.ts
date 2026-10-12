import { createImport } from "@backtickjs/core";
import type {
  Canvas as FiberCanvas,
  useFrame as FiberUseFrame,
} from "@react-three/fiber/native";

// What the app provides from React Three Fiber's React Native build, typed as
// it types them, for any script to splice. Importing its types also teaches
// JSX its elements: `<mesh>`, `<boxGeometry>`, `<pointLight>`.
export const Canvas = createImport<typeof FiberCanvas>({
  name: "Canvas",
  from: "@react-three/fiber/native",
  version: "^9.0.0",
});

export const useFrame = createImport<typeof FiberUseFrame>({
  name: "useFrame",
  from: "@react-three/fiber/native",
  version: "^9.0.0",
});
