// `solid-js/web`, name for name, in the order its `index.ts` exports them.
import { web } from "./imports.js";

export const Aliases = web("Aliases");
export const Properties = web("Properties");
export const ChildProperties = web("ChildProperties");
export const DelegatedEvents = web("DelegatedEvents");
export const DOMElements = web("DOMElements");
export const SVGElements = web("SVGElements");
export const SVGNamespace = web("SVGNamespace");
export const getPropAlias = web("getPropAlias");
export type { MountableElement } from "solid-js/web";
export const render = web("render");
export const template = web("template");
export const effect = web("effect");
export const memo = web("memo");
export const untrack = web("untrack");
export const insert = web("insert");
export const createComponent = web("createComponent");
export const delegateEvents = web("delegateEvents");
export const clearDelegatedEvents = web("clearDelegatedEvents");
export const spread = web("spread");
export const assign = web("assign");
export const setAttribute = web("setAttribute");
export const setAttributeNS = web("setAttributeNS");
export const setBoolAttribute = web("setBoolAttribute");
export const className = web("className");
export const setProperty = web("setProperty");
export const setStyleProperty = web("setStyleProperty");
export const addEventListener = web("addEventListener");
export const classList = web("classList");
export const style = web("style");
export const getOwner = web("getOwner");
export const dynamicProperty = web("dynamicProperty");
export const use = web("use");
export const getHydrationKey = web("getHydrationKey");
export const getNextElement = web("getNextElement");
export const getNextMatch = web("getNextMatch");
export const getNextMarker = web("getNextMarker");
export const useAssets = web("useAssets");
export const getAssets = web("getAssets");
export const HydrationScript = web("HydrationScript");
export const generateHydrationScript = web("generateHydrationScript");
export const Assets = web("Assets");
export const Hydration = web("Hydration");
export const NoHydration = web("NoHydration");
export type { RequestEvent } from "solid-js/web";
export const RequestContext = web("RequestContext");
export const getRequestEvent = web("getRequestEvent");
export const runHydrationEvents = web("runHydrationEvents");

export {
  For,
  Show,
  Suspense,
  SuspenseList,
  Switch,
  Match,
  Index,
  ErrorBoundary,
  mergeProps,
} from "./index.js";

export const renderToString = web("renderToString");
export const renderToStringAsync = web("renderToStringAsync");
export const renderToStream = web("renderToStream");
export const ssr = web("ssr");
export const ssrElement = web("ssrElement");
export const ssrClassList = web("ssrClassList");
export const ssrStyle = web("ssrStyle");
export const ssrAttribute = web("ssrAttribute");
export const ssrHydrationKey = web("ssrHydrationKey");
export const resolveSSRNode = web("resolveSSRNode");
export const escape = web("escape");
export const ssrSpread = web("ssrSpread");
export type { LegacyResults } from "solid-js/web";
// `pipeToWritable` and `pipeToNodeWritable`, declared here, aren't in the
// browser build: a script has no use for them, and couldn't import them.

export const isServer = web("isServer");
export const isDev = web("isDev");

export const hydrate = web("hydrate");

export const Portal = web("Portal");

export type { DynamicProps } from "solid-js/web";

export const createDynamic = web("createDynamic");

export const Dynamic = web("Dynamic");
