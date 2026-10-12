import { cs } from "@backtickjs/core";
import {
  type Group,
  MathUtils,
  type Mesh,
  type MeshStandardMaterial,
  type Object3DEventMap,
  Vector3,
} from "@backtickjs/three";

// Values splice, classes construct, and a class's name is its instance type
// too, generics and all.
export const aim = cs`(mesh: Mesh, target: Group<Object3DEventMap>) => {
  const direction = new $Vector3().subVectors(target.position, mesh.position);
  mesh.rotation.y = Math.atan2(direction.x, direction.z);
  return $MathUtils.radToDeg(mesh.rotation.y);
}`;

export const tint = cs`(mesh: Mesh<any, MeshStandardMaterial>) => {
  mesh.material.color.set("#ff0000");
}`;

export const wrong = cs`(mesh: Mesh) => {
  // @ts-expect-error: a Vector3 has no w.
  return new $Vector3().w + mesh.id;
}`;
