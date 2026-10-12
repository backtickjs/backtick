// `@react-three/fiber`, name for name, in alphabetical order: a value where
// R3F both exports and declares it, with the type each one also names; a type
// for everything else it declares. Its types also give JSX three's elements:
// `<mesh>`, `<boxGeometry>`.
import type { Client } from "@backtickjs/core";
import type * as Fiber from "@react-three/fiber";
import { fiber } from "./imports.js";

export const Canvas: Client<typeof Fiber.Canvas> = fiber("Canvas");
export const ReactThreeFiber: Client<typeof Fiber.ReactThreeFiber> =
  fiber("ReactThreeFiber");
export const _roots: Client<typeof Fiber._roots> = fiber("_roots");
export const act: Client<typeof Fiber.act> = fiber("act");
export const addAfterEffect: Client<typeof Fiber.addAfterEffect> =
  fiber("addAfterEffect");
export const addEffect: Client<typeof Fiber.addEffect> = fiber("addEffect");
export const addTail: Client<typeof Fiber.addTail> = fiber("addTail");
export const advance: Client<typeof Fiber.advance> = fiber("advance");
export const applyProps: Client<typeof Fiber.applyProps> = fiber("applyProps");
export const buildGraph: Client<typeof Fiber.buildGraph> = fiber("buildGraph");
export const context: Client<typeof Fiber.context> = fiber("context");
export const createEvents: Client<typeof Fiber.createEvents> =
  fiber("createEvents");
export const createPortal: Client<typeof Fiber.createPortal> =
  fiber("createPortal");
export const createRoot: Client<typeof Fiber.createRoot> = fiber("createRoot");
export const dispose: Client<typeof Fiber.dispose> = fiber("dispose");
export const events: Client<typeof Fiber.events> = fiber("events");
export const extend: Client<typeof Fiber.extend> = fiber("extend");
export const flushGlobalEffects: Client<typeof Fiber.flushGlobalEffects> =
  fiber("flushGlobalEffects");
export const flushSync: Client<typeof Fiber.flushSync> = fiber("flushSync");
export const getRootState: Client<typeof Fiber.getRootState> =
  fiber("getRootState");
export const invalidate: Client<typeof Fiber.invalidate> = fiber("invalidate");
export const reconciler: Client<typeof Fiber.reconciler> = fiber("reconciler");
export const unmountComponentAtNode: Client<
  typeof Fiber.unmountComponentAtNode
> = fiber("unmountComponentAtNode");
export const useFrame: Client<typeof Fiber.useFrame> = fiber("useFrame");
export const useGraph: Client<typeof Fiber.useGraph> = fiber("useGraph");
export const useInstanceHandle: Client<typeof Fiber.useInstanceHandle> =
  fiber("useInstanceHandle");
export const useLoader: Client<typeof Fiber.useLoader> = fiber("useLoader");
export const useStore: Client<typeof Fiber.useStore> = fiber("useStore");
export const useThree: Client<typeof Fiber.useThree> = fiber("useThree");

export type {
  Act,
  Args,
  AttachFnType,
  AttachType,
  Camera,
  CameraProps,
  CanvasProps,
  Catalogue,
  Color,
  ComputeFunction,
  ConstructorRepresentation,
  Disposable,
  DomEvent,
  Dpr,
  ElementProps,
  Euler,
  EventHandlers,
  EventManager,
  EventProps,
  Events,
  Extensions,
  FilterFunction,
  Frameloop,
  GLProps,
  GlobalEffectType,
  GlobalRenderCallback,
  InjectState,
  Instance,
  InstanceProps,
  Intersection,
  Layers,
  LoaderResult,
  MathProps,
  MathRepresentation,
  MathType,
  MathTypes,
  Matrix3,
  Matrix4,
  ObjectMap,
  Performance,
  Quaternion,
  RaycastableRepresentation,
  ReactProps,
  ReconcilerRoot,
  RenderCallback,
  RenderProps,
  Renderer,
  RootState,
  RootStore,
  Size,
  Subscription,
  ThreeElement,
  ThreeElements,
  ThreeEvent,
  ThreeToJSXElements,
  TrackedPromise,
  Vector2,
  Vector3,
  Vector4,
  VectorRepresentation,
  Viewport,
  XRManager,
} from "@react-three/fiber";
