// SecureStore as screens require it on the web, which expo-secure-store
// doesn't support: the browser's localStorage, under the same names.
export const SecureStore = {
  getItemAsync: async (key: string) => localStorage.getItem(key),
  setItemAsync: async (key: string, value: string) =>
    localStorage.setItem(key, value),
  deleteItemAsync: async (key: string) => localStorage.removeItem(key),
};
