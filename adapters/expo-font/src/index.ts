// `expo-font`, name for name, in alphabetical order: a value where it both
// exports and declares it, with the instance type of each class it names; a
// type for everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as Font from "expo-font";
import { font } from "./imports.js";

export const FontDisplay: Client<typeof Font.FontDisplay> = font("FontDisplay");
export const getLoadedFonts: Client<typeof Font.getLoadedFonts> =
  font("getLoadedFonts");
export const isLoaded: Client<typeof Font.isLoaded> = font("isLoaded");
export const isLoading: Client<typeof Font.isLoading> = font("isLoading");
export const loadAsync: Client<typeof Font.loadAsync> = font("loadAsync");
export const renderToImageAsync: Client<typeof Font.renderToImageAsync> =
  font("renderToImageAsync");
export const unloadAllAsync: Client<typeof Font.unloadAllAsync> =
  font("unloadAllAsync");
export const unloadAsync: Client<typeof Font.unloadAsync> = font("unloadAsync");
export const useFonts: Client<typeof Font.useFonts> = font("useFonts");

export type {
  FontResource,
  FontSource,
  RenderToImageOptions,
  RenderToImageResult,
  ServerFontResourceDescriptor,
  UnloadFontOptions,
} from "expo-font";
