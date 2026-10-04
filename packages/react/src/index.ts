// `react`, name for name, in alphabetical order.
import type { Client } from "@backtickjs/core";
import type * as React from "react";
import { react } from "./imports.js";

export const Activity: Client<typeof React.Activity> = react("Activity");
export const Children: Client<typeof React.Children> = react("Children");
export const Component: Client<typeof React.Component> = react("Component");
export const Fragment: Client<typeof React.Fragment> = react("Fragment");
export const Profiler: Client<typeof React.Profiler> = react("Profiler");
export const PureComponent: Client<typeof React.PureComponent> =
  react("PureComponent");
export const StrictMode: Client<typeof React.StrictMode> = react("StrictMode");
export const Suspense: Client<typeof React.Suspense> = react("Suspense");
export const act: Client<typeof React.act> = react("act");
export const cache: Client<typeof React.cache> = react("cache");
export const cacheSignal: Client<typeof React.cacheSignal> =
  react("cacheSignal");
export const captureOwnerStack: Client<typeof React.captureOwnerStack> =
  react("captureOwnerStack");
export const cloneElement: Client<typeof React.cloneElement> =
  react("cloneElement");
export const createContext: Client<typeof React.createContext> =
  react("createContext");
export const createElement: Client<typeof React.createElement> =
  react("createElement");
export const createRef: Client<typeof React.createRef> = react("createRef");
export const forwardRef: Client<typeof React.forwardRef> = react("forwardRef");
export const isValidElement: Client<typeof React.isValidElement> =
  react("isValidElement");
export const lazy: Client<typeof React.lazy> = react("lazy");
export const memo: Client<typeof React.memo> = react("memo");
export const startTransition: Client<typeof React.startTransition> =
  react("startTransition");
export const use: Client<typeof React.use> = react("use");
export const useActionState: Client<typeof React.useActionState> =
  react("useActionState");
export const useCallback: Client<typeof React.useCallback> =
  react("useCallback");
export const useContext: Client<typeof React.useContext> = react("useContext");
export const useDebugValue: Client<typeof React.useDebugValue> =
  react("useDebugValue");
export const useDeferredValue: Client<typeof React.useDeferredValue> =
  react("useDeferredValue");
export const useEffect: Client<typeof React.useEffect> = react("useEffect");
export const useEffectEvent: Client<typeof React.useEffectEvent> =
  react("useEffectEvent");
export const useId: Client<typeof React.useId> = react("useId");
export const useImperativeHandle: Client<typeof React.useImperativeHandle> =
  react("useImperativeHandle");
export const useInsertionEffect: Client<typeof React.useInsertionEffect> =
  react("useInsertionEffect");
export const useLayoutEffect: Client<typeof React.useLayoutEffect> =
  react("useLayoutEffect");
export const useMemo: Client<typeof React.useMemo> = react("useMemo");
export const useOptimistic: Client<typeof React.useOptimistic> =
  react("useOptimistic");
export const useReducer: Client<typeof React.useReducer> = react("useReducer");
export const useRef: Client<typeof React.useRef> = react("useRef");
export const useState: Client<typeof React.useState> = react("useState");
export const useSyncExternalStore: Client<typeof React.useSyncExternalStore> =
  react("useSyncExternalStore");
export const useTransition: Client<typeof React.useTransition> =
  react("useTransition");
export const version: Client<typeof React.version> = react("version");
export type {
  AbstractView,
  ActionDispatch,
  ActivityProps,
  AllHTMLAttributes,
  AnchorHTMLAttributes,
  AnimationEvent,
  AnimationEventHandler,
  AnyActionArg,
  AreaHTMLAttributes,
  AriaAttributes,
  AriaRole,
  Attributes,
  AudioHTMLAttributes,
  AutoFill,
  AutoFillAddressKind,
  AutoFillBase,
  AutoFillContactField,
  AutoFillContactKind,
  AutoFillCredentialField,
  AutoFillField,
  AutoFillNormalField,
  AutoFillSection,
  BaseHTMLAttributes,
  BaseSyntheticEvent,
  BlockquoteHTMLAttributes,
  ButtonHTMLAttributes,
  CElement,
  CSSProperties,
  CacheSignal,
  CanvasHTMLAttributes,
  ChangeEvent,
  ChangeEventHandler,
  ClassAttributes,
  ClassType,
  ClassicComponent,
  ClassicComponentClass,
  ClassicElement,
  ClipboardEvent,
  ClipboardEventHandler,
  ColHTMLAttributes,
  ColgroupHTMLAttributes,
  ComponentClass,
  ComponentElement,
  ComponentLifecycle,
  ComponentProps,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ComponentRef,
  ComponentState,
  ComponentType,
  CompositionEvent,
  CompositionEventHandler,
  Consumer,
  ConsumerProps,
  Context,
  ContextType,
  CustomComponentPropsWithRef,
  DOMAttributes,
  DOMElement,
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES,
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS,
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_IMG_SRC_TYPES,
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_KEY_TYPES,
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_MEDIA_SRC_TYPES,
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES,
  DataHTMLAttributes,
  DelHTMLAttributes,
  DependencyList,
  DeprecatedLifecycle,
  DetailedHTMLProps,
  DetailedReactHTMLElement,
  DetailsHTMLAttributes,
  DialogHTMLAttributes,
  Dispatch,
  DispatchWithoutAction,
  DragEvent,
  DragEventHandler,
  EffectCallback,
  ElementRef,
  ElementType,
  EmbedHTMLAttributes,
  ErrorInfo,
  EventHandler,
  ExoticComponent,
  FC,
  FieldsetHTMLAttributes,
  FocusEvent,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  FormHTMLAttributes,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ForwardedRef,
  FragmentProps,
  FulfilledReactPromise,
  FunctionComponent,
  FunctionComponentElement,
  GetDerivedStateFromError,
  GetDerivedStateFromProps,
  HTMLAttributeAnchorTarget,
  HTMLAttributeReferrerPolicy,
  HTMLAttributes,
  HTMLElementType,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  HTMLProps,
  HtmlHTMLAttributes,
  IframeHTMLAttributes,
  ImgHTMLAttributes,
  InputEvent,
  InputEventHandler,
  InputHTMLAttributes,
  InsHTMLAttributes,
  InvalidEvent,
  JSX,
  JSXElementConstructor,
  Key,
  KeyboardEvent,
  KeyboardEventHandler,
  KeygenHTMLAttributes,
  LabelHTMLAttributes,
  LazyExoticComponent,
  LegacyRef,
  LiHTMLAttributes,
  LinkHTMLAttributes,
  MapHTMLAttributes,
  MediaHTMLAttributes,
  MemoExoticComponent,
  MenuHTMLAttributes,
  MetaHTMLAttributes,
  MeterHTMLAttributes,
  ModifierKey,
  MouseEvent,
  MouseEventHandler,
  MutableRefObject,
  NamedExoticComponent,
  NewLifecycle,
  ObjectHTMLAttributes,
  OlHTMLAttributes,
  OptgroupHTMLAttributes,
  OptionHTMLAttributes,
  OptionalPostfixToken,
  OptionalPrefixToken,
  OutputHTMLAttributes,
  ParamHTMLAttributes,
  PendingReactPromise,
  PointerEvent,
  PointerEventHandler,
  ProfilerOnRenderCallback,
  ProfilerProps,
  ProgressHTMLAttributes,
  PropsWithChildren,
  PropsWithRef,
  PropsWithoutRef,
  Provider,
  ProviderExoticComponent,
  ProviderProps,
  QuoteHTMLAttributes,
  ReactComponentElement,
  ReactElement,
  ReactEventHandler,
  ReactHTMLElement,
  ReactInstance,
  ReactNode,
  ReactPortal,
  ReactPromise,
  ReactSVGElement,
  Reducer,
  ReducerState,
  ReducerWithoutAction,
  Ref,
  RefAttributes,
  RefCallback,
  RefObject,
  RejectedReactPromise,
  RendererUsable,
  SVGAttributes,
  SVGElementType,
  SVGLineElementAttributes,
  SVGProps,
  SVGTextElementAttributes,
  ScriptHTMLAttributes,
  SelectHTMLAttributes,
  SetStateAction,
  SlotHTMLAttributes,
  SourceHTMLAttributes,
  StaticLifecycle,
  StyleHTMLAttributes,
  SubmitEvent,
  SubmitEventHandler,
  SuspenseProps,
  SyntheticEvent,
  TableHTMLAttributes,
  TdHTMLAttributes,
  TextareaHTMLAttributes,
  ThHTMLAttributes,
  TimeHTMLAttributes,
  ToggleEvent,
  ToggleEventHandler,
  Touch,
  TouchEvent,
  TouchEventHandler,
  TouchList,
  TrackHTMLAttributes,
  TransitionEvent,
  TransitionEventHandler,
  TransitionFunction,
  TransitionStartFunction,
  UIEvent,
  UIEventHandler,
  UntrackedReactPromise,
  Usable,
  VideoHTMLAttributes,
  WebViewHTMLAttributes,
  WheelEvent,
  WheelEventHandler,
} from "react";
