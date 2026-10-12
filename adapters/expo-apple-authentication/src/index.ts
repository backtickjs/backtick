// `expo-apple-authentication`, name for name, in alphabetical order: a value where it both
// exports and declares it, with the instance type of each class it names; a
// type for everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as AppleAuthentication from "expo-apple-authentication";
import { appleAuthentication } from "./imports.js";

export const AppleAuthenticationButton: Client<
  typeof AppleAuthentication.AppleAuthenticationButton
> = appleAuthentication("AppleAuthenticationButton");
export const AppleAuthenticationButtonStyle: Client<
  typeof AppleAuthentication.AppleAuthenticationButtonStyle
> = appleAuthentication("AppleAuthenticationButtonStyle");
export const AppleAuthenticationButtonType: Client<
  typeof AppleAuthentication.AppleAuthenticationButtonType
> = appleAuthentication("AppleAuthenticationButtonType");
export const AppleAuthenticationCredentialState: Client<
  typeof AppleAuthentication.AppleAuthenticationCredentialState
> = appleAuthentication("AppleAuthenticationCredentialState");
export const AppleAuthenticationOperation: Client<
  typeof AppleAuthentication.AppleAuthenticationOperation
> = appleAuthentication("AppleAuthenticationOperation");
export const AppleAuthenticationScope: Client<
  typeof AppleAuthentication.AppleAuthenticationScope
> = appleAuthentication("AppleAuthenticationScope");
export const AppleAuthenticationUserDetectionStatus: Client<
  typeof AppleAuthentication.AppleAuthenticationUserDetectionStatus
> = appleAuthentication("AppleAuthenticationUserDetectionStatus");
export const addRevokeListener: Client<
  typeof AppleAuthentication.addRevokeListener
> = appleAuthentication("addRevokeListener");
export const formatFullName: Client<typeof AppleAuthentication.formatFullName> =
  appleAuthentication("formatFullName");
export const getCredentialStateAsync: Client<
  typeof AppleAuthentication.getCredentialStateAsync
> = appleAuthentication("getCredentialStateAsync");
export const isAvailableAsync: Client<
  typeof AppleAuthentication.isAvailableAsync
> = appleAuthentication("isAvailableAsync");
export const refreshAsync: Client<typeof AppleAuthentication.refreshAsync> =
  appleAuthentication("refreshAsync");
export const signInAsync: Client<typeof AppleAuthentication.signInAsync> =
  appleAuthentication("signInAsync");
export const signOutAsync: Client<typeof AppleAuthentication.signOutAsync> =
  appleAuthentication("signOutAsync");

export type {
  AppleAuthenticationButtonProps,
  AppleAuthenticationCredential,
  AppleAuthenticationFullName,
  AppleAuthenticationFullNameFormatStyle,
  AppleAuthenticationRefreshOptions,
  AppleAuthenticationSignInOptions,
  AppleAuthenticationSignOutOptions,
  Subscription,
} from "expo-apple-authentication";
