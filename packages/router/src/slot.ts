import {
  Children,
  cloneElement,
  type ReactElement,
  type ReactNode,
} from "react";

interface SlotProps {
  onPress: (event: never) => void;
  style?: unknown;
}

interface ChildProps {
  onPress?: (event: never) => void;
  style?: unknown;
}

/**
 * `asChild`: `props` on the only child, as Radix's `Slot`, which expo-router's
 * `Link` uses. The child's own props win, both `onPress` run, its first, and
 * the styles merge.
 */
export function slotted(children: ReactNode, props: SlotProps): ReactElement {
  const child = Children.only(children) as ReactElement<ChildProps>;
  const { onPress, style, ...rest } = props;
  return cloneElement(child, {
    ...rest,
    ...child.props,
    onPress(event: never) {
      child.props.onPress?.(event);
      onPress(event);
    },
    style:
      style === undefined || child.props.style === undefined
        ? (style ?? child.props.style)
        : [child.props.style, style],
  });
}
