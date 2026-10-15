/**
 * What a bundle may import, by specifier: each the module the app imported
 * for it. What a web page's import map does, for an app, with modules for
 * values instead of URLs:
 *
 *     import * as React from "react";
 *     import * as JSXRuntime from "react/jsx-runtime";
 *     import * as ReactNative from "react-native";
 *
 *     export const moduleMap = {
 *       react: React,
 *       "react/jsx-runtime": JSXRuntime,
 *       "react-native": ReactNative,
 *     };
 */
export type ModuleMap = Readonly<Record<string, unknown>>;
