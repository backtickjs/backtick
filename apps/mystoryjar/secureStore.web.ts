// expo-secure-store on the web, which it doesn't support: the browser's
// localStorage, under the same names. The web's module map offers it to
// screens in its place.
export const getItemAsync = async (key: string) => localStorage.getItem(key);
export const setItemAsync = async (key: string, value: string) =>
  localStorage.setItem(key, value);
export const deleteItemAsync = async (key: string) =>
  localStorage.removeItem(key);
