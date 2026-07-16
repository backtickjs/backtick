import type { CodeInformation } from "./CodeInformation.js";

export type Segment =
  | string
  | [
      text: string,
      source: string | undefined,
      sourceOffset: number,
      length: number,
      // the editor behavior of the mapped node the text was attributed to
      data?: CodeInformation,
    ];

export function segmentsToString<T extends Segment>(segments: T[]) {
  return segments.map((s) => (typeof s === "string" ? s : s[0])).join("");
}
