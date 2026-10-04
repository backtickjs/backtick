// The subset of Volar's `CodeInformation` the compiler emits on its
// mappings; the language plugin layers the remaining feature flags on top.
export interface CodeInformation {
  // gates hover and the other semantic features for positions resolving
  // through the mapping; as an object, all of them but highlighting
  semantic: boolean | { shouldHighlight(): boolean };
  // gates completions for positions resolving through the mapping
  completion?: boolean;
  // gates go-to-definition, references, and rename for positions resolving
  // through the mapping
  navigation?: boolean;
  // gates diagnostics resolving through the mapping
  verification?: boolean;
}
