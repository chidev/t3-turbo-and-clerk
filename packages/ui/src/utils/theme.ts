// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Import the Saas UI theme
import { theme as baseTheme } from "@saas-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

export const theme = extendTheme({ colors }, baseTheme);
