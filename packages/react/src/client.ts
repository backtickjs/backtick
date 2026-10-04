// `react-dom/client`, name for name, in alphabetical order.
import type { Client } from "@backtickjs/core";
import type * as ReactDOMClient from "react-dom/client";
import { client } from "./imports.js";

export const createRoot: Client<typeof ReactDOMClient.createRoot> =
  client("createRoot");
export const hydrateRoot: Client<typeof ReactDOMClient.hydrateRoot> =
  client("hydrateRoot");
export type {
  Container,
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_CREATE_ROOT_CONTAINERS,
  ErrorInfo,
  HydrationOptions,
  ReactFormState,
  Root,
  RootOptions,
} from "react-dom/client";
