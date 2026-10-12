import { cs, once } from "@backtickjs/core";
import { createContext, useContext } from "@backtickjs/react";

// The colours of www.mystoryjar.com, from its `src/colors`: light while
// signed out, and the user's choice once signed in.
const light = {
  accent: "#E9707D",
  negative: "#F02849",
  warning: "#F1A817",
  white: "#FFFFFF",
  // the page behind everything
  wash: "#F3F3F3",
  surface: "#FFFFFF",
  divider: "#E7E7E7",
  smallShadow: "0px 1px 2px rgba(0, 0, 0, 0.12)",
  largeShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  accentText: "#E9707D",
  whiteText: "#FFFFFF",
  primaryText: "#303030",
  secondaryText: "#7E7D7D",
  tertiaryText: "#B7B4B4",
  disabledText: "#D7D7D7",
  primaryButton: "#E9707D",
  primaryButtonText: "#FFFFFF",
  primaryButtonDisabled: "#F09BA3",
  primaryButtonTextDisabled: "#FFFFFF",
  regularButton: "#FFFFFF",
  regularButtonText: "#7E7D7D",
  regularButtonTextDisabled: "#D7D7D7",
  progress: "#7E7D7D",
  progressRemaining: "#E7E7E7",
  toggleInactive: "#7E7D7D",
  noticeText: "#B7B4B4",
  noticeBackground: "#1F1F1F",
};

export type Colors = Record<keyof typeof light, string>;
export type Theme = "light" | "dark";

export const palettes: Record<Theme, Colors> = {
  light,
  dark: {
    ...light,
    wash: "#0A0A0A",
    surface: "#1F1F1F",
    divider: "#3C3C3C",
    // no shadow on a dark page, and a 1px outline for what floats
    smallShadow: "",
    largeShadow: "0px 0px 0px 1px rgba(50, 50, 50, 1)",
    primaryText: "#B7B4B4",
    tertiaryText: "#606060",
    disabledText: "#464646",
    primaryButtonDisabled: "#7D4147",
    primaryButtonTextDisabled: "#7E7D7D",
    regularButton: "#1F1F1F",
    regularButtonTextDisabled: "#464646",
    progressRemaining: "#3C3C3C",
  },
};

// One context for the bundle, provided by `Screen` with the request's palette.
export const ThemeContext = once(cs`$createContext(${palettes.light})`);

/** The palette of the screen a client component is drawn in. */
export const useColors = cs`() => $useContext($ThemeContext)`;
