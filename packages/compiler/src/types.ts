import type { CodeMapping } from "@volar/language-core";
import type ts from "typescript";

export interface RewriteResult {
  virtual: ts.Node;
}

export interface CompileResult {
  virtualCode: string;
  mappings: CodeMapping[];
}
