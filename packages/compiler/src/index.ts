export type CompileOptions = {
  filename: string;
};

export interface TSXResult {
  code: string;
  map: SourceMap;
}

export interface SourceMap {
  file: string;
  mappings: string;
  names: string[];
  sources: string[];
  sourcesContent: string[];
  version: number;
}

export function compileToTSX(
  _source: string,
  _options: CompileOptions,
): TSXResult {
  throw "";
}
