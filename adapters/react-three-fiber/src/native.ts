// `@react-three/fiber/native`, name for name, in alphabetical order: R3F for
// React Native, its `<Canvas>` drawn with expo-gl. A value where it both
// exports and declares it, with the type each one also names; a type for
// everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as FiberNative from "@react-three/fiber/native";
import { fiberNative } from "./imports.js";

export const Canvas: Client<typeof FiberNative.Canvas> = fiberNative("Canvas");
export const ReactThreeFiber: Client<typeof FiberNative.ReactThreeFiber> =
  fiberNative("ReactThreeFiber");
export const _roots: Client<typeof FiberNative._roots> = fiberNative("_roots");
export const act: Client<typeof FiberNative.act> = fiberNative("act");
export const addAfterEffect: Client<typeof FiberNative.addAfterEffect> =
  fiberNative("addAfterEffect");
export const addEffect: Client<typeof FiberNative.addEffect> =
  fiberNative("addEffect");
export const addTail: Client<typeof FiberNative.addTail> =
  fiberNative("addTail");
export const advance: Client<typeof FiberNative.advance> =
  fiberNative("advance");
export const applyProps: Client<typeof FiberNative.applyProps> =
  fiberNative("applyProps");
export const buildGraph: Client<typeof FiberNative.buildGraph> =
  fiberNative("buildGraph");
export const context: Client<typeof FiberNative.context> =
  fiberNative("context");
export const createEvents: Client<typeof FiberNative.createEvents> =
  fiberNative("createEvents");
export const createPortal: Client<typeof FiberNative.createPortal> =
  fiberNative("createPortal");
export const createRoot: Client<typeof FiberNative.createRoot> =
  fiberNative("createRoot");
export const dispose: Client<typeof FiberNative.dispose> =
  fiberNative("dispose");
export const events: Client<typeof FiberNative.events> = fiberNative("events");
export const extend: Client<typeof FiberNative.extend> = fiberNative("extend");
export const flushGlobalEffects: Client<typeof FiberNative.flushGlobalEffects> =
  fiberNative("flushGlobalEffects");
export const flushSync: Client<typeof FiberNative.flushSync> =
  fiberNative("flushSync");
export const getRootState: Client<typeof FiberNative.getRootState> =
  fiberNative("getRootState");
export const invalidate: Client<typeof FiberNative.invalidate> =
  fiberNative("invalidate");
export const reconciler: Client<typeof FiberNative.reconciler> =
  fiberNative("reconciler");
export const unmountComponentAtNode: Client<
  typeof FiberNative.unmountComponentAtNode
> = fiberNative("unmountComponentAtNode");
export const useFrame: Client<typeof FiberNative.useFrame> =
  fiberNative("useFrame");
export const useGraph: Client<typeof FiberNative.useGraph> =
  fiberNative("useGraph");
export const useInstanceHandle: Client<typeof FiberNative.useInstanceHandle> =
  fiberNative("useInstanceHandle");
export const useLoader: Client<typeof FiberNative.useLoader> =
  fiberNative("useLoader");
export const useStore: Client<typeof FiberNative.useStore> =
  fiberNative("useStore");
export const useThree: Client<typeof FiberNative.useThree> =
  fiberNative("useThree");

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
} from "@react-three/fiber/native";
