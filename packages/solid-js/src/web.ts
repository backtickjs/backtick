// `solid-js/web`, name for name, in the order its `index.ts` exports them.
import type { Client } from "@backtickjs/core";
import type * as Web from "solid-js/web";
import { web } from "./imports.js";

export const Aliases: Client<typeof Web.Aliases> = web("Aliases");
export const Properties: Client<typeof Web.Properties> = web("Properties");
export const ChildProperties: Client<typeof Web.ChildProperties> =
  web("ChildProperties");
export const DelegatedEvents: Client<typeof Web.DelegatedEvents> =
  web("DelegatedEvents");
export const DOMElements: Client<typeof Web.DOMElements> = web("DOMElements");
export const SVGElements: Client<typeof Web.SVGElements> = web("SVGElements");
export const SVGNamespace: Client<typeof Web.SVGNamespace> =
  web("SVGNamespace");
export const getPropAlias: Client<typeof Web.getPropAlias> =
  web("getPropAlias");
export type { MountableElement } from "solid-js/web";
export const render: Client<typeof Web.render> = web("render");
export const template: Client<typeof Web.template> = web("template");
export const effect: Client<typeof Web.effect> = web("effect");
export const memo: Client<typeof Web.memo> = web("memo");
export const untrack: Client<typeof Web.untrack> = web("untrack");
export const insert: Client<typeof Web.insert> = web("insert");
export const createComponent: Client<typeof Web.createComponent> =
  web("createComponent");
export const delegateEvents: Client<typeof Web.delegateEvents> =
  web("delegateEvents");
export const clearDelegatedEvents: Client<typeof Web.clearDelegatedEvents> =
  web("clearDelegatedEvents");
export const spread: Client<typeof Web.spread> = web("spread");
export const assign: Client<typeof Web.assign> = web("assign");
export const setAttribute: Client<typeof Web.setAttribute> =
  web("setAttribute");
export const setAttributeNS: Client<typeof Web.setAttributeNS> =
  web("setAttributeNS");
export const setBoolAttribute: Client<typeof Web.setBoolAttribute> =
  web("setBoolAttribute");
export const className: Client<typeof Web.className> = web("className");
export const setProperty: Client<typeof Web.setProperty> = web("setProperty");
export const setStyleProperty: Client<typeof Web.setStyleProperty> =
  web("setStyleProperty");
export const addEventListener: Client<typeof Web.addEventListener> =
  web("addEventListener");
export const classList: Client<typeof Web.classList> = web("classList");
export const style: Client<typeof Web.style> = web("style");
export const getOwner: Client<typeof Web.getOwner> = web("getOwner");
export const dynamicProperty: Client<typeof Web.dynamicProperty> =
  web("dynamicProperty");
export const use: Client<typeof Web.use> = web("use");
export const getHydrationKey: Client<typeof Web.getHydrationKey> =
  web("getHydrationKey");
export const getNextElement: Client<typeof Web.getNextElement> =
  web("getNextElement");
export const getNextMatch: Client<typeof Web.getNextMatch> =
  web("getNextMatch");
export const getNextMarker: Client<typeof Web.getNextMarker> =
  web("getNextMarker");
export const useAssets: Client<typeof Web.useAssets> = web("useAssets");
export const getAssets: Client<typeof Web.getAssets> = web("getAssets");
export const HydrationScript: Client<typeof Web.HydrationScript> =
  web("HydrationScript");
export const generateHydrationScript: Client<
  typeof Web.generateHydrationScript
> = web("generateHydrationScript");
export const Assets: Client<typeof Web.Assets> = web("Assets");
export const Hydration: Client<typeof Web.Hydration> = web("Hydration");
export const NoHydration: Client<typeof Web.NoHydration> = web("NoHydration");
export type { RequestEvent } from "solid-js/web";
export const RequestContext: Client<typeof Web.RequestContext> =
  web("RequestContext");
export const getRequestEvent: Client<typeof Web.getRequestEvent> =
  web("getRequestEvent");
export const runHydrationEvents: Client<typeof Web.runHydrationEvents> =
  web("runHydrationEvents");

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

export const renderToString: Client<typeof Web.renderToString> =
  web("renderToString");
export const renderToStringAsync: Client<typeof Web.renderToStringAsync> = web(
  "renderToStringAsync",
);
export const renderToStream: Client<typeof Web.renderToStream> =
  web("renderToStream");
export const ssr: Client<typeof Web.ssr> = web("ssr");
export const ssrElement: Client<typeof Web.ssrElement> = web("ssrElement");
export const ssrClassList: Client<typeof Web.ssrClassList> =
  web("ssrClassList");
export const ssrStyle: Client<typeof Web.ssrStyle> = web("ssrStyle");
export const ssrAttribute: Client<typeof Web.ssrAttribute> =
  web("ssrAttribute");
export const ssrHydrationKey: Client<typeof Web.ssrHydrationKey> =
  web("ssrHydrationKey");
export const resolveSSRNode: Client<typeof Web.resolveSSRNode> =
  web("resolveSSRNode");
export const escape: Client<typeof Web.escape> = web("escape");
export const ssrSpread: Client<typeof Web.ssrSpread> = web("ssrSpread");
export type { LegacyResults } from "solid-js/web";
// `pipeToWritable` and `pipeToNodeWritable`, declared here, aren't in the
// browser build: a script has no use for them, and couldn't import them.

export const isServer: Client<typeof Web.isServer> = web("isServer");
export const isDev: Client<typeof Web.isDev> = web("isDev");

export const hydrate: Client<typeof Web.hydrate> = web("hydrate");

export const Portal: Client<typeof Web.Portal> = web("Portal");

export type { DynamicProps } from "solid-js/web";

export const createDynamic: Client<typeof Web.createDynamic> =
  web("createDynamic");

export const Dynamic: Client<typeof Web.Dynamic> = web("Dynamic");
