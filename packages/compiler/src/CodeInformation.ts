// The subset of Volar's `CodeInformation` the compiler emits on its
// mappings; the language plugin layers the remaining feature flags on top.
export interface CodeInformation {
  // gates hover and the other semantic features for positions resolving
  // through the mapping
  semantic: boolean;
}
