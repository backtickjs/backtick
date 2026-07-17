// Test-only intrinsic elements. The runtime accepts any element type — only
// the type layer narrows them — so fixtures augment the placeholder set with
// the shapes they exercise. The import makes this file a module, so `declare
// module` augments the real jsx-runtime instead of shadowing it.
import "@backtickjs/core/jsx-runtime";

declare module "@backtickjs/core/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      button: {
        key?: string | number;
        onClick?: unknown;
        onA?: unknown;
        onB?: unknown;
        data?: unknown;
      };
      label: {
        key?: string | number;
        text?: unknown;
      };
    }
  }
}
