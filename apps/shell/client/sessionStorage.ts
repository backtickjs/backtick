import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AESEncryptionKey,
  AESSealedData,
  aesDecryptAsync,
  aesEncryptAsync,
} from "expo-crypto";
import * as SecureStore from "expo-secure-store";

// Where Supabase keeps the session: sealed with AES-GCM, its key in the
// Keychain or Keystore, the sealed session in AsyncStorage, since SecureStore
// holds about 2 KB and a session can be more. A session whose key is gone, or
// one stored before it was sealed, reads as none: sign in again.
export const sessionStorage = {
  async getItem(name: string): Promise<string | null> {
    const sealed = await AsyncStorage.getItem(name);
    const key = await SecureStore.getItemAsync(name);
    if (sealed === null || key === null) {
      return null;
    }
    try {
      const plain = await aesDecryptAsync(
        AESSealedData.fromCombined(sealed),
        await AESEncryptionKey.import(key, "base64"),
      );
      return new TextDecoder().decode(plain);
    } catch {
      return null;
    }
  },

  async setItem(name: string, value: string): Promise<void> {
    const key = await AESEncryptionKey.generate();
    const sealed = await aesEncryptAsync(new TextEncoder().encode(value), key);
    await SecureStore.setItemAsync(name, await key.encoded("base64"));
    await AsyncStorage.setItem(name, await sealed.combined("base64"));
  },

  async removeItem(name: string): Promise<void> {
    await AsyncStorage.removeItem(name);
    await SecureStore.deleteItemAsync(name);
  },
};
