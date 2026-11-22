// Single source of truth for shadcn-bootstrap design tokens.
//
// Used by scripts/build-css.mjs (to write dist/css/tokens.css and dist/css/themes/*.css)
// and by the docs site's theme generator, so the generator's output is byte-for-byte
// what the build ships. Pure ESM with no imports: safe to load in Node and the browser.
//
// Values follow shadcn/ui's oklch palettes (MIT). Every color token is emitted as
// light-dark(<light>, <dark>), so it follows Bootstrap 6's color-scheme switching
// (prefers-color-scheme, or [data-bs-theme="light|dark"] on any ancestor).

export const LAYER_ORDER =
  "@layer colors, config, root, reboot, layout, content, forms, components, custom, helpers, utilities;";

export const DEFAULT_THEME = { base: "zinc", accent: "default", radius: 0.625 };

const WHITE = "oklch(1 0 0)";
const NEAR_WHITE = "oklch(0.985 0 0)";

// Per base color: the handful of shadcn values that differ between palettes.
// Everything else is derived in buildBase() the same way shadcn's themes are built.
const BASE_SEEDS = {
  zinc: {
    label: "Zinc",
    fg: "oklch(0.141 0.005 285.823)",
    primary: "oklch(0.21 0.006 285.885)",
    secondary: "oklch(0.967 0.001 286.375)",
    mutedFg: "oklch(0.552 0.016 285.938)",
    border: "oklch(0.92 0.004 286.32)",
    ring: "oklch(0.705 0.015 286.067)",
    secondaryDark: "oklch(0.274 0.006 286.033)",
    fgDark: NEAR_WHITE,
  },
  slate: {
    label: "Slate",
    fg: "oklch(0.129 0.042 264.695)",
    primary: "oklch(0.208 0.042 265.755)",
    secondary: "oklch(0.968 0.007 247.896)",
    mutedFg: "oklch(0.554 0.046 257.417)",
    border: "oklch(0.929 0.013 255.508)",
    ring: "oklch(0.704 0.04 256.788)",
    secondaryDark: "oklch(0.279 0.041 260.031)",
    fgDark: "oklch(0.984 0.003 247.858)",
  },
  stone: {
    label: "Stone",
    fg: "oklch(0.147 0.004 49.25)",
    primary: "oklch(0.216 0.006 56.043)",
    secondary: "oklch(0.97 0.001 106.424)",
    mutedFg: "oklch(0.553 0.013 58.071)",
    border: "oklch(0.923 0.003 48.717)",
    ring: "oklch(0.709 0.01 56.259)",
    secondaryDark: "oklch(0.268 0.007 34.298)",
    fgDark: "oklch(0.985 0.001 106.423)",
  },
  neutral: {
    label: "Neutral",
    fg: "oklch(0.145 0 0)",
    primary: "oklch(0.205 0 0)",
    secondary: "oklch(0.97 0 0)",
    mutedFg: "oklch(0.556 0 0)",
    border: "oklch(0.922 0 0)",
    ring: "oklch(0.708 0 0)",
    secondaryDark: "oklch(0.269 0 0)",
    fgDark: NEAR_WHITE,
  },
  gray: {
    label: "Gray",
    fg: "oklch(0.13 0.028 261.692)",
    primary: "oklch(0.21 0.034 264.665)",
    secondary: "oklch(0.967 0.003 264.542)",
    mutedFg: "oklch(0.551 0.027 264.364)",
    border: "oklch(0.928 0.006 264.531)",
    ring: "oklch(0.707 0.022 261.325)",
    secondaryDark: "oklch(0.278 0.033 256.848)",
    fgDark: "oklch(0.985 0.002 247.839)",
  },
};

function buildBase(s) {
  // [light, dark] pairs, in shadcn's token order.
  return {
    background: [WHITE, s.fg],
    foreground: [s.fg, s.fgDark],
    card: [WHITE, s.primary],
    "card-foreground": [s.fg, s.fgDark],
    popover: [WHITE, s.primary],
    "popover-foreground": [s.fg, s.fgDark],
    primary: [s.primary, s.border],
    "primary-foreground": [NEAR_WHITE, s.primary],
    secondary: [s.secondary, s.secondaryDark],
    "secondary-foreground": [s.primary, s.fgDark],
    muted: [s.secondary, s.secondaryDark],
    "muted-foreground": [s.mutedFg, s.ring],
    accent: [s.secondary, s.secondaryDark],
    "accent-foreground": [s.primary, s.fgDark],
    destructive: ["oklch(0.577 0.245 27.325)", "oklch(0.704 0.191 22.216)"],
    "destructive-foreground": [WHITE, WHITE],
    border: [s.border, "oklch(1 0 0 / 10%)"],
    input: [s.border, "oklch(1 0 0 / 15%)"],
    ring: [s.ring, s.mutedFg],
    "chart-1": ["oklch(0.646 0.222 41.116)", "oklch(0.488 0.243 264.376)"],
    "chart-2": ["oklch(0.6 0.118 184.704)", "oklch(0.696 0.17 162.48)"],
    "chart-3": ["oklch(0.398 0.07 227.392)", "oklch(0.769 0.188 70.08)"],
    "chart-4": ["oklch(0.828 0.189 84.429)", "oklch(0.627 0.265 303.9)"],
    "chart-5": ["oklch(0.769 0.188 70.08)", "oklch(0.645 0.246 16.439)"],
    sidebar: [NEAR_WHITE, s.primary],
    "sidebar-foreground": [s.fg, s.fgDark],
    "sidebar-primary": [s.primary, "oklch(0.488 0.243 264.376)"],
    "sidebar-primary-foreground": [NEAR_WHITE, NEAR_WHITE],
    "sidebar-accent": [s.secondary, s.secondaryDark],
    "sidebar-accent-foreground": [s.primary, s.fgDark],
    "sidebar-border": [s.border, "oklch(1 0 0 / 10%)"],
    "sidebar-ring": [s.ring, s.mutedFg],
  };
}

export const baseColors = Object.fromEntries(
  Object.entries(BASE_SEEDS).map(([name, seed]) => [name, { label: seed.label, tokens: buildBase(seed) }]),
);

// Accent colors replace primary (and the ring / sidebar primary that follow it).
// "default" keeps the base color's near-black / near-white primary.
export const accentColors = {
  default: { label: "Default", light: null, dark: null },
  blue: {
    label: "Blue",
    light: ["oklch(0.546 0.245 262.881)", "oklch(0.97 0.014 254.604)"],
    dark: ["oklch(0.623 0.214 259.815)", "oklch(0.97 0.014 254.604)"],
  },
  green: {
    label: "Green",
    light: ["oklch(0.627 0.194 149.214)", "oklch(0.982 0.018 155.826)"],
    dark: ["oklch(0.723 0.219 149.579)", "oklch(0.266 0.065 152.934)"],
  },
  orange: {
    label: "Orange",
    light: ["oklch(0.646 0.222 41.116)", "oklch(0.98 0.016 73.684)"],
    dark: ["oklch(0.705 0.213 47.604)", "oklch(0.98 0.016 73.684)"],
  },
  red: {
    label: "Red",
    light: ["oklch(0.577 0.245 27.325)", "oklch(0.971 0.013 17.38)"],
    dark: ["oklch(0.637 0.237 25.331)", "oklch(0.971 0.013 17.38)"],
  },
  rose: {
    label: "Rose",
    light: ["oklch(0.586 0.253 17.585)", "oklch(0.969 0.015 12.422)"],
    dark: ["oklch(0.645 0.246 16.439)", "oklch(0.969 0.015 12.422)"],
  },
  violet: {
    label: "Violet",
    light: ["oklch(0.541 0.281 293.009)", "oklch(0.969 0.016 293.756)"],
    dark: ["oklch(0.606 0.25 292.717)", "oklch(0.969 0.016 293.756)"],
  },
  yellow: {
    label: "Yellow",
    light: ["oklch(0.852 0.199 91.936)", "oklch(0.421 0.095 57.708)"],
    dark: ["oklch(0.795 0.184 86.047)", "oklch(0.421 0.095 57.708)"],
  },
};

export const radii = [0, 0.3, 0.5, 0.625, 0.75, 1];

/** Resolve a theme to { tokenName: [light, dark] } plus radius. */
export function resolveTheme({ base = DEFAULT_THEME.base, accent = DEFAULT_THEME.accent, radius = DEFAULT_THEME.radius } = {}) {
  const baseTheme = baseColors[base];
  if (!baseTheme) throw new Error(`Unknown base color "${base}"`);
  const accentTheme = accentColors[accent];
  if (!accentTheme) throw new Error(`Unknown accent color "${accent}"`);

  const tokens = { ...baseTheme.tokens };
  if (accentTheme.light) {
    const [lp, lpf] = accentTheme.light;
    const [dp, dpf] = accentTheme.dark;
    tokens.primary = [lp, dp];
    tokens["primary-foreground"] = [lpf, dpf];
    tokens.ring = [lp, dp];
    tokens["sidebar-primary"] = [lp, dp];
    tokens["sidebar-primary-foreground"] = [lpf, dpf];
    tokens["sidebar-ring"] = [lp, dp];
  }
  return { tokens, radius };
}

/**
 * Render a theme as CSS.
 * @param {object} theme  { base, accent, radius }
 * @param {object} opts   selector (default ":root"), layer (wrap in @layer custom), header (comment)
 */
export function renderTheme(theme = DEFAULT_THEME, { selector = ":root", layer = true, header = true } = {}) {
  const { tokens, radius } = resolveTheme(theme);
  const t = { ...DEFAULT_THEME, ...theme };
  const indent = layer ? "    " : "  ";
  const lines = [`${indent}--radius: ${radius}rem;`];
  for (const [name, [light, dark]] of Object.entries(tokens)) {
    lines.push(`${indent}--${name}: ${light === dark ? light : `light-dark(${light}, ${dark})`};`);
  }
  const block = `${layer ? "  " : ""}${selector} {\n${lines.join("\n")}\n${layer ? "  " : ""}}`;
  const head = header ? `/* shadcn-bootstrap theme: base=${t.base} accent=${t.accent} radius=${t.radius}rem */\n` : "";
  return layer ? `${head}${LAYER_ORDER}\n\n@layer custom {\n${block}\n}\n` : `${head}${block}\n`;
}

/** Token names in display order (for docs tables). */
export const tokenNames = ["radius", ...Object.keys(baseColors.zinc.tokens)];
