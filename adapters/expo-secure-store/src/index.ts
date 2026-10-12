// `expo-secure-store`, name for name, in alphabetical order: a value where it
// both exports and declares it; a type for everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as SecureStore from "expo-secure-store";
import { secureStore } from "./imports.js";

export const AFTER_FIRST_UNLOCK: Client<typeof SecureStore.AFTER_FIRST_UNLOCK> =
  secureStore("AFTER_FIRST_UNLOCK");
export const AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY: Client<
  typeof SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY
> = secureStore("AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY");
export const ALWAYS: Client<typeof SecureStore.ALWAYS> = secureStore("ALWAYS");
export const ALWAYS_THIS_DEVICE_ONLY: Client<
  typeof SecureStore.ALWAYS_THIS_DEVICE_ONLY
> = secureStore("ALWAYS_THIS_DEVICE_ONLY");
export const WHEN_PASSCODE_SET_THIS_DEVICE_ONLY: Client<
  typeof SecureStore.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY
> = secureStore("WHEN_PASSCODE_SET_THIS_DEVICE_ONLY");
export const WHEN_UNLOCKED: Client<typeof SecureStore.WHEN_UNLOCKED> =
  secureStore("WHEN_UNLOCKED");
export const WHEN_UNLOCKED_THIS_DEVICE_ONLY: Client<
  typeof SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
> = secureStore("WHEN_UNLOCKED_THIS_DEVICE_ONLY");
export const canUseBiometricAuthentication: Client<
  typeof SecureStore.canUseBiometricAuthentication
> = secureStore("canUseBiometricAuthentication");
export const deleteItemAsync: Client<typeof SecureStore.deleteItemAsync> =
  secureStore("deleteItemAsync");
export const getItem: Client<typeof SecureStore.getItem> =
  secureStore("getItem");
export const getItemAsync: Client<typeof SecureStore.getItemAsync> =
  secureStore("getItemAsync");
export const isAvailableAsync: Client<typeof SecureStore.isAvailableAsync> =
  secureStore("isAvailableAsync");
export const setItem: Client<typeof SecureStore.setItem> =
  secureStore("setItem");
export const setItemAsync: Client<typeof SecureStore.setItemAsync> =
  secureStore("setItemAsync");

export type {
  KeychainAccessibilityConstant,
  SecureStoreOptions,
} from "expo-secure-store";
