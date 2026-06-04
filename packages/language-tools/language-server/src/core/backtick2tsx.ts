import { CompileOptions, compileToTSX, TSXResult } from "@backtick/compiler";
import type { CodeMapping, VirtualCode } from "@volar/language-core";

export function safeConvertToTSX(source: string, options: CompileOptions) {
  try {
    return compileToTSX(source, options);
  } catch (e) {
    console.error(
      `There was an error transforming ${options.filename} to TSX. An empty file will be returned instead.`,
    );

    return {
      code: "",
      map: {
        file: options.filename ?? "",
        sources: [],
        sourcesContent: [],
        names: [],
        mappings: "",
        version: 0,
      },
    } satisfies TSXResult;
  }
}

export function backtick2tsx(source: string, fileName: string) {
  const tsx = safeConvertToTSX(source, { filename: fileName });

  return {
    virtualCode: getVirtualCodeTSX(source, tsx, fileName),
  };
}

function getVirtualCodeTSX(
  _source: string,
  tsx: TSXResult,
  _fileName: string,
): VirtualCode {
  const mappings: CodeMapping[] = [];
  return {
    id: "tsx",
    languageId: "typescriptreact",
    snapshot: {
      getText: (start, end) => tsx.code.substring(start, end),
      getLength: () => tsx.code.length,
      getChangeRange: () => undefined,
    },
    mappings: mappings,
    embeddedCodes: [],
  };
}
