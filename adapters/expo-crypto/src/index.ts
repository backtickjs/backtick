// `expo-crypto`, name for name, in alphabetical order: a value where it both
// exports and declares it, with the instance type of each class it names; a
// type for everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as ExpoCrypto from "expo-crypto";
import { crypto } from "./imports.js";

export const AESEncryptionKey: Client<typeof ExpoCrypto.AESEncryptionKey> =
  crypto("AESEncryptionKey");
export type AESEncryptionKey = ExpoCrypto.AESEncryptionKey;
export const AESKeySize: Client<typeof ExpoCrypto.AESKeySize> =
  crypto("AESKeySize");
export const AESSealedData: Client<typeof ExpoCrypto.AESSealedData> =
  crypto("AESSealedData");
export type AESSealedData = ExpoCrypto.AESSealedData;
export const CryptoDigestAlgorithm: Client<
  typeof ExpoCrypto.CryptoDigestAlgorithm
> = crypto("CryptoDigestAlgorithm");
export const CryptoEncoding: Client<typeof ExpoCrypto.CryptoEncoding> =
  crypto("CryptoEncoding");
export const aesDecryptAsync: Client<typeof ExpoCrypto.aesDecryptAsync> =
  crypto("aesDecryptAsync");
export const aesEncryptAsync: Client<typeof ExpoCrypto.aesEncryptAsync> =
  crypto("aesEncryptAsync");
export const digest: Client<typeof ExpoCrypto.digest> = crypto("digest");
export const digestStringAsync: Client<typeof ExpoCrypto.digestStringAsync> =
  crypto("digestStringAsync");
export const getRandomBytes: Client<typeof ExpoCrypto.getRandomBytes> =
  crypto("getRandomBytes");
export const getRandomBytesAsync: Client<
  typeof ExpoCrypto.getRandomBytesAsync
> = crypto("getRandomBytesAsync");
export const getRandomValues: Client<typeof ExpoCrypto.getRandomValues> =
  crypto("getRandomValues");
export const randomUUID: Client<typeof ExpoCrypto.randomUUID> =
  crypto("randomUUID");

export type {
  AESDecryptOptions,
  AESEncryptOptions,
  AESSealedDataConfig,
  ArrayBufferDecryptOptions,
  Base64DecryptOptions,
  BinaryInput,
  CryptoDigestOptions,
  Digest,
  GCMNonceParam,
  GCMTagByteLength,
} from "expo-crypto";
