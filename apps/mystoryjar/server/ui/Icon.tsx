import { cs } from "@backtickjs/core";
import { SvgXml } from "@backtickjs/react-native-svg";
import { type Colors, useColors } from "./theme.js";

export type IconProps = {
  // its shapes, from `icons`: `${icons.pen}`
  shapes: string;
  size?: number;
  // a palette colour, `primaryText` unless said
  color?: keyof Colors;
  // drawn as an outline, as the website's unliked heart is
  outline?: boolean;
};

// An icon from `icons`, 22 points square unless said, as on the website. An
// outline is stroked at 1.5 and drawn 2 points smaller.
export const Icon = cs`(props: IconProps) => {
  const colors = $useColors();
  const size = (props.size ?? 22) - (props.outline ? 2 : 0);
  const shapes = props.outline
    ? props.shapes
        .split('fill="currentColor"')
        .join('fill="none" stroke="currentColor" stroke-width="1.5"')
    : props.shapes;
  return (
    <$SvgXml
      xml={'<svg viewBox="0 0 20 20">' + shapes + "</svg>"}
      width={size}
      height={size}
      color={colors[props.color ?? "primaryText"]}
    />
  );
}`;
