export type Segment =
  | string
  | [
      text: string,
      source: string | undefined,
      sourceOffset: number,
      data: number,
    ];

export function segmentsToString<T extends Segment>(segments: T[]) {
  return segments.map((s) => (typeof s === "string" ? s : s[0])).join("");
}
