// FileSystem as screens require it on the web, where expo-file-system can't
// upload: a picked photo's blob URL, posted with fetch.
class File {
  constructor(readonly uri: string) {}
  async upload(
    url: string,
    options: { headers?: Record<string, string> } = {},
  ) {
    const body = await (await fetch(this.uri)).blob();
    const response = await fetch(url, {
      method: "POST",
      headers: options.headers,
      body,
    });
    return {
      status: response.status,
      body: await response.text(),
      headers: Object.fromEntries(response.headers),
    };
  }
}

export const FileSystem = { File };
