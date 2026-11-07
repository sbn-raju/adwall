import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// AdWall design system — warm "billboard orange" brand on neutral surfaces.
const config = defineConfig({
  globalCss: {
    "html, body": {
      bg: "bg",
      color: "fg",
      fontFeatureSettings: '"cv11", "ss01"',
      WebkitFontSmoothing: "antialiased",
    },
    "::selection": { bg: "brand.muted" },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Plus Jakarta Sans', system-ui, sans-serif" },
        body: { value: "'Plus Jakarta Sans', system-ui, sans-serif" },
      },
      colors: {
        brand: {
          50: { value: "#fff6ed" },
          100: { value: "#ffead4" },
          200: { value: "#ffd0a8" },
          300: { value: "#ffae71" },
          400: { value: "#ff8138" },
          500: { value: "#fe5f11" },
          600: { value: "#ef4407" },
          700: { value: "#c63108" },
          800: { value: "#9d280f" },
          900: { value: "#7e2410" },
          950: { value: "#440f06" },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: { base: "{colors.brand.500}", _dark: "{colors.brand.500}" } },
          contrast: { value: "white" },
          fg: { value: { base: "{colors.brand.700}", _dark: "{colors.brand.300}" } },
          muted: { value: { base: "{colors.brand.100}", _dark: "{colors.brand.900}" } },
          subtle: { value: { base: "{colors.brand.50}", _dark: "{colors.brand.950}" } },
          emphasized: { value: { base: "{colors.brand.200}", _dark: "{colors.brand.800}" } },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
