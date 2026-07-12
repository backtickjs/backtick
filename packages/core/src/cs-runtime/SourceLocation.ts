export type SourceLocation = {
  readonly path: string;
  readonly start: { line: number; character: number };
  readonly end: { line: number; character: number };
};
