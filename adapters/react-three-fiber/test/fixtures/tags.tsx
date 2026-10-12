import { cs } from "@backtickjs/core";
import { useRef } from "@backtickjs/react";
import { Canvas, useFrame } from "@backtickjs/react-three-fiber/native";
import type { Mesh } from "@backtickjs/three";

// R3F's components are tags, its hooks values, and three's objects are JSX's
// own elements inside the canvas.
const Spinner = cs`(props: { speed: number }) => {
  const mesh = $useRef<Mesh>(null);
  $useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * props.speed;
  });
  return (
    <mesh ref={mesh} position={[0, 1, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#9c3018" />
    </mesh>
  );
}`;

export const scene = cs`(
  <$Canvas style={{ flex: 1 }} camera={{ fov: 70 }}>
    <ambientLight intensity={0.5} />
    <$Spinner speed={2} />
  </$Canvas>
)`;

export const wrong = cs`(
  <$Canvas>
    {/* @ts-expect-error: a box takes its size as args, not as width. */}
    <boxGeometry width={1} />
  </$Canvas>
)`;
