export type Transform =
  | { translateX: number }
  | { translateY: number }
  | { scale: number }
  | { scaleX: number }
  | { scaleY: number }
  | { rotate: string }
  | { rotateX: string }
  | { rotateY: string }
  | { rotateZ: string }
  | { skewX: string }
  | { skewY: string }
  | { perspective: number };
