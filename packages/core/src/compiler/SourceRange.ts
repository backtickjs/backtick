import type { CodeInformation } from "./CodeInformation.js";

export interface SourceRange {
  readonly start: number;
  readonly end: number;
  // When the range is the source side of a mapping: the editor behavior
  // the mapping carries (absent for the default behavior).
  readonly data?: CodeInformation;
}
